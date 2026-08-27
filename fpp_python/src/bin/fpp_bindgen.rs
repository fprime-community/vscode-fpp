//! Declaration emitter for the native FPP AST bindings.
//!
//! Parses the `fpp_ast` source (a pinned fpp-tools checkout) with `syn` and
//! emits ONE small, checked-in file — `fpp_python/src/ast/defs.rs` — containing a
//! `fpp_python_macros::fpp_ast_bindings! { … }` invocation: a clean, readable ~1:1
//! declaration of the `fpp_ast` grammar (nodes / unions / kind-enums / leaves).
//! The `fpp_ast_bindings!` proc macro expands that declaration at compile time
//! into the PyO3 node wrappers + the recording walk.
//!
//! This tool is just parse + classify + a DSL pretty-printer; all wrapper/walk
//! emission lives in `fpp_python_macros::ast_bindings`. There is no owned
//! per-node IR: wrappers read the parsed AST directly.
//!
//! Classification reuses the annotations the fpp-tools proc-macros already
//! consume: `#[ast]` on a struct = a node; `#[ast]` on an enum = a transparent
//! union; a non-`#[ast]` enum deriving a `*Walkable` = a "kind enum"; any other
//! enum = a "leaf enum" (rendered to a string); `#[visitable(ignore)]` = scalar
//! leaf. `Name` collapses to a Python `str`; `Ident` stays a node.
//!
//! The `fpp_ast` source dir and version are resolved from `cargo metadata` (the
//! version is stamped into the generated file's header, making the codegen-drift
//! CI check version-sensitive). The CLI path arg overrides the resolved source
//! dir; `--fpp-version` / `--out` override the rest.

// `name` fields on the def structs are retained for debugging/inspection.
#![allow(dead_code)]

use std::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};
use std::process::Command;
use syn::{Attribute, Fields, GenericArgument, Item, PathArguments, Type};

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, PartialEq, Eq)]
enum Card {
    One,
    Opt,
    Vec,
    OptVec,
}

#[derive(Clone)]
enum Shape {
    Str,
    Bool,
    Leaf(String), // leaf enum -> String (rendered)
    LeafOpt(String),
    Lit, // LitString -> its .data String
    LitOpt,
    Skip,                // scalar we don't model (e.g. fpp_core::Span)
    Name,                // fpp_ast::Name -> String (collapsed)
    Child(Card, String), // node type (struct or union), or Ident
    Kind(String),        // inline kind-enum field
}

struct FieldDef {
    name: String,
    shape: Shape,
}

struct StructDef {
    name: String,
    fields: Vec<FieldDef>,
}

struct UnionDef {
    name: String,
    variants: Vec<(String, String)>, // (variant ident, inner node type)
}

enum KindField {
    Unnamed(Shape),       // single-field tuple variant payload
    Named(Vec<FieldDef>), // struct variant
    Unit,
}

struct KindVariant {
    name: String,
    field: KindField,
}

struct KindDef {
    name: String,
    variants: Vec<KindVariant>,
}

/// Whether a leaf-enum variant carries a payload (dropped in the Python mirror).
#[derive(Clone, Copy, PartialEq, Eq)]
enum Payload {
    Unit,
    Tuple,
    Struct,
}

#[derive(Default)]
struct Registry {
    node_structs: BTreeMap<String, StructDef>,
    unions: BTreeMap<String, UnionDef>,
    kinds: BTreeMap<String, KindDef>,
    leaf_enums: BTreeSet<String>,
    // leaf enum -> its variants (name + payload kind), for the Python-enum mirror
    leaf_defs: BTreeMap<String, Vec<(String, Payload)>>,
    aliases: BTreeMap<String, Type>,
    // categorization sets (name membership)
    is_node: BTreeSet<String>,
    is_union: BTreeSet<String>,
    is_kind: BTreeSet<String>,
    // leaf enums actually referenced (need a Python-enum mirror)
    used_leaves: BTreeSet<String>,
}

const EXCLUDE_NODE: &[&str] = &["Name"]; // collapsed to str; never a node wrapper

/// Node wrappers whose Python name collides with a hand-written entity in the
/// native crate; they are built during navigation but must not be stubbed
/// (the entity of the same name is) and are opaque when appearing as children.
/// Emitted into the DSL's `shadowed {…}` section (consumed by the macro).
const ENTITY_SHADOWED: &[&str] = &["Connection", "PortInstanceIdentifier"];

/// Resolved codegen inputs/outputs (CLI overrides layered over `cargo metadata`).
struct Config {
    fpp_src: PathBuf,
    version: String,
    /// Path of the single declaration file to write (`fpp_python/src/ast/defs.rs`).
    out_file: PathBuf,
}

