use std::ops::ControlFlow;
use std::sync::atomic::{AtomicU32, Ordering};
use std::sync::Arc;

use crate::global_state::GlobalState;
use fpp_analysis::semantics::Symbol;
use fpp_analysis::Analysis;
use fpp_ast::{
    Expr, ExprKind, Ident, MoveWalkable, Node, PortInstanceIdentifier, TlmChannelIdentifier,
    Visitor, Walkable,
};
use fpp_core::{LineCol, LineIndex, SourceFile, SourceFileData};
use fpp_lsp_parser::{SyntaxKind, SyntaxNode, SyntaxToken, TextRange, VisitorResult};
use lsp_types::{SemanticToken, SemanticTokenModifier, SemanticTokenType, SemanticTokens};

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
#[repr(u32)]
pub enum SemanticTokenKind {
    Module,
    Topology,
    Component,
    Interface,
    ComponentInstance,
    Constant,
    EnumConstant,
    StructMember,
    GraphGroup,
    PortInstance,
    Port,
    AbstractType,
    AliasType,
    ArrayType,
    EnumType,
    StructType,
    PrimitiveType,
    FormalParameter,
    Command,
    Event,
    Telemetry,
    Parameter,
    DataProduct,

    StateMachine,
    StateMachineInstance,
    TelemetryPacketSet,
    TelemetryPacket,

    Action,
    Guard,
    Signal,
    State,

    Annotation,
    Comment,
    Number,
    #[allow(dead_code)]
    String,
    #[allow(dead_code)]
    Keyword,
}

impl SemanticTokenKind {
    pub const TOKEN_TYPES: [SemanticTokenType; 36] = [
        SemanticTokenType::new("module"),
        SemanticTokenType::new("topology"),
        SemanticTokenType::new("component"),
        SemanticTokenType::new("interface"),
        SemanticTokenType::new("componentInstance"),
        SemanticTokenType::new("constant"),
        SemanticTokenType::new("enumConstant"),
        SemanticTokenType::new("structMember"),
        SemanticTokenType::new("graphGroup"),
        SemanticTokenType::new("portInstance"),
        SemanticTokenType::new("port"),
        SemanticTokenType::new("abstractType"),
        SemanticTokenType::new("aliasType"),
        SemanticTokenType::new("arrayType"),
        SemanticTokenType::new("enumType"),
        SemanticTokenType::new("structType"),
        SemanticTokenType::new("primitiveType"),
        SemanticTokenType::new("formalParameter"),
        SemanticTokenType::new("command"),
        SemanticTokenType::new("event"),
        SemanticTokenType::new("telemetry"),
        SemanticTokenType::new("parameter"),
        SemanticTokenType::new("dataProduct"),
        SemanticTokenType::new("stateMachine"),
        SemanticTokenType::new("stateMachineInstance"),
        SemanticTokenType::new("telemetryPacketSet"),
        SemanticTokenType::new("telemetryPacket"),
        SemanticTokenType::new("action"),
        SemanticTokenType::new("guard"),
        SemanticTokenType::new("signal"),
        SemanticTokenType::new("state"),
        SemanticTokenType::new("annotation"),
        SemanticTokenType::new("comment"),
        SemanticTokenType::new("number"),
        SemanticTokenType::new("string"),
        SemanticTokenType::new("keyword"),
    ];

    pub const TOKEN_MODIFIERS: [SemanticTokenModifier; 0] = [];

    pub fn type_and_modifier(self) -> (u32, u32) {
        (self as u32, 0)
    }
}

pub(crate) struct SemanticTokensState {
    analysis: Arc<Analysis>,
    lines: LineIndex,
    raw: Vec<(TextRange, SemanticTokenKind)>,
}

static TOKEN_RESULT_COUNTER: AtomicU32 = AtomicU32::new(1);

impl SemanticTokensState {
    fn new(analysis: Arc<Analysis>, text: &str) -> SemanticTokensState {
        SemanticTokensState {
            analysis,
            lines: LineIndex::new(text),
            raw: Default::default(),
        }
    }

