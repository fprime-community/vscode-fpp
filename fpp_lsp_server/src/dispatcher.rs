//! See [RequestDispatcher].
use serde::{Serialize, de::DeserializeOwned};
use std::{fmt::Debug, panic};

use crate::global_state::{GlobalState, Task};

/// A visitor for routing a raw JSON request to an appropriate handler function.
///
/// Most requests are read-only and async and are handled on the threadpool
/// (`on` method).
///
/// Some read-only requests should be handled `on`. These are typically typing-related
/// requests.
///
/// Some requests modify the state, and are run on the main thread to get
/// `&mut` (`on_mut`).
///
/// Read-only requests are wrapped into `catch_unwind` -- they don't modify the
/// state, so it's OK to recover from their failures.
pub(crate) struct RequestDispatcher<'a> {
    pub(crate) req: Option<lsp_server::Request>,
    pub(crate) global_state: &'a mut GlobalState,
}

impl RequestDispatcher<'_> {
    /// Dispatches the request onto the current thread, given full access to
    /// mutable global state. Unlike all other methods here, this one isn't
    /// guarded by `catch_unwind`, so, please, don't make bugs :-)
    pub(crate) fn on_mut<R>(
        &mut self,
        f: fn(&mut GlobalState, R::Params) -> anyhow::Result<R::Result>,
    ) -> &mut Self
    where
        R: lsp_types::request::Request,
        R::Params: DeserializeOwned + panic::UnwindSafe + Debug,
        R::Result: Serialize,
    {
        let (req, params) = match self.parse::<R>() {
            Some(it) => it,
            None => return self,
        };
        let _guard =
            tracing::debug_span!("request", method = ?req.method, "request_id" = ?req.id).entered();
        tracing::debug!(?params);
        let result = f(self.global_state, params);
        if let Some(response) = result_to_response::<R>(req.id, result) {
            self.global_state.respond(response);
        }

        self
    }

    pub(crate) fn on_run_task<R>(&mut self, t: fn(R::Params) -> anyhow::Result<Task>) -> &mut Self
    where
        R: lsp_types::request::Request,
        R::Params: DeserializeOwned + panic::UnwindSafe + Debug + Clone,
        R::Result: Serialize,
    {
        let (req, params) = match self.parse::<R>() {
            Some(it) => it,
            None => return self,
        };
        let _guard =
            tracing::debug_span!("request", method = ?req.method, "request_id" = ?req.id).entered();
        tracing::debug!(?params);

        match t(params) {
            Ok(task) => self.global_state.task_reply_to(task, req.id.clone()),
            Err(err) => {
                if let Some(response) = result_to_response::<R>(req.id, Err(err)) {
                    self.global_state.respond(response);
                }
            }
        };

        self
    }

    /// Dispatches the request onto the current thread.
    pub(crate) fn on<R>(
        &mut self,
        f: fn(&GlobalState, R::Params) -> anyhow::Result<R::Result>,
    ) -> &mut Self
    where
        R: lsp_types::request::Request,
        R::Params: DeserializeOwned + panic::UnwindSafe + Debug,
        R::Result: Serialize,
    {
        let (req, params) = match self.parse::<R>() {
            Some(it) => it,
            None => return self,
        };
        let _guard =
            tracing::debug_span!("request", method = ?req.method, "request_id" = ?req.id).entered();
        tracing::debug!(?params);
        // Run the read-only handler with the compiler context set on this
        // thread, so analysis reflection APIs (spans, annotations, port
        // lookups) are usable. `run_ref` takes a shared borrow, matching the
        // `&GlobalState` the handler receives.
        let global_state = &*self.global_state;
        let result = fpp_core::run_ref(&global_state.context, || f(global_state, params));

        if let Some(response) = result_to_response::<R>(req.id, result) {
            self.global_state.respond(response);
        }

        self
    }

    pub(crate) fn finish(&mut self) {
        if let Some(req) = self.req.take() {
            tracing::error!("unknown request: {:?}", req);
            let response = lsp_server::Response::new_err(
                req.id,
                lsp_server::ErrorCode::MethodNotFound as i32,
                "unknown request".to_owned(),
            );
            self.global_state.respond(response);
        }
    }

    fn parse<R>(&mut self) -> Option<(lsp_server::Request, R::Params)>
    where
        R: lsp_types::request::Request,
        R::Params: DeserializeOwned + Debug,
    {
        let req = self.req.take_if(|it| it.method == R::METHOD)?;
        let res = crate::util::from_json(R::METHOD, &req.params);
        match res {
            Ok(params) => Some((req, params)),
            Err(err) => {
                let response = lsp_server::Response::new_err(
                    req.id,
                    lsp_server::ErrorCode::InvalidParams as i32,
                    err.to_string(),
                );
                self.global_state.respond(response);
                None
            }
        }
    }
}

fn result_to_response<R>(
    id: lsp_server::RequestId,
    result: anyhow::Result<R::Result>,
) -> Option<lsp_server::Response>
where
    R: lsp_types::request::Request,
    R::Params: DeserializeOwned,
    R::Result: Serialize,
{
    match result {
        // TODO(tumbar) Handle cancellation errors and return None
        Ok(resp) => Some(lsp_server::Response::new_ok(id, &resp)),
        Err(e) => Some(lsp_server::Response::new_err(
            id,
            lsp_server::ErrorCode::InternalError as i32,
            e.to_string(),
        )),
    }
}

pub(crate) struct NotificationDispatcher<'a> {
    pub(crate) not: Option<lsp_server::Notification>,
    pub(crate) global_state: &'a mut GlobalState,
}

impl NotificationDispatcher<'_> {
    pub(crate) fn on<N>(
        &mut self,
        f: fn(&mut GlobalState, N::Params) -> anyhow::Result<()>,
    ) -> &mut Self
    where
        N: lsp_types::notification::Notification,
        N::Params: DeserializeOwned + Send + Debug,
    {
        // Try to grab the notification
        let not = match self.not.take() {
            Some(it) => it,
            None => return self,
        };

        let _guard = tracing::info_span!("notification", method = ?not.method).entered();

        let params = match not.extract::<N::Params>(N::METHOD) {
            Ok(it) => it,
            Err(lsp_server::ExtractError::JsonError { method, error }) => {
                tracing::error!(%method, %error, "failed to deserialize notification params, dropping");
                return self;
            }
            Err(lsp_server::ExtractError::MethodMismatch(not)) => {
                // Give the notification back to the dispatcher
                self.not = Some(not);
                return self;
            }
        };

        tracing::debug!(?params);

        if let Err(err) = f(self.global_state, params) {
            tracing::error!(handler = %N::METHOD, err = %err, "notification handler failed");
        }
        self
    }

    pub(crate) fn finish(&mut self) {
        if let Some(not) = &self.not
            && !not.method.starts_with("$/")
        {
            tracing::error!("unhandled notification: {:?}", not);
        }
    }
}