fn main() {
    let cfg = resolve_config();

    let files = ["lib.rs", "component.rs", "topology.rs", "state_machine.rs"];
    let mut items: Vec<Item> = Vec::new();
    for f in files {
        let path = cfg.fpp_src.join(f);
        let src = std::fs::read_to_string(&path)
            .unwrap_or_else(|e| panic!("read {}: {e}", path.display()));
        let file =
            syn::parse_file(&src).unwrap_or_else(|e| panic!("parse {}: {e}", path.display()));
        items.extend(file.items);
    }

    let reg = build_registry(&items);
    write_defs(&cfg.out_file, &reg, &cfg.version);

    eprintln!(
        "fpp_bindgen: fpp_ast v{} (src {}) -> {} (declarations: {} nodes, {} unions, {} kinds, {} leaves)",
        cfg.version,
        cfg.fpp_src.display(),
        cfg.out_file.display(),
        reg.node_structs.len(),
        reg.unions.len(),
        reg.kinds.len(),
        reg.used_leaves.len()
    );
}

/// Layer CLI args over values resolved from `cargo metadata`. CLI wins; metadata
/// is next; hard-coded defaults are the final fallback (so the tool still runs if
/// `cargo metadata` is unavailable).
fn resolve_config() -> Config {
    // CLI: flags plus up to two positionals ([fpp_src] [out_file]) for back-compat.
    let mut cli_src: Option<PathBuf> = None;
    let mut cli_version: Option<String> = None;
    let mut cli_out: Option<PathBuf> = None;
    let mut positional: Vec<String> = Vec::new();
    let mut it = std::env::args().skip(1);
    while let Some(arg) = it.next() {
        match arg.as_str() {
            "--fpp-src" => cli_src = it.next().map(PathBuf::from),
            "--fpp-version" => cli_version = it.next(),
            "--out" => cli_out = it.next().map(PathBuf::from),
            _ => positional.push(arg),
        }
    }
    if cli_src.is_none() {
        cli_src = positional.first().map(PathBuf::from);
    }
    if cli_out.is_none() {
        cli_out = positional.get(1).map(PathBuf::from);
    }

    let (meta_src, meta_version) = cargo_metadata_fpp_ast();

    Config {
        fpp_src: cli_src
            .or(meta_src)
            .unwrap_or_else(|| PathBuf::from("fpp_ast/src")),
        version: cli_version
            .or(meta_version)
            .unwrap_or_else(|| "unknown".to_string()),
        out_file: cli_out.unwrap_or_else(|| PathBuf::from("fpp_python/src/ast/defs.rs")),
    }
}

/// Resolve the `fpp_ast` dependency's `src/` dir and version from `cargo
/// metadata`. Best-effort: any failure returns `(None, None)` so the caller
/// falls back to defaults / CLI overrides.
fn cargo_metadata_fpp_ast() -> (Option<PathBuf>, Option<String>) {
    let cargo = std::env::var("CARGO").unwrap_or_else(|_| "cargo".to_string());
    let output = match Command::new(cargo)
        .args(["metadata", "--format-version", "1"])
        .output()
    {
        Ok(o) if o.status.success() => o,
        _ => return (None, None),
    };
    let meta: serde_json::Value = match serde_json::from_slice(&output.stdout) {
        Ok(v) => v,
        Err(_) => return (None, None),
    };
    let Some(packages) = meta.get("packages").and_then(|p| p.as_array()) else {
        return (None, None);
    };
    for pkg in packages {
        if pkg.get("name").and_then(|n| n.as_str()) != Some("fpp_ast") {
            continue;
        }
        let version = pkg
            .get("version")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string());
        // manifest_path is `.../fpp_ast/Cargo.toml`; the sources live in `src/`.
        let src = pkg.get("manifest_path").and_then(|m| m.as_str()).map(|m| {
            let mut pb = PathBuf::from(m);
            pb.pop();
            pb.push("src");
            pb
        });
        return (src, version);
    }
    (None, None)
}

/// `// @generated ...` header stamped atop the declaration file. The `fpp_ast`
/// version is baked in so bumping the dependency changes the header, tripping the
/// drift check until the code is regenerated.
fn generated_stamp(version: &str) -> String {
    format!("// @generated by fpp_bindgen from fpp_ast v{version} — do not edit\n")
}

// ---------------------------------------------------------------------------
// Registry building
// ---------------------------------------------------------------------------

