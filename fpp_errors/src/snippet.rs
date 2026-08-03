use annotate_snippets::{Annotation, AnnotationKind, Element, Group, Snippet};
use fpp_core::{DiagnosticData, DiagnosticDataSnippet, DiagnosticMessageKind, Level};

fn diagnostic_level<'a>(level: Level) -> annotate_snippets::Level<'a> {
    match level {
        Level::Error => annotate_snippets::Level::ERROR,
        Level::Warning => annotate_snippets::Level::WARNING,
        Level::Note => annotate_snippets::Level::NOTE,
        Level::Help => annotate_snippets::Level::HELP,
        _ => annotate_snippets::Level::INFO,
    }
}

fn diagnostic_snippet_to_annotation<'a>(
    message: String,
    kind: AnnotationKind,
    snippet: &DiagnosticDataSnippet,
) -> Annotation<'a> {
    let mut annotation = kind
        .span((snippet.start as usize)..(snippet.end as usize))
        .label(message);

    for include_loc in &snippet.include_spans {
        annotation = annotation.label(format!(
            "included from {}:{}:{}",
            include_loc.uri,
            include_loc.line + 1,
            include_loc.column + 1
        ))
    }

    annotation
}

pub(crate) fn diagnostic_to_snippet_group(diagnostic: &'_ DiagnosticData) -> Group<'_> {
    let snippet = diagnostic.span.snippet();
    Group::with_level(diagnostic_level(diagnostic.level))
        .element(
            Snippet::source(snippet.file_content.clone())
                .line_start(snippet.line_offset + 1)
                .path(snippet.uri.clone())
                .annotation(diagnostic_snippet_to_annotation(
                    diagnostic.message.clone(),
                    AnnotationKind::Primary,
                    &snippet,
                )),
        )
        .elements(diagnostic.children.iter().map(|child| {
            match &child.span {
                None => Element::Message(
                    (match child.kind {
                        DiagnosticMessageKind::Primary => diagnostic_level(diagnostic.level),
                        DiagnosticMessageKind::Note => diagnostic_level(Level::Note),
                    })
                    .message(child.message.clone()),
                ),
                Some(span) => {
                    let snippet = span.snippet();
                    Snippet::source(snippet.file_content.clone())
                        .line_start(snippet.line_offset + 1)
                        .path(snippet.uri.clone())
                        .annotation(diagnostic_snippet_to_annotation(
                            child.message.clone(),
                            match child.kind {
                                DiagnosticMessageKind::Primary => AnnotationKind::Primary,
                                DiagnosticMessageKind::Note => AnnotationKind::Context,
                            },
                            &snippet,
                        ))
                        .into()
                }
            }
        }))
}
