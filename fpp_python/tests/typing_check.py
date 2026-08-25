"""Typed usage of the native bindings, checked by mypy (not run as a test).

`.github/workflows/mypy.yml` builds the extension and runs mypy over this file so
the checked-in `fpp_python/_native.pyi` stubs are validated against real
call sites. It exercises `analyze`, `Model.ast()`, `Model.lookup`, and a node's
`.resolved_type` getter.
"""

from __future__ import annotations

from typing import Optional

from fpp_python import Model, analyze
from fpp_python import (
    Command,
    DefComponent,
    DefConstant,
    IntegerKind,
    PrimitiveIntType,
    State,
    StateMachineElement,
    Symbol,
    Type,
)

SRC = """
module M {
  constant c = 42
}
"""


def constant_type_kind(node: DefConstant) -> Optional[IntegerKind]:
    """Validate the generated node stub's `.resolved_type` (-> Optional[Type], the
    `Type` union) and the base/subclass hierarchy: `isinstance` narrows the union
    to a concrete subclass exposing its own fields (`PrimitiveIntType.rep_type`,
    typed as the `IntegerKind` enum)."""
    resolved: Optional[Type] = node.resolved_type
    if isinstance(resolved, PrimitiveIntType):
        return resolved.rep_type  # IntegerKind, only on the subclass
    return None


def model_detail(model: Model) -> int:
    """Validate the typed semantic model: an entity's `definition` is the
    concrete `Def*` (not the `AstNode` base), collections are `list[Wrapper]`,
    and the state-machine model exposes typed elements and states."""
    total = 0
    for comp in model.components():
        defn: DefComponent = comp.definition  # concrete, not AstNode
        total += defn.node_id
        commands: list[Command] = comp.commands
        for cmd in commands:
            total += cmd.opcode
    for sm in model.state_machines():
        actions: list[StateMachineElement] = sm.actions
        total += len(actions)
        states: list[State] = sm.states
        for st in states:
            total += len(st.substates)
    return total


def main() -> int:
    model: Model = analyze(SRC, uri="mem.fpp")
    if model.has_errors:
        for diag in model.diagnostics:
            print(diag.level, diag.message)
        return model.error_count

    node_id_sum = 0
    for node in model.ast():
        # `.ast()` yields typed `AstNode` wrappers; `node_id` is int, and
        # `isinstance` narrows a node to its concrete subclass.
        node_id_sum += node.node_id
        if isinstance(node, DefConstant):
            constant_type_kind(node)

    symbol: Optional[Symbol] = model.lookup("M.c")
    name = symbol.name if symbol is not None else "<none>"
    print(name, node_id_sum + model_detail(model))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
