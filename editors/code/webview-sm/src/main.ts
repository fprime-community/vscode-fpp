/**
 * State-machine diagram webview: renders Mermaid `stateDiagram-v2` text posted
 * from the extension host into inline SVG, with pan/zoom and SVG export.
 *
 * The extension host owns the panel and posts messages:
 *   `{ type: 'render', text, layout? }` — render Mermaid source (ELK layout is
 *                                         embedded in the source frontmatter);
 *                                         `layout` only syncs the gear dropdowns
 *   `{ type: 'fit' }`                   — reset pan/zoom to fit
 *   `{ type: 'export' }`                — reply with `{ type: 'exportSvg', svg }`
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

// Initialize Mermaid once with the static options. The per-diagram layout
// options (engine + ELK strategies) are applied separately, via `applyLayout`
// before each render, because Mermaid's frontmatter sanitizer drops config keys
// it does not recognize — so the FPP source stays the source of truth, but the
// values reach Mermaid through its (un-sanitized, per-render) site config.
mermaid.initialize({
    startOnLoad: false,
    // `strict` is the safest level and needs no HTML/eval; we only render text.
    securityLevel: 'strict',
    // Render labels as SVG <text>/<tspan>, not HTML <foreignObject>. This makes
    // `<br/>` in an edge label split into stacked <tspan> lines (signal on top,
    // actions below) and keeps text crisp under the webview CSP.
    htmlLabels: false,
    theme: isDarkTheme() ? 'dark' : 'default',
    // The layout engine defaults to ELK for hierarchical (composite) state
    // layout; `applyLayout` overrides it per-render from the FPP source.
    layout: 'elk',
    elk: {
        // Draw containers around composite states and give edges room.
        mergeEdges: false,
    },
    state: {
        nodeSpacing: 60,
        rankSpacing: 60,
    },
});

// --- In-webview layout settings (gear popover) --------------------------------
// A gear button opens a small panel of dropdowns reflecting the layout options
// embedded in the FPP source. Changing one posts a `setLayoutOption` message;
// the host writes it back into the `@ diagram-layout ...` source annotation (a
// workspace edit) and re-renders — so the source stays the single source of
// truth. Keys match the host's `LayoutOptions`.
interface LayoutOptions {
    /** The Mermaid layout backend: `elk` or `dagre`. */
    engine: string;
    /** Flow direction (both engines): `TB`, `BT`, `LR`, or `RL`. */
    direction: string;
    cycleBreaking: string;
    considerModelOrder: string;
    nodePlacement: string;
    /** Node spacing in px, as a string (dagre only). */
    nodeSpacing: string;
    /** Rank spacing in px, as a string (dagre only). */
    rankSpacing: string;
}

/** Defaults; must match `fpp_diagram`'s `SmLayout::default()`. */
const DEFAULT_LAYOUT: LayoutOptions = {
    engine: 'elk',
    direction: 'TB',
    cycleBreaking: 'MODEL_ORDER',
    considerModelOrder: 'NODES_AND_EDGES',
    nodePlacement: 'BRANDES_KOEPF',
    nodeSpacing: '60',
    rankSpacing: '60',
};

/**
 * A control backed by one layout option. `key` matches `LayoutOptions`. A control
 * is either a dropdown (`options` set) or a numeric input (`number` set).
 */
interface LayoutControl {
    key: keyof LayoutOptions;
    label: string;
    /** Dropdown choices; mutually exclusive with `number`. */
    options?: { value: string; label: string }[];
    /** Numeric-input bounds (px); mutually exclusive with `options`. */
    number?: { min: number; max: number; step: number };
    /** Only meaningful for the ELK backend; hidden when the engine is `dagre`. */
    elkOnly?: boolean;
    /** Only meaningful for the dagre backend; hidden when the engine is `elk`. */
    dagreOnly?: boolean;
}

