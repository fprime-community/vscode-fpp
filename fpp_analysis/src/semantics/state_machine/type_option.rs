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
                    match (t1.as_ref(), t2.as_ref()) {
                        (Type::PrimitiveInt(int1), Type::PrimitiveInt(int2)) => {
                            if int_signedness(*int1) != int_signedness(*int2) {
                                None
                            } else if int_bit_width(*int2) > int_bit_width(*int1) {
                                Some(to2.clone())
                            } else {
                                Some(to1.clone())
                            }
                        }
                        (Type::Float(float1), Type::Float(float2)) => {
                            if float_bit_width(*float2) > float_bit_width(*float1) {
                                Some(to2.clone())
                            } else {
                                Some(to1.clone())
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
                    match (t1.as_ref(), t2.as_ref()) {
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
