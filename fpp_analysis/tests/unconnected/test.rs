use crate::run_test;

// Requires the `fpp-check -u` unconnected-ports report, which is a tool-level
// feature and not part of semantic diagnostics.
#[cfg(feature = "disabled-tests")]
#[test]
fn basic_unconnected() {
    run_test("unconnected/basic-unconnected")
}

#[test]
fn basic() {
    run_test("unconnected/basic")
}

#[cfg(feature = "disabled-tests")]
#[test]
fn internal_unconnected() {
    run_test("unconnected/internal-unconnected")
}

#[test]
fn internal() {
    run_test("unconnected/internal")
}
