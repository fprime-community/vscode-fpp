use crate::diagnostics::LspDiagnosticsEmitter;
use crate::global_state::GlobalState;
use fpp_analysis::semantics::{NameGroup, Symbol, SymbolInterface, Type};
use fpp_ast::{AstNode, FormalParam, FormalParamKind, MoveWalkable, Name, Node, Visitor};
use fpp_core::{BytePos, CompilerContext, LineCol, SourceFile};
use fpp_lsp_parser::{SyntaxElement, SyntaxKind, SyntaxNode, SyntaxToken, TextSize};
use lsp_types::{
    CompletionItem, CompletionItemKind, CompletionItemLabelDetails, Documentation, Hover,
    HoverContents, Location, MarkupContent, MarkupKind, Position, Range, Uri,
};
use serde::de::DeserializeOwned;
use std::ops::{ControlFlow, Deref};
use std::str::FromStr;

pub fn from_json<T: DeserializeOwned>(
    what: &'static str,
    json: &serde_json::Value,
) -> anyhow::Result<T> {
    serde_json::from_value(json.clone())
        .map_err(|e| anyhow::format_err!("Failed to deserialize {what}: {e}; {json}"))
}

pub(crate) struct FindPositionVisitor<'a> {
    source_file: SourceFile,
    looking_for: BytePos,
    context: &'a CompilerContext<LspDiagnosticsEmitter>,
}

impl<'ast> Visitor<'ast> for FindPositionVisitor<'ast> {
    type Break = ();
    type State = Vec<Node<'ast>>;

    /// The default node visiting before.
    /// By default, this will just continue without visiting the children of `node`
    fn super_visit(&self, a: &mut Self::State, node: Node<'ast>) -> ControlFlow<Self::Break> {
        let span = self
            .context
            .span_get(&self.context.node_get_span(&node.id()));

        let src_file: SourceFile = span.file.upgrade().unwrap().as_ref().into();

        if src_file == self.source_file {
            // Check if this node spans the range we are looking for
            if span.start <= self.looking_for && span.start + span.length >= self.looking_for {
                // Depth first
                let out = node.walk(a, self);

                a.push(node);
                out
            } else {
                // This node does not span the range
                // We don't need to walk it since it's children won't span it either
                ControlFlow::Continue(())
            }
        } else {
            // The files don't match
            // We could be looking for something inside an include
            // Keep recursing
            match node {
                Node::DefAction(_) => node.walk(a, self),
                Node::DefComponent(_) => node.walk(a, self),
                Node::DefModule(_) => node.walk(a, self),
                Node::DefState(_) => node.walk(a, self),
                Node::DefStateMachine(_) => node.walk(a, self),
                Node::DefTopology(_) => node.walk(a, self),
                Node::SpecInclude(_) => node.walk(a, self),
                _ => ControlFlow::Continue(()),
            }
        }
    }
}

pub fn nodes_at_offset<'a>(
    state: &'a GlobalState,
    document: &Uri,
    offset: BytePos,
) -> Option<Vec<Node<'a>>> {
    let files = state.files.get(document.as_str())?;

    Some(
        files
            .iter()
            .flat_map(|file| {
                let cache = state.cache.get(&state.parent_file(*file)).unwrap();

                let visitor = FindPositionVisitor {
                    source_file: *file,
                    looking_for: offset,
                    context: &state.context,
                };

                let mut out = vec![];
                let _ = visitor.visit_trans_unit(&mut out, &cache.ast);
                out
            })
            .collect(),
    )
}

#[inline]
pub fn position_to_offset(state: &GlobalState, document: &Uri, position: &Position) -> BytePos {
    state
        .vfs
        .get_lines(document.as_str())
        .unwrap()
        .offset(LineCol {
            line: position.line,
            col: position.character,
        })
        .unwrap()
        .into()
}

pub(crate) fn symbol_at_position<'a>(
    state: &'a GlobalState,
    document: &Uri,
    position: BytePos,
) -> Option<(Node<'a>, Symbol)> {
    let nodes = nodes_at_offset(state, document, position)?;

    nodes.iter().find_map(|node| {
        state
            .analysis
            .use_def_map
            .get(&node.id())
            .map(|def| (*node, def.clone()))
    })
}

fn node_to_range(state: &GlobalState, node: fpp_core::Node) -> Range {
    let span = state.context.span_get(&state.context.node_get_span(&node));
    let file = span.file.upgrade().unwrap();

    let start = file.position(span.start);
    let end = file.position(span.start + span.length);

    Range {
        start: Position {
            line: start.line(),
            character: start.column(),
        },
        end: Position {
            line: end.line(),
            character: end.column(),
        },
    }
}

