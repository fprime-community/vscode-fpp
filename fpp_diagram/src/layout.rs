//! Layout configuration for state machine diagrams.
//!
//! The configuration lives in the FPP source itself, as a pre-annotation on the
//! `state machine` definition:
//!
//! ```fpp
//! @ diagram-layout cycleBreaking=MODEL_ORDER considerModelOrder=NODES_AND_EDGES nodePlacement=BRANDES_KOEPF
//! state machine M { ... }
//! ```
//!
//! Keeping it in source (rather than an editor setting) means the layout travels
//! with the model: it works offline, from the CLI, and is embedded into the
//! generated Mermaid as YAML frontmatter so the diagram is self-contained.
//!
//! The values are the ELK option strings that Mermaid's ELK backend expects
//! (`config.elk.*`). Parsing is lenient: unknown keys or values are ignored and
//! fall back to the defaults, so hand-edited or future annotations never break
//! diagram generation.

/// Declare an ELK option enum with its default variant and the ELK string each
/// variant maps to. Generates `elk()` (variant → ELK string), `parse()` (ELK
/// string → variant), and a `Default` impl.
macro_rules! layout_enum {
    ($(#[$meta:meta])* $name:ident, default = $default:ident, { $($variant:ident => $elk:literal),+ $(,)? }) => {
        $(#[$meta])*
        #[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
        pub enum $name {
            $($variant),+
        }

        impl $name {
            /// The ELK option string for this value (as Mermaid's ELK backend
            /// expects under `config.elk.*`).
            pub fn elk(self) -> &'static str {
                match self {
                    $(Self::$variant => $elk),+
                }
            }

            /// Parse an ELK option string; returns `None` for unknown values.
            pub fn parse(s: &str) -> Option<Self> {
                match s {
                    $($elk => Some(Self::$variant),)+
                    _ => None,
                }
            }
        }

        impl Default for $name {
            fn default() -> Self {
                Self::$default
            }
        }
    };
}

layout_enum!(
    /// How ELK breaks cycles in the transition graph. `ModelOrder` reverses every
    /// transition that runs backward in source order, keeping the initial state at
    /// the top and the flow reading downward.
    CycleBreaking,
    default = ModelOrder,
    {
        ModelOrder => "MODEL_ORDER",
        GreedyModelOrder => "GREEDY_MODEL_ORDER",
        Greedy => "GREEDY",
        DepthFirst => "DEPTH_FIRST",
    }
);

layout_enum!(
    /// How strongly ELK follows the source declaration order when positioning
    /// nodes.
    ConsiderModelOrder,
    default = NodesAndEdges,
    {
        NodesAndEdges => "NODES_AND_EDGES",
        PreferEdges => "PREFER_EDGES",
        PreferNodes => "PREFER_NODES",
        None => "NONE",
    }
);

layout_enum!(
    /// The ELK node-placement algorithm used within each layer.
    NodePlacement,
    default = BrandesKoepf,
    {
        BrandesKoepf => "BRANDES_KOEPF",
        NetworkSimplex => "NETWORK_SIMPLEX",
        LinearSegments => "LINEAR_SEGMENTS",
        Simple => "SIMPLE",
    }
);

layout_enum!(
    /// The Mermaid layout backend that draws the diagram. `Elk` (the default)
    /// handles nested composite states well and honors the ELK options below;
    /// `Dagre` is Mermaid's built-in renderer (no plugin required) and ignores the
    /// ELK-specific options.
    LayoutEngine,
    default = Elk,
    {
        Elk => "elk",
        Dagre => "dagre",
    }
);

layout_enum!(
    /// The flow direction of the diagram (Mermaid `direction` statement). Applies
    /// to both layout engines. `TopBottom` (the default) reads top-to-bottom.
    Direction,
    default = TopBottom,
    {
        TopBottom => "TB",
        BottomTop => "BT",
        LeftRight => "LR",
        RightLeft => "RL",
    }
);

/// Default node spacing (px) — the gap between sibling nodes. Matches the
/// webview's initialize-time `state.nodeSpacing`.
pub const DEFAULT_NODE_SPACING: u32 = 60;
/// Default rank spacing (px) — the gap between layers/ranks. Matches the
/// webview's initialize-time `state.rankSpacing`.
pub const DEFAULT_RANK_SPACING: u32 = 60;

/// The tag that identifies a layout annotation line (after the `@ ` marker is
/// stripped by the lexer).
pub const ANNOTATION_TAG: &str = "diagram-layout";

/// Layout options for a state machine diagram, parsed from (and serialized back
/// to) a `diagram-layout` source annotation.
///
/// `engine` and `direction` apply to both layout backends; the ELK strategies
/// (`cycle_breaking`, `consider_model_order`, `node_placement`) apply only to the
/// ELK backend, and the spacing values (`node_spacing`, `rank_spacing`) are read
/// only by the `dagre` backend (ELK computes its own spacing).
#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SmLayout {
    /// The Mermaid layout backend (`elk` or `dagre`).
    pub engine: LayoutEngine,
    /// The diagram flow direction (both engines).
    pub direction: Direction,
    pub cycle_breaking: CycleBreaking,
    pub consider_model_order: ConsiderModelOrder,
    pub node_placement: NodePlacement,
    /// Gap between sibling nodes, in px (dagre only).
    pub node_spacing: u32,
    /// Gap between layers/ranks, in px (dagre only).
    pub rank_spacing: u32,
}

