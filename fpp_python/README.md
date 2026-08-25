# fpp_python

Native Python bindings to the [FPP](https://nasa.github.io/fpp/) compiler. The
`fpp_python` extension binds **directly** to the Rust FPP compiler in-process via
PyO3: parsing and semantic analysis run in-process, and the AST and analysis are
exposed as a live, navigable Python object graph.

Because the binding holds the compiler's real in-memory model, cross-references
are exposed as **actual Python object references** (e.g. `use.definition`,
`instance.component`, `node.resolved_type`) rather than being flattened through
integer AST ids.

## Installation

```sh
pip install fprime-fpp-python
```

Building from source requires a Rust toolchain (edition 2024, i.e. Rust ≥ 1.85);
the wheel is built with [maturin](https://www.maturin.rs/) and ships an `abi3`
extension usable on CPython ≥ 3.10.

## Usage

```python
import fpp_python

model = fpp_python.analyze("""
module M {
  array Arr = [4] U32
  constant answer = 6 * 7
}
""")

if model.has_errors:
    for d in model.diagnostics:
        print(d.level, d.location, d.message)

# Navigate the AST
(module,) = model.ast()
for member in module.members:
    print(type(member).__name__, getattr(member, "name", None))

# Resolve semantics by navigation (no AST ids)
arr = model.lookup("M.Arr")                 # -> Symbol
t = arr.definition.resolved_type            # -> Type(kind="Array", array_size=4, ...)
answer = model.lookup("M.answer").definition.value.resolved_value  # -> Value(42)
```

`analyze(source, uri="<string>")` returns a `Model` with:

- `model.ast()` — the translation-unit's top-level definition nodes.
- `model.diagnostics` / `model.has_errors` — structured diagnostics.
- `model.lookup(qualified_name)` — a `Symbol` by dotted name.
- `model.components()`, `model.component_instances()`, `model.interfaces()`,
  `model.topologies()`, `model.systems()`, `model.state_machines()` — the
  resolved analysis entities.

Every AST node exposes `.node_id`, `.location`, `.pre_annotation` /
`.post_annotation`, and — where applicable — `.definition` (the resolved
symbol), `.resolved_type`, and `.resolved_value`. Node identity is stable:
navigating to the same node twice returns the same Python object.

## Development

The extension is a Cargo workspace member of
[fpp-tools](https://github.com/fprime-community/fpp-tools). The AST node wrappers
and the recording walk are expanded at compile time by the
`fpp_python_macros::fpp_ast_bindings!` proc macro from a checked-in declaration
(`src/ast/defs.rs`, a ~1:1 mirror of the `fpp_ast` grammar); the small core
(`ir_core`, `lower_core`, `model`, `sem_py`, `entities_py`, `diagnostics`) is
hand-written.

```sh
maturin develop            # build + install the extension into the active venv
pytest tests/              # run the test suite

# Regenerate the checked-in AST declaration after an `fpp_ast` change:
cargo run -p fpp_python --features bindgen --bin fpp_bindgen

# Regenerate the type stub after changing the exposed API:
cargo run -p fpp_python --no-default-features --features stubgen --bin stub_gen
```
