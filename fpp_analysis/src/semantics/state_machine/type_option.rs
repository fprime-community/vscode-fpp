use crate::semantics::Type;
use fpp_ast::{FloatKind, IntegerKind};
use std::sync::Arc;

/// An FPP type option
pub struct TypeOption;

/// A type option: either a type or nothing
pub type TypeOptionT = Option<Arc<Type>>;

fn int_signedness(kind: IntegerKind) -> bool {
    matches!(
        kind,
        IntegerKind::I8 | IntegerKind::I16 | IntegerKind::I32 | IntegerKind::I64
    )
}

fn int_bit_width(kind: IntegerKind) -> u32 {
    match kind {
        IntegerKind::U8 | IntegerKind::I8 => 8,
        IntegerKind::U16 | IntegerKind::I16 => 16,
        IntegerKind::U32 | IntegerKind::I32 => 32,
        IntegerKind::U64 | IntegerKind::I64 => 64,
    }
}

fn float_bit_width(kind: FloatKind) -> u32 {
    match kind {
        FloatKind::F32 => 32,
        FloatKind::F64 => 64,
    }
}

impl TypeOption {
    /// Shows a type option as a string
    pub fn show(to: &TypeOptionT) -> String {
        match to {
            Some(t) => t.to_string(),
            None => "None".to_string(),
        }
    }

    /// Computes the common type option of two type options
    pub fn common_type(to1: &TypeOptionT, to2: &TypeOptionT) -> Option<TypeOptionT> {
        match (to1, to2) {
            (Some(t1), Some(t2)) => {
                if Type::identical(t1, t2) {
                    Some(Some(t1.clone()))
                } else {
                    let u1 = Type::underlying_type(t1);
                    let u2 = Type::underlying_type(t2);
                    match (u1.as_ref(), u2.as_ref()) {
                        (Type::PrimitiveInt(int1), Type::PrimitiveInt(int2)) => {
                            if int_signedness(*int1) != int_signedness(*int2) {
                                None
                            } else if int_bit_width(*int2) > int_bit_width(*int1) {
                                Some(Some(u2.clone()))
                            } else {
                                Some(Some(u1.clone()))
                            }
                        }
                        (Type::Float(float1), Type::Float(float2)) => {
                            if float_bit_width(*float2) > float_bit_width(*float1) {
                                Some(Some(u2.clone()))
                            } else {
                                Some(Some(u1.clone()))
                            }
                        }
                        (Type::String(_), Type::String(_)) => {
                            Some(Some(Arc::new(Type::String(None))))
                        }
                        _ => None,
                    }
                }
            }
            _ => Some(None),
        }
    }

