use crate::run_test;

#[test]
fn undef_3() {
    run_test("constant/undef_3")
}

#[test]
fn undef_2() {
    run_test("constant/undef_2")
}

#[test]
fn invalid_array_index_type() {
    run_test("constant/invalid_array_index_type")
}

#[test]
fn array_index_negative() {
    run_test("constant/array_index_negative")
}

#[test]
fn uses_ok() {
    run_test("constant/uses_ok")
}

#[test]
fn invalid_array_type() {
    run_test("constant/invalid_array_type")
}

#[test]
fn undef_1() {
    run_test("constant/undef_1")
}

#[test]
fn array_index_out_of_bounds() {
    run_test("constant/array_index_out_of_bounds")
}