pub fn node_to_location(state: &GlobalState, node: fpp_core::Node) -> Location {
    let span = state.context.span_get(&state.context.node_get_span(&node));
    let file = span.file.upgrade().unwrap();

    let start = file.position(span.start);
    let end = file.position(span.start + span.length);

    Location {
        uri: Uri::from_str(&file.uri).unwrap(),
        range: Range {
            start: Position {
                line: start.line(),
                character: start.column(),
            },
            end: Position {
                line: end.line(),
                character: end.column(),
            },
        },
    }
}

fn symbol_kind_name(symbol: &Symbol) -> &'static str {
    match symbol {
        Symbol::AbsType(_) => "Abstract Type",
        Symbol::AliasType(_) => "Type Alias",
        Symbol::Array(_) => "Array",
        Symbol::Component(_) => "Component",
        Symbol::ComponentInstance(_) => "Component Instance",
        Symbol::Constant(_) => "Constant",
        Symbol::Enum(_) => "Enum",
        Symbol::EnumConstant(_) => "Enum Constant",
        Symbol::Interface(_) => "Interface",
        Symbol::Module(_) => "Module",
        Symbol::Port(_) => "Port",
        Symbol::StateMachine(_) => "State Machine",
        Symbol::Struct(_) => "Struct",
        Symbol::Topology(_) => "Topology",
    }
}

pub fn hover_for_symbol(state: &GlobalState, hover_node: Node, symbol: &Symbol) -> Hover {
    let node_data = state.context.node_get(&symbol.node());
    let symbol_kind = symbol_kind_name(symbol);

    // Convert the name into a fully qualified name by following the parent symbols
    let mut qualified_name = vec![symbol];
    let mut current = symbol;
    loop {
        match state.analysis.parent_symbol_map.get(current) {
            None => break,
            Some(parent) => {
                qualified_name.push(parent);
                current = parent;
            }
        }
    }

    qualified_name.reverse();
    let qualified_idents: Vec<&str> = qualified_name
        .into_iter()
        .map(|n| n.name().data.as_str())
        .collect();
    let qual_ident = qualified_idents.join(".");

    let symbol_kind_line = state.analysis.value_map.get(&symbol.node()).map_or_else(
        || format!("({symbol_kind}) {qual_ident}"),
        |v| format!("({symbol_kind}) {qual_ident} = {v}"),
    );

    let markdown_lines: Vec<String> = node_data
        .pre_annotation
        .clone()
        .into_iter()
        .chain(vec!["".to_string(), symbol_kind_line, "".to_string()])
        .chain(node_data.post_annotation.clone())
        .collect();

    Hover {
        contents: HoverContents::Markup(MarkupContent {
            kind: MarkupKind::Markdown,
            value: markdown_lines.join("\n").trim().to_string(),
        }),
        range: Some(node_to_range(state, hover_node.id())),
    }
}

pub fn hover_for_node(state: &GlobalState, hover_node: &Name, def_node: Node) -> Option<Hover> {
    let symbol_kind = match def_node {
        Node::DefAbsType(_) => "Abstract Type",
        Node::DefAliasType(_) => "Type Alias",
        Node::DefArray(_) => "Array",
        Node::DefComponent(_) => "Component",
        Node::DefComponentInstance(_) => "Component Instance",
        Node::DefConstant(_) => "Constant",
        Node::DefEnum(_) => "Enum",
        Node::DefEnumConstant(_) => "Enum Constant",
        Node::DefInterface(_) => "Interface",
        Node::DefModule(_) => "Module",
        Node::DefPort(_) => "Port",
        Node::DefStateMachine(_) => "State Machine",
        Node::DefStruct(_) => "Struct",
        Node::DefTopology(_) => "Topology",
        Node::DefChoice(_) => "Choice",
        Node::DefGuard(_) => "Guard",
        Node::DefSignal(_) => "Signal",
        Node::DefState(_) => "State",
        Node::SpecCommand(_) => "Command",
        Node::SpecDirectConnectionGraph(_) => "Direct Connection Graph",
        Node::SpecPatternConnectionGraph(_) => "Pattern Connection Graph",
        Node::SpecContainer(_) => "Container",
        Node::SpecEvent(_) => "Event",
        Node::SpecGeneralPortInstance(_) => "Port Instance",
        Node::SpecParam(_) => "Parameter",
        Node::SpecRecord(_) => "Record",
        Node::SpecSpecialPortInstance(_) => "Special Port Instance",
        Node::SpecStateMachineInstance(_) => "State Machine Instance",
        Node::SpecTlmChannel(_) => "Telemetry Channel",
        Node::SpecTlmPacket(_) => "Telemetry Packet",
        Node::SpecTlmPacketSet(_) => "Telemetry Packet Set",
        Node::SpecTopPort(_) => "Topology Port",
        Node::FormalParam(_) => "Formal Parameter",
        _ => return None,
    };

    let node_data = state.context.node_get(&def_node.id());

    // Convert the name into a fully qualified name by following the parent symbols
    let qual_ident = {
        if let Some(symbol) = state.analysis.symbol_map.get(&def_node.id()) {
            let mut qualified_name = vec![symbol];
            let mut current = symbol;
            loop {
                match state.analysis.parent_symbol_map.get(current) {
                    None => break,
                    Some(parent) => {
                        qualified_name.push(parent);
                        current = parent;
                    }
                }
            }

            qualified_name.reverse();
            let qualified_idents: Vec<&str> = qualified_name
                .into_iter()
                .map(|n| n.name().data.as_str())
                .collect();

            qualified_idents.join(".")
        } else {
            hover_node.data.clone()
        }
    };

    let symbol_kind_line = format!("({symbol_kind}) {qual_ident}");

    let markdown_lines: Vec<String> = node_data
        .pre_annotation
        .clone()
        .into_iter()
        .chain(vec!["".to_string(), symbol_kind_line, "".to_string()])
        .chain(node_data.post_annotation.clone())
        .collect();

    Some(Hover {
        contents: HoverContents::Markup(MarkupContent {
            kind: MarkupKind::Markdown,
            value: markdown_lines.join("\n").trim().to_string(),
        }),
        range: Some(node_to_range(state, hover_node.id())),
    })
}

