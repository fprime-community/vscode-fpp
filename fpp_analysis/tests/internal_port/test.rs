use crate::run_test;

#[test]
fn ref_params() {
    run_test("internal_port/ref_params")
}

#[test]
fn passive() {
    run_test("internal_port/passive")
}

#[test]
fn duplicate_param() {
    run_test("internal_port/duplicate_param")
}

#[test]
fn bad_priority() {
    run_test("internal_port/bad_priority")
}

#[test]
fn duplicate_general() {
    run_test("internal_port/duplicate_general")
}

#[test]
fn ok() {
    run_test("internal_port/ok")
}

#[test]
fn duplicate() {
    run_test("internal_port/duplicate")
}
