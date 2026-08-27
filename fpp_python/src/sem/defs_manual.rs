//! Hand-authored (NOT generated) declarative mirror of the `fpp_analysis`
//! nested/thin entity layer, expanded by `fpp_python_macros::fpp_sem_bindings!`
//! into read-only PyO3 wrappers.
//!
//! Unlike [`super::defs`] (which `fpp_sem_bindgen` regenerates from
//! `fpp_analysis` source), this file is maintained by hand. The entities left
//! here are too irregular to reflect mechanically: the `Connection`/`Endpoint`
//! cluster wraps `fpp_analysis::ResolvedConnection` (which carries the graph name
//! and resolved `from_pn`/`to_pn` alongside endpoints whose `port_number` is the
//! resolved number), so its `from_`/`source`/`to`/`target` endpoint aliases stay
//! hand-written (`from` is a Python keyword); the top-level symbol-keyed entities
//! whose rich getters are hand-written; and (for
//! `PortInstance`) an inline-struct-variant closed union whose per-variant field
//! exposure is deliberately pruned (`General`'s detail is nested in `GeneralKind`
//! and stays hand-written in `super::hand`), and whose base methods return
//! context-computed spans / references the reflector cannot mirror mechanically.
//!
//! The purely-mechanical clone-handle entities (`PortInterface`,
//! `PortInstanceIdentifier`, `PortMatching`, `InitSpecifier`,
//! `StateMachineInstance`, and the per-element dictionary entities
//! `Command`/`Event`/`Param`/`TlmChannel`/`Record`/`Container` — whose id/opcode
//! are now native fields, so they need no extras) are generated into
//! [`super::defs`].
//!
//! The escape hatches (`PortInstance` subclass detail, `PortInstance.import_locs`,
//! `Connection.from_`/`source`/`to`/`target`, `build_spec`, `instance_ref` +
//! `InstanceRef`) live in [`super::hand`]; they read the `pub(crate)` fields the
//! macro emits here.
#![allow(dead_code, unused_variables, clippy::all)]

fpp_python_macros::fpp_sem_bindings! {
    // The port-instance closed union: `clone` handle over the native enum, whose
    // variants are inline structs. Base methods are the `&self` accessors PyO3
    // strips `get_` from (`.unqualified_name`/`.loc`/`.node_id`/`.array_size`/
    // `.direction`/`.special_kind`). `General`'s kind/priority/queue_full/
    // is_serial/type_symbol, `Internal.input_kind`, and `.import_locs` stay
    // hand-written in `super::hand` (nested-enum / span-list decoding).
    union PortInstance native fpp_analysis::semantics::PortInstance handle clone
          alias "PortInstance" accessor pi {
        variants {
            General  => GeneralPortInstance  : struct { },
            Special  => SpecialPortInstance  : struct { priority: opt(i128), queue_full: opt(leaf(crate::ast::QueueFull)) },
            Internal => InternalPortInstance : struct { priority: opt(i128), queue_full: leaf(crate::ast::QueueFull) },
            Topology => TopologyPortInstance : struct { underlying: port_instance },
        }
        methods {
            get_unqualified_name -> str,
            get_loc -> loc,
            get_node_id -> node,
            get_array_size -> i128,
            get_direction -> opt(leaf(crate::sem::Direction)),
            get_special_kind -> opt(leaf(crate::ast::SpecialPortInstanceKind)),
            is_async_input -> bool,
        }
    }

    entity Endpoint native fpp_analysis::semantics::Endpoint field ep {
        fields {
            loc:         loc,
            port:        entity(PortInstanceIdentifier),
            // The resolved port number: a native field baked in by port numbering
            // (see `ResolvedConnection` in fpp_analysis).
            port_number: opt(i128),
        }
    }

    // Wraps the resolved connection carrying its graph name + resolved port
    // numbers (no build-time extras). The `from_`/`source`/`to`/`target` endpoint
    // aliases stay hand-written in `super::hand` (`from` is a Python keyword).
    entity Connection native fpp_analysis::semantics::ResolvedConnection field resolved {
        fields {
            graph_name:   str,
            from_pn:      opt(i128),
            to_pn:        opt(i128),
            is_unmatched: bool,
        }
        methods { get_loc -> loc }
    }

    // ---- top-level symbol-keyed entities ----------------------------------
    //
    // Each stores only its defining `Symbol` and reads the live `Analysis` map on
    // access (see the `symbol_keyed` handle). Only the mechanically-mirrorable
    // members live here; the rich getters (sorted nested-entity maps, the
    // `DefComponentInstance` attribute / constant-fold reads, the cross-layer
    // resolvers, `name`/`qualified_name`, `kind`, the state-machine element/state
    // walks, and the node-backed `State`) stay hand-written in `super::hand`.

    entity Component native fpp_analysis::semantics::Component
           handle symbol_keyed(component_map) def DefComponent {
        fields {
            port_interface: entity(PortInterface),
        }
    }

    entity ComponentInstance native fpp_analysis::semantics::ComponentInstance
           handle symbol_keyed(component_instance_map) def DefComponentInstance {
        fields {
            name:           str,
            qualified_name: str,
            base_id:        i128,
            max_id:         i128,
        }
    }

    entity Interface native fpp_analysis::semantics::Interface
           handle symbol_keyed(interface_map) def DefInterface {
        fields {
            port_interface: entity(PortInterface),
        }
    }

    entity System native fpp_analysis::semantics::FppSystem
           handle symbol_keyed(system_map) def DefSystem {
    }

    entity Topology native fpp_analysis::semantics::Topology
           handle symbol_keyed(topology_map) def DefTopology {
        fields {
            // NB: the native `name` field is the *qualified* name (topology.rs).
            name:           str,
            port_interface: entity(PortInterface),
            // The connections across all graphs, with resolved port numbers baked
            // in by fpp_analysis (native `Topology.connections`); no `run_ref`.
            connections:    list(entity(Connection)),
        }
    }

    entity StateMachine native fpp_analysis::semantics::state_machine::StateMachine
           handle symbol_keyed(state_machine_map) def DefStateMachine {
    }
}
