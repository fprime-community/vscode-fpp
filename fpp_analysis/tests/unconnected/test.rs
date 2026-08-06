use crate::run_test;

#[test]
fn basic_unconnected() {
    run_test("unconnected/basic-unconnected")
}

#[test]
fn basic() {
    run_test("unconnected/basic")
}

#[test]
fn internal_unconnected() {
    run_test("unconnected/internal-unconnected")
}

#[test]
fn internal() {
    run_test("unconnected/internal")
}
