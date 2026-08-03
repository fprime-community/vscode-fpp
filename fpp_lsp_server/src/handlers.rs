use crate::global_state::{GlobalState, Task};
use crate::lsp;
use crate::lsp::utils::semantic_token_delta;
use crate::lsp_ext::UriRequest;
use crate::util::{
    completion_items_for_qual_ident, completion_items_in_name_group, hover_for_node,
    hover_for_symbol, node_to_location, nodes_at_offset, position_to_offset, symbol_at_position,
    symbol_to_completion_item,
};
use anyhow::Result;
use fpp_analysis::semantics::{NameGroup, SymbolInterface};
use fpp_ast::{AstNode, Node};
use fpp_core::{LineCol, LineIndex, SourceFile};
use fpp_lsp_parser::{
    SyntaxKind, SyntaxNode, SyntaxToken, TextRange, TokenAtOffset, VisitorResult,
};
use lsp_types::{
    CompletionItem, CompletionItemKind, CompletionParams, CompletionResponse,
    DidChangeTextDocumentParams, DidChangeWatchedFilesParams, DidCloseTextDocumentParams,
    DidOpenTextDocumentParams, DocumentDiagnosticReportResult, DocumentFormattingParams,
    DocumentLink, DocumentRangeFormattingParams, FileChangeType, GotoDefinitionParams,
    GotoDefinitionResponse, Hover, HoverParams, Location, Position, Range, ReferenceParams,
    SemanticTokensFullDeltaResult, SemanticTokensRangeResult, SemanticTokensResult, TextEdit, Uri,
};
use serde::{Deserialize, Serialize};
use std::str::FromStr;

pub fn handle_did_open_text_document(
    state: &mut GlobalState,
    not: DidOpenTextDocumentParams,
) -> Result<()> {
    let uri = not.text_document.uri.clone();
    state.vfs.did_open(not);
    state.task(Task::Update(uri));
    Ok(())
}

pub fn handle_did_change_text_document(
    state: &mut GlobalState,
    not: DidChangeTextDocumentParams,
) -> Result<()> {
    let uri = not.text_document.uri.clone();
    state
        .vfs
        .did_change(not, state.capabilities.negotiated_encoding());
    state.task(Task::Update(uri));
    Ok(())
}

pub fn handle_did_close_text_document(
    state: &mut GlobalState,
    not: DidCloseTextDocumentParams,
) -> Result<()> {
    let uri = not.text_document.uri.clone();

    state.semantic_tokens.remove(&not.text_document.uri);

    state.vfs.did_close(not);
    state.task(Task::Update(uri));

    Ok(())
}

pub fn handle_exit(state: &mut GlobalState, _: ()) -> Result<()> {
    state.shutdown_requested = true;
    Ok(())
}

pub fn handle_did_change_watched_file(
    state: &mut GlobalState,
    params: DidChangeWatchedFilesParams,
) -> Result<()> {
    for file in params.changes {
        match file.typ {
            FileChangeType::CHANGED => {
                // This just requires a VFS update
                if state.vfs.update_fs(file.uri.as_str())? {
                    state.task(Task::Update(file.uri));
                }
            }
            FileChangeType::CREATED => {
                // TODO(tumbar)
            }
            FileChangeType::DELETED => {
                // TODO(tumbar)
            }
            t => {
                tracing::warn!(file_change_type = ?t, "dropping invalid file event type");
            }
        }
    }

    Ok(())
}

pub fn handle_dump_syntax_tree(state: &mut GlobalState, param: UriRequest) -> Result<()> {
    let (_, source_file, parse) = parse_text_document(state, &param.uri)?;

    let parse_kind = source_file
        .and_then(|f| state.analysis.include_context_map.get(&f).cloned())
        .unwrap_or(fpp_parser::IncludeParentKind::Module);

    let entry_kind = match parse_kind {
        fpp_parser::IncludeParentKind::Component => fpp_lsp_parser::TopEntryPoint::Component,
        fpp_parser::IncludeParentKind::Module => fpp_lsp_parser::TopEntryPoint::Module,
        fpp_parser::IncludeParentKind::TlmPacket => fpp_lsp_parser::TopEntryPoint::TlmPacket,
        fpp_parser::IncludeParentKind::TlmPacketSet => fpp_lsp_parser::TopEntryPoint::TlmPacketSet,
        fpp_parser::IncludeParentKind::Topology => fpp_lsp_parser::TopEntryPoint::Topology,
    };

    eprintln!(
        "CST {}: entry {entry_kind:?}, source_file: {source_file:?}",
        param.uri.as_str()
    );
    eprintln!("{}", parse.debug_dump());

    Ok(())
}

