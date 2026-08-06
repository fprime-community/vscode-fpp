use crossbeam_channel::Sender;
use lsp_types::notification::Notification;
use lsp_types::{ProgressParams, ProgressParamsValue, ProgressToken};
use std::fmt::{Debug, Formatter};
use std::sync::{Arc, Mutex};

#[derive(Clone)]
pub(crate) struct Progress {
    /// LSP message sender
    sender: Sender<lsp_server::Message>,
    /// Progress token
    token: ProgressToken,
    /// Number of work items completed
    done: Arc<Mutex<usize>>,
    /// Total number of work items
    total: usize,
}

impl Debug for Progress {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Progress")
            .field("token", &self.token)
            .field("done", &*self.done.lock().unwrap())
            .field("total", &self.total)
            .finish()
    }
}

impl Progress {
    fn send_notification(&self, params: lsp_types::WorkDoneProgress) {
        let not = lsp_server::Notification::new(
            lsp_types::notification::Progress::METHOD.to_owned(),
            ProgressParams {
                token: self.token.clone(),
                value: ProgressParamsValue::WorkDone(params),
            },
        );

        self.sender.send(not.into()).unwrap();
    }

    pub(crate) fn begin(
        token: ProgressToken,
        title: &str,
        total: usize,
        sender: Sender<lsp_server::Message>,
    ) -> Progress {
        let out = Progress {
            sender,
            token,
            done: Arc::new(Mutex::new(0)),
            total,
        };

        out.send_notification(lsp_types::WorkDoneProgress::Begin(
            lsp_types::WorkDoneProgressBegin {
                title: title.into(),
                cancellable: Some(true),
                message: None,
                percentage: Some(0),
            },
        ));

        out
    }

    pub(crate) fn set_total(&mut self, total: usize) {
        self.total = total;
    }

    /// Report a work item has finished
    pub(crate) fn report(&self, message: &str) {
        let (percentage, done): (u32, usize) = {
            if self.total == 0 {
                // Unknown total, assume 0%
                (0, 0)
            } else {
                let mut done_guard = self.done.lock().unwrap();
                *done_guard += 1;
                let done = *done_guard;
                let f = done as f64 / self.total.max(1) as f64;
                ((f * 100.0) as u32, done)
            }
        };

        let msg = if self.total == 0 {
            message.to_string()
        } else {
            format!("{}/{} {}", done, self.total, message)
        };

        self.send_notification(lsp_types::WorkDoneProgress::Report(
            lsp_types::WorkDoneProgressReport {
                cancellable: Some(true),
                message: Some(msg),
                percentage: Some(percentage.min(100)),
            },
        ));
    }

    pub(crate) fn finish(&self, message: Option<String>) {
        self.send_notification(lsp_types::WorkDoneProgress::End(
            lsp_types::WorkDoneProgressEnd { message },
        ));
    }
}
