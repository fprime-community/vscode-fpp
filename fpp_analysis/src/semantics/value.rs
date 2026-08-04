use crate::semantics::{ArrayType, EnumType, StructType, Type};
use fpp_ast::FloatKind;
use rustc_hash::FxHashMap as HashMap;
use std::fmt;
use std::fmt::Formatter;
use std::ops::Deref;
use std::sync::Arc;

#[derive(Debug, Clone)]
pub enum Value {
    PrimitiveInteger(PrimitiveIntegerValue),
    AbsType(AbsTypeValue),
    Integer(IntegerValue),
    Float(FloatValue),
    Boolean(BooleanValue),
    String(StringValue),
    EnumConstant(EnumConstantValue),
    AnonArray(AnonArrayValue),
    Array(ArrayValue),
    AnonStruct(AnonStructValue),
    Struct(StructValue),
}

impl Value {
    fn is_promotable_to_aggregate(&self) -> bool {
        matches!(
            self,
            Value::PrimitiveInteger(_)
                | Value::Integer(_)
                | Value::Float(_)
                | Value::Boolean(_)
                | Value::String(_)
                | Value::EnumConstant(_)
        )
    }

    pub fn convert(&self, ty_a: &Arc<Type>) -> Option<Value> {
        match (self.convert_impl(ty_a), self.is_promotable_to_aggregate()) {
            (Some(value), _) => Some(value),
            (None, true) => {
                // Try to promote this single value an array/struct
                // (if that's what we are trying to convert to)
                let ty = Type::underlying_type(ty_a);
                match ty.deref() {
                    Type::Array(array_ty) => {
                        let elt_value = self.convert(&array_ty.anon_array.elt_type)?;
                        let size = array_ty.anon_array.size?;
                        Some(Value::Array(ArrayValue {
                            anon_array: AnonArrayValue {
                                elements: std::iter::repeat_n(elt_value, size).collect(),
                            },
                            ty: ty.clone(),
                        }))
                    }
                    Type::AnonArray(array_ty) => {
                        let elt_value = self.convert(&array_ty.elt_type)?;
                        let size = array_ty.size?;
                        Some(Value::AnonArray(AnonArrayValue {
                            elements: std::iter::repeat_n(elt_value, size).collect(),
                        }))
                    }
                    Type::Struct(struct_ty) => {
                        let mut out_value = HashMap::default();
                        for (name, member_ty) in &struct_ty.anon_struct.members {
                            out_value.insert(name.clone(), self.clone().convert(member_ty)?);
                        }

                        Some(Value::Struct(StructValue {
                            anon_struct: AnonStructValue { members: out_value },
                            ty: ty.clone(),
                        }))
                    }
                    Type::AnonStruct(struct_ty) => {
                        let mut out_value = HashMap::default();
                        for (name, member_ty) in &struct_ty.members {
                            out_value.insert(name.clone(), self.clone().convert(member_ty)?);
                        }

                        Some(Value::Struct(StructValue {
                            anon_struct: AnonStructValue { members: out_value },
                            ty: ty.clone(),
                        }))
                    }
                    _ => None,
                }
            }
            (None, false) => None,
        }
    }

