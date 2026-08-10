/**
 * State-machine diagram webview: renders Mermaid `stateDiagram-v2` text posted
 * from the extension host into inline SVG, with pan/zoom and SVG export.
 *
 * The extension host owns the panel and posts messages:
 *   `{ type: 'render', text }` — render Mermaid source
 *   `{ type: 'fit' }`          — reset pan/zoom to fit
 *   `{ type: 'export' }`       — reply with `{ type: 'exportSvg', svg }`
 *
 * Rendering is pure DOM manipulation (no `eval`), satisfying the webview CSP.
 */
import mermaid from 'mermaid';
// The package's `exports` map only declares an `import` condition for `.`, which
// webpack's default (web/commonjs) resolution won't pick; reference the ESM
// build directly (allowed by the package's `"./*"` export).
import elkLayouts from '@mermaid-js/layout-elk/dist/mermaid-layout-elk.core.mjs';
import '../css/sm.css';

// Register Mermaid's ELK layout backend. ELK handles nested composite states and
// parent→child edges far better than the default `dagre` renderer (which made
// composite states huge, leaf states tiny, and dropped edge labels under nested
// choices). The ELK backend uses `elkjs/lib/elk.bundled.js` on the main thread —
// no Web Worker and no `eval`, so it satisfies the webview CSP.
mermaid.registerLayoutLoaders(elkLayouts);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const acquireVsCodeApi: () => { postMessage(msg: unknown): void };
const vscode = acquireVsCodeApi();

/** Detect the VS Code color theme from the body class the host applies. */
function isDarkTheme(): boolean {
    return document.body.classList.contains('vscode-dark')
        || document.body.classList.contains('vscode-high-contrast');
}

mermaid.initialize({
    startOnLoad: false,
    // `strict` is the safest level and needs no HTML/eval; we only render text.
    securityLevel: 'strict',
    // Render labels as SVG <text>/<tspan>, not HTML <foreignObject>. This makes
    // `<br/>` in an edge label split into stacked <tspan> lines (signal on top,
    // actions below) and keeps text crisp under the webview CSP.
    htmlLabels: false,
    theme: isDarkTheme() ? 'dark' : 'default',
    // Use the ELK layout backend for hierarchical (composite) state layout.
    layout: 'elk',
    elk: {
        // Draw containers around composite states and give edges room.
        mergeEdges: false,
        nodePlacementStrategy: 'BRANDES_KOEPF',
    },
    state: {
        nodeSpacing: 60,
        rankSpacing: 60,
    },
});

const container = document.getElementById('container')!;

let renderSeq = 0;
/** The most recently rendered SVG element, for pan/zoom and export. */
let currentSvg: SVGSVGElement | undefined;

/** Pan/zoom state applied to the SVG element as a screen-space CSS transform. */
const view = { scale: 1, x: 0, y: 0 };

// Pan/zoom is applied as a CSS transform on the SVG *element* (screen-pixel
// space), not on the inner <g> (SVG user-space). The SVG has its own viewBox, so
// a user-space transform would be scaled by the viewBox ratio — making pan feel
// slow/misaligned. A CSS transform keeps pan 1:1 with the mouse and zoom in
// screen pixels.
function applyTransform(): void {
    if (currentSvg) {
        currentSvg.style.transformOrigin = '0 0';
        currentSvg.style.transform =
            `translate(${view.x}px, ${view.y}px) scale(${view.scale})`;
    }
}

/** Reset pan/zoom so the diagram fills the viewport. */
function fit(): void {
    view.scale = 1;
    view.x = 0;
    view.y = 0;
    if (currentSvg) {
        // Let the SVG fill the container; its viewBox handles the intrinsic fit.
        currentSvg.setAttribute('width', '100%');
        currentSvg.setAttribute('height', '100%');
        currentSvg.style.maxWidth = 'none';
    }
    applyTransform();
}

