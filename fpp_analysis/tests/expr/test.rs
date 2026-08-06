use crate::run_test;

#[test]
fn add_error() {
    run_test("expr/add_error")
}

#[test]
fn literal_ok() {
    run_test("expr/literal_ok")
}

#[test]
fn neg_error() {
    run_test("expr/neg_error")
}

#[test]
fn div_by_zero() {
    run_test("expr/div_by_zero")
}

#[test]
fn array_error() {
    run_test("expr/array_error")
}

#[test]
fn neg_ok() {
    run_test("expr/neg_ok")
}

#[test]
fn array_empty() {
    run_test("expr/array_empty")
}

#[test]
fn dot_bad_expr() {
    run_test("expr/dot_bad_expr")
}

#[test]
fn paren_ok() {
    run_test("expr/paren_ok")
}

#[test]
fn struct_duplicate() {
    run_test("expr/struct_duplicate")
}

#[test]
fn array_ok() {
    run_test("expr/array_ok")
}

#[test]
fn sizeof_ok() {
    run_test("expr/sizeof_ok")
}

#[test]
fn sizeof_error() {
    run_test("expr/sizeof_error")
}
