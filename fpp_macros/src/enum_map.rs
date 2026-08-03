use crate::util::{camel_to_snake_case, ident_with_prefix, ident_with_suffix};
use quote::quote;
use syn::{Fields, ItemEnum};

pub(super) fn enum_map(input: ItemEnum) -> proc_macro2::TokenStream {
    let enum_ident = &input.ident;
    let map_ident = ident_with_suffix(enum_ident, "Map");
    let vis = input.vis;

    let mut members = vec![];
    let mut ref_arms = vec![];
    let mut mut_arms = vec![];
    let mut member_init = vec![];
    let mut iter_arms = vec![];

    for v in &input.variants {
        match &v.fields {
            Fields::Unit => {
                let var_ident = &v.ident;
                let member_ident = ident_with_prefix("_", &camel_to_snake_case(&v.ident));
                members.push(quote! { #member_ident: V, });
                ref_arms.push(quote! { #enum_ident::#var_ident => &self.#member_ident, });
                mut_arms.push(quote! { #enum_ident::#var_ident => &mut self.#member_ident, });
                member_init.push(quote! { #member_ident: v(#enum_ident::#var_ident), });
                iter_arms.push(quote! { #enum_ident::#var_ident, });
            }
            _ => {
                // Return a compile_error if user applied macro on unsupported struct
                let err = syn::Error::new_spanned(
                    &v.ident,
                    "EnumMap only supports enum with unit variants",
                )
                .to_compile_error();
                return err;
            }
        }
    }

    quote! {
        #[derive(Debug)]
        #vis struct #map_ident<V> {
            #( #members )*
        }

        impl<V> ::fpp_util::EnumMap<#enum_ident, V> for #map_ident<V> {
            fn new(v: fn(#enum_ident) -> V) -> Self {
                #map_ident {
                    # ( #member_init )*
                }
            }

            fn get(&self, k: #enum_ident) -> &V {
                match k {
                    # ( #ref_arms )*
                }
            }

            fn get_mut(&mut self, k: #enum_ident) -> &mut V {
                match k {
                    # ( #mut_arms )*
                }
            }
        }

        impl #enum_ident {
            pub fn all() -> impl Iterator<Item=Self> {
                vec![
                    # ( #iter_arms )*
                ].into_iter()
            }
        }
    }
}