/** How fast the wheel zooms; smaller = gentler. */
const ZOOM_SENSITIVITY = 0.0015;

/** Wire wheel-zoom (toward the cursor) and drag-pan onto the SVG. */
function attachPanZoom(svg: SVGSVGElement): void {
    svg.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        // Anchor against the *container* (untransformed) rect, not the SVG's:
        // the SVG carries the pan/zoom CSS transform, so its own
        // getBoundingClientRect() is already shifted by view.x/view.y — using it
        // would offset the zoom focus once panned. The container never moves, so
        // its top-left equals the transform origin (the SVG's untransformed 0,0).
        const rect = container.getBoundingClientRect();
        // Cursor position relative to the transform origin (screen px).
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        // Exponential zoom keyed to the scroll delta, so trackpads and mouse
        // wheels both feel smooth and proportional.
        const factor = Math.exp(-e.deltaY * ZOOM_SENSITIVITY);
        const newScale = Math.min(20, Math.max(0.1, view.scale * factor));
        const ratio = newScale / view.scale;
        // Keep the point under the cursor fixed while zooming.
        view.x = cx - (cx - view.x) * ratio;
        view.y = cy - (cy - view.y) * ratio;
        view.scale = newScale;
        applyTransform();
    }, { passive: false });

    let panning = false;
    let startX = 0;
    let startY = 0;
    svg.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault(); // suppress text selection while dragging
        panning = true;
        // Record the offset between the cursor and the current translate so pan
        // tracks the mouse exactly (1:1).
        startX = e.clientX - view.x;
        startY = e.clientY - view.y;
        svg.classList.add('panning');
    });
    window.addEventListener('mousemove', (e: MouseEvent) => {
        if (!panning) {
            return;
        }
        view.x = e.clientX - startX;
        view.y = e.clientY - startY;
        applyTransform();
    });
    window.addEventListener('mouseup', () => {
        panning = false;
        svg.classList.remove('panning');
    });
}

async function render(text: string): Promise<void> {
    if (!text.trim()) {
        container.innerHTML = '<p class="sm-empty">No diagram to display.</p>';
        currentSvg = undefined;
        return;
    }
    const id = `sm-diagram-${renderSeq++}`;
    try {
        const { svg } = await mermaid.render(id, text);
        container.innerHTML = svg;
        currentSvg = container.querySelector('svg') ?? undefined;
        if (currentSvg) {
            attachPanZoom(currentSvg);
            fit();
        }
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        container.innerHTML = `<pre class="sm-error"></pre>`;
        const pre = container.querySelector('.sm-error');
        if (pre) {
            pre.textContent = `Failed to render diagram:\n${message}`;
        }
        currentSvg = undefined;
        vscode.postMessage({ type: 'error', message });
    }
}

/** Serialize the current diagram to a standalone SVG string for export. */
function exportSvg(): void {
    if (!currentSvg) {
        vscode.postMessage({ type: 'exportSvg', svg: null });
        return;
    }
    const clone = currentSvg.cloneNode(true) as SVGSVGElement;
    // Drop the pan/zoom CSS transform (and our layout overrides) so the exported
    // file is a clean, un-panned diagram sized by its own viewBox.
    clone.removeAttribute('style');
    clone.removeAttribute('width');
    clone.removeAttribute('height');
    const svgText = new XMLSerializer().serializeToString(clone);
    vscode.postMessage({ type: 'exportSvg', svg: svgText });
}

window.addEventListener('message', (event: MessageEvent) => {
    const msg = event.data;
    if (!msg) {
        return;
    }
    switch (msg.type) {
        case 'render':
            if (typeof msg.text === 'string') {
                void render(msg.text);
            }
            break;
        case 'fit':
            fit();
            break;
        case 'export':
            exportSvg();
            break;
    }
});

// Tell the host we're ready to receive the first diagram.
vscode.postMessage({ type: 'ready' });
