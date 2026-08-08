use crate::Analysis;
use crate::errors::{SemanticError, SemanticResult};
use crate::semantics::{Component, Symbol, component_kind_str};
use fpp_ast::{AstNode, ComponentKind, DefComponentInstance, Expr, SpecInit};
use fpp_core::{Span, Spanned};
use rustc_hash::FxHashMap as HashMap;

/// An FPP init specifier.
#[derive(Debug, Clone)]
pub struct InitSpecifier {
    pub loc: Span,
    pub phase: i128,
}

impl InitSpecifier {
    pub fn from_node(a: &Analysis, node: &SpecInit) -> SemanticResult<InitSpecifier> {
        let loc = node.span();
        let phase = a.get_int_value(node.phase.node_id).unwrap_or(0);
        Ok(InitSpecifier { loc, phase })
    }
}

/// An FPP component instance.
#[derive(Debug, Clone)]
pub struct ComponentInstance {
    pub loc: Span,
    pub name: String,
    pub qualified_name: String,
    pub base_id: i128,
    pub max_id: i128,
    pub init_specifier_map: HashMap<i128, InitSpecifier>,
    /// The symbol of the component this instance is an instance of.
    pub component_symbol: Symbol,
}

impl ComponentInstance {
    pub fn add_init_specifier(&self, spec: InitSpecifier) -> SemanticResult<ComponentInstance> {
        if let Some(prev) = self.init_specifier_map.get(&spec.phase) {
            return Err(SemanticError::DuplicateInitSpecifier {
                phase: spec.phase,
                loc: spec.loc,
                prev_loc: prev.loc,
            });
        }
        let mut ci = self.clone();
        ci.init_specifier_map.insert(spec.phase, spec);
        Ok(ci)
    }

    /// Create a component instance. Returns `None` if the referenced component
    /// is unresolved (CheckUses already reported the error).
    pub fn from_def(
        a: &Analysis,
        node: &DefComponentInstance,
    ) -> SemanticResult<Option<ComponentInstance>> {
        let loc = node.span();
        let name = node.name.data.clone();
        let component = match get_component(a, node) {
            Some(c) => c,
            None => return Ok(None),
        };
        let component_kind = component.node.kind.clone();

        let base_id = match &node.base_id {
            Some(e) => a.get_nonnegative_big_int_value(e.node_id, e.span())?,
            None => 0,
        };

        let _queue_size = get_queue_size(a, &name, loc, &component_kind, &node.queue_size)?;
        let _stack_size = get_active_attribute(
            a,
            &name,
            &component_kind,
            "stack size",
            &node.stack_size,
            true,
        )?;
        let _priority =
            get_active_attribute(a, &name, &component_kind, "priority", &node.priority, false)?;
        let _cpu =
            get_active_attribute(a, &name, &component_kind, "CPU affinity", &node.cpu, false)?;

        let symbol = a.get_symbol(node);
        let qualified_name = a.get_qualified_name(&symbol);
        let max_id = base_id + component.get_max_id();

        Ok(Some(ComponentInstance {
            loc,
            name,
            qualified_name,
            base_id,
            max_id,
            init_specifier_map: HashMap::default(),
            component_symbol: component.symbol.clone(),
        }))
    }
}

fn get_component(a: &Analysis, node: &DefComponentInstance) -> Option<Component> {
    match a.use_def_map.get(&node.component.id()) {
        Some(symbol @ Symbol::Component(_)) => a.component_map.get(symbol).cloned(),
        _ => None,
    }
}

fn invalid(name: &str, loc: Span, msg: String) -> SemanticError {
    SemanticError::InvalidDefComponentInstance {
        name: name.to_string(),
        loc,
        msg,
    }
}

fn get_queue_size(
    a: &Analysis,
    name: &str,
    loc: Span,
    kind: &ComponentKind,
    node_opt: &Option<Expr>,
) -> SemanticResult<Option<i128>> {
    match (kind, node_opt) {
        (ComponentKind::Passive, Some(e)) => Err(invalid(
            name,
            e.span(),
            "passive component may not have queue size".to_string(),
        )),
        (_, Some(e)) => Ok(Some(a.get_nonnegative_big_int_value(e.node_id, e.span())?)),
        (ComponentKind::Passive, None) => Ok(None),
        (kind, None) => Err(invalid(
            name,
            loc,
            format!(
                "{} component must have queue size",
                component_kind_str(kind)
            ),
        )),
    }
}

fn get_active_attribute(
    a: &Analysis,
    name: &str,
    kind: &ComponentKind,
    attr: &str,
    node_opt: &Option<Expr>,
    nonnegative: bool,
) -> SemanticResult<Option<i128>> {
    match (kind, node_opt) {
        (ComponentKind::Active, Some(e)) => {
            if nonnegative {
                Ok(Some(a.get_nonnegative_big_int_value(e.node_id, e.span())?))
            } else {
                Ok(a.get_int_value(e.node_id))
            }
        }
        (_, Some(e)) => Err(invalid(
            name,
            e.span(),
            format!(
                "{} component may not have {}",
                component_kind_str(kind),
                attr
            ),
        )),
        (_, None) => Ok(None),
    }
}
