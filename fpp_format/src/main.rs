use clap::Parser;
use fpp_format::{FormatOptions, format_file_recursive, format_text};
use fpp_lsp_parser::TopEntryPoint;
use std::fs;
use std::io::{self, Read};
use std::path::PathBuf;
use std::process;

/// A formatter (pretty-printer) for the F Prime Prime (FPP) modeling language.
///
/// By default only the named files are formatted. Pass --recursive-includes to
/// additionally follow `include` specifiers and format each `.fppi` fragment
/// with the entrypoint derived from its include context.
#[derive(Parser, Debug)]
#[command(version, author, about, long_about)]
struct Args {
    /// FPP files to format. If none are given, reads from stdin.
    #[arg(value_name = "FILES")]
    files: Vec<PathBuf>,

    /// Check if files are formatted without writing; exit 1 if any is not.
    #[arg(long)]
    check: bool,

    /// Read from stdin and write to stdout (default when no files are given).
    #[arg(long)]
    stdin: bool,

    /// Also follow `include` specifiers and format reachable `.fppi` fragments.
    #[arg(long)]
    recursive_includes: bool,

    /// Parser entrypoint / grammar rule for the input. One of: module (default),
    /// component, topology, tlm-packet, tlm-packet-set. Needed when formatting a
    /// bare `.fppi` fragment directly.
    #[arg(long, value_name = "RULE", value_parser = parse_entry)]
    entry: Option<TopEntryPoint>,
}

/// Parse a `--entry` value into a [`TopEntryPoint`].
fn parse_entry(s: &str) -> Result<TopEntryPoint, String> {
    TopEntryPoint::from_name(s).ok_or_else(|| format!("unknown entrypoint: {s}"))
}

fn format_stdin(check_only: bool, entry: TopEntryPoint) -> Result<(), Box<dyn std::error::Error>> {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input)?;

    let formatted = format_text(&input, entry, FormatOptions::default())?;

    if check_only {
        if input != formatted {
            eprintln!("stdin: not formatted");
            process::exit(1);
        } else {
            eprintln!("stdin: already formatted");
        }
    } else {
        print!("{}", formatted);
    }

    Ok(())
}

fn format_file_cmd(
    path: &PathBuf,
    check_only: bool,
    entry: TopEntryPoint,
    recursive_includes: bool,
) -> Result<bool, Box<dyn std::error::Error>> {
    if recursive_includes {
        // Format the file and every `.fppi` fragment reachable via `include`,
        // deriving each fragment's entrypoint from its include context.
        let units = format_file_recursive(path, entry, FormatOptions::default())?;

        let mut all_formatted = true;
        for unit in units {
            all_formatted &= apply_unit(&unit.path, &unit.original, &unit.formatted, check_only)?;
        }
        return Ok(all_formatted);
    }

    // Default: format only the named file, ignoring `include` specifiers.
    let original = fs::read_to_string(path)?;
    let formatted = format_text(&original, entry, FormatOptions::default())?;
    apply_unit(path, &original, &formatted, check_only)
}

/// Report/write a single formatted file. Returns whether it was already
/// formatted (used to compute the overall exit status in `--check`).
fn apply_unit(
    path: &std::path::Path,
    original: &str,
    formatted: &str,
    check_only: bool,
) -> Result<bool, Box<dyn std::error::Error>> {
    let changed = original != formatted;
    if check_only {
        if changed {
            eprintln!("{}: not formatted", path.display());
            Ok(false)
        } else {
            eprintln!("{}: already formatted", path.display());
            Ok(true)
        }
    } else if changed {
        fs::write(path, formatted)?;
        eprintln!("{}: formatted", path.display());
        Ok(true)
    } else {
        eprintln!("{}: already formatted", path.display());
        Ok(true)
    }
}

fn main() {
    let args = Args::parse();

    // An explicit `--entry` wins; otherwise default to `Module`, which is
    // correct for normal `.fpp` files and `.fppi` fragments of module members.
    let entry = args.entry.unwrap_or(TopEntryPoint::Module);

    // Read from stdin when explicitly requested or when no files are given.
    if args.stdin || args.files.is_empty() {
        if let Err(err) = format_stdin(args.check, entry) {
            eprintln!("Error formatting stdin: {}", err);
            process::exit(1);
        }
        return;
    }

    // Format files
    let mut all_formatted = true;
    for file in &args.files {
        match format_file_cmd(file, args.check, entry, args.recursive_includes) {
            Ok(formatted) => {
                if !formatted {
                    all_formatted = false;
                }
            }
            Err(err) => {
                eprintln!("Error formatting {}: {}", file.display(), err);
                all_formatted = false;
            }
        }
    }

    if !all_formatted {
        process::exit(1);
    }
}
