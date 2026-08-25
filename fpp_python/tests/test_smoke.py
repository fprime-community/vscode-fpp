"""Smoke tests for the native binding entry point."""

import fpp_python as f


def test_analyze_ok():
    m = f.analyze("module M {\n  constant a = 1234\n}\n")
    assert not m.has_errors and m.error_count == 0 and m.diagnostics == []
    (mod,) = m.ast()
    assert type(mod).__name__ == "DefModule" and mod.name == "M"
    (const,) = mod.members
    assert type(const).__name__ == "DefConstant" and const.name == "a"
    assert type(const.value.kind).__name__ == "ExprLiteralInt"
    assert const.value.kind.value == "1234"


def test_analyze_reports_errors():
    m = f.analyze("module M { constant x = nope }")
    assert m.has_errors and len(m.diagnostics) >= 1
    d = m.diagnostics[0]
    assert d.level == "error" and d.location is not None


def test_node_identity_is_memoized():
    m = f.analyze("module M { constant a = 1 }")
    (mod,) = m.ast()
    # Repeated navigation returns the same Python object.
    assert mod.members[0] is mod.members[0]
    assert m.ast()[0] is mod
