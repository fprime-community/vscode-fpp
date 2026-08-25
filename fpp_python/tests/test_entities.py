"""Analysis-entity navigation: components, instances, topology, connections."""

import pytest

import fpp_python as f
from fpp_python import (
    ComponentSymbol,
    GeneralPortInstance,
    TopologySymbol,
)

SRC = """
port P
passive component C {
  sync input port pIn: P
  output port pOut: P
}
instance a: C base id 0x100
instance b: C base id 0x200
topology T {
  instance a
  instance b
  connections C1 { a.pOut -> b.pIn }
}
"""


@pytest.fixture(scope="module")
def m():
    model = f.analyze(SRC)
    assert not model.has_errors, [d.message for d in model.diagnostics]
    return model


def test_component(m):
    (c,) = m.components()
    assert c.name == "C" and c.kind == "passive"
    ports = c.port_interface.ports
    assert {p.name for p in ports} == {"pIn", "pOut"}
    assert all(isinstance(p, GeneralPortInstance) for p in ports)


def test_component_instances(m):
    insts = {i.name: i for i in m.component_instances()}
    assert insts["a"].base_id == 0x100
    assert insts["a"].component.name == "C"


def test_symbol_as_component(m):
    c_sym = m.lookup("C")
    assert isinstance(c_sym, ComponentSymbol)
    comp = c_sym.as_component()
    assert comp is not None and comp.name == "C"
    # A non-component symbol yields None.
    t_sym = m.lookup("T")
    assert isinstance(t_sym, TopologySymbol)
    assert t_sym.as_component() is None
    assert t_sym.as_topology() is not None


def test_topology_connections(m):
    (t,) = m.topologies()
    assert t.name == "T"
    (conn,) = t.connections()
    assert conn.source.port.qualified_name == "a.pOut"
    assert conn.target.port.qualified_name == "b.pIn"
    assert conn.source.port_number == 0 and conn.target.port_number == 0


def test_instance_component_equality(m):
    insts = {i.name: i for i in m.component_instances()}
    assert insts["a"].component == m.lookup("C").as_component()
