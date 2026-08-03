use crate::run_test;

#[test]
fn action_undef_type() {
    run_test("state_machine/types/action_undef_type")
}

#[test]
fn signal_undef_type() {
    run_test("state_machine/types/signal_undef_type")
}

#[test]
fn guard_undef_type() {
    run_test("state_machine/types/guard_undef_type")
}
