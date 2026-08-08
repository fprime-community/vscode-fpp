use super::for_each_port;
use crate::Analysis;
use crate::semantics::Topology;

/// Resolve unconnected ports

/// Compute the unconnected ports of t
pub fn resolve(a: &Analysis, t: &mut Topology) {
    // Fold over instances and ports
    for (pii, pi) in for_each_port(a, t) {
        let direction = pi.get_direction();
        let n = t.get_connections_at(&pii).len();
        match (direction, n) {
            (Some(_), 0) => {
                t.unconnected_port_set.insert(pii);
            }
            _ => {}
        }
    }
}