const LAYOUT_CONTROLS: LayoutControl[] = [
    {
        key: 'engine',
        label: 'Layout engine',
        options: [
            { value: 'elk', label: 'ELK (nested layout)' },
            { value: 'dagre', label: 'Dagre (built-in)' },
        ],
    },
    {
        key: 'direction',
        label: 'Direction',
        options: [
            { value: 'TB', label: 'Top to bottom' },
            { value: 'BT', label: 'Bottom to top' },
            { value: 'LR', label: 'Left to right' },
            { value: 'RL', label: 'Right to left' },
        ],
    },
    {
        key: 'cycleBreaking',
        label: 'Cycle breaking',
        elkOnly: true,
        options: [
            { value: 'MODEL_ORDER', label: 'Source order (initial at top)' },
            { value: 'GREEDY_MODEL_ORDER', label: 'Balanced (source order + compact)' },
            { value: 'GREEDY', label: 'Compact (by topology)' },
            { value: 'DEPTH_FIRST', label: 'Depth first' },
        ],
    },
    {
        key: 'considerModelOrder',
        label: 'Follow source order',
        elkOnly: true,
        options: [
            { value: 'NODES_AND_EDGES', label: 'Nodes and edges' },
            { value: 'PREFER_EDGES', label: 'Prefer edges' },
            { value: 'PREFER_NODES', label: 'Prefer nodes' },
            { value: 'NONE', label: 'None (fewest crossings)' },
        ],
    },
    {
        key: 'nodePlacement',
        label: 'Node placement',
        elkOnly: true,
        options: [
            { value: 'BRANDES_KOEPF', label: 'Balanced (Brandes\u2013K\u00f6pf)' },
            { value: 'NETWORK_SIMPLEX', label: 'Compact (network simplex)' },
            { value: 'LINEAR_SEGMENTS', label: 'Straight chains' },
            { value: 'SIMPLE', label: 'Simple' },
        ],
    },
    {
        key: 'nodeSpacing',
        label: 'Node spacing (px)',
        dagreOnly: true,
        number: { min: 10, max: 300, step: 5 },
    },
    {
        key: 'rankSpacing',
        label: 'Rank spacing (px)',
        dagreOnly: true,
        number: { min: 10, max: 300, step: 5 },
    },
];

/** The inputs (dropdowns/number fields), kept so `syncSettingsUi` can reflect the host's settings. */
const settingsSelects = new Map<keyof LayoutOptions, HTMLSelectElement | HTMLInputElement>();

/** Engine-specific fields, kept so they can be hidden for the other engine. */
const elkOnlyFields: HTMLElement[] = [];
const dagreOnlyFields: HTMLElement[] = [];

/** Show/hide the engine-specific controls depending on the selected engine. */
function updateControlVisibility(engine: string): void {
    for (const field of elkOnlyFields) {
        field.style.display = engine === 'elk' ? '' : 'none';
    }
    for (const field of dagreOnlyFields) {
        field.style.display = engine === 'dagre' ? '' : 'none';
    }
}

