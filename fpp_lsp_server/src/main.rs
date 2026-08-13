mod analysis;
mod config;
mod diagnostics;
mod dispatcher;
mod global_state;
mod handlers;
mod lsp_ext;
mod notification;
mod request;
mod uri;
mod util;

mod lsp;
mod progress;
mod vfs;

use tracing::level_filters::LevelFilter;
pub use vfs::*;

use crate::{global_state::GlobalState, util::from_json};
use lsp_server::Connection;
use std::error::Error;

use clap::Parser;
use tracing_subscriber::{Layer, layer::SubscriberExt, util::SubscriberInitExt};

fn setup_stderr_logging(level: tracing_subscriber::filter::LevelFilter) -> anyhow::Result<()> {
    let stderr_layer = tracing_subscriber::fmt::layer().with_writer(std::io::stderr);

    tracing_subscriber::registry()
        .with(
            stderr_layer
                .with_ansi(false)
                .with_target(false)
                .with_file(true)
                .with_line_number(true)
                .with_filter(level),
        )
        .try_init()?;

    Ok(())
}

#[derive(Parser, Debug)]
#[command(version, author)]
struct Args {
    /// Uses stdio as the communication channel (default)
    #[arg(long)]
    stdio: bool,
    /// Use pipes (Windows) or socket files (Linux, Mac) as the communication channel.
    /// The pipe / socket file name is passed as the next arg or with --pipe=
    #[arg(long)]
    pipe: Option<String>,
    /// Uses a socket as the communication channel
    /// The port is passed as next arg or with --port=
    #[arg(long)]
    socket: Option<u16>,
    /// Server logging level
    #[arg(long)]
    log_level: Option<tracing_subscriber::filter::LevelFilter>,
    /// Generate a default `.fpp-lsp` project config in the current directory
    /// (reading `settings.ini` if present) and exit without starting the server.
    #[arg(long)]
    generate_config: bool,
}

fn main() -> Result<(), Box<dyn Error + Sync + Send>> {
    let arg = Args::parse();

    // `--generate-config` is a one-shot command: write a default `.fpp-lsp` into
    // the current directory and exit without starting the language server.
    if arg.generate_config {
        let cwd = std::env::current_dir()?;
        match config::generate_config(&cwd) {
            Ok(path) => {
                println!("Wrote {}", path.display());
                return Ok(());
            }
            Err(e) if e.kind() == std::io::ErrorKind::AlreadyExists => {
                eprintln!("{e}");
                std::process::exit(1);
            }
            Err(e) => return Err(e.into()),
        }
    }

    setup_stderr_logging(arg.log_level.unwrap_or(LevelFilter::OFF))?;

    // transport
    let (connection, io_threads) = {
        if arg.stdio {
            Ok(Connection::stdio())
        } else if let Some(socket) = arg.socket {
            Connection::connect(("localhost", socket))
        } else if let Some(pipe) = arg.pipe {
            Connection::connect(pipe)
        } else {
            Ok(Connection::stdio())
        }
    }?;

    let (initialize_id, initialize_params) = match connection.initialize_start() {
        Ok(it) => it,
        Err(e) => {
            if e.channel_is_disconnected() {
                io_threads.join()?;
            }
            return Err(e.into());
        }
    };

    tracing::info!("InitializeParams: {}", initialize_params);
    let lsp_types::InitializeParams {
        capabilities,
        workspace_folders,
        // initialization_options,
        // client_info,
        ..
    } = from_json::<lsp_types::InitializeParams>("InitializeParams", &initialize_params)?;

    let client_capabilities = lsp::capabilities::ClientCapabilities::new(capabilities);
    let server_capabilities = lsp::capabilities::server_capabilities(&client_capabilities);

    let initialize_result = lsp_types::InitializeResult {
        capabilities: server_capabilities,
        server_info: Some(lsp_types::ServerInfo {
            name: String::from("fpp"),
            version: Some("1.0.0".to_string()),
        }),
    };

    let initialize_result = serde_json::to_value(initialize_result)?;

    if let Err(e) = connection.initialize_finish(initialize_id, initialize_result) {
        if e.channel_is_disconnected() {
            io_threads.join()?;
        }
        return Err(e.into());
    }

    tracing::info!("server is starting up");
    GlobalState::run(workspace_folders, connection, client_capabilities);
    io_threads.join()?;
    tracing::info!("shutting down server");

    Ok(())
}
