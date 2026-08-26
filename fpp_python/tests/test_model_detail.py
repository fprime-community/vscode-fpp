"""Navigation over the fully-typed semantic model added in the native rewrite:
Component sub-elements, ComponentInstance attributes, the state-machine model,
and concrete / union AST return types.
"""

import fpp_python as f
from fpp_python import (
    Command,
    CommandKind,
    Event,
    EventSeverity,
    ExprBinop,
    Param,
    SmAction,
    State,
    StateMachineElement,
    Type,
    TypeName,
)


def _model(path: str):
    m = f.analyze(open(path).read(), uri=path)
    assert not m.has_errors, [d.message for d in m.diagnostics]
    return m


def test_commands_are_typed_objects():
    m = _model("tests/commands/commands.fpp")
    seen = False
    for c in m.components():
        for cmd in c.commands:
            seen = True
            assert isinstance(cmd, Command)
            assert isinstance(cmd.opcode, int)
            assert isinstance(cmd.name, str)
            assert cmd.kind in (
                None,
                CommandKind.Async,
                CommandKind.Guarded,
                CommandKind.Sync,
            )
            # `.spec` is the concrete SpecCommand AST node (None for a
            # synthesized parameter set/save command).
            assert cmd.spec is None or type(cmd.spec).__name__ == "SpecCommand"
    assert seen, "fixture should define commands"


def test_params_forward_type():
    m = _model("tests/parameters/parameters.fpp")
    seen = False
    for c in m.components():
        for p in c.params:
            seen = True
            assert isinstance(p, Param)
            assert isinstance(p.is_external, bool)
            # The resolved type lives in the `SpecParam` AST node (bridged by
            # `.spec`); its `type_name` carries `.resolved_type`.
            assert p.spec is not None
            rt = p.spec.type_name.resolved_type
            assert rt is None or isinstance(rt, Type)
    assert seen, "fixture should define parameters"


def test_events_forward_severity():
    m = _model("tests/events/events.fpp")
    seen = False
    for c in m.components():
        for e in c.events:
            seen = True
            assert isinstance(e, Event)
            # Severity lives in the `SpecEvent` AST node (bridged by `.spec`).
            assert e.spec is not None
            assert isinstance(e.spec.severity, EventSeverity)
    assert seen, "fixture should define events"


def test_instance_attributes_forwarded_from_ast():
    m = _model("tests/ports/ports.fpp")
    # At least one instance in this fixture declares a queue size; the analysis
    # discards it, so it is forwarded from the DefComponentInstance AST.
    assert any(ci.queue_size is not None for ci in m.component_instances())


SM_SRC = """
module M {
  state machine SM {
    action a
    guard g
    signal s
    initial enter S1
    state S1 {
      on s enter S2
    }
    state S2 {
      entry do { a }
      initial enter S3
      state S3
    }
  }
}
"""


def test_state_machine_model():
    m = f.analyze(SM_SRC, uri="sm.fpp")
    assert not m.has_errors, [d.message for d in m.diagnostics]
    (sm,) = m.state_machines()

    assert {a.name for a in sm.actions} == {"a"}
    assert all(
        isinstance(a, StateMachineElement) and isinstance(a, SmAction)
        for a in sm.actions
    )
    assert {s.name for s in sm.signals} == {"s"}
    assert sm.blocking_error is False

    states = {s.name: s for s in sm.states}
    assert isinstance(states["S1"], State)
    assert states["S1"].is_leaf
    assert not states["S2"].is_leaf
    assert states["S2"].entry_actions == ["a"]
    assert {s.name for s in states["S2"].substates} == {"S3"}


def test_concrete_and_union_ast_return_types():
    # A single-type field returns the concrete node type...
    m = f.analyze("array A = [3] U32\n", uri="a.fpp")
    assert not m.has_errors, [d.message for d in m.diagnostics]
    (def_array,) = list(m.ast())
    assert isinstance(def_array.elt_type, TypeName)

    # ...and an #[ast]-union field returns a precise union member.
    m2 = f.analyze("constant c = 1 + 2\n", uri="c.fpp")
    assert not m2.has_errors, [d.message for d in m2.diagnostics]
    (def_const,) = list(m2.ast())
    assert isinstance(def_const.value.kind, ExprBinop)
