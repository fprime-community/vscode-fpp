"""Typed usage of the native bindings, checked by mypy (not run as a test).

`.github/workflows/python.yml` builds the extension and runs mypy over this file
so the checked-in `fpp_python/fpp_python.pyi` stub is validated against real call
sites. It exercises the new semantic surface: the `Analysis` root, its typed maps
(`dict[Symbol, Component]`, `dict[int, Command]`), the `Type` / `CommandKind`
union base+subclass hierarchies (narrowed with `isinstance`), the lazy `Span`
handle, and the state-machine model.
"""

from __future__ import annotations

from typing import Optional

from fpp_python import (
    analyze,
    Analysis,
    Async,
    Command,
    CommandKind,
    Component,
    DefConstant,
    IntegerKind,
    Model,
    PrimitiveInt,
    Span,
    StateMachine,
    StateMachineSymbol,
    Symbol,
    Type,
)

SRC = """
module Fw {
  port Cmd
  port CmdReg
  port CmdResponse
}
module M {
  constant c = 42
  active component A {
    command recv port cmdIn
    command reg port cmdRegOut
    command resp port cmdResponseOut
    async command DO_IT(arg: U32)
  }
  state machine SM {
    action a
    signal s
    initial enter S1
    state S1 { on s enter S1 }
  }
}
"""


def command_priority(cmd: Command) -> Optional[int]:
    """The `.kind` getter returns the `CommandKind` union (`Async | Guarded |
    Sync`), narrowed by `isinstance` to the `Async` subclass, which alone exposes
    `.priority`."""
    kind: Optional[CommandKind] = cmd.kind
    if isinstance(kind, Async):
        return kind.priority  # Optional[int], only on the Async subclass
    return None


def constant_type_kind(node: DefConstant) -> Optional[IntegerKind]:
    """`.resolved_type` is the `Type` union (`Optional`); `isinstance` narrows it
    to `PrimitiveInt`, whose `.value` is the mirrored `IntegerKind` payload."""
    resolved: Optional[Type] = node.resolved_type
    if isinstance(resolved, PrimitiveInt):
        return resolved.value
    return None


def analysis_detail(a: Analysis) -> int:
    """Navigate the typed semantic mirror: the component map is
    `dict[Symbol, Component]`; each component's `command_map` is
    `dict[int, Command]` and its `loc` is a lazy `Span`."""
    total = 0
    for sym, comp in a.component_map.items():
        symbol: Symbol = sym
        component: Component = comp
        total += len(a.get_qualified_name(symbol))
        loc: Span = component.loc
        line: int = loc.line
        uri: str = loc.uri
        total += line + len(uri)
        commands: dict[int, Command] = component.command_map
        for opcode, cmd in commands.items():
            total += opcode + cmd.opcode
            prio = command_priority(cmd)
            total += prio if prio is not None else 0
    for sm_sym, sm in a.state_machine_map.items():
        machine: StateMachine = sm
        actions: list[StateMachineSymbol] = machine.actions
        total += len(actions)
    return total


def main() -> int:
    model: Model = analyze(SRC, uri="mem.fpp")
    if model.has_errors:
        for diag in model.diagnostics:
            print(diag.level, diag.message)
        return model.error_count

    node_id_sum = 0
    for node in model.ast():
        node_id_sum += node.node_id
        if isinstance(node, DefConstant):
            constant_type_kind(node)

    analysis: Analysis = model.analysis
    sym: Optional[Symbol] = model.lookup("M.c")
    name = analysis.get_qualified_name(sym) if sym is not None else "<none>"
    print(name, node_id_sum + analysis_detail(analysis))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
