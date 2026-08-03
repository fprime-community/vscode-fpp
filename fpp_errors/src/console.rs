use crate::snippet::diagnostic_to_snippet_group;
use annotate_snippets::Renderer;
use annotate_snippets::renderer::DecorStyle;
use fpp_core::{DiagnosticData, Level};

pub struct ConsoleEmitter {
    renderer: Renderer,
    seen_errors: bool,
}

impl ConsoleEmitter {
    pub fn color() -> ConsoleEmitter {
        ConsoleEmitter {
            renderer: Renderer::styled().decor_style(DecorStyle::Ascii),
            seen_errors: false,
        }
    }

    pub fn plain() -> ConsoleEmitter {
        ConsoleEmitter {
            renderer: Renderer::plain().decor_style(DecorStyle::Ascii),
            seen_errors: false,
        }
    }

    pub fn has_errors(&self) -> bool {
        self.seen_errors
    }
}

impl fpp_core::DiagnosticEmitter for &mut ConsoleEmitter {
    fn emit(&mut self, diagnostic: DiagnosticData) {
        if diagnostic.level == Level::Error {
            self.seen_errors = true;
        }

        let group = diagnostic_to_snippet_group(&diagnostic);
        anstream::println!("{}\n", self.renderer.render(&[group]));
    }
}
