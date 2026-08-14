// Unit tests for the `phase` specifier scanner that drives the editor shading.
//
// `src/phaseBlocks.ts` deliberately has no imports, so it can be transpiled and
// evaluated here without pulling in the `vscode` API or the webpack bundle.

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const ts = require("typescript");

const SOURCE = path.resolve(__dirname, "..", "src", "phaseBlocks.ts");

function loadModule(tsPath) {
    const transpiled = ts.transpileModule(fs.readFileSync(tsPath, "utf8"), {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2021,
        },
        fileName: tsPath,
    }).outputText;

    const module = { exports: {} };
    new Function("exports", "module", "require", transpiled)(
        module.exports,
        module,
        require,
    );
    return module.exports;
}

const { findPhaseBlocks, shadeRange } = loadModule(SOURCE);

/** The source text each detected block covers. */
function blockTexts(source) {
    return findPhaseBlocks(source).map((b) => source.slice(b.start, b.end));
}

/** The source text each detected block's shading actually covers. */
function shadeTexts(source) {
    return findPhaseBlocks(source).map((b) =>
        source.slice(...Object.values(shadeRange(source, b))),
    );
}

function test(name, fn) {
    fn();
    console.log(`  ok  ${name}`);
}

test("multiline phase with a line continuation", () => {
    const source = [
        "instance c1: C base id 0x100 {",
        "  phase Fpp.ToCpp.Phases.configComponents \\",
        '  """',
        "  if (c1.isReady()) {",
        "    c1.setup();",
        "  }",
        '  """',
        "}",
    ].join("\n");

    assert.deepStrictEqual(blockTexts(source), [
        ['"""', "  if (c1.isReady()) {", "    c1.setup();", "  }", '  """'].join("\n"),
    ]);
});

test("single quoted phase string", () => {
    const source = 'instance c1: C base id 0x100 { phase 1 "c1.tearDown();" }';
    assert.deepStrictEqual(blockTexts(source), ['"c1.tearDown();"']);
});

test("multiple phases in one file", () => {
    const source = [
        'phase 0 """a();"""',
        'phase 1 """b();"""',
    ].join("\n");
    assert.deepStrictEqual(blockTexts(source), ['"""a();"""', '"""b();"""']);
});

test("non-phase strings are ignored", () => {
    const source = ['constant help = """', "not cpp", '"""'].join("\n");
    assert.deepStrictEqual(blockTexts(source), []);
});

test("phase inside a comment is not a keyword", () => {
    const source = ['# phase 0 """not cpp"""', 'constant a = "plain"'].join("\n");
    assert.deepStrictEqual(blockTexts(source), []);
});

test("phase inside an annotation is not a keyword", () => {
    const source = ['@ phase 0 and then', 'constant a = "plain"'].join("\n");
    assert.deepStrictEqual(blockTexts(source), []);
});

test("phase inside a string is not a keyword", () => {
    const source = 'constant a = "phase 0 " \nconstant b = "plain"';
    assert.deepStrictEqual(blockTexts(source), []);
});

test("$phase is an escaped identifier, not the keyword", () => {
    const source = 'constant $phase = 1\nconstant a = "plain"';
    assert.deepStrictEqual(blockTexts(source), []);
});

test("a phase with no string does not claim a later string", () => {
    const source = [
        "instance c1: C base id 0x100 {",
        "  phase 0",
        "}",
        'constant a = """later"""',
    ].join("\n");
    assert.deepStrictEqual(blockTexts(source), []);
});

test("escaped quote inside a single quoted phase string", () => {
    const source = 'phase 0 "printf(\\"hi\\");"\nconstant a = 1';
    assert.deepStrictEqual(blockTexts(source), ['"printf(\\"hi\\");"']);
});

test("unterminated triple string runs to end of file", () => {
    const source = 'phase 0 """\nc1.setup();';
    assert.deepStrictEqual(blockTexts(source), ['"""\nc1.setup();']);
});

test("offsets are half-open and line up with the source", () => {
    const source = 'phase 0 """x"""';
    const [block] = findPhaseBlocks(source);
    assert.strictEqual(block.start, source.indexOf('"""'));
    assert.strictEqual(block.end, source.length);
});

test("shading drops the delimiter lines of a multiline triple-quoted phase", () => {
    const source = [
        "instance c1: C base id 0x100 {",
        "  phase Fpp.ToCpp.Phases.configComponents \\",
        '  """',
        "  if (c1.isReady()) {",
        "    c1.setup();",
        "  }",
        '  """',
        "}",
    ].join("\n");

    assert.deepStrictEqual(shadeTexts(source), [
        ["  if (c1.isReady()) {", "    c1.setup();", "  }", ""].join("\n"),
    ]);
});

test("shading drops multiple leading and trailing blank lines", () => {
    const source = [
        'phase 0 """',
        "",
        "",
        "  c1.setup();",
        "",
        "",
        '"""',
    ].join("\n");

    assert.deepStrictEqual(shadeTexts(source), ["  c1.setup();\n"]);
});

test("shading strips the quotes of a single quoted phase string", () => {
    const source = 'instance c1: C base id 0x100 { phase 1 "c1.tearDown();" }';
    assert.deepStrictEqual(shadeTexts(source), ["c1.tearDown();"]);
});

test("shading strips the quotes but keeps content sharing the delimiter's line", () => {
    const source = 'phase 0 """a();"""';
    assert.deepStrictEqual(shadeTexts(source), ["a();"]);
});

test("shading an empty multiline triple-quoted phase yields nothing", () => {
    const source = 'phase 0 """\n"""';
    assert.deepStrictEqual(shadeTexts(source), [""]);
});

console.log("phaseBlocks test passed");
