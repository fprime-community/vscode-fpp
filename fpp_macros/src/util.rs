use proc_macro2::Ident;

pub(crate) fn camel_to_snake_case(ident: &Ident) -> Ident {
    let name = ident.to_string();
    let mut snake_case_name = String::new();
    let mut prev_char_is_upper = false; // To handle consecutive uppercase letters

    for (i, c) in name.chars().enumerate() {
        if c.is_ascii_uppercase() {
            // Insert underscore if it's not the first character and not a consecutive uppercase
            if i > 0 && !prev_char_is_upper {
                snake_case_name.push('_');
            }
            snake_case_name.push(c.to_ascii_lowercase());
            prev_char_is_upper = true;
        } else {
            snake_case_name.push(c);
            prev_char_is_upper = false;
        }
    }
    Ident::new(&snake_case_name, ident.span())
}

pub(crate) fn ident_with_suffix(ident: &Ident, suffix: &str) -> Ident {
    Ident::new(&(ident.to_string() + suffix), ident.span())
}

pub(crate) fn ident_with_prefix(prefix: &str, ident: &Ident) -> Ident {
    Ident::new(&(prefix.to_string() + &ident.to_string()), ident.span())
}
