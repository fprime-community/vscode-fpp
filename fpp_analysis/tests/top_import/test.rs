use crate::run_test;

#[test]
fn duplicate_topology() {
    run_test("top_import/duplicate_topology")
}

#[test]
fn instance_public() {
    run_test("top_import/instance_public")
}

#[test]
fn undef_topology() {
    run_test("top_import/undef_topology")
}

#[test]
fn basic() {
    run_test("top_import/basic")
}
