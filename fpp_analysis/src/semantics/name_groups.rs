use fpp_macros::EnumMap;
use std::fmt::{Display, Formatter};

#[derive(EnumMap, Copy, Clone, Debug)]
pub enum NameGroup {
    Component,
    Port,
    StateMachine,
    PortInterfaceInstance,
    PortInterface,
    Template,
    Type,
    Value,
}

impl Display for NameGroup {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let name = match self {
            NameGroup::Component => "component",
            NameGroup::Port => "port",
            NameGroup::StateMachine => "state machine",
            NameGroup::PortInterfaceInstance => "port interface instance",
            NameGroup::PortInterface => "port interface",
            NameGroup::Template => "template",
            NameGroup::Type => "type",
            NameGroup::Value => "constant",
        };

        f.write_str(name)
    }
}
