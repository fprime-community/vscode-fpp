use crate::run_test;

#[test]
fn duplicate_nested() {
    run_test("state_machine/signal_uses/duplicate_nested")
}

#[test]
fn ok() {
    run_test("state_machine/signal_uses/ok")
}

#[test]
fn duplicate() {
    run_test("state_machine/signal_uses/duplicate")
}
