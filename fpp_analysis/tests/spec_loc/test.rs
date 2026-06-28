use crate::run_test;

#[test]
fn include_ok() {
    run_test("spec_loc/include_ok")
}

#[test]
fn array_error() {
    run_test("spec_loc/array_error")
}

#[test]
fn enum_ok() {
    run_test("spec_loc/enum_ok")
}

#[test]
fn enum_error() {
    run_test("spec_loc/enum_error")
}

#[test]
fn constant_ok() {
    run_test("spec_loc/constant_ok")
}

#[test]
fn port_ok() {
    run_test("spec_loc/port_ok")
}

#[test]
fn abs_type_ok() {
    run_test("spec_loc/abs_type_ok")
}

#[test]
fn struct_error() {
    run_test("spec_loc/struct_error")
}

#[test]
fn abs_type_error() {
    run_test("spec_loc/abs_type_error")
}

#[test]
fn port_error() {
    run_test("spec_loc/port_error")
}

#[test]
fn struct_ok() {
    run_test("spec_loc/struct_ok")
}

#[test]
fn constant_error() {
    run_test("spec_loc/constant_error")
}

#[test]
fn array_ok() {
    run_test("spec_loc/array_ok")
}