fn build_registry(items: &[Item]) -> Registry {
    let mut reg = Registry::default();

    // Pass 1: categorize every type by name.
    for item in items {
        match item {
            Item::Struct(s) if has_ast(&s.attrs) => {
                let name = s.ident.to_string();
                if !EXCLUDE_NODE.contains(&name.as_str()) {
                    reg.is_node.insert(name);
                }
            }
            Item::Enum(e) if has_ast(&e.attrs) => {
                reg.is_union.insert(e.ident.to_string());
            }
            Item::Enum(e) if has_derive_walkable(&e.attrs) => {
                reg.is_kind.insert(e.ident.to_string());
            }
            Item::Enum(e) => {
                let name = e.ident.to_string();
                reg.leaf_enums.insert(name.clone());
                let variants = e
                    .variants
                    .iter()
                    .map(|v| {
                        let payload = match &v.fields {
                            Fields::Unit => Payload::Unit,
                            Fields::Unnamed(_) => Payload::Tuple,
                            Fields::Named(_) => Payload::Struct,
                        };
                        (v.ident.to_string(), payload)
                    })
                    .collect();
                reg.leaf_defs.insert(name, variants);
            }
            Item::Type(t) => {
                reg.aliases.insert(t.ident.to_string(), (*t.ty).clone());
            }
            _ => {}
        }
    }
    // `Ident` is an #[ast] node; make sure it's treated as a node target.
    reg.is_node.insert("Ident".to_string());

    // Pass 2: build defs, classifying fields against the category sets.
    for item in items {
        match item {
            Item::Struct(s) if has_ast(&s.attrs) => {
                let name = s.ident.to_string();
                if EXCLUDE_NODE.contains(&name.as_str()) {
                    continue;
                }
                let (fields, used) = classify_fields(&s.fields, &reg);
                reg.node_structs
                    .insert(name.clone(), StructDef { name, fields });
                for l in used {
                    reg.used_leaves.insert(l);
                }
            }
            Item::Enum(e) if has_ast(&e.attrs) => {
                let mut variants = Vec::new();
                for v in &e.variants {
                    if let Fields::Unnamed(f) = &v.fields
                        && let Some(first) = f.unnamed.first()
                        && let Some(inner) = type_last_ident(&first.ty)
                    {
                        variants.push((v.ident.to_string(), inner));
                    }
                }
                reg.unions.insert(
                    e.ident.to_string(),
                    UnionDef {
                        name: e.ident.to_string(),
                        variants,
                    },
                );
            }
            Item::Enum(e) if has_derive_walkable(&e.attrs) => {
                let mut variants = Vec::new();
                let mut used = Vec::new();
                for v in &e.variants {
                    // A `#[visitable(ignore)]` variant is a scalar leaf: its
                    // payload (String / bool / a leaf enum) is not a child node.
                    let vign = has_visitable_ignore(&v.attrs);
                    let field = match &v.fields {
                        Fields::Unit => KindField::Unit,
                        Fields::Unnamed(f) => {
                            let first = f.unnamed.first().unwrap();
                            let sh = classify_one(&first.attrs, &first.ty, &reg, &mut used, vign);
                            KindField::Unnamed(sh)
                        }
                        Fields::Named(f) => {
                            let mut fields = Vec::new();
                            for fd in &f.named {
                                let sh = classify_one(&fd.attrs, &fd.ty, &reg, &mut used, vign);
                                fields.push(FieldDef {
                                    name: fd.ident.as_ref().unwrap().to_string(),
                                    shape: sh,
                                });
                            }
                            KindField::Named(fields)
                        }
                    };
                    variants.push(KindVariant {
                        name: v.ident.to_string(),
                        field,
                    });
                }
                reg.kinds.insert(
                    e.ident.to_string(),
                    KindDef {
                        name: e.ident.to_string(),
                        variants,
                    },
                );
                for l in used {
                    reg.used_leaves.insert(l);
                }
            }
            _ => {}
        }
    }

    reg
}

fn classify_fields(fields: &Fields, reg: &Registry) -> (Vec<FieldDef>, Vec<String>) {
    let mut out = Vec::new();
    let mut used = Vec::new();
    if let Fields::Named(named) = fields {
        for f in &named.named {
            let name = f.ident.as_ref().unwrap().to_string();
            if name == "node_id" {
                continue;
            }
            let shape = classify_one(&f.attrs, &f.ty, reg, &mut used, false);
            out.push(FieldDef { name, shape });
        }
    }
    (out, used)
}

