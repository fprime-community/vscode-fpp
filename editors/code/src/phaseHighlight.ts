import * as vscode from "vscode";

import { findPhaseBlocks, shadeRange } from "./phaseBlocks";
import * as Settings from "./settings";

/**
 * Coalesce bursts of keystrokes into a single re-scan. The scan is a linear
 * pass over the document, so this only matters for very large topologies.
 */
const REFRESH_DEBOUNCE_MS = 150;

/**
 * Marks the C++ body of every `phase` init specifier with a divider above and
 * below it, so it reads as a separate region from the surrounding FPP.
 *
 * The dividers are drawn as `isWholeLine` border decorations rather than a
 * box around the text, since a box would hug the width of the code instead
 * of spanning the line.
 */
export function registerPhaseHighlighting(context: vscode.ExtensionContext): void {
    const borderColor = new vscode.ThemeColor("fpp.phaseBlockBorder");
    const topDecoration = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor,
        borderStyle: "solid",
        borderWidth: "1px 0 0 0",
        // Do not let the divider move while the user types inside the block;
        // the debounced re-scan is what moves it.
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
    const bottomDecoration = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor,
        borderStyle: "solid",
        borderWidth: "0 0 1px 0",
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
    // Draws the left edge of the box down the content lines, connecting the
    // top and bottom dividers. Whole-line so it sits at the editor's left
    // margin, flush with where the horizontal dividers begin.
    const leftDecoration = vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        borderColor,
        borderStyle: "solid",
        borderWidth: "0 0 0 1px",
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });

    let timer: ReturnType<typeof setTimeout> | undefined;

    const apply = (editor: vscode.TextEditor) => {
        if (editor.document.languageId !== "fpp") {
            return;
        }

        if (!Settings.highlightPhaseBlocks()) {
            editor.setDecorations(topDecoration, []);
            editor.setDecorations(bottomDecoration, []);
            editor.setDecorations(leftDecoration, []);
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const topRanges: vscode.Range[] = [];
        const bottomRanges: vscode.Range[] = [];
        const leftRanges: vscode.Range[] = [];

        // A cursor sitting anywhere inside the phase string (including its
        // `"""` delimiters) closes the box with a left edge; otherwise only
        // the horizontal dividers show.
        const cursorInBlock = (block: { start: number; end: number }) =>
            editor.selections.some((sel) => {
                const offset = document.offsetAt(sel.active);
                return offset >= block.start && offset <= block.end;
            });

        for (const block of findPhaseBlocks(text)) {
            const range = shadeRange(text, block);
            if (range.end <= range.start) {
                continue;
            }
            // Bracket the shaded content itself: the top divider sits above the
            // first content line and the bottom divider below the last one, so
            // the closing `"""` on its own line stays outside the box.
            const top = document.positionAt(range.start);
            const bottom = document.positionAt(range.end - 1);
            topRanges.push(new vscode.Range(top, top));
            bottomRanges.push(new vscode.Range(bottom, bottom));
            // Left edge runs the full height of the content, joining the two
            // dividers into a box, but only while the cursor is in the block.
            if (cursorInBlock(block)) {
                leftRanges.push(new vscode.Range(top, bottom));
            }
        }

        editor.setDecorations(topDecoration, topRanges);
        editor.setDecorations(bottomDecoration, bottomRanges);
        editor.setDecorations(leftDecoration, leftRanges);
    };

    const applyAll = () => {
        for (const editor of vscode.window.visibleTextEditors) {
            apply(editor);
        }
    };

    const schedule = () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = undefined;
            applyAll();
        }, REFRESH_DEBOUNCE_MS);
    };

    context.subscriptions.push(
        topDecoration,
        bottomDecoration,
        leftDecoration,
        vscode.window.onDidChangeVisibleTextEditors(applyAll),
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.languageId === "fpp") {
                schedule();
            }
        }),
        vscode.window.onDidChangeTextEditorSelection((e) => apply(e.textEditor)),
        Settings.onHighlightPhaseBlocksChanged(applyAll),
        new vscode.Disposable(() => {
            if (timer) {
                clearTimeout(timer);
            }
        })
    );

    applyAll();
}