    fn convert_impl(&self, ty_a: &Arc<Type>) -> Option<Value> {
        let ty = Type::underlying_type(ty_a);

        match &self {
            Value::PrimitiveInteger(PrimitiveIntegerValue { value: from, .. })
            | Value::Integer(IntegerValue(from)) => match ty.deref() {
                Type::PrimitiveInt(to_kind) => {
                    Some(Value::PrimitiveInteger(PrimitiveIntegerValue {
                        value: *from,
                        kind: *to_kind,
                    }))
                }
                Type::Float(to_kind) => Some(Value::Float(FloatValue {
                    value: *from as f64,
                    kind: *to_kind,
                })),
                Type::Integer => Some(Value::Integer(IntegerValue(*from))),
                _ => None,
            },

            Value::Float(from) => match ty.deref() {
                Type::PrimitiveInt(to_kind) => {
                    Some(Value::PrimitiveInteger(PrimitiveIntegerValue {
                        value: from.value as i128,
                        kind: *to_kind,
                    }))
                }
                Type::Float(to_kind) => Some(Value::Float(FloatValue {
                    value: from.value,
                    kind: *to_kind,
                })),
                Type::Integer => Some(Value::Integer(IntegerValue(from.value as i128))),
                _ => None,
            },

            Value::Boolean(BooleanValue(_)) => match ty.deref() {
                Type::Boolean => Some(self.clone()),
                _ => None,
            },

            Value::String(StringValue(_)) => match ty.deref() {
                Type::String(_) => Some(self.clone()),
                _ => None,
            },

            // Values that have a type to a definition
            // Check if they are the same as the type we are trying to convert to
            Value::Array(ArrayValue { ty: from_ty, .. })
            | Value::Struct(StructValue { ty: from_ty, .. })
            | Value::EnumConstant(EnumConstantValue { ty: from_ty, .. })
            | Value::AbsType(AbsTypeValue { ty: from_ty })
                if Type::identical(&ty, &Type::underlying_type(from_ty)) =>
            {
                Some(self.clone())
            }

            // Enum -> Integer
            Value::EnumConstant(value) => {
                let from_ty = value.ty();
                Value::PrimitiveInteger(PrimitiveIntegerValue {
                    value: value.value.1,
                    kind: from_ty.rep_type,
                })
                .convert(ty_a)
            }

            Value::AnonArray(anon_array) | Value::Array(ArrayValue { anon_array, .. }) => {
                let elements = match ty.deref() {
                    Type::Array(ArrayType {
                        anon_array: anon_array_ty,
                        ..
                    })
                    | Type::AnonArray(anon_array_ty) => {
                        match (anon_array_ty.size, anon_array.elements.len()) {
                            (Some(_), _) => Some(
                                anon_array
                                    .elements
                                    .iter()
                                    .filter_map(|e| e.convert(&anon_array_ty.elt_type))
                                    .collect(),
                            ),
                            (None, value_size) => {
                                let elements = std::iter::repeat_n(
                                    self.convert(&anon_array_ty.elt_type)?,
                                    value_size,
                                )
                                .collect();
                                Some(elements)
                            }
                        }
                    }
                    _ => None,
                }?;

                match ty.deref() {
                    Type::Array(_) => Some(Value::Array(ArrayValue {
                        anon_array: AnonArrayValue { elements },
                        ty: ty.clone(),
                    })),
                    Type::AnonArray(_) => Some(Value::AnonArray(AnonArrayValue { elements })),
                    _ => None,
                }
            }

            Value::AnonStruct(anon_struct) | Value::Struct(StructValue { anon_struct, .. }) => {
                let mut members = HashMap::default();

                let to_ty = match ty.deref() {
                    // TODO(tumbar) default values need to come from struct type?
                    Type::Struct(StructType { anon_struct, .. }) => anon_struct,
                    Type::AnonStruct(anon_struct) => anon_struct,
                    _ => return None,
                };

                for (name, ty) in &to_ty.members {
                    let member_value = match anon_struct.members.get(name) {
                        // Use the default value
                        None => ty.default_value()?,
                        Some(member_value) => member_value.convert(ty)?,
                    };

                    members.insert(name.clone(), member_value);
                }

                match ty.deref() {
                    Type::Struct(_) => Some(Value::Struct(StructValue {
                        anon_struct: AnonStructValue { members },
                        ty: ty_a.clone(),
                    })),
                    Type::AnonStruct(_) => Some(Value::AnonStruct(AnonStructValue { members })),
                    _ => None,
                }
            }

            _ => None,
        }
    }

