use crate::Analysis;
use crate::semantics::{Interface, PortInstance, Symbol};
use fpp_ast::{
    AstNode, DefInterface, DefModule, SpecGeneralPortInstance, SpecInterfaceImport,
    SpecSpecialPortInstance, Visitor, Walkable,
};
use fpp_core::Span;
use rustc_hash::{FxHashMap as HashMap, FxHashSet as HashSet};
use std::cell::RefCell;
use std::ops::ControlFlow;

/// Check interface definitions.
pub struct CheckInterfaceDefs {
    /// Unresolved interfaces built during the walk, keyed by interface symbol.
    raw: RefCell<HashMap<Symbol, Interface>>,
}

impl Default for CheckInterfaceDefs {
    fn default() -> Self {
        Self::new()
    }
}

impl CheckInterfaceDefs {
    pub fn new() -> CheckInterfaceDefs {
        CheckInterfaceDefs {
            raw: RefCell::new(HashMap::default()),
        }
    }

    /// Resolve all interfaces built during the walk, merging imports
    /// transitively, and store the results in `a.interface_map`.
    pub fn resolve_all(&self, a: &mut Analysis) {
        let raw = self.raw.borrow();
        let mut resolved: HashMap<Symbol, Interface> = HashMap::default();
        let mut in_progress: HashSet<Symbol> = HashSet::default();
        for symbol in raw.keys() {
            resolve_one(&raw, symbol, &mut resolved, &mut in_progress);
        }
        for (symbol, interface) in resolved {
            a.interface_map.insert(symbol, interface);
        }
    }
}

fn resolve_one(
    raw: &HashMap<Symbol, Interface>,
    symbol: &Symbol,
    resolved: &mut HashMap<Symbol, Interface>,
    in_progress: &mut HashSet<Symbol>,
) -> Option<Interface> {
    if let Some(iface) = resolved.get(symbol) {
        return Some(iface.clone());
    }
    let raw_iface = raw.get(symbol)?.clone();
    // Break import cycles (already reported by CheckUseDefCycles).
    if !in_progress.insert(symbol.clone()) {
        return Some(raw_iface);
    }

    let mut result = raw_iface.clone();
    let imports: Vec<(Symbol, Span)> = raw_iface
        .import_map
        .iter()
        .map(|(s, (_, loc))| (s.clone(), *loc))
        .collect();

    for (import_symbol, loc) in imports {
        if let Some(imported) = resolve_one(raw, &import_symbol, resolved, in_progress) {
            match result.add_imported_interface(&imported, loc) {
                Ok(merged) => result = merged,
                Err(err) => err.emit(),
            }
        }
    }

    in_progress.remove(symbol);
    resolved.insert(symbol.clone(), result.clone());
    Some(result)
}

impl<'ast> Visitor<'ast> for CheckInterfaceDefs {
    type Break = ();
    type State = Analysis;

    /// Descend into modules, where interface definitions live.
    fn visit_def_module(
        &self,
        a: &mut Self::State,
        node: &'ast DefModule,
    ) -> ControlFlow<Self::Break> {
        node.walk(a, self)
    }

    fn visit_def_interface(
        &self,
        a: &mut Self::State,
        node: &'ast DefInterface,
    ) -> ControlFlow<Self::Break> {
        let symbol = a.get_symbol(node);
        if self.raw.borrow().contains_key(&symbol) {
            return ControlFlow::Continue(());
        }

        let saved = a.interface.take();
        a.interface = Some(Interface::new(symbol.clone()));
        node.walk(a, self)?;
        if let Some(iface) = a.interface.take() {
            self.raw.borrow_mut().insert(symbol, iface);
        }
        a.interface = saved;
        ControlFlow::Continue(())
    }

    fn visit_spec_general_port_instance(
        &self,
        a: &mut Self::State,
        node: &'ast SpecGeneralPortInstance,
    ) -> ControlFlow<Self::Break> {
        if a.interface.is_some() {
            match PortInstance::from_general(a, node) {
                Ok(instance) => add_resolved_port_instance(a, instance),
                Err(err) => err.emit(),
            }
        }
        ControlFlow::Continue(())
    }

    fn visit_spec_special_port_instance(
        &self,
        a: &mut Self::State,
        node: &'ast SpecSpecialPortInstance,
    ) -> ControlFlow<Self::Break> {
        if a.interface.is_some() {
            match PortInstance::from_special(a, node) {
                Ok(instance) => add_resolved_port_instance(a, instance),
                Err(err) => err.emit(),
            }
        }
        ControlFlow::Continue(())
    }

    fn visit_spec_interface_import(
        &self,
        a: &mut Self::State,
        node: &'ast SpecInterfaceImport,
    ) -> ControlFlow<Self::Break> {
        add_imported_interface(a, node);
        ControlFlow::Continue(())
    }
}

pub(crate) fn add_resolved_port_instance(a: &mut Analysis, instance: PortInstance) {
    if let Some(iface) = a.interface.take() {
        match iface.add_port_instance(instance) {
            Ok(updated) => a.interface = Some(updated),
            Err(err) => {
                a.interface = Some(iface);
                err.emit();
            }
        }
    }
}

fn add_imported_interface(a: &mut Analysis, node: &SpecInterfaceImport) {
    let symbol = match a.use_def_map.get(&node.interface.id()) {
        Some(symbol @ Symbol::Interface(_)) => symbol.clone(),
        _ => return,
    };
    if let Some(iface) = a.interface.take() {
        match iface.add_imported_interface_symbol(symbol, node) {
            Ok(updated) => a.interface = Some(updated),
            Err(err) => {
                a.interface = Some(iface);
                err.emit();
            }
        }
    }
}
