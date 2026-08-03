use fpp_core::{Error, FileReader};
use std::fs;

pub struct FsReader {}

impl FileReader for FsReader {
    fn read(&self, path: &str) -> Result<String, Error> {
        let fs_path = std::path::Path::new(&path).canonicalize()?;

        let content = match fs::read_to_string(&fs_path) {
            Ok(c) => c,
            Err(err) => return Err(format!("failed to read file {}: {}", path, err).into()),
        };

        Ok(content)
    }
}