fn parse_text_document(
    state: &GlobalState,
    uri: &Uri,
) -> Result<(String, Option<SourceFile>, fpp_lsp_parser::Parse)> {
    let text: String = state.vfs.read_sync(uri.as_str())?;

    let source_file = state
        .files
        .get(uri.as_str())
        .and_then(|files| files.first().cloned());

    let parse_kind = source_file
        .and_then(|f| state.analysis.include_context_map.get(&f).cloned())
        .unwrap_or(fpp_parser::IncludeParentKind::Module);

    let entry_kind = match parse_kind {
        fpp_parser::IncludeParentKind::Component => fpp_lsp_parser::TopEntryPoint::Component,
        fpp_parser::IncludeParentKind::Module => fpp_lsp_parser::TopEntryPoint::Module,
        fpp_parser::IncludeParentKind::TlmPacket => fpp_lsp_parser::TopEntryPoint::TlmPacket,
        fpp_parser::IncludeParentKind::TlmPacketSet => fpp_lsp_parser::TopEntryPoint::TlmPacketSet,
        fpp_parser::IncludeParentKind::Topology => fpp_lsp_parser::TopEntryPoint::Topology,
    };

    let parse = fpp_lsp_parser::parse(&text, entry_kind);
    Ok((text, source_file, parse))
}

pub fn handle_semantic_tokens_full(
    state: &mut GlobalState,
    request: lsp_types::SemanticTokensParams,
) -> Result<Option<SemanticTokensResult>> {
    let (text, src, parse) = parse_text_document(state, &request.text_document.uri)?;
    let semantic_tokens = lsp::semantic_tokens::compute(state, src, &text, &parse).finish(None);

    // Unconditionally cache the tokens
    state
        .semantic_tokens
        .insert(request.text_document.uri, semantic_tokens.clone());

    Ok(Some(semantic_tokens.into()))
}

pub fn handle_semantic_tokens_range(
    state: &GlobalState,
    request: lsp_types::SemanticTokensRangeParams,
) -> Result<Option<SemanticTokensRangeResult>> {
    let (text, src, parse) = parse_text_document(state, &request.text_document.uri)?;

    Ok(Some(SemanticTokensRangeResult::Tokens(
        lsp::semantic_tokens::compute(state, src, &text, &parse).finish(Some(request.range)),
    )))
}

pub fn handle_semantic_tokens_full_delta(
    state: &mut GlobalState,
    request: lsp_types::SemanticTokensDeltaParams,
) -> Result<Option<SemanticTokensFullDeltaResult>> {
    let (text, src, parse) = parse_text_document(state, &request.text_document.uri)?;

    let semantic_tokens = lsp::semantic_tokens::compute(state, src, &text, &parse).finish(None);

    let cached_tokens = state.semantic_tokens.remove(&request.text_document.uri);

    if let Some(
        cached_tokens @ lsp_types::SemanticTokens {
            result_id: Some(prev_id),
            ..
        },
    ) = &cached_tokens
        && *prev_id == request.previous_result_id
    {
        let delta = semantic_token_delta(cached_tokens, &semantic_tokens);
        state
            .semantic_tokens
            .insert(request.text_document.uri, semantic_tokens);
        return Ok(Some(delta.into()));
    }

    // Clone first to keep the lock short
    let semantic_tokens_clone = semantic_tokens.clone();
    state
        .semantic_tokens
        .insert(request.text_document.uri, semantic_tokens_clone);

    Ok(Some(semantic_tokens.into()))
}

