use crate::Analysis;
use crate::semantics::{InterfaceInstance, Symbol, Topology};
use fpp_core::Span;

/// Resolve a topology
pub fn resolve(a: &Analysis, t: &mut Topology) {
    {
        let tops: Vec<(Symbol, Span)> = t
            .direct_topologies
            .iter()
            .map(|(s, l)| (s.clone(), *l))
            .collect();
        for (sym, loc) in tops {
            if let Some(dep) = a.topology_map.get(&sym) {
                let ii = InterfaceInstance::from_topology(dep.clone());
                t.add_instance(ii, loc);
            }
        }
    }

    {
        let comps: Vec<(Symbol, Span)> = t
            .direct_component_instances
            .iter()
            .map(|(s, l)| (s.clone(), *l))
            .collect();
        for (sym, loc) in comps {
            if let Some(ci) = a.component_instance_map.get(&sym) {
                let ii = InterfaceInstance::from_component_instance(ci.clone());
                t.add_instance(ii, loc);
            }
        }
    }
}
