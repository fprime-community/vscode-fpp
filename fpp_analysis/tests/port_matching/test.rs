use crate::run_test;

#[test]
fn p2_not_port_instance() {
    run_test("port_matching/p2_not_port_instance")
}

#[test]
fn ok() {
    run_test("port_matching/ok")
}

#[test]
fn p1_not_valid() {
    run_test("port_matching/p1_not_valid")
}

#[test]
fn p1_not_port_instance() {
    run_test("port_matching/p1_not_port_instance")
}

#[test]
fn mismatched_sizes() {
    run_test("port_matching/mismatched_sizes")
}

#[test]
fn repeated_name() {
    run_test("port_matching/repeated_name")
}

#[test]
fn p2_not_valid() {
    run_test("port_matching/p2_not_valid")
}