fn formal_param_to_string(state: &GlobalState, param: &FormalParam) -> String {
    let kind_s = match param.kind {
        FormalParamKind::Ref => "ref ",
        FormalParamKind::Value => "",
    };

    format!(
        "{kind_s}{}: {}",
        param.name.data,
        state
            .analysis
            .type_map
            .get(&param.type_name.node_id)
            .map_or_else(|| "???".to_string(), |ty| ty.to_string())
    )
}

pub fn symbol_to_completion_item(state: &GlobalState, symbol: &Symbol) -> CompletionItem {
    let symbol_kind = symbol_kind_name(symbol);
    let description = {
        let node = state.context.node_get(&symbol.node());
        if node.pre_annotation.is_empty() {
            None
        } else {
            Some(node.pre_annotation.join(" "))
        }
    };

    let kind = match symbol {
        Symbol::AbsType(_) => CompletionItemKind::CLASS,
        Symbol::AliasType(_) => CompletionItemKind::CLASS,
        Symbol::Array(_) => CompletionItemKind::CLASS,
        Symbol::Component(_) => CompletionItemKind::CLASS,
        Symbol::ComponentInstance(_) => CompletionItemKind::VARIABLE,
        Symbol::Constant(_) => CompletionItemKind::CONSTANT,
        Symbol::Enum(_) => CompletionItemKind::ENUM,
        Symbol::EnumConstant(_) => CompletionItemKind::ENUM_MEMBER,
        Symbol::Interface(_) => CompletionItemKind::INTERFACE,
        Symbol::Module(_) => CompletionItemKind::MODULE,
        Symbol::Port(_) => CompletionItemKind::CLASS,
        Symbol::StateMachine(_) => CompletionItemKind::CLASS,
        Symbol::Struct(_) => CompletionItemKind::STRUCT,
        Symbol::Topology(_) => CompletionItemKind::CLASS,
    };

    let detail = match symbol {
        Symbol::Struct(_)
        | Symbol::AbsType(_)
        | Symbol::AliasType(_)
        | Symbol::Array(_)
        | Symbol::Enum(_) => state
            .analysis
            .type_map
            .get(&symbol.node())
            .map(Type::underlying_type)
            .map(|ty| format!(" = {ty}")),
        Symbol::Port(port) => {
            let arg_fmt: Vec<String> = port
                .params
                .iter()
                .map(|prm| formal_param_to_string(state, prm))
                .collect();

            Some(format!("({})", arg_fmt.join(", ")))
        }
        Symbol::EnumConstant(_) | Symbol::Constant(_) => state
            .analysis
            .value_map
            .get(&symbol.node())
            .map(|value| format!(" = {value}")),

        // TODO(tumbar) Add some nice details about components and component instances
        Symbol::ComponentInstance(_) => None,
        Symbol::Component(_) => None,
        Symbol::Interface(_) => None,
        Symbol::Module(_) => None,
        Symbol::StateMachine(_) => None,
        Symbol::Topology(_) => None,
    };

    CompletionItem {
        label: symbol.name().data.clone(),
        kind: Some(kind),
        label_details: Some(CompletionItemLabelDetails {
            detail,
            description: None,
        }),
        detail: Some(symbol_kind.to_string()),
        documentation: description.map(|d| {
            Documentation::MarkupContent(MarkupContent {
                kind: MarkupKind::Markdown,
                value: d,
            })
        }),
        ..Default::default()
    }
}