fn classify_one(
    attrs: &[Attribute],
    ty: &Type,
    reg: &Registry,
    used: &mut Vec<String>,
    force_ignore: bool,
) -> Shape {
    let (card, inner) = container(ty);
    let name = type_last_ident(&inner).unwrap_or_default();
    if force_ignore || has_visitable_ignore(attrs) {
        return match name.as_str() {
            "String" => Shape::Str,
            "bool" => Shape::Bool,
            "LitString" => {
                if card == Card::Opt {
                    Shape::LitOpt
                } else {
                    Shape::Lit
                }
            }
            "Span" => Shape::Skip,
            n if reg.leaf_enums.contains(n) => {
                used.push(n.to_string());
                if card == Card::Opt {
                    Shape::LeafOpt(n.to_string())
                } else {
                    Shape::Leaf(n.to_string())
                }
            }
            _ => Shape::Skip,
        };
    }
    // Non-ignored -> child / name / kind.
    match name.as_str() {
        "Name" => Shape::Name,
        n if reg.is_kind.contains(n) => Shape::Kind(n.to_string()),
        n if reg.aliases.contains_key(n) && card == Card::One => {
            // Resolve the alias (e.g. FormalParamList = Vec<FormalParam>).
            let (c2, inner2) = container(&reg.aliases[n]);
            let n2 = type_last_ident(&inner2).unwrap_or_default();
            Shape::Child(c2, n2)
        }
        n => Shape::Child(card, n.to_string()),
    }
}

// ---------------------------------------------------------------------------
// syn helpers
// ---------------------------------------------------------------------------

fn has_ast(attrs: &[Attribute]) -> bool {
    attrs.iter().any(|a| a.path().is_ident("ast"))
}

fn has_derive_walkable(attrs: &[Attribute]) -> bool {
    let mut found = false;
    for a in attrs {
        if !a.path().is_ident("derive") {
            continue;
        }
        let _ = a.parse_nested_meta(|m| {
            if let Some(id) = m.path.get_ident() {
                let s = id.to_string();
                if s == "VisitorWalkable" || s == "DirectWalkable" {
                    found = true;
                }
            }
            Ok(())
        });
    }
    found
}

fn has_visitable_ignore(attrs: &[Attribute]) -> bool {
    let mut found = false;
    for a in attrs {
        if !a.path().is_ident("visitable") {
            continue;
        }
        let _ = a.parse_nested_meta(|m| {
            if m.path.is_ident("ignore") {
                found = true;
            }
            Ok(())
        });
    }
    found
}

fn type_last_ident(ty: &Type) -> Option<String> {
    if let Type::Path(p) = ty {
        return p.path.segments.last().map(|s| s.ident.to_string());
    }
    None
}

fn inner_generic(ty: &Type) -> Option<Type> {
    if let Type::Path(p) = ty
        && let Some(seg) = p.path.segments.last()
        && let PathArguments::AngleBracketed(a) = &seg.arguments
    {
        for arg in &a.args {
            if let GenericArgument::Type(t) = arg {
                return Some(t.clone());
            }
        }
    }
    None
}

fn peel_box(ty: &Type) -> Type {
    if let Some(name) = type_last_ident(ty)
        && name == "Box"
        && let Some(inner) = inner_generic(ty)
    {
        return peel_box(&inner);
    }
    ty.clone()
}

/// Determine cardinality + the innermost payload type (Box is transparent).
fn container(ty: &Type) -> (Card, Type) {
    let ty = peel_box(ty);
    let name = type_last_ident(&ty).unwrap_or_default();
    if name == "Option"
        && let Some(inner) = inner_generic(&ty)
    {
        let inner = peel_box(&inner);
        if type_last_ident(&inner).as_deref() == Some("Vec")
            && let Some(elt) = inner_generic(&inner)
        {
            return (Card::OptVec, peel_box(&elt));
        }
        return (Card::Opt, inner);
    }
    if name == "Vec"
        && let Some(inner) = inner_generic(&ty)
    {
        return (Card::Vec, peel_box(&inner));
    }
    (Card::One, ty)
}

// ---------------------------------------------------------------------------
// Emit: the DSL declaration file (fpp_python/src/ast/defs.rs)
// ---------------------------------------------------------------------------

/// Render a field/variant `Shape` back to its DSL type expression, or `None` for
/// `Skip` (a scalar we don't model — omitted from the declaration entirely).
fn shape_type_expr(shape: &Shape) -> Option<String> {
    let s = match shape {
        Shape::Str => "String".to_string(),
        Shape::Bool => "bool".to_string(),
        Shape::Lit => "LitString".to_string(),
        Shape::LitOpt => "LitString?".to_string(),
        Shape::Name => "Name".to_string(),
        Shape::Leaf(e) => e.clone(),
        Shape::LeafOpt(e) => format!("{e}?"),
        Shape::Kind(k) => k.clone(),
        Shape::Child(card, t) => match card {
            Card::One => t.clone(),
            Card::Opt => format!("{t}?"),
            Card::Vec => format!("[{t}]"),
            Card::OptVec => format!("[{t}]?"),
        },
        Shape::Skip => return None,
    };
    Some(s)
}

