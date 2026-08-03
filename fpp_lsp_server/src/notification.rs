use crate::dispatcher::NotificationDispatcher;
use crate::global_state::GlobalState;
use crate::handlers;
use crate::lsp_ext::DumpSyntaxTree;
use lsp_server::Notification;

impl GlobalState {
    /// Handles a request.
    pub(crate) fn on_notification(&mut self, not: Notification) {
        let mut dispatcher = NotificationDispatcher {
            not: Some(not),
            global_state: self,
        };

        use lsp_types::notification as lsp_notification;

        #[rustfmt::skip]
        dispatcher
            .on::<lsp_notification::DidOpenTextDocument>(handlers::handle_did_open_text_document)
            .on::<lsp_notification::DidChangeTextDocument>(handlers::handle_did_change_text_document)
            .on::<lsp_notification::DidCloseTextDocument>(handlers::handle_did_close_text_document)
            .on::<lsp_notification::Exit>(handlers::handle_exit)
            .on::<lsp_notification::DidChangeWatchedFiles>(handlers::handle_did_change_watched_file)
            .on::<DumpSyntaxTree>(handlers::handle_dump_syntax_tree)
            .finish();
    }
}
