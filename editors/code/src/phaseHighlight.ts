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

    let timer: ReturnType<typeof setTimeout> | undefined;

    const apply = (editor: vscode.TextEditor) => {
        if (editor.document.languageId !== "fpp") {
            return;
        }

        if (!Settings.highlightPhaseBlocks()) {
            editor.setDecorations(topDecoration, []);
            editor.setDecorations(bottomDecoration, []);
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const topRanges: vscode.Range[] = [];
        const bottomRanges: vscode.Range[] = [];

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
        }

        editor.setDecorations(topDecoration, topRanges);
        editor.setDecorations(bottomDecoration, bottomRanges);
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
        vscode.window.onDidChangeVisibleTextEditors(applyAll),
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.languageId === "fpp") {
                schedule();
            }
        }),
        Settings.onHighlightPhaseBlocksChanged(applyAll),
        new vscode.Disposable(() => {
            if (timer) {
                clearTimeout(timer);
            }
        })
    );

    applyAll();
}