/// Emit the `fpp_python_macros::fpp_ast_bindings! { … }` body from the registry.
/// Deterministic (all maps/sets are `BTree*`, field order is source order) so
/// re-running is byte-idempotent — this is what the CI drift check compares.
fn emit_defs(reg: &Registry) -> String {
    let mut out = String::new();
    out.push_str("fpp_python_macros::fpp_ast_bindings! {\n");

    // leaves { … } — the leaf enums actually referenced, each with its variants
    // (payload-carrying variants marked `V(_)` / `V{_}`), rendered as Python enums.
    if !reg.used_leaves.is_empty() {
        out.push_str("    leaves {\n");
        for l in &reg.used_leaves {
            let variants = reg.leaf_defs.get(l).map(Vec::as_slice).unwrap_or(&[]);
            let rendered: Vec<String> = variants
                .iter()
                .map(|(name, payload)| match payload {
                    Payload::Unit => name.clone(),
                    Payload::Tuple => format!("{name}(_)"),
                    Payload::Struct => format!("{name}{{_}}"),
                })
                .collect();
            out.push_str(&format!("        {l} {{ {} }},\n", rendered.join(", ")));
        }
        out.push_str("    }\n\n");
    }

    // shadowed { … } — entity-shadowed node names (no stub; opaque as children).
    let shadowed: Vec<&str> = ENTITY_SHADOWED
        .iter()
        .copied()
        .filter(|s| reg.node_structs.contains_key(*s))
        .collect();
    if !shadowed.is_empty() {
        out.push_str(&format!("    shadowed {{ {} }}\n\n", shadowed.join(", ")));
    }

    // node <Name> { <field>: <type>, … } — fields in source order; Skip omitted.
    for (name, def) in &reg.node_structs {
        let lines: Vec<String> = def
            .fields
            .iter()
            .filter_map(|f| {
                shape_type_expr(&f.shape).map(|t| format!("        {}: {},\n", f.name, t))
            })
            .collect();
        if lines.is_empty() {
            out.push_str(&format!("    node {name} {{}}\n\n"));
        } else {
            out.push_str(&format!("    node {name} {{\n"));
            out.push_str(&lines.concat());
            out.push_str("    }\n\n");
        }
    }

    // union <Name> { <Variant>(<Inner>), … }.
    for (name, def) in &reg.unions {
        out.push_str(&format!("    union {name} {{\n"));
        for (variant, inner) in &def.variants {
            out.push_str(&format!("        {variant}({inner}),\n"));
        }
        out.push_str("    }\n\n");
    }

    // kind <Name> { … } — unit / tuple / struct variants.
    for (name, def) in &reg.kinds {
        out.push_str(&format!("    kind {name} {{\n"));
        for v in &def.variants {
            match &v.field {
                KindField::Unit => out.push_str(&format!("        {},\n", v.name)),
                KindField::Unnamed(sh) => {
                    let ty = shape_type_expr(sh).unwrap_or_else(|| "Span".to_string());
                    out.push_str(&format!("        {}({}),\n", v.name, ty));
                }
                KindField::Named(fields) => {
                    let inner: Vec<String> = fields
                        .iter()
                        .filter_map(|f| {
                            shape_type_expr(&f.shape).map(|t| format!("{}: {}", f.name, t))
                        })
                        .collect();
                    out.push_str(&format!("        {} {{ {} }},\n", v.name, inner.join(", ")));
                }
            }
        }
        out.push_str("    }\n\n");
    }

    out.push_str("}\n");
    out
}

fn write_defs(path: &Path, reg: &Registry, version: &str) {
    let header = format!(
        "{stamp}//! Declarative mirror of the `fpp_ast` grammar, expanded by the\n\
         //! `fpp_python_macros::fpp_ast_bindings!` proc macro into the PyO3 AST-node\n\
         //! wrappers + the recording walk. GENERATED by `fpp_bindgen` — do not edit\n\
         //! by hand; regenerate with\n\
         //! `cargo run -p fpp_python --features bindgen --bin fpp_bindgen`.\n\
         #![allow(dead_code, unused_variables, clippy::all)]\n\n",
        stamp = generated_stamp(version),
    );
    let text = format!("{header}{}", emit_defs(reg));
    if let Some(dir) = path.parent() {
        std::fs::create_dir_all(dir).unwrap();
    }
    std::fs::write(path, text).unwrap();
}
