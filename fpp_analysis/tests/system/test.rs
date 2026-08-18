use crate::run_test;

#[test]
fn duplicate() {
    run_test("system/duplicate")
}

#[test]
fn invalid_component_instance() {
    run_test("system/invalid_component_instance")
}

#[test]
fn invalid_module() {
    run_test("system/invalid_module")
}

#[test]
fn not_deployment_topology() {
    run_test("system/not_deployment_topology")
}

#[test]
fn ok() {
    run_test("system/ok")
}

#[test]
fn undefined() {
    run_test("system/undefined")
}