    pub(crate) fn finish(mut self, filter_range: Option<lsp_types::Range>) -> SemanticTokens {
        let id = TOKEN_RESULT_COUNTER
            .fetch_add(1, Ordering::SeqCst)
            .to_string();

        let mut tokens = SemanticTokens {
            result_id: Some(id),
            data: vec![],
        };
        self.raw.sort_by(|a, b| a.0.ordering(b.0));

        let mut last = LineCol { line: 0, col: 0 };

        let filter_range = match filter_range {
            Some(filter_range) => Some(TextRange::new(
                self.lines
                    .offset(LineCol {
                        line: filter_range.start.line,
                        col: filter_range.start.character,
                    })
                    .unwrap(),
                self.lines
                    .offset(LineCol {
                        line: filter_range.start.line,
                        col: filter_range.start.character,
                    })
                    .unwrap(),
            )),
            None => None,
        };

        for (range, kind) in self.raw {
            if let Some(filter_range) = filter_range
                && filter_range.intersect(range).is_none() {
                    continue;
                }

            let start = self.lines.line_col(range.start());
            let end = self.lines.line_col(range.end());

            // We only support single line tokens
            assert_eq!(
                start.line, end.line,
                "semantic tokens should be a single line: {:?}, {:?} - {:?}",
                kind, start, end
            );

            let delta_line = start.line - last.line;
            let delta_start = if delta_line == 0 {
                // Same line, offset the start position

                assert!(
                    start.col > last.col || tokens.data.is_empty(),
                    "semantic tokens overlap: {}:{} (last) | {}:{}..{}:{} ({:?})",
                    last.line,
                    last.col,
                    start.line,
                    start.col,
                    end.line,
                    end.col,
                    kind
                );

                start.col - last.col
            } else {
                // Token is on a different line, don't alter the column
                start.col
            };

            let (token_type, token_modifiers_bitset) = kind.type_and_modifier();
            let length = end.col - start.col;

            last = start;
            tokens.data.push(SemanticToken {
                delta_line,
                delta_start,
                length,
                token_type,
                token_modifiers_bitset,
            });
        }

        tokens
    }

    #[inline]
    fn add_text_range(&mut self, range: TextRange, kind: SemanticTokenKind) {
        self.raw.push((range, kind));
    }

    fn add_token(&mut self, token: &SyntaxToken, kind: SemanticTokenKind) {
        self.add_text_range(token.text_range(), kind);
    }

    fn add_node(&mut self, node: &SyntaxNode, kind: SemanticTokenKind) {
        self.add_text_range(node.text_range(), kind);
    }
}

struct SemanticTokenVisitor {}
impl fpp_lsp_parser::Visitor for SemanticTokenVisitor {
    type State = SemanticTokensState;

