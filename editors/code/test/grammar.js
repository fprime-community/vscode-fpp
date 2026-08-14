// Tokenization tests for the FPP TextMate grammar.
//
// The main thing under test is the `phase` init specifier: its string argument
// is an excerpt of C++, so the grammar opens a `meta.embedded.block.cpp` region
// and delegates to the `source.cpp` grammar. In VS Code that grammar comes from
// the built-in `cpp` extension; here we register a tiny stub under the same
// scope name so the test asserts the *embedding* rather than Microsoft's C++
// grammar.

const fs = require("fs");
const path = require("path");
const assert = require("assert");

let vsctm;
let oniguruma;
try {
    vsctm = require("vscode-textmate");
    oniguruma = require("vscode-oniguruma");
} catch (err) {
    console.error(
        "Missing test dependencies. Run `yarn install` to fetch " +
            "`vscode-textmate` and `vscode-oniguruma`.",
    );
    throw err;
}

const FPP_GRAMMAR_PATH = path.resolve(__dirname, "..", "syntax", "fpp.tmLanguage.json");

// Minimal stand-in for the built-in C++ grammar. Deliberately tiny: we only
// need a couple of unmistakable scopes to prove that `source.cpp` was consulted
// inside the phase string.
const CPP_STUB_GRAMMAR = {
    scopeName: "source.cpp",
    patterns: [
        {
            name: "comment.line.double-slash.cpp",
            match: "//.*$",
        },
        {
            name: "keyword.control.cpp",
            match: "\\b(if|else|for|while|return)\\b",
        },
    ],
};

async function makeGrammar() {
    const onigDir = path.dirname(require.resolve("vscode-oniguruma"));
    const wasm = fs.readFileSync(path.join(onigDir, "onig.wasm"));
    await oniguruma.loadWASM(wasm.buffer.slice(wasm.byteOffset, wasm.byteOffset + wasm.byteLength));

    const registry = new vsctm.Registry({
        onigLib: Promise.resolve({
            createOnigScanner: (patterns) => new oniguruma.OnigScanner(patterns),
            createOnigString: (str) => new oniguruma.OnigString(str),
        }),
        loadGrammar: async (scopeName) => {
            if (scopeName === "source.fpp") {
                return vsctm.parseRawGrammar(
                    fs.readFileSync(FPP_GRAMMAR_PATH, "utf8"),
                    FPP_GRAMMAR_PATH,
                );
            }
            if (scopeName === "source.cpp") {
                return vsctm.parseRawGrammar(JSON.stringify(CPP_STUB_GRAMMAR), "cpp-stub.json");
            }
            return null;
        },
    });

    const grammar = await registry.loadGrammar("source.fpp");
    assert.ok(grammar, "failed to load source.fpp grammar");
    return grammar;
}

/**
 * Tokenize a whole document, returning one array of `{ text, scopes }` per line.
 */
function tokenize(grammar, source) {
    let ruleStack = vsctm.INITIAL;
    return source.split("\n").map((line) => {
        const result = grammar.tokenizeLine(line, ruleStack);
        ruleStack = result.ruleStack;
        return result.tokens.map((token) => ({
            text: line.substring(token.startIndex, token.endIndex),
            scopes: token.scopes,
        }));
    });
}

/**
 * Scopes of the first token on `line` whose text contains `needle`.
 */
function scopesOf(lines, line, needle) {
    const token = lines[line].find((t) => t.text.includes(needle));
    assert.ok(
        token,
        `no token containing ${JSON.stringify(needle)} on line ${line}: ` +
            JSON.stringify(lines[line]),
    );
    return token.scopes;
}

function assertScope(lines, line, needle, scope) {
    const scopes = scopesOf(lines, line, needle);
    assert.ok(
        scopes.includes(scope),
        `expected ${JSON.stringify(needle)} on line ${line} to have scope ` +
            `${scope}, got ${JSON.stringify(scopes)}`,
    );
}

function refuteScope(lines, line, needle, scope) {
    const scopes = scopesOf(lines, line, needle);
    assert.ok(
        !scopes.includes(scope),
        `expected ${JSON.stringify(needle)} on line ${line} NOT to have scope ` +
            `${scope}, got ${JSON.stringify(scopes)}`,
    );
}

const EMBEDDED = "meta.embedded.block.cpp";

// A phase whose string starts on the line after a `\` continuation, which is
// how FPP topologies are conventionally written.
function testMultilinePhase(grammar) {
    const lines = tokenize(
        grammar,
        [
            "instance c1: C base id 0x100 {",
            "  phase Fpp.ToCpp.Phases.configComponents \\",
            '  """',
            "  // configure",
            "  if (c1.isReady()) {",
            "    c1.setup();",
            "  }",
            '  """',
            "}",
        ].join("\n"),
    );

    assertScope(lines, 1, "phase", "storage.type.class.fpp");
    assertScope(lines, 1, "\\", "punctuation.separator.continuation.fpp");
    assertScope(lines, 2, '"""', "punctuation.definition.string.begin.fpp");

    // Body is an embedded C++ region, tokenized by `source.cpp`.
    assertScope(lines, 3, "// configure", EMBEDDED);
    assertScope(lines, 3, "// configure", "comment.line.double-slash.cpp");
    assertScope(lines, 4, "if", EMBEDDED);
    assertScope(lines, 4, "if", "keyword.control.cpp");
    assertScope(lines, 5, "c1.setup", EMBEDDED);

    // A `}` inside the C++ body must not terminate the phase region.
    assertScope(lines, 6, "}", EMBEDDED);

    assertScope(lines, 7, '"""', "punctuation.definition.string.end.fpp");

    // The region closes with the string: the enclosing instance body is FPP again.
    refuteScope(lines, 8, "}", EMBEDDED);
}

// A triple-quoted string that is not a phase argument stays a plain FPP string.
function testNonPhaseTripleString(grammar) {
    const lines = tokenize(
        grammar,
        ['constant help = """', "if this were C++ it would be a keyword", '"""'].join("\n"),
    );

    refuteScope(lines, 1, "if this were", EMBEDDED);
    assertScope(lines, 1, "if this were", "string.quoted.triple.fpp");
}

// A phase using a single-quoted string must still close its region, rather than
// swallowing the rest of the file.
function testSinglePhaseString(grammar) {
    const lines = tokenize(
        grammar,
        [
            'instance c1: C base id 0x100 { phase 1 "c1.tearDown();" }',
            "passive component D {",
            "}",
        ].join("\n"),
    );

    assertScope(lines, 0, "phase", "storage.type.class.fpp");
    refuteScope(lines, 1, "component", "meta.spec-init.fpp");
    assertScope(lines, 1, "component", "storage.type.class.fpp");
}

// A malformed `phase` with no string at all must be bounded by the enclosing
// block rather than running to end of file.
function testUnterminatedPhase(grammar) {
    const lines = tokenize(
        grammar,
        ["instance c1: C base id 0x100 {", "  phase 0", "}", "passive component D {", "}"].join(
            "\n",
        ),
    );

    refuteScope(lines, 3, "component", "meta.spec-init.fpp");
    assertScope(lines, 3, "component", "storage.type.class.fpp");
}

async function main() {
    const grammar = await makeGrammar();

    const tests = [
        testMultilinePhase,
        testNonPhaseTripleString,
        testSinglePhaseString,
        testUnterminatedPhase,
    ];

    for (const test of tests) {
        test(grammar);
        console.log(`  ok  ${test.name}`);
    }

    console.log(`grammar test passed: ${tests.length} cases`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
