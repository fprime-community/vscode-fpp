use fpp_format::{FormatOptions, format_text};
use pretty_assertions::assert_eq;
use std::path::PathBuf;
use std::{env, fs};

fn run_test(file_path: &str) {
    let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    path.push("tests");

    let mut input_file = path.clone();
    input_file.push(file_path);
    input_file.set_extension("fpp");

    let mut ref_file = path.clone();
    ref_file.push(file_path);
    ref_file.set_extension("ref.fpp");

    let source_file_path = input_file.to_str().unwrap();
    let src = match fs::read_to_string(source_file_path) {
        Ok(src) => src,
        Err(err) => panic!("failed to open {}: {}", source_file_path, err),
    };

    let formatted = format_text(&src, FormatOptions::default()).expect("formatting should succeed");

    match env::var("FPP_UPDATE_REF") {
        Ok(_) => {
            // Update the ref file
            fs::write(ref_file, formatted).expect("failed to write ref.fpp")
        }
        Err(_) => {
            // Read and compare against the ref file
            let ref_txt = fs::read_to_string(ref_file).expect("failed to read ref.fpp");
            assert_eq!(ref_txt, formatted)
        }
    }
}

#[test]
fn simple_module() {
    run_test("simple-module")
}

#[test]
fn binary_expressions() {
    run_test("binary-expressions")
}

#[test]
fn comments() {
    run_test("comments")
}

#[test]
fn multiple_definitions() {
    run_test("multiple-definitions")
}

#[test]
fn nested_module() {
    run_test("nested-module")
}

#[test]
fn annotations() {
    run_test("annotations")
}

#[test]
fn array_struct() {
    run_test("array-struct")
}

#[test]
fn component() {
    run_test("component")
}

#[test]
fn port() {
    run_test("port")
}

#[test]
fn topology() {
    run_test("topology")
}

#[test]
fn state_machine() {
    run_test("state-machine")
}