    fn visit_node(&self, state: &mut Self::State, node: &SyntaxNode) -> VisitorResult {
        match node.kind() {
            // These are typed by definitions above them
            SyntaxKind::NAME => {
                if let Some(parent_node_kind) = node.parent().map(|f| f.kind()) {
                    let name_kind = match parent_node_kind {
                        SyntaxKind::DEF_ABSTRACT_TYPE => SemanticTokenKind::AbstractType,
                        SyntaxKind::DEF_ALIAS_TYPE => SemanticTokenKind::AliasType,
                        SyntaxKind::DEF_ARRAY => SemanticTokenKind::ArrayType,
                        SyntaxKind::DEF_ENUM => SemanticTokenKind::EnumType,
                        SyntaxKind::DEF_STRUCT => SemanticTokenKind::StructType,
                        SyntaxKind::FORMAL_PARAM => SemanticTokenKind::FormalParameter,
                        SyntaxKind::DEF_COMPONENT => SemanticTokenKind::Component,
                        SyntaxKind::DEF_COMPONENT_INSTANCE => SemanticTokenKind::ComponentInstance,
                        SyntaxKind::DEF_ENUM_CONSTANT => SemanticTokenKind::EnumConstant,
                        SyntaxKind::DEF_CONSTANT => SemanticTokenKind::Constant,
                        SyntaxKind::DEF_INTERFACE => SemanticTokenKind::Interface,
                        SyntaxKind::DEF_TOPOLOGY => SemanticTokenKind::Topology,
                        SyntaxKind::STRUCT_MEMBER => SemanticTokenKind::StructMember,
                        SyntaxKind::SPEC_CONNECTION_GRAPH_DIRECT => SemanticTokenKind::GraphGroup,
                        SyntaxKind::SPEC_PORT_INSTANCE_GENERAL => SemanticTokenKind::PortInstance,
                        SyntaxKind::SPEC_PORT_INSTANCE_SPECIAL => SemanticTokenKind::PortInstance,
                        SyntaxKind::SPEC_PORT_INSTANCE_INTERNAL => SemanticTokenKind::PortInstance,
                        SyntaxKind::SPEC_COMMAND => SemanticTokenKind::Command,
                        SyntaxKind::SPEC_EVENT => SemanticTokenKind::Event,
                        SyntaxKind::SPEC_PARAM => SemanticTokenKind::Parameter,
                        SyntaxKind::SPEC_RECORD => SemanticTokenKind::DataProduct,
                        SyntaxKind::SPEC_CONTAINER => SemanticTokenKind::DataProduct,
                        SyntaxKind::SPEC_TELEMETRY => SemanticTokenKind::Telemetry,
                        SyntaxKind::DEF_MODULE => SemanticTokenKind::Module,
                        SyntaxKind::DEF_PORT => SemanticTokenKind::Port,
                        SyntaxKind::DEF_ACTION => SemanticTokenKind::Action,
                        SyntaxKind::DEF_GUARD => SemanticTokenKind::Guard,
                        SyntaxKind::DEF_SIGNAL => SemanticTokenKind::Signal,
                        SyntaxKind::DEF_STATE => SemanticTokenKind::State,
                        SyntaxKind::DEF_STATE_MACHINE => SemanticTokenKind::StateMachine,
                        SyntaxKind::TLM_PACKET_SET => SemanticTokenKind::TelemetryPacketSet,
                        SyntaxKind::SPEC_TLM_PACKET => SemanticTokenKind::TelemetryPacket,
                        SyntaxKind::SPEC_STATE_MACHINE_INSTANCE => {
                            SemanticTokenKind::StateMachineInstance
                        }
                        // We do not recognize this name's parent rule
                        _ => return VisitorResult::Next,
                    };

                    state.add_node(node, name_kind);
                }

                VisitorResult::Next
            }

            // Keep going deeper to look at children
            _ => VisitorResult::Recurse,
        }
    }

    fn visit_token(&self, state: &mut Self::State, token: &SyntaxToken) {
        let kind = match token.kind() {
            pk if pk.is_type_primitive_keyword() => SemanticTokenKind::PrimitiveType,
            SyntaxKind::POST_ANNOTATION | SyntaxKind::PRE_ANNOTATION => {
                SemanticTokenKind::Annotation
            }
            // TODO(tumbar) Port all the tmLanguage tokens/highlights to LSP
            // keyword if keyword.is_keyword() => SemanticTokenKind::Keyword,
            SyntaxKind::COMMENT => SemanticTokenKind::Comment,
            SyntaxKind::LITERAL_FLOAT | SyntaxKind::LITERAL_INT => SemanticTokenKind::Number,
            // SyntaxKind::LITERAL_STRING => SemanticTokenKind::String,
            _ => return,
        };

        state.add_token(token, kind);
    }
}

struct SemanticUses<'ast> {
    source_file: &'ast SourceFileData,
    context: &'ast GlobalState,
}

impl<'ast> SemanticUses<'ast> {
    #[inline]
    fn mark_node(
        &self,
        a: &mut SemanticTokensState,
        node: fpp_core::Node,
        semantic_kind: SemanticTokenKind,
    ) {
        let span = self.context.context.node_get_span(&node);
        let span_data = self.context.context.span_get(&span);
        let src_file_handle = span_data.file.upgrade().unwrap().handle;

        if src_file_handle == self.source_file.handle {
            a.add_text_range(
                TextRange::new(
                    span_data.start.into(),
                    (span_data.start + span_data.length).into(),
                ),
                semantic_kind,
            );
        }
    }

