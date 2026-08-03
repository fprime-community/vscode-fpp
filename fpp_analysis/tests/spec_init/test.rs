use crate::run_test;

#[test]
fn ok() {
    run_test("spec_init/ok")
}

#[test]
fn undef_phase() {
    run_test("spec_init/undef_phase")
}

#[test]
fn duplicate_phase() {
    run_test("spec_init/duplicate_phase")
}
