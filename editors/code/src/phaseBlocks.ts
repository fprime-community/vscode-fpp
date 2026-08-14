/**
 * Locates the string argument of every `phase` init specifier in an FPP source
 * file.
 *
 * A `phase` specifier is `phase <expression> <string>`, and the string holds an
 * excerpt of C++. The editor shades those strings so they stand out from the
 * surrounding FPP.
 *
 * This is a small hand-rolled lexer rather than a regex: `phase` must not be
 * matched inside comments, annotations or other strings, and the expression
 * between the keyword and the string may span lines via a `\` continuation.
 *
 * This module intentionally has no imports so it can be unit tested outside of
 * the editor host.
 */

/** Half-open offset range of a phase specifier's string literal. */
export interface PhaseBlock {
    /** Offset of the opening quote. */
    start: number;
    /** Offset one past the closing quote. */
    end: number;
}

const IDENT_START = /[A-Za-z_]/;
const IDENT_PART = /[A-Za-z0-9_]/;

/** Offset of the newline ending the line containing `i`, or end of input. */
function endOfLine(text: string, i: number): number {
    const nl = text.indexOf("\n", i);
    return nl === -1 ? text.length : nl;
}

/** Offset one past the identifier characters starting at `i`. */
function skipIdent(text: string, i: number): number {
    while (i < text.length && IDENT_PART.test(text[i])) {
        i++;
    }
    return i;
}

/**
 * Offset one past the string literal starting at `i`, which must be a quote.
 * Unterminated literals are treated as running to end of line (single quoted)
 * or end of file (triple quoted), matching how the grammar recovers.
 */
function skipString(text: string, i: number): number {
    if (text.startsWith('"""', i)) {
        const close = text.indexOf('"""', i + 3);
        return close === -1 ? text.length : close + 3;
    }

    let j = i + 1;
    while (j < text.length) {
        const c = text[j];
        if (c === "\\") {
            j += 2;
            continue;
        }
        if (c === '"') {
            return j + 1;
        }
        if (c === "\n") {
            return j;
        }
        j++;
    }
    return text.length;
}

/** Whether `text[start, end)` contains only spaces, tabs or carriage returns. */
function isBlank(text: string, start: number, end: number): boolean {
    for (let i = start; i < end; i++) {
        const c = text[i];
        if (c !== " " && c !== "\t" && c !== "\r") {
            return false;
        }
    }
    return true;
}

/**
 * Narrows a phase block to the range that should actually be shaded: the
 * quote characters themselves are excluded, and for a triple-quoted string
 * whose opening or closing `"""` sits alone on its line, that whole line is
 * dropped too, so the shading doesn't bleed onto a line that is otherwise
 * just punctuation.
 */
export function shadeRange(text: string, block: PhaseBlock): PhaseBlock {
    const triple = text.startsWith('"""', block.start);
    const quoteLen = triple ? 3 : 1;

    let start = block.start + quoteLen;
    let end = block.end - quoteLen;

    if (triple) {
        // Drop every leading blank line, not just the one right after the
        // opening delimiter: a block that opens with `"""` then a blank
        // separator line before the code should not shade that blank line.
        while (start < end) {
            const lineEnd = text.indexOf("\n", start);
            if (lineEnd === -1 || lineEnd >= end || !isBlank(text, start, lineEnd)) {
                break;
            }
            start = lineEnd + 1;
        }

        // Symmetrically, drop every trailing blank line before the closing
        // delimiter's line. When `end` sits just past a newline, that newline
        // terminates the line we must inspect, so step over it to look at the
        // line's content; otherwise `lineStart` collapses onto `end` and the
        // scan spins forever (this fires on the common case of a closing `"""`
        // alone on its line, which would hang the editor at runtime).
        while (end > start) {
            const contentEnd = text[end - 1] === "\n" ? end - 1 : end;
            const lineStart = text.lastIndexOf("\n", contentEnd - 1) + 1;
            if (lineStart < start || !isBlank(text, lineStart, contentEnd)) {
                break;
            }
            end = lineStart;
        }
    }

    return { start, end: Math.max(start, end) };
}

/**
 * Every phase specifier string in `text`, in source order.
 */
export function findPhaseBlocks(text: string): PhaseBlock[] {
    const blocks: PhaseBlock[] = [];

    // Set once `phase` is seen, cleared by the string that closes the
    // specifier. The expression in between may contain identifiers and dots,
    // so only a block delimiter cancels it.
    let pendingPhase = false;
    let i = 0;

    while (i < text.length) {
        const c = text[i];

        // Comments and annotations run to end of line and may contain anything.
        if (c === "#" || c === "@") {
            i = endOfLine(text, i);
            continue;
        }

        if (c === '"') {
            const end = skipString(text, i);
            if (pendingPhase) {
                blocks.push({ start: i, end });
                pendingPhase = false;
            }
            i = end;
            continue;
        }

        // `$phase` is an escaped identifier, not the keyword.
        if (c === "$") {
            i = skipIdent(text, i + 1);
            continue;
        }

        if (IDENT_START.test(c)) {
            const end = skipIdent(text, i);
            if (text.slice(i, end) === "phase") {
                pendingPhase = true;
            }
            i = end;
            continue;
        }

        // Bound a malformed `phase` that never reaches a string, so it cannot
        // claim an unrelated string later in the file.
        if (c === "{" || c === "}" || c === ";") {
            pendingPhase = false;
        }

        i++;
    }

    return blocks;
}