    #[inline]
    fn mark_use(
        &self,
        a: &mut SemanticTokensState,
        node: fpp_core::Node,
        use_node: fpp_core::Node,
    ) {
        if let Some(symbol) = a.analysis.use_def_map.get(&use_node) {
            let semantic_kind = match symbol {
                Symbol::AbsType(_) => SemanticTokenKind::AbstractType,
                Symbol::AliasType(_) => SemanticTokenKind::AliasType,
                Symbol::Array(_) => SemanticTokenKind::ArrayType,
                Symbol::Component(_) => SemanticTokenKind::Component,
                Symbol::ComponentInstance(_) => SemanticTokenKind::ComponentInstance,
                Symbol::Constant(_) => SemanticTokenKind::Constant,
                Symbol::Enum(_) => SemanticTokenKind::EnumType,
                Symbol::EnumConstant(_) => SemanticTokenKind::EnumConstant,
                Symbol::Interface(_) => SemanticTokenKind::Interface,
                Symbol::Module(_) => SemanticTokenKind::Module,
                Symbol::Port(_) => SemanticTokenKind::Port,
                Symbol::StateMachine(_) => SemanticTokenKind::StateMachine,
                Symbol::Struct(_) => SemanticTokenKind::StructType,
                Symbol::Topology(_) => SemanticTokenKind::Topology,
            };

            self.mark_node(a, node, semantic_kind);
        }
    }
}

impl<'ast> Visitor<'ast> for SemanticUses<'ast> {
    type Break = ();
    type State = SemanticTokensState;

    // Walk all nodes deeply and collect up scope where relevant
    fn super_visit(&self, a: &mut Self::State, node: Node<'ast>) -> ControlFlow<Self::Break> {
        node.walk(a, self)
    }

    fn visit_expr(&self, a: &mut Self::State, node: &'ast Expr) -> ControlFlow<Self::Break> {
        match &node.kind {
            ExprKind::Ident(_) => {
                self.mark_use(a, node.node_id, node.node_id);
                ControlFlow::Continue(())
            }
            ExprKind::Dot { e, id } => {
                self.mark_use(a, id.node_id, node.node_id);
                e.walk(a, self)
            }
            _ => node.walk(a, self),
        }
    }

    fn visit_ident(&self, a: &mut Self::State, node: &'ast Ident) -> ControlFlow<Self::Break> {
        self.mark_use(a, node.node_id, node.node_id);
        ControlFlow::Continue(())
    }

    // TODO(tumbar) We should add these to the analysis and mark these are true uses

    fn visit_tlm_channel_identifier(
        &self,
        a: &mut Self::State,
        node: &'ast TlmChannelIdentifier,
    ) -> ControlFlow<Self::Break> {
        // Channel name is not a use, we need to mark it manually
        self.mark_node(a, node.channel_name.node_id, SemanticTokenKind::Telemetry);
        node.component_instance.walk(a, self)
    }

    fn visit_port_instance_identifier(
        &self,
        a: &mut Self::State,
        node: &'ast PortInstanceIdentifier,
    ) -> ControlFlow<Self::Break> {
        // Port instance is not a use, we need to mark it manually
        self.mark_node(a, node.port_name.node_id, SemanticTokenKind::PortInstance);
        node.interface_instance.walk(a, self)
    }
}

pub(crate) fn compute(
    global_state: &GlobalState,
    source_file: Option<SourceFile>,
    text: &str,
    parse: &fpp_lsp_parser::Parse,
) -> SemanticTokensState {
    let mut state = SemanticTokensState::new(global_state.analysis.clone(), text);
    parse.visit(&mut state, &SemanticTokenVisitor {});

    if let Some(source_file) = source_file {
        let parent_file = global_state.parent_file(source_file);
        let cache = global_state.cache.get(&parent_file).unwrap();

        let _ = SemanticUses {
            source_file: global_state.context.file_get(&source_file),
            context: global_state,
        }
        .visit_trans_unit(&mut state, &cache.ast);
    }

    state
}
