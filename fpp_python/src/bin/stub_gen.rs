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

fn main() -> pyo3_stub_gen::Result<()> {
    fpp_python::stub_info()?.generate()?;
    Ok(())
}