    fn binop(
        &self,
        other: &Value,
        f64_op: fn(&f64, &f64) -> Result<f64, MathError>,
        i128_op: fn(&i128, &i128) -> Result<i128, MathError>,
    ) -> MathResult {
        match self {
            Value::PrimitiveInteger(PrimitiveIntegerValue {
                value: left,
                kind: kind_left,
            }) => match other {
                Value::PrimitiveInteger(PrimitiveIntegerValue {
                    value: right,
                    kind: kind_right,
                }) => {
                    if kind_left == kind_right {
                        Ok(Value::PrimitiveInteger(PrimitiveIntegerValue {
                            value: i128_op(left, right)?,
                            kind: *kind_left,
                        }))
                    } else {
                        Ok(Value::Integer(IntegerValue(i128_op(left, right)?)))
                    }
                }
                Value::Integer(IntegerValue(right)) => {
                    Ok(Value::Integer(IntegerValue(i128_op(left, right)?)))
                }
                Value::Float(FloatValue { value: right, .. }) => Ok(Value::Float(FloatValue {
                    value: f64_op(&(*left as f64), right)?,
                    kind: FloatKind::F64,
                })),
                Value::EnumConstant(
                    enum_value @ EnumConstantValue {
                        value: (_, right), ..
                    },
                ) => {
                    if enum_value.ty().rep_type == *kind_left {
                        Ok(Value::PrimitiveInteger(PrimitiveIntegerValue {
                            value: i128_op(left, right)?,
                            kind: *kind_left,
                        }))
                    } else {
                        Ok(Value::Integer(IntegerValue(i128_op(left, right)?)))
                    }
                }
                _ => Err(MathError::InvalidInputs),
            },

            Value::Integer(IntegerValue(left)) => match other {
                Value::Integer(IntegerValue(right))
                | Value::PrimitiveInteger(PrimitiveIntegerValue { value: right, .. })
                | Value::EnumConstant(EnumConstantValue {
                    value: (_, right), ..
                }) => Ok(Value::Integer(IntegerValue(i128_op(left, right)?))),
                Value::Float(FloatValue { value: right, .. }) => Ok(Value::Float(FloatValue {
                    value: f64_op(&(*left as f64), right)?,
                    kind: FloatKind::F64,
                })),
                _ => Err(MathError::InvalidInputs),
            },
            Value::Float(FloatValue {
                value: left,
                kind: left_kind,
            }) => match other {
                // Integral value + F64
                Value::Integer(IntegerValue(right))
                | Value::PrimitiveInteger(PrimitiveIntegerValue { value: right, .. })
                | Value::EnumConstant(EnumConstantValue {
                    value: (_, right), ..
                }) => Ok(Value::Float(FloatValue {
                    value: f64_op(left, &(*right as f64))?,
                    kind: FloatKind::F64,
                })),
                // Attempt to keep the same precision if we can
                Value::Float(FloatValue {
                    value: right,
                    kind: right_kind,
                }) => Ok(Value::Float(FloatValue {
                    value: f64_op(left, right)?,
                    kind: if left_kind == right_kind {
                        *left_kind
                    } else {
                        FloatKind::F64
                    },
                })),
                _ => Err(MathError::InvalidInputs),
            },
            Value::EnumConstant(value) => Value::PrimitiveInteger(PrimitiveIntegerValue {
                value: value.value.1,
                kind: value.ty().rep_type,
            })
            .binop(other, f64_op, i128_op),
            _ => Err(MathError::InvalidInputs),
        }
    }

    pub fn add(&self, other: &Value) -> MathResult {
        self.binop(
            other,
            |left, right| Ok(left + right),
            |left, right| Ok(left + right),
        )
    }

    pub fn div(&self, other: &Value) -> MathResult {
        self.binop(
            other,
            |left, right| {
                if *right == 0.0 {
                    Err(MathError::DivByZero)
                } else {
                    Ok(left / right)
                }
            },
            |left, right| {
                if *right == 0 {
                    Err(MathError::DivByZero)
                } else {
                    Ok(left / right)
                }
            },
        )
    }

    pub fn mul(&self, other: &Value) -> MathResult {
        self.binop(
            other,
            |left, right| Ok(left * right),
            |left, right| Ok(left * right),
        )
    }

