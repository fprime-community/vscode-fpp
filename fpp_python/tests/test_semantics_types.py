"""Type-resolution tests, navigation-based (no hardcoded AST ids).

Entities are located by qualified name via `Model.lookup`, and their resolved
type is read through `node.resolved_type` on the definition.

The `Type` hierarchy is a faithful mirror of `fpp_analysis::semantics::Type`:
public fields are getters (e.g. `ArrayType.anon_array`, `EnumType.rep_type`) and
`&self`/`&Arc<Self>` methods are getters too (e.g. `is_int`, `underlying_type`).
"""

import pytest

import fpp_python as f
from fpp_python import (
    AliasType,
    AnonArrayType,
    AnonStructType,
    ArrayType,
    ArraySymbol,
    EnumType,
    FloatType,
    IntegerKind,
    PrimitiveIntType,
    StructType,
    Type,
)

SRC = """
module M {
  array Arr = [4] U32
  enum E: I32 { A, B }
  struct S { x: U32, y: F32 }
  type Alias = U16
  type A2 = Arr
}
"""


@pytest.fixture(scope="module")
def m():
    model = f.analyze(SRC)
    assert not model.has_errors, [d.message for d in model.diagnostics]
    return model


def rtype(m, qn):
    return m.lookup(qn).definition.resolved_type


def test_array_type(m):
    t = rtype(m, "M.Arr")
    assert isinstance(t, ArrayType)
    assert isinstance(t, Type)
    # `ArrayType` mirrors its native fields: the structural anonymous array + the
    # defining AST node.
    aa = t.anon_array
    assert isinstance(aa, AnonArrayType)
    assert aa.size == 4
    assert isinstance(aa.elt_type, PrimitiveIntType)
    assert aa.elt_type.value == IntegerKind.U32
    # The `node` field bridges to the AST definition wrapper.
    assert t.node.node_id == m.lookup("M.Arr").node_id


def test_enum_type(m):
    t = rtype(m, "M.E")
    assert isinstance(t, EnumType)
    # `rep_type` is a mirrored native field (the representation integer kind).
    assert t.rep_type == IntegerKind.I32
    assert t.is_displayable is True


def test_struct_type(m):
    t = rtype(m, "M.S")
    assert isinstance(t, StructType)
    members = t.anon_struct.members
    assert set(members.keys()) == {"x", "y"}
    assert isinstance(members["x"], PrimitiveIntType)
    assert isinstance(members["y"], FloatType)


def test_alias_type(m):
    t = rtype(m, "M.Alias")
    assert isinstance(t, AliasType)
    # `alias_type` is the immediate aliased type; `underlying_type` follows the
    # full alias chain (both are `Type` union values).
    assert isinstance(t.alias_type, PrimitiveIntType)
    assert t.alias_type.value == IntegerKind.U16
    assert isinstance(t.underlying_type, PrimitiveIntType)
    assert t.underlying_type.value == IntegerKind.U16


def test_type_predicates(m):
    assert rtype(m, "M.Alias").is_int is True
    assert rtype(m, "M.E").is_int is False
    assert rtype(m, "M.Arr").is_numeric is False


def test_type_use_resolves_to_definition(m):
    # `type A2 = Arr` — the type-name use resolves to the Arr symbol.
    a2 = m.lookup("M.A2").definition
    sym = a2.type_name.kind.value.definition
    assert sym is not None and sym.qualified_name == "M.Arr"
    assert isinstance(sym, ArraySymbol)


def test_symbol_value_equality(m):
    assert m.lookup("M.Arr") == m.lookup("M.Arr")
