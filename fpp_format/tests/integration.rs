use fpp_format::{FormatOptions, format_text};
use fpp_lsp_parser::{TopEntryPoint, parse};
use pretty_assertions::assert_eq;
use std::path::PathBuf;
use std::{env, fs};

fn run_test(file_path: &str, entry: fpp_lsp_parser::TopEntryPoint) {
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

    // Clone entry for use in multiple calls (TopEntryPoint doesn't implement Copy)
    let entry_for_format = match &entry {
        TopEntryPoint::Module => TopEntryPoint::Module,
        TopEntryPoint::Component => TopEntryPoint::Component,
        TopEntryPoint::Topology => TopEntryPoint::Topology,
        TopEntryPoint::TlmPacket => TopEntryPoint::TlmPacket,
        TopEntryPoint::TlmPacketSet => TopEntryPoint::TlmPacketSet,
    };

    let formatted = format_text(&src, entry_for_format, FormatOptions::default())
        .expect("formatting should succeed");

    match env::var("FPP_UPDATE_REF") {
        Ok(_) => {
            // Update the ref file
            fs::write(ref_file, &formatted).expect("failed to write ref.fpp")
        }
        Err(_) => {
            // Read and compare against the ref file
            let ref_txt = fs::read_to_string(ref_file).expect("failed to read ref.fpp");
            assert_eq!(ref_txt, formatted)
        }
    }

    // Second pass: the formatted output must parse cleanly with the LSP parser
    // and be idempotent (formatting it again yields the same text). This guards
    // against the formatter emitting syntactically-invalid or unstable output.
    // Use the same entry point for reparsing and reformatting. Since TopEntryPoint
    // doesn't implement Copy, we match on a reference and construct new values.
    let entry_for_reparse = match &entry {
        TopEntryPoint::Module => TopEntryPoint::Module,
        TopEntryPoint::Component => TopEntryPoint::Component,
        TopEntryPoint::Topology => TopEntryPoint::Topology,
        TopEntryPoint::TlmPacket => TopEntryPoint::TlmPacket,
        TopEntryPoint::TlmPacketSet => TopEntryPoint::TlmPacketSet,
    };
    let reparse = parse(&formatted, entry_for_reparse);
    assert!(
        reparse.errors().is_empty(),
        "{}: formatted output has parse errors: {:?}\n---\n{}",
        file_path,
        reparse.errors(),
        formatted
    );

    let entry_for_reformat = match &entry {
        TopEntryPoint::Module => TopEntryPoint::Module,
        TopEntryPoint::Component => TopEntryPoint::Component,
        TopEntryPoint::Topology => TopEntryPoint::Topology,
        TopEntryPoint::TlmPacket => TopEntryPoint::TlmPacket,
        TopEntryPoint::TlmPacketSet => TopEntryPoint::TlmPacketSet,
    };
    let reformatted = format_text(&formatted, entry_for_reformat, FormatOptions::default())
        .expect("second-pass formatting failed");
    assert_eq!(
        formatted, reformatted,
        "{}: formatting is not idempotent",
        file_path
    );
}

#[test]
fn simple_module() {
    run_test("simple-module", TopEntryPoint::Module)
}

#[test]
fn binary_expressions() {
    run_test("binary-expressions", TopEntryPoint::Module)
}

#[test]
fn comments() {
    run_test("comments", TopEntryPoint::Module)
}

#[test]
fn multiple_definitions() {
    run_test("multiple-definitions", TopEntryPoint::Module)
}

#[test]
fn nested_module() {
    run_test("nested-module", TopEntryPoint::Module)
}

#[test]
fn annotations() {
    run_test("annotations", TopEntryPoint::Module)
}

#[test]
fn array_struct() {
    run_test("array-struct", TopEntryPoint::Module)
}

#[test]
fn component() {
    run_test("component", TopEntryPoint::Module)
}

#[test]
fn component_inner() {
    run_test("component-inner", TopEntryPoint::Component)
}

#[test]
fn port() {
    run_test("port", TopEntryPoint::Module)
}

#[test]
fn topology() {
    run_test("topology", TopEntryPoint::Module)
}

#[test]
fn state_machine() {
    run_test("state-machine", TopEntryPoint::Module)
}

#[test]
fn instances_locate() {
    run_test("instances-locate", TopEntryPoint::Module)
}

#[test]
fn interface_include() {
    run_test("interface-include", TopEntryPoint::Module)
}

#[test]
fn expressions() {
    run_test("expressions", TopEntryPoint::Module)
}

#[test]
fn type_defs() {
    run_test("type-defs", TopEntryPoint::Module)
}

#[test]
fn topology_extra() {
    run_test("topology-extra", TopEntryPoint::Module)
}

#[test]
fn component_extra() {
    run_test("component-extra", TopEntryPoint::Module)
}