pub(crate) struct GetScopeVisitor<'a> {
    source_file: SourceFile,
    looking_for: BytePos,
    context: &'a CompilerContext<LspDiagnosticsEmitter>,
}

impl<'ast> Visitor<'ast> for GetScopeVisitor<'ast> {
    type Break = Vec<Node<'ast>>;
    type State = ();

    /// The default node visiting before.
    /// By default, this will just continue without visiting the children of `node`
    fn super_visit(&self, a: &mut Self::State, node: Node<'ast>) -> ControlFlow<Self::Break> {
        let span = self
            .context
            .span_get(&self.context.node_get_span(&node.id()));

        let src_file: SourceFile = span.file.upgrade().unwrap().as_ref().into();

        match node {
            // Build up scopes for nodes that can have scopes
            Node::DefStateMachine(_)
            | Node::DefModule(_)
            | Node::DefComponent(_)
            | Node::DefEnum(_) => match node.walk(a, self) {
                ControlFlow::Continue(_) => {
                    if src_file == self.source_file
                        && span.start <= self.looking_for
                        && span.start + span.length >= self.looking_for
                    {
                        ControlFlow::Break(vec![node])
                    } else {
                        ControlFlow::Continue(())
                    }
                }
                ControlFlow::Break(mut sub) => {
                    sub.push(node);
                    ControlFlow::Break(sub)
                }
            },
            _ => {
                if src_file == self.source_file {
                    // Check if this node spans the range we are looking for
                    if span.start <= self.looking_for
                        && span.start + span.length >= self.looking_for
                    {
                        // We have reached a part of the AST that surrounds the position
                        // We are the deepest we can be in the scope list
                        ControlFlow::Break(vec![])
                    } else {
                        // This node does not span the range
                        // We don't need to walk it since it's children won't span it either
                        ControlFlow::Continue(())
                    }
                } else {
                    // The files don't match
                    // We could be looking for something inside an include
                    // Keep recursing
                    node.walk(a, self)
                }
            }
        }
    }
}

pub fn scope_at_offset<'a>(
    state: &'a GlobalState,
    document: &Uri,
    offset: BytePos,
) -> Option<Vec<Node<'a>>> {
    let files = state.files.get(document.as_str())?;

    files.first().and_then(|file| {
        let cache = state.cache.get(&state.parent_file(*file)).unwrap();

        let visitor = GetScopeVisitor {
            source_file: *file,
            looking_for: offset,
            context: &state.context,
        };

        visitor.visit_trans_unit(&mut (), &cache.ast).break_value()
    })
}

pub fn completion_items_in_name_group(
    state: &GlobalState,
    cursor_pos: TextSize,
    ng: NameGroup,
    uri: &Uri,
) -> Option<Vec<CompletionItem>> {
    // If this is first token which means we need to list the first level of all valid
    // symbols. Query the analysis to extract the current scope of the cursor.

    let current_scope: Vec<String> = scope_at_offset(state, uri, cursor_pos.into())
        .unwrap_or(vec![])
        .into_iter()
        .rev()
        .map(|n| match n {
            Node::DefComponent(n) => n.name.data.clone(),
            Node::DefEnum(n) => n.name.data.clone(),
            Node::DefModule(n) => n.name.data.clone(),
            Node::DefStateMachine(n) => n.name.data.clone(),
            _ => unreachable!(),
        })
        .collect();

    // Merge all symbols going up from each scope
    let items: Vec<Vec<CompletionItem>> = current_scope
        .iter()
        .fold(
            (
                vec![
                    state
                        .analysis
                        .global_scope
                        .get_group(ng)
                        .iter()
                        .map(|(_, s)| symbol_to_completion_item(state, s))
                        .collect(),
                ],
                Some(&state.analysis.global_scope),
            ),
            |(mut out, scope), scope_name| {
                if let Some(scope) = scope {
                    let new_scope = scope
                        .get(ng, scope_name)
                        .and_then(|symbol| state.analysis.symbol_scope_map.get(&symbol));

                    match new_scope {
                        None => {}
                        Some(s) => {
                            out.push(
                                s.get_group(ng)
                                    .iter()
                                    .map(|(_, s)| symbol_to_completion_item(state, s))
                                    .collect(),
                            );
                        }
                    }

                    (out, new_scope)
                } else {
                    (out, None)
                }
            },
        )
        .0;

    // The closest symbols should appear first
    // Flip the completion items and flatten everything
    Some(items.into_iter().rev().flatten().collect())
}