pub fn handle_document_diagnostics(
    state: &mut GlobalState,
    request: lsp_types::DocumentDiagnosticParams,
) -> Result<DocumentDiagnosticReportResult> {
    Ok(DocumentDiagnosticReportResult::Report(
        lsp_types::DocumentDiagnosticReport::Full(lsp_types::RelatedFullDocumentDiagnosticReport {
            full_document_diagnostic_report: lsp_types::FullDocumentDiagnosticReport {
                items: state.diagnostics.get(request.text_document.uri.as_str()),
                ..Default::default()
            },
            ..Default::default()
        }),
    ))
}

fn text_range_to_range(lines: &LineIndex, text_range: TextRange) -> Range {
    let start = lines.line_col(text_range.start());
    let end = lines.line_col(text_range.end());

    Range {
        start: Position {
            line: start.line,
            character: start.col,
        },
        end: Position {
            line: end.line,
            character: end.col,
        },
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct DocumentLinkData {
    pub origin_uri: Uri,
    pub relative_path: String,
}

struct DocumentLinksVisitor<'a> {
    uri: Uri,
    lines: &'a LineIndex,
    text: &'a str,
}
impl<'a> fpp_lsp_parser::Visitor for DocumentLinksVisitor<'a> {
    type State = Vec<DocumentLink>;

    fn visit_node(&self, state: &mut Self::State, node: &SyntaxNode) -> VisitorResult {
        match node.kind() {
            SyntaxKind::ROOT => VisitorResult::Recurse,
            SyntaxKind::DEF_MODULE => VisitorResult::Recurse,
            SyntaxKind::MODULE_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::DEF_COMPONENT => VisitorResult::Recurse,
            SyntaxKind::COMPONENT_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::DEF_STATE_MACHINE => VisitorResult::Recurse,
            SyntaxKind::STATE_MACHINE_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::DEF_STATE => VisitorResult::Recurse,
            SyntaxKind::STATE_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::DEF_TOPOLOGY => VisitorResult::Recurse,
            SyntaxKind::TOPOLOGY_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::TLM_PACKET_SET => VisitorResult::Recurse,
            SyntaxKind::TLM_PACKET_SET_MEMBER_LIST => VisitorResult::Recurse,
            SyntaxKind::SPEC_TLM_PACKET => VisitorResult::Recurse,
            SyntaxKind::TLM_PACKET_MEMBER_LIST => VisitorResult::Recurse,

            SyntaxKind::SPEC_INCLUDE => {
                // Get the string literal noting the file to include
                match node.first_child_or_token_by_kind(&|t| t == SyntaxKind::LITERAL_STRING) {
                    None => {}
                    Some(file) => {
                        // This token is either "file.fppi" or """file.fppi"""
                        // We need to strip off the quotes
                        let file_include = {
                            let file_include_text = &self.text[file.text_range()];
                            if let Some(inner) = file_include_text.strip_prefix("\"\"\"") {
                                // Triple-quoted string; strip the matching suffix if present,
                                // otherwise fall back to the off-nominal remainder.
                                inner.strip_suffix("\"\"\"").unwrap_or(inner)
                            } else {
                                &file_include_text[1..file_include_text.len() - 1]
                            }
                        };

                        let link = DocumentLink {
                            range: text_range_to_range(self.lines, file.text_range()),
                            target: None,
                            tooltip: None,
                            data: Some(
                                serde_json::to_value(DocumentLinkData {
                                    origin_uri: self.uri.clone(),
                                    relative_path: file_include.to_string(),
                                })
                                .unwrap(),
                            ),
                        };

                        state.push(link);
                    }
                }

                VisitorResult::Next
            }

            _ => VisitorResult::Next,
        }
    }

    fn visit_token(&self, _: &mut Self::State, _: &SyntaxToken) {}
}

pub fn handle_document_link_request(
    state: &GlobalState,
    request: lsp_types::DocumentLinkParams,
) -> Result<Option<Vec<DocumentLink>>> {
    let (text, _, parse) = parse_text_document(state, &request.text_document.uri)?;
    let lines = state.vfs.get_lines(request.text_document.uri.as_str())?;

    let mut links = vec![];
    parse.visit(
        &mut links,
        &DocumentLinksVisitor {
            uri: request.text_document.uri.clone(),
            lines: &lines,
            text: &text,
        },
    );
    if links.is_empty() {
        Ok(None)
    } else {
        Ok(Some(links))
    }
}

pub fn handle_document_link_resolve(
    state: &GlobalState,
    request: DocumentLink,
) -> Result<DocumentLink> {
    let data: DocumentLinkData = match request.data {
        None => return Err(anyhow::anyhow!("Document link has no data to resolve")),
        Some(data) => serde_json::from_value(data)?,
    };

    let resolved = state
        .vfs
        .resolve_uri_relative_path(data.origin_uri.as_str(), &data.relative_path)?;
    Ok(DocumentLink {
        range: request.range,
        target: Some(Uri::from_str(&resolved)?),
        tooltip: None,
        data: None,
    })
}

pub fn handle_goto_definition(
    state: &GlobalState,
    request: GotoDefinitionParams,
) -> Result<Option<GotoDefinitionResponse>> {
    let offset = position_to_offset(
        state,
        &request.text_document_position_params.text_document.uri,
        &request.text_document_position_params.position,
    );

    if let Some((_, symbol)) = symbol_at_position(
        state,
        &request.text_document_position_params.text_document.uri,
        offset,
    ) {
        Ok(Some(GotoDefinitionResponse::Scalar(node_to_location(
            state,
            symbol.name().id(),
        ))))
    } else {
        Ok(None)
    }
}

pub fn handle_hover(state: &GlobalState, request: HoverParams) -> Result<Option<Hover>> {
    let offset = position_to_offset(
        state,
        &request.text_document_position_params.text_document.uri,
        &request.text_document_position_params.position,
    );

    let nodes = match nodes_at_offset(
        state,
        &request.text_document_position_params.text_document.uri,
        offset,
    ) {
        None => return Ok(None),
        Some(nodes) => nodes,
    };

    // Check if this node is a use/reference to definition
    if let Some((node, symbol)) = nodes.iter().find_map(|node| {
        state
            .analysis
            .use_def_map
            .get(&node.id())
            .map(|def| (*node, def))
    }) {
        return Ok(Some(hover_for_symbol(state, node, symbol)));
    }

    // This is not a use/reference to another definition
    // From here on in we should only show hover information for definitions if we are hovering over
    // the definition's name
    if let Some(Node::Name(name)) = nodes.first() {
        // We are hovering over a name
        Ok(nodes
            .iter()
            .find_map(|node| hover_for_node(state, name, *node)))
    } else {
        Ok(None)
    }
}

pub fn handle_references(
    state: &GlobalState,
    request: ReferenceParams,
) -> Result<Option<Vec<Location>>> {
    let offset = position_to_offset(
        state,
        &request.text_document_position.text_document.uri,
        &request.text_document_position.position,
    );

    if let Some(nodes) = nodes_at_offset(
        state,
        &request.text_document_position.text_document.uri,
        offset,
    ) {
        let symbol = {
            // Check if this is a use to a symbol
            if let Some(symbol) = nodes
                .iter()
                .find_map(|node| state.analysis.use_def_map.get(&node.id()))
            {
                Some(symbol)
            // Check if this is a symbol definition
            } else if let Some(symbol) = nodes
                .iter()
                .find_map(|node| state.analysis.symbol_map.get(&node.id()))
                && let Some(Node::Name(_)) = nodes.first()
            {
                Some(symbol)
            } else {
                None
            }
        };

        if let Some(symbol) = symbol {
            // Look for all use-def resolutions that map to this symbol
            Ok(Some(
                state
                    .analysis
                    .use_def_map
                    .iter()
                    .filter_map(|(node, i_symbol)| {
                        if symbol.node() == i_symbol.node() {
                            Some(node_to_location(state, *node))
                        } else {
                            None
                        }
                    })
                    .collect(),
            ))
        } else {
            Ok(None)
        }
    } else {
        Ok(None)
    }
}

pub fn handle_completion(
    state: &GlobalState,
    request: CompletionParams,
) -> Result<Option<CompletionResponse>> {
    let uri = request.text_document_position.text_document.uri;

    let text: String = state.vfs.read_sync(uri.as_str())?;
    let lines = state.vfs.get_lines(uri.as_str())?;

    let cursor_pos = match lines.offset(LineCol {
        line: request.text_document_position.position.line,
        col: request.text_document_position.position.character,
    }) {
        None => return Err(anyhow::anyhow!("position not in file bounds")),
        Some(p) => p,
    };

    let parse_kind = match state.files.get(uri.as_str()) {
        None => fpp_parser::IncludeParentKind::Module,
        Some(source_files) => {
            // This file may have been included in multiple spots
            // We should choose the most 'permissive' syntax entry point
            source_files
                .iter()
                .map(|f| match state.analysis.include_context_map.get(f) {
                    Some(kind) => *kind,
                    None => fpp_parser::IncludeParentKind::Module,
                })
                .max()
                .unwrap_or(fpp_parser::IncludeParentKind::Module)
        }
    };

    let entry_kind = match parse_kind {
        fpp_parser::IncludeParentKind::Component => fpp_lsp_parser::TopEntryPoint::Component,
        fpp_parser::IncludeParentKind::Module => fpp_lsp_parser::TopEntryPoint::Module,
        fpp_parser::IncludeParentKind::TlmPacket => fpp_lsp_parser::TopEntryPoint::TlmPacket,
        fpp_parser::IncludeParentKind::TlmPacketSet => fpp_lsp_parser::TopEntryPoint::TlmPacketSet,
        fpp_parser::IncludeParentKind::Topology => fpp_lsp_parser::TopEntryPoint::Topology,
    };

    let parse = fpp_lsp_parser::parse(&text, entry_kind);

    fn non_white_space_left(mut l: SyntaxToken) -> SyntaxToken {
        loop {
            match l.kind() {
                SyntaxKind::EOL
                | SyntaxKind::COMMENT
                | SyntaxKind::WHITESPACE
                | SyntaxKind::PRE_ANNOTATION
                | SyntaxKind::POST_ANNOTATION => {
                    l = match l.prev_token() {
                        Some(ll) => ll,
                        None => return l,
                    };
                }
                _ => return l,
            }
        }
    }

    fn non_white_space_right(mut r: SyntaxToken) -> SyntaxToken {
        loop {
            match r.kind() {
                SyntaxKind::EOL
                | SyntaxKind::COMMENT
                | SyntaxKind::WHITESPACE
                | SyntaxKind::PRE_ANNOTATION
                | SyntaxKind::POST_ANNOTATION => {
                    r = match r.next_token() {
                        Some(ll) => ll,
                        None => return r,
                    };
                }
                _ => return r,
            }
        }
    }

    let cursor_token = parse.syntax_node().token_at_offset(cursor_pos);
    let expected_error_range = match &cursor_token {
        TokenAtOffset::None => return Ok(None),
        TokenAtOffset::Single(tok) => non_white_space_left(tok.clone())
            .text_range()
            .cover(non_white_space_right(tok.clone()).text_range()),
        TokenAtOffset::Between(l, r) => non_white_space_left(l.clone())
            .text_range()
            .cover(non_white_space_right(r.clone()).text_range()),
    };

    let left_token = match &cursor_token {
        TokenAtOffset::None => unreachable!(),
        TokenAtOffset::Single(tok) => non_white_space_left(tok.clone()),
        TokenAtOffset::Between(l, _) => non_white_space_left(l.clone()),
    };

    if left_token.kind() == SyntaxKind::DOT
        && let Some(qual_ident) = left_token
            .parent_ancestors()
            .find(|s| s.kind() == SyntaxKind::QUAL_IDENT)
    {
        // Complete member selection on qualified identifiers

        let parent_rule = match qual_ident.parent() {
            None => return Ok(None),
            Some(r) => r,
        };

        let ng = match parent_rule.kind() {
            SyntaxKind::DEF_COMPONENT_INSTANCE => NameGroup::Component,
            SyntaxKind::IMPLEMENTS_CLAUSE => NameGroup::PortInterface,
            SyntaxKind::SPEC_CONNECTION_GRAPH_PATTERN => NameGroup::PortInterfaceInstance,
            SyntaxKind::PATTERN_TARGET_MEMBER_LIST => NameGroup::PortInterfaceInstance,
            SyntaxKind::SPEC_INTERFACE_IMPORT => NameGroup::PortInterface,
            SyntaxKind::SPEC_INSTANCE => NameGroup::PortInterfaceInstance,
            SyntaxKind::SPEC_LOC => return Ok(None),
            SyntaxKind::SPEC_PORT_INSTANCE_GENERAL => NameGroup::Port,
            SyntaxKind::SPEC_STATE_MACHINE_INSTANCE => NameGroup::StateMachine,
            SyntaxKind::TRANSITION_EXPR => return Ok(None),
            SyntaxKind::TYPE_NAME => NameGroup::Type,
            _ => return Ok(None),
        };

        let tokens: Vec<SyntaxToken> = qual_ident
            .descendants_with_tokens()
            .filter_map(|s| s.as_token().cloned())
            .filter(|t| t.kind() == SyntaxKind::IDENT && t.text_range().end() <= cursor_pos)
            .collect();

        // Get the final token before the cursor to look it up in the AST
        let last_token_pos = tokens.last().unwrap().text_range().start().into();

        // Look up the symbol before the cursor
        Ok(symbol_at_position(state, &uri, last_token_pos)
            .and_then(|(_, symbol)| state.analysis.symbol_scope_map.get(&symbol))
            .map(|scope| {
                // Get all symbols under this symbol's scope in the proper
                // name group
                scope
                    .get_group(ng)
                    .iter()
                    .map(|(_, child_symbol)| symbol_to_completion_item(state, child_symbol))
            })
            .map(|s| CompletionResponse::Array(s.collect())))
    } else if left_token.kind() == SyntaxKind::DOT
        && let Some(postfix_expr) = left_token
            .parent_ancestors()
            .find(|s| s.kind() == SyntaxKind::EXPR_POSTFIX)
    {
        // Member selection on expressions
        eprintln!("postfix_expr member selection");
        eprintln!("{:#?}", postfix_expr);
        Ok(None)
    } else {
        // Check for parsing errors to extract the next expected token
        Ok(Some(CompletionResponse::Array(
            parse
                .errors()
                .iter()
                .filter_map(|e| {
                    if expected_error_range.intersect(e.range()).is_some()
                        && let Some(expected_kind) = e.expected()
                    {
                        match expected_kind {
                            keyword if keyword.is_keyword() => {
                                // FIXME(tumbar) This seems brittle but works ok for now
                                let keyword_dbg = format!("{:?}", keyword);
                                assert!(keyword_dbg.ends_with("_KW"));
                                let keyword_s =
                                    keyword_dbg[..keyword_dbg.len() - 3].to_ascii_lowercase();

                                Some(vec![CompletionItem {
                                    label: keyword_s,
                                    kind: Some(CompletionItemKind::KEYWORD),
                                    ..Default::default()
                                }])
                            }
                            SyntaxKind::QUAL_IDENT => {
                                let element = parse
                                    .syntax_node()
                                    .covering_element(TextRange::new(cursor_pos, cursor_pos));

                                if let Some(ng) = element.ancestors().find_map(|n| match n.kind() {
                                    SyntaxKind::DEF_COMPONENT_INSTANCE => {
                                        Some(NameGroup::Component)
                                    }
                                    SyntaxKind::IMPLEMENTS_CLAUSE => Some(NameGroup::PortInterface),
                                    SyntaxKind::SPEC_CONNECTION_GRAPH_PATTERN => {
                                        Some(NameGroup::PortInterfaceInstance)
                                    }
                                    SyntaxKind::PATTERN_TARGET_MEMBER_LIST => {
                                        Some(NameGroup::PortInterfaceInstance)
                                    }
                                    SyntaxKind::SPEC_INTERFACE_IMPORT => {
                                        Some(NameGroup::PortInterface)
                                    }
                                    SyntaxKind::SPEC_INSTANCE => {
                                        Some(NameGroup::PortInterfaceInstance)
                                    }
                                    SyntaxKind::SPEC_PORT_INSTANCE_GENERAL => Some(NameGroup::Port),
                                    SyntaxKind::SPEC_STATE_MACHINE_INSTANCE => {
                                        Some(NameGroup::StateMachine)
                                    }
                                    SyntaxKind::TYPE_NAME => Some(NameGroup::Type),
                                    _ => None,
                                }) {
                                    completion_items_in_name_group(state, cursor_pos, ng, &uri)
                                } else {
                                    None
                                }
                            }
                            SyntaxKind::TYPE_NAME => {
                                let element = parse
                                    .syntax_node()
                                    .covering_element(TextRange::new(cursor_pos, cursor_pos));

                                let symbol_completions = completion_items_for_qual_ident(
                                    state,
                                    element,
                                    cursor_pos,
                                    NameGroup::Type,
                                    &uri,
                                )
                                .unwrap_or_default();

                                let keyword_completions: Vec<CompletionItem> = vec![
                                    "U8", "I8", "U16", "I16", "U32", "I32", "U64", "I64", "string",
                                    "bool",
                                ]
                                .into_iter()
                                .map(|kw| CompletionItem {
                                    label: kw.to_string(),
                                    kind: Some(CompletionItemKind::CLASS),
                                    ..Default::default()
                                })
                                .collect();

                                Some(
                                    keyword_completions
                                        .into_iter()
                                        .chain(symbol_completions)
                                        .collect(),
                                )
                            }
                            SyntaxKind::EXPR => {
                                let element = parse
                                    .syntax_node()
                                    .covering_element(TextRange::new(cursor_pos, cursor_pos));

                                completion_items_for_qual_ident(
                                    state,
                                    element,
                                    cursor_pos,
                                    NameGroup::Value,
                                    &uri,
                                )
                            }
                            _ => None,
                        }
                    } else {
                        None
                    }
                })
                .flatten()
                .collect(),
        )))
    }
}

pub fn handle_formatting(
    state: &GlobalState,
    request: DocumentFormattingParams,
) -> Result<Option<Vec<TextEdit>>> {
    let lines = state.vfs.get_lines(request.text_document.uri.as_str())?;
    let (original, _, parse) = parse_text_document(state, &request.text_document.uri)?;

    if !parse.errors().is_empty() {
        tracing::warn!("Cannot format with parse errors: {:?}", parse.errors());
        return Ok(None);
    }

    // Format the entire document
    let syntax = parse.syntax_node();
    let text = fpp_format::Formatter::new(fpp_format::FormatOptions::default()).format(&syntax);

    // Replace the range spanning the entire *original* document. The range must
    // be derived from the original length, not the formatted length, otherwise
    // a shorter result leaves trailing original bytes (e.g. a stray `}`) behind.
    let orig_len = fpp_lsp_parser::TextSize::from(original.len() as u32);
    let text_range = fpp_lsp_parser::TextRange::new(0.into(), orig_len);
    let range = text_range_to_range(&lines, text_range);

    Ok(Some(vec![TextEdit {
        range,
        new_text: text,
    }]))
}

pub fn handle_range_formatting(
    state: &GlobalState,
    request: DocumentRangeFormattingParams,
) -> Result<Option<Vec<TextEdit>>> {
    // For initial implementation, format the entire document
    // Future optimization: extract and format only the specified range
    let lines = state.vfs.get_lines(request.text_document.uri.as_str())?;
    let (original, _, parse) = parse_text_document(state, &request.text_document.uri)?;

    if !parse.errors().is_empty() {
        tracing::warn!("Cannot format with parse errors: {:?}", parse.errors());
        return Ok(None);
    }

    // Format the entire document
    let syntax = parse.syntax_node();
    let text = fpp_format::Formatter::new(fpp_format::FormatOptions::default()).format(&syntax);

    // Replace the range spanning the entire *original* document. The range must
    // be derived from the original length, not the formatted length, otherwise
    // a shorter result leaves trailing original bytes (e.g. a stray `}`) behind.
    let orig_len = fpp_lsp_parser::TextSize::from(original.len() as u32);
    let text_range = fpp_lsp_parser::TextRange::new(0.into(), orig_len);
    let range = text_range_to_range(&lines, text_range);

    Ok(Some(vec![TextEdit {
        range,
        new_text: text,
    }]))
}
