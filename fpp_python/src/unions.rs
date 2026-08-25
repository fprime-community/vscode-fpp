//! Closed-union return types for `Value`, `Type`, `Symbol`, `PortInstance`, and
//! `StateMachineElement`.
//!
//! Each closed union is modeled as a renamed base class (`ValueBase`, ...) with
//! one `#[pyclass(extends = Base)]` subclass per native variant, plus a Python
//! union *alias* under the original name (`Value = IntegerValue | ... `).
//!
//! Getters that return one of these hand back a `*Ref` newtype wrapping the
//! concrete subclass object: at runtime it *is* the subclass, and its stub type
//! renders as the alias name (via `PyStubType::type_output -> unqualified`).
//! [`union_aliases`] feeds the alias definition lines into the stub generator
//! (`bin/stub_gen`), and [`register`] adds the runtime `types.UnionType` object
//! so `from fpp_python import Value` and `isinstance(x, Value)` work.

use pyo3::prelude::*;
use pyo3_stub_gen::TypeInfo;

/// Define a union `*Ref` newtype + its alias metadata for one closed union.
///
/// `$ref` is the newtype (e.g. `ValueRef`), `$alias` the Python alias name, and
/// the list is every concrete member class (subclasses, plus the base itself
/// when a bare-base instance is reachable — e.g. `TypeBase` for the unknown type).
macro_rules! py_union {
    ($ref:ident => $alias:literal : $($sub:path),+ $(,)?) => {
        /// A return-site wrapper: the runtime object is the concrete subclass; the
        /// stub type is the union alias.
        pub struct $ref(pub PyObject);

        impl<'py> ::pyo3::IntoPyObject<'py> for $ref {
            type Target = ::pyo3::PyAny;
            type Output = ::pyo3::Bound<'py, ::pyo3::PyAny>;
            type Error = ::std::convert::Infallible;
            fn into_pyobject(
                self,
                py: ::pyo3::Python<'py>,
            ) -> ::std::result::Result<Self::Output, Self::Error> {
                ::std::result::Result::Ok(self.0.into_bound(py))
            }
        }

        impl ::pyo3_stub_gen::PyStubType for $ref {
            fn type_output() -> TypeInfo {
                TypeInfo::unqualified($alias)
            }
        }

        impl $ref {
            /// The Python alias name this union is exposed under.
            pub const ALIAS: &'static str = $alias;

            /// The `Sub1 | Sub2 | …` expansion used as the `.pyi` alias RHS.
            pub fn union_typeinfo() -> TypeInfo {
                let parts: ::std::vec::Vec<TypeInfo> =
                    ::std::vec![ $( <$sub as ::pyo3_stub_gen::PyStubType>::type_output() ),+ ];
                parts
                    .into_iter()
                    .reduce(|a, b| a | b)
                    .expect("a union has at least one member")
            }

            /// Add the runtime `types.UnionType` object under the alias name.
            pub fn register_union(m: &Bound<'_, PyModule>) -> PyResult<()> {
                let py = m.py();
                let classes: ::std::vec::Vec<Bound<'_, PyAny>> =
                    ::std::vec![ $( py.get_type::<$sub>().into_any() ),+ ];
                let mut it = classes.into_iter();
                let mut acc = it.next().expect("a union has at least one member");
                for c in it {
                    acc = acc.call_method1("__or__", (c,))?;
                }
                m.add($alias, acc)
            }
        }
    };
}

py_union!(ValueRef => "Value" :
    crate::sem_py::IntegerValue,
    crate::sem_py::PrimitiveIntegerValue,
    crate::sem_py::FloatValue,
    crate::sem_py::BooleanValue,
    crate::sem_py::StringValue,
    crate::sem_py::EnumConstantValue,
    crate::sem_py::ArrayValue,
    crate::sem_py::AnonArrayValue,
    crate::sem_py::StructValue,
    crate::sem_py::AnonStructValue,
    crate::sem_py::AbsTypeValue,
);

// `TypeBase` is included: the synthetic "unknown" type is a bare-base instance.
py_union!(TypeRef => "Type" :
    crate::sem_py::PrimitiveIntType,
    crate::sem_py::FloatType,
    crate::sem_py::BooleanType,
    crate::sem_py::IntegerType,
    crate::sem_py::StringType,
    crate::sem_py::AbsType,
    crate::sem_py::AliasType,
    crate::sem_py::ArrayType,
    crate::sem_py::AnonArrayType,
    crate::sem_py::EnumType,
    crate::sem_py::StructType,
    crate::sem_py::AnonStructType,
    crate::sem_py::Type,
);

py_union!(SymbolRef => "Symbol" :
    crate::sem_py::AbsTypeSymbol,
    crate::sem_py::AliasTypeSymbol,
    crate::sem_py::ArraySymbol,
    crate::sem_py::ComponentSymbol,
    crate::sem_py::ComponentInstanceSymbol,
    crate::sem_py::ConstantSymbol,
    crate::sem_py::EnumSymbol,
    crate::sem_py::EnumConstantSymbol,
    crate::sem_py::InterfaceSymbol,
    crate::sem_py::ModuleSymbol,
    crate::sem_py::PortSymbol,
    crate::sem_py::StateMachineSymbol,
    crate::sem_py::StructSymbol,
    crate::sem_py::SystemSymbol,
    crate::sem_py::TopologySymbol,
);

py_union!(PortInstanceRef => "PortInstance" :
    crate::entities_py::GeneralPortInstance,
    crate::entities_py::SpecialPortInstance,
    crate::entities_py::InternalPortInstance,
    crate::entities_py::TopologyPortInstance,
);

py_union!(StateMachineElementRef => "StateMachineElement" :
    crate::entities_py::SmAction,
    crate::entities_py::SmGuard,
    crate::entities_py::SmSignal,
    crate::entities_py::SmState,
    crate::entities_py::SmChoice,
);

/// `(alias name, `Sub1 | Sub2 | …` RHS)` for every closed union, consumed by the
/// stub generator to emit `<Alias>: typing.TypeAlias = …` lines.
pub fn union_aliases() -> Vec<(&'static str, String)> {
    vec![
        (ValueRef::ALIAS, ValueRef::union_typeinfo().name),
        (TypeRef::ALIAS, TypeRef::union_typeinfo().name),
        (SymbolRef::ALIAS, SymbolRef::union_typeinfo().name),
        (
            PortInstanceRef::ALIAS,
            PortInstanceRef::union_typeinfo().name,
        ),
        (
            StateMachineElementRef::ALIAS,
            StateMachineElementRef::union_typeinfo().name,
        ),
    ]
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    ValueRef::register_union(m)?;
    TypeRef::register_union(m)?;
    SymbolRef::register_union(m)?;
    PortInstanceRef::register_union(m)?;
    StateMachineElementRef::register_union(m)?;
    Ok(())
}
