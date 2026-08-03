use crate::run_test;

#[test]
fn empty_ok() {
    run_test("interface/empty_ok")
}

#[test]
fn ok() {
    run_test("interface/ok")
}

#[test]
fn duplicate_import() {
    run_test("interface/duplicate_import")
}

#[test]
fn duplicate_name() {
    run_test("interface/duplicate_name")
}

#[test]
fn cycles() {
    run_test("interface/cycles")
}

#[test]
fn conflict_name() {
    run_test("interface/conflict_name")
}

#[test]
fn async_port_in_passive() {
    run_test("interface/async_port_in_passive")
}