/** Build the gear button and settings popover and attach them to the page. */
function buildSettingsUi(): void {
    const gear = document.createElement('button');
    gear.className = 'sm-gear';
    gear.title = 'Diagram layout settings';
    gear.setAttribute('aria-label', 'Diagram layout settings');
    // Codicon-style gear glyph; falls back to a unicode gear.
    gear.textContent = '\u2699';

    const panel = document.createElement('div');
    panel.className = 'sm-settings';

    const title = document.createElement('div');
    title.className = 'sm-settings-title';
    title.textContent = 'Layout';
    panel.appendChild(title);

    for (const control of LAYOUT_CONTROLS) {
        const field = document.createElement('label');
        field.className = 'sm-field';

        const name = document.createElement('span');
        name.className = 'sm-field-label';
        name.textContent = control.label;
        field.appendChild(name);

        // Post the changed value to the host, updating engine-driven visibility
        // immediately for instant feedback (independent of the round-trip render).
        const emit = (value: string) => {
            if (control.key === 'engine') {
                updateControlVisibility(value);
            }
            vscode.postMessage({ type: 'setLayoutOption', key: control.key, value });
        };

        let input: HTMLSelectElement | HTMLInputElement;
        if (control.number) {
            const num = document.createElement('input');
            num.type = 'number';
            num.className = 'sm-field-select';
            num.min = String(control.number.min);
            num.max = String(control.number.max);
            num.step = String(control.number.step);
            num.value = DEFAULT_LAYOUT[control.key];
            // `change` fires on blur/Enter, not per keystroke, so we don't spam
            // edits (and clamp to the allowed range before persisting).
            num.addEventListener('change', () => {
                const clamped = Math.min(
                    control.number!.max,
                    Math.max(control.number!.min, Number(num.value) || control.number!.min)
                );
                num.value = String(clamped);
                emit(num.value);
            });
            input = num;
        } else {
            const select = document.createElement('select');
            select.className = 'sm-field-select';
            for (const opt of control.options ?? []) {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                select.appendChild(option);
            }
            select.value = DEFAULT_LAYOUT[control.key];
            select.addEventListener('change', () => emit(select.value));
            input = select;
        }

        settingsSelects.set(control.key, input);
        if (control.elkOnly) {
            elkOnlyFields.push(field);
        }
        if (control.dagreOnly) {
            dagreOnlyFields.push(field);
        }
        field.appendChild(input);
        panel.appendChild(field);
    }

    updateControlVisibility(DEFAULT_LAYOUT.engine);

    gear.addEventListener('click', e => {
        e.stopPropagation();
        panel.classList.toggle('open');
    });
    // Close the panel when clicking outside it.
    document.addEventListener('mousedown', e => {
        const target = e.target as Node;
        if (panel.classList.contains('open') && !panel.contains(target) && target !== gear) {
            panel.classList.remove('open');
        }
    });

    document.body.appendChild(gear);
    document.body.appendChild(panel);
}

/** Reflect the current (host-provided) layout in the dropdowns. */
function syncSettingsUi(layout: LayoutOptions): void {
    for (const [key, select] of settingsSelects) {
        select.value = layout[key];
    }
    updateControlVisibility(layout.engine);
}

/**
 * Push the layout options into Mermaid's *site config* before rendering.
 *
 * We cannot rely on the YAML frontmatter embedded in the diagram text: Mermaid's
 * frontmatter sanitizer silently drops config keys it does not recognize (e.g.
 * `elk.cycleBreakingStrategy` is not in its config schema), so a frontmatter-only
 * option never takes effect. Site config is not sanitized that way and is re-read
 * fresh on every `mermaid.render()`, so applying it here makes every option —
 * including the layout engine — update live without reopening the panel.
 *
 * The flow direction is NOT set here: for state diagrams Mermaid reads it from a
 * `direction` statement in the diagram body, which is already present in the text
 * we render (kept in sync by the host), so rendering the text applies it.
 */
function applyLayout(layout: LayoutOptions): void {
    // Spacing is only honored by the dagre backend (ELK computes its own), and
    // arrives as a string; coerce to a number, falling back to the default when
    // it isn't a positive number.
    const spacing = (value: string): number => {
        const n = Number(value);
        return Number.isFinite(n) && n > 0 ? n : Number(DEFAULT_LAYOUT.nodeSpacing);
    };
    // The values are validated/enumerated on the FPP side and by the dropdowns,
    // but arrive here as plain strings; Mermaid's config types are string-literal
    // unions, so cast the whole options object to the expected parameter type.
    mermaid.mermaidAPI.updateSiteConfig({
        layout: layout.engine,
        elk: {
            mergeEdges: false,
            nodePlacementStrategy: layout.nodePlacement,
            cycleBreakingStrategy: layout.cycleBreaking,
            considerModelOrder: layout.considerModelOrder,
        },
        state: {
            nodeSpacing: spacing(layout.nodeSpacing),
            rankSpacing: spacing(layout.rankSpacing),
        },
    } as Parameters<typeof mermaid.mermaidAPI.updateSiteConfig>[0]);
}

buildSettingsUi();

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
                // Drive the layout from the `layout` object (via Mermaid site
                // config), not the text frontmatter: frontmatter config keys that
                // Mermaid does not recognize are silently dropped, so applying the
                // options here is what makes every option — including the engine —
                // take effect live. Fall back to defaults when absent.
                const layout: LayoutOptions = { ...DEFAULT_LAYOUT, ...(msg.layout ?? {}) };
                syncSettingsUi(layout);
                applyLayout(layout);
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
