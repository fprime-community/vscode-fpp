use crate::util::{camel_to_snake_case, ident_with_prefix};
use quote::{quote, quote_spanned};
use syn::spanned::Spanned;

fn has_attr(attrs: &[syn::Attribute], name: &str) -> bool {
    let mut found = false;
    attrs.iter().for_each(|attr| {
        if !attr.path().is_ident("visitable") {
            return;
        }
        let _ = attr.parse_nested_meta(|nested| {
            if nested.path.is_ident(name) {
                found = true;
            }
            Ok(())
        });
    });
    found
}

pub(super) fn walkable_visit_derive(
    mut s: synstructure::Structure<'_>,
) -> proc_macro2::TokenStream {
    if let syn::Data::Union(_) = s.ast().data {
        panic!("cannot derive on union")
    }

    let type_name = &s.ast().ident;
    let visit_function_name = ident_with_prefix("visit_", &camel_to_snake_case(type_name));

    s.add_bounds(synstructure::AddBounds::Generics);

    // Ignore all fields that are manually specified to ignore or that
    // are internal to the AST Node
    s.filter_variants(|v| !has_attr(v.ast().attrs, "ignore"));
    s.filter(|f| {
        let field_name = match &f.ast().ident {
            None => "".to_string(),
            Some(ident) => ident.to_string(),
        };

        !(has_attr(&f.ast().attrs, "ignore") || field_name == "node_id")
    });

    let ref_visit = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span=> crate::visit::Visitable::visit(#bind, a, __visitor)? }
    });

    s.bind_with(|_| synstructure::BindStyle::RefMut);
    let mut_visit = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span => crate::visit::MutVisitable::visit_mut(#bind, a, __visitor)? }
    });

    s.gen_impl(quote! {
        gen impl<'__ast, __V> crate::visit::Walkable<'__ast, __V> for @Self
            where __V: crate::visit::Visitor<'__ast>,
        {
            fn walk(&'__ast self, a: &mut __V::State, __visitor: &__V) -> std::ops::ControlFlow<__V::Break> {
                match *self { #ref_visit }

                std::ops::ControlFlow::Continue(())
            }
        }

        gen impl<'__ast, __V> crate::Visitable<'__ast, __V> for @Self
            where __V: crate::visit::Visitor<'__ast>,
        {
            fn visit(&'__ast self, a: &mut __V::State, visitor: &__V) -> ::std::ops::ControlFlow<__V::Break> {
                visitor.#visit_function_name(a, self)
            }
        }

        gen impl<__V> crate::visit::MutWalkable<__V> for @Self
            where __V: crate::visit::MutVisitor,
        {
            fn walk_mut(&mut self, a: &mut __V::State, __visitor: &__V) -> std::ops::ControlFlow<__V::Break> {
                match *self { #mut_visit }

                std::ops::ControlFlow::Continue(())
            }
        }

        gen impl<__V> crate::MutVisitable<__V> for @Self
            where __V: crate::visit::MutVisitor,
        {
            fn visit_mut(&mut self, a: &mut __V::State, visitor: &__V) -> ::std::ops::ControlFlow<__V::Break> {
                visitor.#visit_function_name(a, self)
            }
        }
    })
}

pub(super) fn walkable_direct_derive(
    mut s: synstructure::Structure<'_>,
) -> proc_macro2::TokenStream {
    if let syn::Data::Union(_) = s.ast().data {
        panic!("cannot derive on union")
    }

    s.add_bounds(synstructure::AddBounds::Generics);

    // Ignore all fields that are manually specified to ignore or that
    // are internal to the AST Node
    s.filter_variants(|v| !has_attr(v.ast().attrs, "ignore"));
    s.filter(|f| {
        let field_name = match &f.ast().ident {
            None => "".to_string(),
            Some(ident) => ident.to_string(),
        };

        !(has_attr(&f.ast().attrs, "ignore") || field_name == "node_id")
    });

    s.bind_with(|_| synstructure::BindStyle::Ref);
    let ref_visit = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span => crate::visit::Visitable::visit(#bind, a, __visitor)? }
    });

    s.bind_with(|_| synstructure::BindStyle::RefMut);
    let mut_visit = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span => crate::visit::MutVisitable::visit_mut(#bind, a, __visitor)? }
    });

    s.gen_impl(quote! {
        gen impl<'__ast, __V> crate::visit::Walkable<'__ast, __V> for @Self
            where __V: crate::visit::Visitor<'__ast>,
        {
            fn walk(&'__ast self, a: &mut __V::State, __visitor: &__V) -> std::ops::ControlFlow<__V::Break> {
                match *self { #ref_visit }
                std::ops::ControlFlow::Continue(())
            }
        }

        gen impl<'__ast, __V> crate::Visitable<'__ast, __V> for @Self
            where __V: crate::visit::Visitor<'__ast>,
        {
            fn visit(&'__ast self, a: &mut __V::State, visitor: &__V) -> ::std::ops::ControlFlow<__V::Break> {
                self.walk(a, visitor)
            }
        }

        gen impl<__V> crate::visit::MutWalkable<__V> for @Self
            where __V: crate::visit::MutVisitor,
        {
            fn walk_mut(&mut self, a: &mut __V::State, __visitor: &__V) -> std::ops::ControlFlow<__V::Break> {
                match *self { #mut_visit }
                std::ops::ControlFlow::Continue(())
            }
        }

        gen impl<__V> crate::MutVisitable<__V> for @Self
            where __V: crate::visit::MutVisitor,
        {
            fn visit_mut(&mut self, a: &mut __V::State, visitor: &__V) -> ::std::ops::ControlFlow<__V::Break> {
                self.walk_mut(a, visitor)
            }
        }
    })
}

pub(super) fn walkable_direct_ref_derive(
    mut s: synstructure::Structure<'_>,
) -> proc_macro2::TokenStream {
    if let syn::Data::Union(_) = s.ast().data {
        panic!("cannot derive on union")
    }

    s.add_bounds(synstructure::AddBounds::Generics);

    // Ignore all fields that are manually specified to ignore or that
    // are internal to the AST Node
    s.filter_variants(|v| !has_attr(v.ast().attrs, "ignore"));
    s.filter(|f| {
        let field_name = match &f.ast().ident {
            None => "".to_string(),
            Some(ident) => ident.to_string(),
        };

        !(has_attr(&f.ast().attrs, "ignore") || field_name == "node_id")
    });

    s.bind_with(|_| synstructure::BindStyle::Move);
    let ref_visit = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span => crate::visit::Walkable::walk(#bind, a, __visitor)? }
    });

    let node_get = s.each(|bind| {
        let span = bind.ast().span();
        quote_spanned! { span => #bind.id() }
    });

    s.gen_impl(quote! {
        gen impl crate::AstNode for @Self {
            fn id(&self) -> fpp_core::Node {
                match self { #node_get }
            }
        }

        gen impl fpp_core::Spanned for @Self {
            fn span(&self) -> Span {
                self.id().span()
            }
        }

        gen impl<__V> crate::visit::MoveWalkable<'a, __V> for @Self
            where __V: crate::visit::Visitor<'a>,
        {
            fn walk(self, a: &mut __V::State, __visitor: &__V) -> std::ops::ControlFlow<__V::Break> {
                match self { #ref_visit }
                std::ops::ControlFlow::Continue(())
            }
        }
    })
}