    /// Checks whether to1 is convertible to to2
    pub fn is_convertible_to(to1: &TypeOptionT, to2: &TypeOptionT) -> bool {
        match (to1, to2) {
            (Some(t1), Some(t2)) => {
                if Type::identical(t1, t2) {
                    true
                } else {
                    // Compare on the underlying types so that alias types are
                    // transparent (see `common_type`).
                    let u1 = Type::underlying_type(t1);
                    let u2 = Type::underlying_type(t2);
                    match (u1.as_ref(), u2.as_ref()) {
                        (Type::PrimitiveInt(int1), Type::PrimitiveInt(int2)) => {
                            (int_signedness(*int1) == int_signedness(*int2))
                                && (int_bit_width(*int2) >= int_bit_width(*int1))
                        }
                        (Type::Float(float1), Type::Float(float2)) => {
                            float_bit_width(*float2) >= float_bit_width(*float1)
                        }
                        (Type::String(_), Type::String(_)) => true,
                        _ => false,
                    }
                }
            }
            (_, None) => true,
            (None, _) => false,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::semantics::test_helpers::*;
    use fpp_ast::IntegerKind;

    fn some(t: Arc<Type>) -> TypeOptionT {
        Some(t)
    }

    /// Asserts the common type option resolves to `Some(expected)` structurally.
    #[track_caller]
    fn assert_common_some(to1: &TypeOptionT, to2: &TypeOptionT, expected: &Arc<Type>) {
        match TypeOption::common_type(to1, to2) {
            Some(Some(got)) => assert!(
                types_structurally_eq(&got, expected),
                "expected common type option Some({expected}), got Some({got})"
            ),
            Some(None) => panic!("expected Some({expected}), got Some(None)"),
            None => panic!("expected Some({expected}), got None (mismatch)"),
        }
    }

    /// FPP spec `Type-Options.adoc`, "Computing a Common Type Option" rule 2.2:
    /// an alias type is replaced with its underlying type. So `alias(I16)` vs
    /// `I32` widens to `I32` exactly as bare `I16` vs `I32` does. (The Scala
    /// reference is buggy here; the spec is authoritative.)
    #[test]
    fn common_type_option_unwraps_aliases() {
        with_test_ctx(|| {
            let a_i16 = alias_type("A", i16(), 10);
            // bare I16 vs I32 -> I32 (wider), per rules 2.3
            assert_common_some(&some(i16()), &some(i32()), &i32());
            // alias(I16) vs I32 -> same result (rule 2.2 then 2.3)
            assert_common_some(&some(a_i16.clone()), &some(i32()), &i32());
            assert_common_some(&some(i32()), &some(a_i16), &i32());

            // chained alias A2 = A1 = I32 vs bare I32 -> I32 (identical underlying)
            let a1 = alias_type("A1", i32(), 11);
            let a2 = alias_type("A2", a1, 12);
            assert_common_some(&some(a2), &some(i32()), &i32());

            // two distinct aliases of I32 -> I32
            let b1 = alias_type("B1", i32(), 13);
            let b2 = alias_type("B2", i32(), 14);
            assert_common_some(&some(b1), &some(b2), &i32());
        });
    }

    /// Same-signedness integers resolve to the WIDER type (spec rules 2.3/2.4),
    /// which differs from the general `Type::common_type` (that gives Integer).
    #[test]
    fn common_type_option_widens_same_signedness() {
        with_test_ctx(|| {
            assert_common_some(&some(i8()), &some(i32()), &i32());
            assert_common_some(&some(i32()), &some(i8()), &i32());
            assert_common_some(&some(u16()), &some(u64()), &u64());
            assert_common_some(&some(f32()), &some(f64()), &f64());
        });
    }

    /// Signedness mismatch and enum-vs-primitive have no rule -> mismatch (None).
    /// Enums are NOT unwrapped by the type-option rules.
    #[test]
    fn common_type_option_mismatches() {
        with_test_ctx(|| {
            // signed vs unsigned -> no rule
            assert!(TypeOption::common_type(&some(i32()), &some(u32())).is_none());
            // enum vs its own rep type -> mismatch (enums not unwrapped here)
            let e = enumeration("E", IntegerKind::I32, 20);
            assert!(TypeOption::common_type(&some(e.clone()), &some(i32())).is_none());
            // alias of enum vs I32: underlying is the enum (not the rep) -> mismatch
            let ae = alias_type("AE", e, 21);
            assert!(TypeOption::common_type(&some(ae), &some(i32())).is_none());
        });
    }

    /// `None` (no value) is absorbing: any option with `None` yields `None`.
    /// (Spec "Computing a Common Type Option" rule 1.)
    #[test]
    fn common_type_option_none_is_absorbing() {
        with_test_ctx(|| {
            assert!(matches!(
                TypeOption::common_type(&None, &some(i32())),
                Some(None)
            ));
            assert!(matches!(
                TypeOption::common_type(&some(i32()), &None),
                Some(None)
            ));
            assert!(matches!(TypeOption::common_type(&None, &None), Some(None)));
        });
    }

    /// Conversion of type options (spec "Conversion of Type Options"): alias
    /// unwrap (2.2), same-signedness widen-up (2.3/2.4), any-to-None (1).
    #[test]
    fn is_convertible_to_unwraps_aliases() {
        with_test_ctx(|| {
            let a_i16 = alias_type("A", i16(), 30);
            // I16 -> I32 (wider, same signedness): allowed
            assert!(TypeOption::is_convertible_to(&some(i16()), &some(i32())));
            // alias(I16) -> I32: same, via rule 2.2
            assert!(TypeOption::is_convertible_to(
                &some(a_i16.clone()),
                &some(i32())
            ));
            // I32 -> alias(I16): narrowing -> not allowed
            assert!(!TypeOption::is_convertible_to(&some(i32()), &some(a_i16)));
            // anything -> None allowed; None -> Some not allowed
            assert!(TypeOption::is_convertible_to(&some(i32()), &None));
            assert!(!TypeOption::is_convertible_to(&None, &some(i32())));
        });
    }
}
