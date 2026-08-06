use crate::run_test;

#[test]
fn alias_type_ok() {
    run_test("types/alias_type_ok")
}

#[test]
fn uses_ok() {
    run_test("types/uses_ok")
}

#[test]
fn string_size_negative() {
    run_test("types/string_size_negative")
}

#[test]
fn string_size_too_large() {
    run_test("types/string_size_too_large")
}

#[test]
fn string_size_not_numeric() {
    run_test("types/string_size_not_numeric")
}