impl Default for SmLayout {
    fn default() -> Self {
        Self {
            engine: LayoutEngine::default(),
            direction: Direction::default(),
            cycle_breaking: CycleBreaking::default(),
            consider_model_order: ConsiderModelOrder::default(),
            node_placement: NodePlacement::default(),
            node_spacing: DEFAULT_NODE_SPACING,
            rank_spacing: DEFAULT_RANK_SPACING,
        }
    }
}

impl SmLayout {
    /// Parse layout options from a definition's pre-annotation lines (as stored
    /// by the parser: the annotation text with the leading `@ ` marker removed).
    ///
    /// Recognizes a line of the form `diagram-layout key=value ...`. Later lines
    /// and later keys win; unknown keys/values are ignored, leaving defaults.
    pub fn from_annotations<S: AsRef<str>>(pre: &[S]) -> Self {
        let mut layout = Self::default();
        for line in pre {
            let line = line.as_ref().trim();
            let Some(rest) = line.strip_prefix(ANNOTATION_TAG) else {
                continue;
            };
            // Require whitespace (or end) after the tag so `diagram-layouts` etc.
            // don't match.
            if rest.chars().next().is_some_and(|c| !c.is_whitespace()) {
                continue;
            }
            for token in rest.split_whitespace() {
                let Some((key, value)) = token.split_once('=') else {
                    continue;
                };
                match key {
                    "engine" => {
                        if let Some(v) = LayoutEngine::parse(value) {
                            layout.engine = v;
                        }
                    }
                    "direction" => {
                        if let Some(v) = Direction::parse(value) {
                            layout.direction = v;
                        }
                    }
                    "nodeSpacing" => {
                        if let Ok(v) = value.parse::<u32>() {
                            layout.node_spacing = v;
                        }
                    }
                    "rankSpacing" => {
                        if let Ok(v) = value.parse::<u32>() {
                            layout.rank_spacing = v;
                        }
                    }
                    "cycleBreaking" => {
                        if let Some(v) = CycleBreaking::parse(value) {
                            layout.cycle_breaking = v;
                        }
                    }
                    "considerModelOrder" => {
                        if let Some(v) = ConsiderModelOrder::parse(value) {
                            layout.consider_model_order = v;
                        }
                    }
                    "nodePlacement" => {
                        if let Some(v) = NodePlacement::parse(value) {
                            layout.node_placement = v;
                        }
                    }
                    _ => {}
                }
            }
        }
        layout
    }

