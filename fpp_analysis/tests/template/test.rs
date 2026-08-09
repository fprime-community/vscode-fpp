use crate::run_test;

#[test]
fn basic_constant() {
    run_test("template/basic_constant")
}

#[test]
fn composition_invalid() {
    run_test("template/composition_invalid")
}

#[test]
fn constant_with_default() {
    run_test("template/constant_with_default")
}

#[test]
fn duplicate_def() {
    run_test("template/duplicate_def")
}

#[test]
fn interfaces() {
    run_test("template/interfaces")
}

#[test]
fn interfaces_basic() {
    run_test("template/interfaces_basic")
}

#[test]
fn interfaces_invalid_port_instance() {
    run_test("template/interfaces_invalid_port_instance")
}

#[test]
fn interfaces_invalid_port_instance_name() {
    run_test("template/interfaces_invalid_port_instance_name")
}

#[test]
fn interfaces_invalid_port_instance_name_aliased() {
    run_test("template/interfaces_invalid_port_instance_name_aliased")
}

#[test]
fn interfaces_valid_port_instance_name_aliased() {
    run_test("template/interfaces_valid_port_instance_name_aliased")
}

#[test]
fn invalid_nested() {
    run_test("template/invalid_nested")
}

#[test]
fn self_reference() {
    run_test("template/self_reference")
}

#[test]
fn struct_parameter_anon_array_promote() {
    run_test("template/struct_parameter_anon_array_promote")
}

#[test]
fn struct_parameter_bad_arg() {
    run_test("template/struct_parameter_bad_arg")
}

#[test]
fn struct_parameter_bad_concat() {
    run_test("template/struct_parameter_bad_concat")
}

#[test]
fn struct_parameter_concat_primitives_promote() {
    run_test("template/struct_parameter_concat_primitives_promote")
}

#[test]
fn struct_parameter_ok() {
    run_test("template/struct_parameter_ok")
}

#[test]
fn types() {
    run_test("template/types")
}

#[test]
fn undef_constant_param_type() {
    run_test("template/undef_constant_param_type")
}

#[test]
fn undef_interface_param_type() {
    run_test("template/undef_interface_param_type")
}
