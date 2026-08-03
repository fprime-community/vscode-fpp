//! Wadler/Prettier-style document IR and renderer for the FPP formatter.
//!
//! Lowering (see `formatter`) turns a syntax tree into a `Doc`; `render`
//! decides flat-vs-broken for each `Group` based on the max line width and
//! emits the final text. A post-pass aligns grouped `@<` and `->` anchors.

use std::rc::Rc;

/// The kind of a column-alignment anchor.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AnchorKind {
    /// A `@<` post-annotation.
    PostAnnotation,
    /// A `->` in a topology direct connection.
    Arrow,
}

/// Document IR node.
#[derive(Clone)]
pub enum Doc {
    Nil,
    Text(Rc<str>),
    /// Flexible break: `flat` text when its group is flat, otherwise a newline
    /// (prefixed with ` \` when `cont`) plus indentation.
    Line { flat: &'static str, cont: bool },
    /// Unconditional break (prefixed with ` \` when `cont`).
    Hard { cont: bool },
    /// Indent the child by `n` levels.
    Nest(i32, Rc<Doc>),
    Concat(Rc<[Doc]>),
    /// Render flat if it fits within the width, else broken.
    Group(Rc<Doc>),
    /// Record a column-alignment anchor at the child's start column.
    Anchor(AnchorKind, Rc<Doc>),
}

impl Doc {
    pub fn text(s: impl Into<String>) -> Doc {
        Doc::Text(Rc::from(s.into().as_str()))
    }
    pub fn concat(v: Vec<Doc>) -> Doc {
        Doc::Concat(Rc::from(v))
    }
    pub fn nest(n: i32, d: Doc) -> Doc {
        Doc::Nest(n, Rc::new(d))
    }
    pub fn group(d: Doc) -> Doc {
        Doc::Group(Rc::new(d))
    }
    pub fn anchor(kind: AnchorKind, d: Doc) -> Doc {
        Doc::Anchor(kind, Rc::new(d))
    }
    /// Flat = single space, break = newline.
    pub fn softline() -> Doc {
        Doc::Line { flat: " ", cont: false }
    }
    /// Flat = nothing, break = newline.
    pub fn softline_tight() -> Doc {
        Doc::Line { flat: "", cont: false }
    }
    /// Flat = single space, break = ` \` continuation newline.
    pub fn contline() -> Doc {
        Doc::Line { flat: " ", cont: true }
    }
    pub fn hardline() -> Doc {
        Doc::Hard { cont: false }
    }
}

#[derive(Clone, Copy, PartialEq)]
enum Mode {
    Flat,
    Break,
}

/// A recorded alignment anchor position in the rendered output.
struct Anchor {
    line: usize,
    col: usize,
    level: i32,
    kind: AnchorKind,
}

/// Render `doc` to final formatted text.
pub fn render(doc: &Doc, width: usize, indent_width: usize) -> String {
    let mut out = String::new();
    let mut col: usize = 0;
    let mut line: usize = 0;
    let mut anchors: Vec<Anchor> = Vec::new();
    let mut stack: Vec<(i32, Mode, &Doc)> = vec![(0, Mode::Break, doc)];

    while let Some((ind, mode, d)) = stack.pop() {
        match d {
            Doc::Nil => {}
            Doc::Text(s) => {
                out.push_str(s);
                col += s.chars().count();
            }
            Doc::Anchor(kind, x) => {
                anchors.push(Anchor { line, col, level: ind, kind: *kind });
                stack.push((ind, mode, x));
            }
            Doc::Concat(v) => {
                for c in v.iter().rev() {
                    stack.push((ind, mode, c));
                }
            }
            Doc::Nest(n, x) => stack.push((ind + n, mode, x)),
            Doc::Group(x) => {
                let m = if fits(width as isize - col as isize, x, &stack) {
                    Mode::Flat
                } else {
                    Mode::Break
                };
                stack.push((ind, m, x));
            }
            Doc::Line { flat, cont } => match mode {
                Mode::Flat => {
                    out.push_str(flat);
                    col += flat.chars().count();
                }
                Mode::Break => {
                    emit_break(&mut out, &mut col, &mut line, *cont, ind, indent_width);
                }
            },
            Doc::Hard { cont } => {
                emit_break(&mut out, &mut col, &mut line, *cont, ind, indent_width);
            }
        }
    }

    let aligned = align(&out, &anchors, indent_width);
    finish(aligned)
}

fn emit_break(
    out: &mut String,
    col: &mut usize,
    line: &mut usize,
    cont: bool,
    ind: i32,
    iw: usize,
) {
    if cont {
        out.push_str(" \\");
    }
    out.push('\n');
    *line += 1;
    let spaces = ind.max(0) as usize * iw;
    out.push_str(&" ".repeat(spaces));
    *col = spaces;
}

/// Whether `x` (rendered flat) plus the continuation `rest` fits on the line.
fn fits(mut rem: isize, x: &Doc, rest: &[(i32, Mode, &Doc)]) -> bool {
    let mut work: Vec<(Mode, &Doc)> = Vec::with_capacity(rest.len() + 1);
    for (_, m, d) in rest.iter() {
        work.push((*m, d));
    }
    work.push((Mode::Flat, x));

    while rem >= 0 {
        let (m, d) = match work.pop() {
            Some(v) => v,
            None => return true,
        };
        match d {
            Doc::Nil => {}
            Doc::Text(s) => rem -= s.chars().count() as isize,
            Doc::Anchor(_, y) => work.push((m, y)),
            Doc::Concat(v) => {
                for c in v.iter().rev() {
                    work.push((m, c));
                }
            }
            Doc::Nest(_, y) => work.push((m, y)),
            Doc::Group(y) => work.push((Mode::Flat, y)),
            Doc::Line { flat, .. } => match m {
                Mode::Flat => rem -= flat.chars().count() as isize,
                Mode::Break => return true,
            },
            Doc::Hard { .. } => match m {
                Mode::Flat => return false,
                Mode::Break => return true,
            },
        }
    }
    false
}

/// Left-pad anchor tokens so contiguous same-level groups share a column.
fn align(text: &str, anchors: &[Anchor], iw: usize) -> String {
    if anchors.is_empty() {
        return text.to_string();
    }
    let _ = iw;
    let mut lines: Vec<String> = text.split('\n').map(|s| s.to_string()).collect();

    let mut i = 0;
    while i < anchors.len() {
        let mut j = i + 1;
        while j < anchors.len()
            && anchors[j].kind == anchors[i].kind
            && anchors[j].level == anchors[i].level
            && anchors[j].line == anchors[j - 1].line + 1
        {
            j += 1;
        }
        let target = anchors[i..j].iter().map(|a| a.col).max().unwrap_or(0);
        for a in &anchors[i..j] {
            if a.col < target
                && let Some(l) = lines.get_mut(a.line)
            {
                let byte = l
                    .char_indices()
                    .nth(a.col)
                    .map(|(b, _)| b)
                    .unwrap_or(l.len());
                l.insert_str(byte, &" ".repeat(target - a.col));
            }
        }
        i = j;
    }
    lines.join("\n")
}

/// Trim trailing whitespace on each line and ensure exactly one final newline.
fn finish(text: String) -> String {
    let mut out: String = text
        .split('\n')
        .map(|l| l.trim_end())
        .collect::<Vec<_>>()
        .join("\n");
    while out.ends_with('\n') {
        out.pop();
    }
    out.push('\n');
    out
}
