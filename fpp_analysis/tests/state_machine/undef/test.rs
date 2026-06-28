use crate::run_test;

#[test]
fn nested_action_error() {
    run_test("state_machine/undef/nested_action_error")
}

#[test]
fn action_error() {
    run_test("state_machine/undef/action_error")
}

#[test]
fn nested_state_ok() {
    run_test("state_machine/undef/nested_state_ok")
}

#[test]
fn guard_ok() {
    run_test("state_machine/undef/guard_ok")
}

#[test]
fn nested_state_error() {
    run_test("state_machine/undef/nested_state_error")
}

#[test]
fn nested_choice_error() {
    run_test("state_machine/undef/nested_choice_error")
}

#[test]
fn nested_guard_error() {
    run_test("state_machine/undef/nested_guard_error")
}

#[test]
fn state_ok() {
    run_test("state_machine/undef/state_ok")
}

#[test]
fn nested_guard_ok() {
    run_test("state_machine/undef/nested_guard_ok")
}

#[test]
fn state_error() {
    run_test("state_machine/undef/state_error")
}

#[test]
fn choice_error() {
    run_test("state_machine/undef/choice_error")
}

#[test]
fn guard_error() {
    run_test("state_machine/undef/guard_error")
}

#[test]
fn signal_error() {
    run_test("state_machine/undef/signal_error")
}

#[test]
fn signal_ok() {
    run_test("state_machine/undef/signal_ok")
}

#[test]
fn action_ok() {
    run_test("state_machine/undef/action_ok")
}

#[test]
fn choice_ok() {
    run_test("state_machine/undef/choice_ok")
}

#[test]
fn nested_choice_ok() {
    run_test("state_machine/undef/nested_choice_ok")
}

#[test]
fn nested_action_ok() {
    run_test("state_machine/undef/nested_action_ok")
}