    /// Render the annotation *text* (without the leading `@ ` marker) that encodes
    /// these options. Used by the editor to write the configuration back to the
    /// FPP source.
    pub fn to_annotation(&self) -> String {
        format!(
            "{ANNOTATION_TAG} engine={} direction={} cycleBreaking={} \
             considerModelOrder={} nodePlacement={} nodeSpacing={} rankSpacing={}",
            self.engine.elk(),
            self.direction.elk(),
            self.cycle_breaking.elk(),
            self.consider_model_order.elk(),
            self.node_placement.elk(),
            self.node_spacing,
            self.rank_spacing,
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn defaults_are_source_order_friendly() {
        let l = SmLayout::default();
        assert_eq!(l.engine.elk(), "elk");
        assert_eq!(l.direction.elk(), "TB");
        assert_eq!(l.cycle_breaking.elk(), "MODEL_ORDER");
        assert_eq!(l.consider_model_order.elk(), "NODES_AND_EDGES");
        assert_eq!(l.node_placement.elk(), "BRANDES_KOEPF");
        assert_eq!(l.node_spacing, DEFAULT_NODE_SPACING);
        assert_eq!(l.rank_spacing, DEFAULT_RANK_SPACING);
    }

    #[test]
    fn parses_engine() {
        let pre = vec!["diagram-layout engine=dagre".to_string()];
        assert_eq!(SmLayout::from_annotations(&pre).engine, LayoutEngine::Dagre);
        // Unknown engine falls back to the default.
        let pre = vec!["diagram-layout engine=bogus".to_string()];
        assert_eq!(SmLayout::from_annotations(&pre).engine, LayoutEngine::Elk);
    }

    #[test]
    fn parses_direction_and_spacing() {
        let pre = vec!["diagram-layout direction=LR nodeSpacing=80 rankSpacing=100".to_string()];
        let l = SmLayout::from_annotations(&pre);
        assert_eq!(l.direction, Direction::LeftRight);
        assert_eq!(l.node_spacing, 80);
        assert_eq!(l.rank_spacing, 100);

        // Unknown direction and non-numeric spacing fall back to defaults.
        let pre = vec!["diagram-layout direction=DIAGONAL nodeSpacing=huge".to_string()];
        let l = SmLayout::from_annotations(&pre);
        assert_eq!(l.direction, Direction::TopBottom);
        assert_eq!(l.node_spacing, DEFAULT_NODE_SPACING);
    }

    #[test]
    fn parses_annotation_line() {
        let pre = vec![
            "some human doc".to_string(),
            "diagram-layout cycleBreaking=GREEDY nodePlacement=NETWORK_SIMPLEX".to_string(),
        ];
        let l = SmLayout::from_annotations(&pre);
        assert_eq!(l.cycle_breaking, CycleBreaking::Greedy);
        assert_eq!(l.node_placement, NodePlacement::NetworkSimplex);
        // Unspecified key keeps its default.
        assert_eq!(l.consider_model_order, ConsiderModelOrder::NodesAndEdges);
    }

    #[test]
    fn ignores_unknown_values_and_tags() {
        let pre = vec![
            "diagram-layouts cycleBreaking=GREEDY".to_string(), // wrong tag
            "diagram-layout cycleBreaking=BOGUS considerModelOrder=NONE".to_string(),
        ];
        let l = SmLayout::from_annotations(&pre);
        assert_eq!(l.cycle_breaking, CycleBreaking::ModelOrder); // bogus ignored
        assert_eq!(l.consider_model_order, ConsiderModelOrder::None);
    }

    #[test]
    fn round_trips_through_annotation() {
        let l = SmLayout {
            engine: LayoutEngine::Dagre,
            direction: Direction::LeftRight,
            cycle_breaking: CycleBreaking::GreedyModelOrder,
            consider_model_order: ConsiderModelOrder::PreferEdges,
            node_placement: NodePlacement::Simple,
            node_spacing: 75,
            rank_spacing: 90,
        };
        let parsed = SmLayout::from_annotations(&[l.to_annotation()]);
        assert_eq!(l, parsed);
    }
}
