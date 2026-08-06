use crate::run_test;

#[test]
fn nested_ok() {
    run_test("state_machine_defs/nested_ok")
}

#[test]
fn nested_type_undef() {
    run_test("state_machine_defs/nested_type_undef")
}

#[test]
fn nested_redef() {
    run_test("state_machine_defs/nested_redef")
}