/// Complete member selection on a value expression such as `a.b.c.`.
///
/// The `postfix_expr` node covers the whole `EXPR_POSTFIX` up to (and
/// including) the trailing `.` at the cursor. The receiver — everything
/// before that dot — can resolve two different ways:
///
/// 1. A qualifier symbol (module / enum) reachable through the use-def map.
///    In that case we complete the symbols in its scope's [`NameGroup::Value`]
///    group (nested constants, enum constants, ...).
/// 2. A struct-typed value. In that case the expression has an entry in the
///    type map and we complete its struct member names.
pub fn completion_items_for_postfix_expr(
    state: &GlobalState,
    postfix_expr: &SyntaxNode,
    cursor_pos: TextSize,
    uri: &Uri,
) -> Option<Vec<CompletionItem>> {
    // Collect the identifier tokens making up the receiver expression
    // (everything before the trailing dot at the cursor).
    let tokens: Vec<SyntaxToken> = postfix_expr
        .descendants_with_tokens()
        .filter_map(|s| s.as_token().cloned())
        .filter(|t| t.kind() == SyntaxKind::IDENT && t.text_range().end() <= cursor_pos)
        .collect();

    // The receiver must end in an identifier for us to resolve it.
    let last_token_pos = tokens.last()?.text_range().start().into();

    // Case 1: the receiver resolves to a symbol that owns a scope
    // (e.g. `Svc.Fpy` -> a module, or an enum used as a qualifier).
    if let Some(items) = symbol_at_position(state, uri, last_token_pos)
        .and_then(|(_, symbol)| state.analysis.symbol_scope_map.get(&symbol))
        .map(|scope| {
            scope
                .get_group(NameGroup::Value)
                .iter()
                .map(|(_, child_symbol)| symbol_to_completion_item(state, child_symbol))
                .collect::<Vec<_>>()
        })
    {
        return Some(items);
    }

    // Case 2: the receiver is a struct-typed value expression. Find the AST
    // expression node covering the receiver and complete its struct members.
    let nodes = nodes_at_offset(state, uri, last_token_pos)?;
    let receiver_ty = nodes
        .iter()
        .find_map(|node| state.analysis.type_map.get(&node.id()))?;

    let underlying = Type::underlying_type(receiver_ty);
    let members = match underlying.deref() {
        Type::Struct(struct_ty) => &struct_ty.anon_struct.members,
        Type::AnonStruct(anon_struct) => &anon_struct.members,
        _ => return None,
    };

    let mut items: Vec<CompletionItem> = members
        .iter()
        .map(|(name, member_ty)| CompletionItem {
            label: name.clone(),
            kind: Some(CompletionItemKind::FIELD),
            label_details: Some(CompletionItemLabelDetails {
                detail: Some(format!(": {}", member_ty)),
                description: None,
            }),
            ..Default::default()
        })
        .collect();
    items.sort_by(|a, b| a.label.cmp(&b.label));
    Some(items)
}

pub fn completion_items_for_qual_ident(
    state: &GlobalState,
    qual_ident: SyntaxElement,
    cursor_pos: TextSize,
    ng: NameGroup,
    uri: &Uri,
) -> Option<Vec<CompletionItem>> {
    let tokens: Vec<SyntaxToken> = qual_ident
        .as_node()
        .map(|node| {
            node.descendants_with_tokens()
                .filter_map(|s| s.as_token().cloned())
                .filter(|t| t.kind() == SyntaxKind::IDENT && t.text_range().end() <= cursor_pos)
                .collect()
        })
        .unwrap_or(vec![]);

    if tokens.is_empty() {
        completion_items_in_name_group(state, cursor_pos, ng, uri)
    } else {
        // Get the final token before the cursor to look it up in the AST
        let last_token_pos = tokens.last().unwrap().text_range().start().into();

        // Look up the symbol before the cursor
        symbol_at_position(state, uri, last_token_pos)
            .and_then(|(_, symbol)| state.analysis.symbol_scope_map.get(&symbol))
            .map(|scope| {
                // Get all symbols under this symbol's scope in the proper
                // name group
                scope
                    .get_group(ng)
                    .iter()
                    .map(|(_, child_symbol)| symbol_to_completion_item(state, child_symbol))
                    .collect()
            })
    }
}
