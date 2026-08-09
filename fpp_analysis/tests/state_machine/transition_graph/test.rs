use crate::run_test;

#[test]
fn unreachable_state() {
    run_test("state_machine/transition_graph/unreachable_state")
}

#[test]
fn unreachable_choice() {
    run_test("state_machine/transition_graph/unreachable_choice")
}

#[test]
fn choice_cycle() {
    run_test("state_machine/transition_graph/choice_cycle")
}

#[test]
fn cycle_ok() {
    run_test("state_machine/transition_graph/cycle_ok")
}

#[test]
fn choice_cycle_ok() {
    run_test("state_machine/transition_graph/choice_cycle_ok")
}
