use std::fmt;
use std::fmt::{Display, Formatter};

/// A generic error to represent an API request that cannot be fulfilled.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Error(pub(crate) String);

impl From<&str> for Error {
    fn from(value: &str) -> Self {
        Self(value.into())
    }
}

impl From<String> for Error {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl Display for Error {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        Display::fmt(&self.0, f)
    }
}

impl From<std::io::Error> for Error {
    fn from(value: std::io::Error) -> Self {
        Error(value.to_string())
    }
}

impl std::error::Error for Error {}
