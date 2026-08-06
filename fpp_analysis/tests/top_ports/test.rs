use crate::run_test;

#[test]
fn implements_port_missing() {
    run_test("top_ports/implements_port_missing")
}

#[test]
fn implements_port_mismatch_1() {
    run_test("top_ports/implements_port_mismatch_1")
}

#[test]
fn nested() {
    run_test("top_ports/nested")
}

#[test]
fn unmatched_types() {
    run_test("top_ports/unmatched_types")
}

#[test]
fn implements_port_mismatch_2() {
    run_test("top_ports/implements_port_mismatch_2")
}

#[test]
fn implements() {
    run_test("top_ports/implements")
}

#[test]
fn basic() {
    run_test("top_ports/basic")
}

#[test]
fn out_to_out() {
    run_test("top_ports/out_to_out")
}

#[test]
fn internal_port() {
    run_test("top_ports/internal_port")
}
