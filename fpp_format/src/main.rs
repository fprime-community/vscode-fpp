use fpp_format::{format_text, FormatOptions};
use std::env;
use std::fs;
use std::io::{self, Read};
use std::path::PathBuf;
use std::process;

fn print_usage() {
    eprintln!("Usage: fpp_format [OPTIONS] [FILES...]");
    eprintln!();
    eprintln!("Options:");
    eprintln!("  --check       Check if files are formatted (exit 1 if not)");
    eprintln!("  --stdin       Read from stdin instead of files");
    eprintln!("  --help        Show this help message");
    eprintln!();
    eprintln!("If no files are provided, reads from stdin by default.");
}

struct Config {
    files: Vec<PathBuf>,
    check_only: bool,
    use_stdin: bool,
}

impl Config {
    fn parse_args() -> Result<Self, String> {
        let args: Vec<String> = env::args().skip(1).collect();

        let mut files = Vec::new();
        let mut check_only = false;
        let mut use_stdin = false;

        for arg in args {
            match arg.as_str() {
                "--check" => check_only = true,
                "--stdin" => use_stdin = true,
                "--help" => {
                    print_usage();
                    process::exit(0);
                }
                _ if arg.starts_with("--") => {
                    return Err(format!("Unknown option: {}", arg));
                }
                _ => {
                    files.push(PathBuf::from(arg));
                }
            }
        }

        // If no files and not explicitly stdin, default to stdin
        if files.is_empty() && !use_stdin {
            use_stdin = true;
        }

        Ok(Config {
            files,
            check_only,
            use_stdin,
        })
    }
}

fn format_stdin(check_only: bool) -> Result<(), Box<dyn std::error::Error>> {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input)?;

    let formatted = format_text(&input, FormatOptions::default())?;

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

fn format_file_cmd(path: &PathBuf, check_only: bool) -> Result<bool, Box<dyn std::error::Error>> {
    let original = fs::read_to_string(path)?;
    let formatted = format_text(&original, FormatOptions::default())?;

    if check_only {
        if original != formatted {
            eprintln!("{}: not formatted", path.display());
            return Ok(false);
        } else {
            eprintln!("{}: already formatted", path.display());
            return Ok(true);
        }
    } else {
        // Write formatted content back to file
        fs::write(path, formatted)?;
        eprintln!("{}: formatted", path.display());
        return Ok(true);
    }
}

fn main() {
    let config = match Config::parse_args() {
        Ok(config) => config,
        Err(err) => {
            eprintln!("Error: {}", err);
            eprintln!();
            print_usage();
            process::exit(1);
        }
    };

    if config.use_stdin {
        if let Err(err) = format_stdin(config.check_only) {
            eprintln!("Error formatting stdin: {}", err);
            process::exit(1);
        }
        return;
    }

    // Format files
    let mut all_formatted = true;
    for file in &config.files {
        match format_file_cmd(file, config.check_only) {
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
