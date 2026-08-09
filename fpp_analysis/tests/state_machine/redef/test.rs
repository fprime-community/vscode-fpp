use crate::run_test;

#[test]
fn state_shadow_ok() {
    run_test("state_machine/redef/state_shadow_ok")
}

#[test]
fn nested_state() {
    run_test("state_machine/redef/nested_state")
}

#[test]
fn choice() {
    run_test("state_machine/redef/choice")
}

#[test]
fn action() {
    run_test("state_machine/redef/action")
}

#[test]
fn ok() {
    run_test("state_machine/redef/ok")
}

#[test]
fn nested_choice() {
    run_test("state_machine/redef/nested_choice")
}

#[test]
fn state() {
    run_test("state_machine/redef/state")
}

#[test]
fn signal() {
    run_test("state_machine/redef/signal")
}

#[test]
fn guard() {
    run_test("state_machine/redef/guard")
}

#[test]
fn state_choice() {
    run_test("state_machine/redef/state_choice")
}

#[test]
fn constant() {
    run_test("state_machine/redef/constant")
}

#[test]
fn r#type() {
    run_test("state_machine/redef/type")
}

#[test]
fn state_enum() {
    run_test("state_machine/redef/state_enum")
}
