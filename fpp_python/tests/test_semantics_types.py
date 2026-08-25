"""Type-resolution tests, navigation-based (no hardcoded AST ids).

Entities are located by qualified name via `Model.lookup`, and their resolved
type is read through `node.resolved_type` on the definition.
"""

import pytest

import fpp_python as f
from fpp_python import (
    AliasType,
    ArrayType,
    ArraySymbol,
    EnumType,
    FloatType,
    PrimitiveIntType,
    StructType,
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
    assert t.array_size == 4
    assert isinstance(t.element_type, PrimitiveIntType)
    assert t.element_type.rep_type == "U32"


def test_enum_type(m):
    t = rtype(m, "M.E")
    assert isinstance(t, EnumType)
    assert t.rep_type == "I32" and t.signed is True and t.bits == 32


def test_struct_type(m):
    t = rtype(m, "M.S")
    assert isinstance(t, StructType)
    assert set(t.members.keys()) == {"x", "y"}
    assert isinstance(t.members["x"], PrimitiveIntType)
    assert isinstance(t.members["y"], FloatType)


def test_alias_underlying(m):
    t = rtype(m, "M.Alias")
    assert isinstance(t, AliasType)
    assert isinstance(t.underlying, PrimitiveIntType) and t.underlying.rep_type == "U16"


def test_type_use_resolves_to_definition(m):
    # `type A2 = Arr` — the type-name use resolves to the Arr symbol.
    a2 = m.lookup("M.A2").definition
    sym = a2.type_name.kind.value.definition
    assert sym is not None and sym.qualified_name == "M.Arr"
    assert isinstance(sym, ArraySymbol)


def test_symbol_value_equality(m):
    assert m.lookup("M.Arr") == m.lookup("M.Arr")
