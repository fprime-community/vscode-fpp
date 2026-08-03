use fpp_analysis::{check_semantics, resolve_includes, Analysis};
use fpp_core::{FileReader, SourceFile};
use fpp_fs::FsReader;
use pretty_assertions::assert_eq;
use std::path::PathBuf;
use std::{env, fs};

pub(crate) fn run_test(file_path: &str) {
    // Compute the path to the FPP input and .ref.txt output
    let mut path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    path.push("tests");

    let mut fpp_file = path.clone();
    fpp_file.push(file_path);
    fpp_file.set_extension("fpp");

    let mut ref_file = path.clone();
    ref_file.push(file_path);
    ref_file.set_extension("ref.txt");

    let file_reader = FsReader {};

    // Set up the compiler context to capture diagnostic messages into a buffer
    let mut diagnostics_str = vec![];
    let mut ctx =
        fpp_core::CompilerContext::new(fpp_errors::WriteEmitter::new(&mut diagnostics_str));

    // Parse the input and run the semantic checker on the AST
    fpp_core::run(&mut ctx, || {
        let source_file_path = fpp_file.to_str().unwrap();
        let src = match file_reader.read(source_file_path) {
            Ok(src) => SourceFile::new(source_file_path, src),
            Err(err) => panic!("failed to open {}: {}", source_file_path, err),
        };

        let mut ast = fpp_parser::parse(src, |p| p.trans_unit(), None);
        let mut a = Analysis::new();
        let _ = resolve_includes(&mut a, file_reader, &mut ast);
        let _ = check_semantics(&mut a, vec![&ast]);
    });

    let output = String::from_utf8(diagnostics_str)
        .expect("failed to convert error message to string")
        .replace(path.to_str().unwrap(), "[ local path prefix ]");

    // Validate the diagnostic messages against the reference file
    match env::var("FPP_UPDATE_REF") {
        Ok(_) => {
            // Update the ref file
            fs::write(ref_file, output).expect("failed to write ref.txt")
        }
        Err(_) => {
            // Read and compare against the ref file
            let ref_txt = fs::read_to_string(ref_file).expect("failed to read ref.txt");
            assert_eq!(ref_txt, output)
        }
    }
}

mod cycles {
    mod test;
}

mod defs {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod interface {
    mod test;
}

mod types {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod port_matching {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod record {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod port_numbering {
    mod test;
}

mod array {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod tlm_packets {
    mod test;
}

mod enums {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod tlm_channel {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod framework_defs {
    mod test;
}

mod expr {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod component {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod param {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod container {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod component_instance_def {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod port_instance {
    mod test;
}

mod constant {
    mod test;
}

mod structs {
    mod test;
}

mod invalid_symbols {
    mod test;
}

mod redef {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod unconnected {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod command {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod port {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod instance_spec {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod connection_direct {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod spec_init {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod event {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod spec_loc {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod top_import {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod state_machine_instance {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod connection_pattern {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod internal_port {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod top_ports {
    mod test;
}

#[cfg(feature = "disabled-tests")]
mod state_machine {
    mod types {
        mod test;
    }

    mod initial_transitions {
        mod test;
    }

    mod transition_graph {
        mod test;
    }

    mod signal_uses {
        mod test;
    }

    mod redef {
        mod test;
    }

    mod typed_elements {
        mod test;
    }

    mod undef {
        mod test;
    }
}
