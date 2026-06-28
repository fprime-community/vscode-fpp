use crate::run_test;

#[test]
fn fw_size_type_not_unsigned() {
    run_test("framework_defs/fw_size_type_not_unsigned")
}

#[test]
fn fw_assert_arg_type_not_integer() {
    run_test("framework_defs/fw_assert_arg_type_not_integer")
}

#[test]
fn fw_index_type_not_signed() {
    run_test("framework_defs/fw_index_type_not_signed")
}

#[test]
fn fw_event_id_type_not_alias_type() {
    run_test("framework_defs/fw_event_id_type_not_alias_type")
}

#[test]
fn dp_state_not_enum() {
    run_test("framework_defs/dp_state_not_enum")
}

#[test]
fn user_data_size_not_integer() {
    run_test("framework_defs/user_data_size_not_integer")
}

#[test]
fn fw_opcode_type_not_alias_type() {
    run_test("framework_defs/fw_opcode_type_not_alias_type")
}
