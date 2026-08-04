// Basic smoke test for the packaged VSCode extension bundle.
//
// The webpack bundle marks `vscode` as an external module (it is injected by
// the editor host at runtime). We provide a minimal mock so the bundle can be
// required in a plain Node.js process, then assert that the public entry points
// exist and are callable shapes.

const path = require("path");
const assert = require("assert");
const Module = require("module");

// The `vscode` module is provided by the editor host at runtime and is a large
// API surface. `vscode-languageclient` (a dependency of the bundle) extends
// several `vscode` classes at import time, so a hand-written stub is brittle.
// Instead we build a "universal" proxy that can stand in for any object, class,
// function or enum member, allowing the entire bundle to evaluate.
function makeUniversalMock() {
    const fn = function () {};
    const handler = {
        get(_target, prop) {
            // Avoid pretending to be a thenable/promise or exposing symbols,
            // which can confuse module loaders.
            if (prop === "then" || typeof prop === "symbol") {
                return undefined;
            }
            return proxy;
        },
        apply() {
            return proxy;
        },
        construct() {
            return {};
        },
    };
    const proxy = new Proxy(fn, handler);
    return proxy;
}

const vscodeMock = makeUniversalMock();

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request === "vscode") {
        return vscodeMock;
    }
    return originalLoad.apply(this, arguments);
};

const distPath = path.resolve(__dirname, "..", "dist", "extension.js");

let ext;
try {
    ext = require(distPath);
} catch (err) {
    console.error(`Failed to load extension bundle at ${distPath}`);
    throw err;
}

assert.strictEqual(typeof ext.activate, "function", "missing `activate` export");
assert.strictEqual(typeof ext.deactivate, "function", "missing `deactivate` export");

console.log("smoke test passed: extension bundle loads and exports activate/deactivate");
