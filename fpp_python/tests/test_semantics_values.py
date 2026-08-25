"""Value-resolution tests, navigation-based (no hardcoded AST ids).

Constants are located by qualified name; their folded value is read through
`def_constant.value.resolved_value`.
"""

import pytest

import fpp_python as f
from fpp_python import (
    AnonArrayValue,
    AnonStructValue,
    BooleanValue,
    FloatValue,
    IntegerValue,
    StringValue,
)

SRC = """
module M {
  constant c = 1 + 2 * 3
  constant s = "hello"
  constant b = true
  constant fl = 2.5
  constant arr = [1, 2, 3]
  constant st = { x = 1, y = 2 }
}
"""


@pytest.fixture(scope="module")
def m():
    model = f.analyze(SRC)
    assert not model.has_errors, [d.message for d in model.diagnostics]
    return model


def rval(m, qn):
    return m.lookup(qn).definition.value.resolved_value


def test_integer_constant_folding(m):
    v = rval(m, "M.c")
    assert isinstance(v, IntegerValue) and v.value == 7  # 1 + 2*3


def test_string(m):
    v = rval(m, "M.s")
    assert isinstance(v, StringValue) and v.value == "hello"


def test_bool(m):
    v = rval(m, "M.b")
    assert isinstance(v, BooleanValue) and v.value is True


def test_float(m):
    v = rval(m, "M.fl")
    assert isinstance(v, FloatValue) and abs(v.value - 2.5) < 1e-9


def test_anon_array(m):
    v = rval(m, "M.arr")
    assert isinstance(v, AnonArrayValue)
    assert [e.value for e in v.elements] == [1, 2, 3]


def test_anon_struct(m):
    v = rval(m, "M.st")
    assert isinstance(v, AnonStructValue)
    assert {k: mv.value for k, mv in v.members.items()} == {"x": 1, "y": 2}