    pub fn sub(&self, other: &Value) -> MathResult {
        self.binop(
            other,
            |left, right| Ok(left - right),
            |left, right| Ok(left - right),
        )
    }

    /// Extract an integer value for use as a shift operand or shift amount.
    /// Returns `None` for non-integer values.
    pub fn as_shift_int(&self) -> Option<i128> {
        match self {
            Value::Integer(IntegerValue(v)) => Some(*v),
            Value::PrimitiveInteger(PrimitiveIntegerValue { value, .. }) => Some(*value),
            Value::EnumConstant(EnumConstantValue { value: (_, v), .. }) => Some(*v),
            _ => None,
        }
    }
}

impl fmt::Display for Value {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Value::PrimitiveInteger(PrimitiveIntegerValue { value, .. }) => {
                f.write_fmt(format_args!("{value}"))
            }
            Value::AbsType(_) => f.write_str("[default value]"),
            Value::Integer(IntegerValue(value)) => f.write_fmt(format_args!("{value}")),
            Value::Float(FloatValue { value, .. }) => f.write_fmt(format_args!("{value}")),
            Value::Boolean(BooleanValue(value)) => f.write_fmt(format_args!("{value}")),
            Value::String(StringValue(value)) => f.write_fmt(format_args!("\"{value}\"")),
            Value::EnumConstant(EnumConstantValue { value, .. }) => {
                let vi = value.1 as i32;
                f.write_fmt(format_args!("{vi}"))
            }
            Value::AnonArray(_) => f.write_str("[array value]"),
            Value::Array(_) => f.write_str("[array value]"),
            Value::AnonStruct(_) => f.write_str("{struct value}"),
            Value::Struct(_) => f.write_str("{struct value}"),
        }
    }
}

pub enum MathError {
    InvalidInputs,
    DivByZero,
}

pub type MathResult = Result<Value, MathError>;

/** Primitive integer values */
#[derive(Debug, Clone)]
pub struct PrimitiveIntegerValue {
    pub value: i128,
    pub kind: fpp_ast::IntegerKind,
}

/** Integer values */
#[derive(Debug, Clone)]
pub struct IntegerValue(pub i128);

/** Floating-point values */
#[derive(Debug, Clone)]
pub struct FloatValue {
    pub value: f64,
    pub kind: FloatKind,
}

/** Boolean values */
#[derive(Debug, Clone)]
pub struct BooleanValue(pub bool);

/** String values */
#[derive(Debug, Clone)]
pub struct StringValue(pub String);

/** Anonymous array values */
#[derive(Debug, Clone)]
pub struct AnonArrayValue {
    pub elements: Vec<Value>,
}

/** Array values */
#[derive(Debug, Clone)]
pub struct ArrayValue {
    pub anon_array: AnonArrayValue,
    pub ty: Arc<Type>,
}

/** Enum constant values */
#[derive(Debug, Clone)]
pub struct EnumConstantValue {
    pub value: (String, i128),
    ty: Arc<Type>,
}

impl EnumConstantValue {
    pub fn new(member_name: String, value: i128, ty: Arc<Type>) -> EnumConstantValue {
        match ty.deref() {
            Type::Enum(_) => (),
            _ => {
                panic!("expected enum type")
            }
        }

        EnumConstantValue {
            value: (member_name, value),
            ty,
        }
    }

    pub fn ty(&self) -> &EnumType {
        match self.ty.deref() {
            Type::Enum(e_ty) => e_ty,
            _ => {
                panic!("expected enum type")
            }
        }
    }
}

#[derive(Debug, Clone)]
pub struct AnonStructValue {
    pub members: HashMap<String, Value>,
}

#[derive(Debug, Clone)]
pub struct StructValue {
    pub anon_struct: AnonStructValue,
    ty: Arc<Type>,
}

#[derive(Debug, Clone)]
pub struct AbsTypeValue {
    ty: Arc<Type>,
}
