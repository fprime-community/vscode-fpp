use crate::run_test;

#[test]
fn qualified_target() {
    run_test("state_machine/undef/qualified_target")
}

// Multiple undefined uses in a single state machine: with collect-and-continue
// (no longer short-circuiting at the first error like Scala), every undefined
// signal/action use in the same SM is reported, not just the first.
#[test]
fn multiple_uses() {
    run_test("state_machine/undef/multiple_uses")
}

// Pathological input: an undefined initial-transition target plus undefined
// uses inside states. Exercises the between-pass `had_error` guards — without
// them, a hole left by failed use-resolution would reach a downstream `unwrap`
// (transition graph / typed elements) and panic instead of emitting.
#[test]
fn stress_multi() {
    run_test("state_machine/undef/stress_multi")
}

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

#[test]
fn constant_error() {
    run_test("state_machine/undef/constant_error")
}
