//! Dumps `python/fpp_python/__init__.pyi` from the pyclasses annotated with
//! `#[gen_stub_pyclass]` / `#[gen_stub_pymethods]`, via pyo3-stub-gen's inventory.
//!
//! Build/run WITHOUT the `extension-module` feature (a standalone executable
//! must link libpython):
//!   cargo run -p fpp_python --no-default-features --features stubgen --bin stub_gen
//!
//! The output path is resolved from this crate's `pyproject.toml`
//! (`module-name = fpp_python`, pure-Rust layout), so the stub lands beside
//! `Cargo.toml` as `fpp_python.pyi`. maturin ships it in the wheel as
//! `fpp_python/__init__.pyi`. See `fpp_python::stub_info`.
//!
//! After generation we inject the closed-union type aliases
//! (`Value = IntegerValue | … `), which pyo3-stub-gen cannot express as named
//! `TypeAlias`es — the union return sites render as the alias name via a custom
//! `PyStubType`, and these lines define it (see `fpp_python::union_aliases`).

use std::fs;
use std::path::Path;

fn main() -> pyo3_stub_gen::Result<()> {
    fpp_python::stub_info()?.generate()?;
    let stub = Path::new(env!("CARGO_MANIFEST_DIR")).join("fpp_python.pyi");
    inject_union_aliases(&stub)?;
    Ok(())
}

/// Insert `<Alias>: typing.TypeAlias = <expansion>` lines just before the first
/// class/def definition (after the import block).
fn inject_union_aliases(path: &Path) -> std::io::Result<()> {
    let text = fs::read_to_string(path)?;

    let mut aliases = String::new();
    for (name, rhs) in fpp_python::union_aliases() {
        aliases.push_str(&format!("{name}: typing.TypeAlias = {rhs}\n"));
    }
    aliases.push('\n');

    // Insert at the start of the first class/def line (definitions follow the
    // import block, which the generator separates with a blank line).
    let insert_at = ["\nclass ", "\ndef "]
        .iter()
        .filter_map(|m| text.find(m).map(|i| i + 1))
        .min()
        .unwrap_or(text.len());

    let mut out = String::with_capacity(text.len() + aliases.len());
    out.push_str(&text[..insert_at]);
    out.push_str(&aliases);
    out.push_str(&text[insert_at..]);
    fs::write(path, out)
}
