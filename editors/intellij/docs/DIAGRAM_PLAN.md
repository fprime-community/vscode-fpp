# IntelliJ Diagram/Webview Support — Plan & Remaining Work

Bring the VSCode diagram/visualization features to the IntelliJ plugin, reusing
the shared Rust LSP server (`fpp/diagram`, `fpp/diagramElements`) and the shared
VSCode webview bundles unchanged, via JCEF + a small `acquireVsCodeApi()` shim.

## Feature parity target (VSCode today)

| Feature | Model source | Renderer | IntelliJ status |
|---|---|---|---|
| State machine diagram | `fpp/diagram` (kind=`stateMachine`) → Mermaid string | `sm-webview.js` (Mermaid) | **Phase 1 — mostly done** |
| Topology / Component / ConnectionGroup | `fpp/diagram` → sprotty `SModel` | `webview.js` (sprotty + client ELK) | **Phase 2 — not started** |
| "Open in Diagram" affordance | `fpp/diagramElements` | CodeLens (VSCode) | action + popup (IntelliJ); CodeVision pending |
| Toolbar: fit/center/export/toggle-unused-ports/toggle-action-mode/view-source | — | webview messages | partial (fit/export/toggle-action-mode) |
| Live re-render on save | — | — | not started |

---

## Phase 1 — State machine (Mermaid)

Implemented:
- Custom LSP requests on `FppLsp4jServer` (`fpp/diagram`, `fpp/diagramElements`).
- Wire DTOs (`FppDiagramProtocol.kt`). Enums are plain `String` on the wire
  because LSP4J's `EnumTypeAdapter` maps by `Enum.name()` and ignores Gson
  `@SerializedName`.
- `FppWebviewBrowser` — JCEF host + `acquireVsCodeApi()` shim; reuses
  `sm-webview.js` unchanged. `index.html` shell includes `#container`.
- `FppDiagramService` (project service), `FppStateMachinePanel`,
  `FppStateMachineToolWindowFactory`, actions (`FppDiagramActions.kt`).
- plugin.xml wiring: tool window, editor-popup action, toolbar group.
- Bundle vendored at `resources/webview/sm-webview.js` (webpack
  `asyncChunks:false`); `vendorWebview` gradle task refreshes it.
- JCEF bundled modules added to `gradle.properties`
  (`intellij.platform.ui.jcef`, `intellij.libraries.jcef`).
- Threading annotations (`@RequiresEdt` / `@RequiresBackgroundThread`).

### Phase 1 — remaining
- [ ] **User TODOs**
- [ ] **`export` save on EDT / VFS write** — `saveExport` writes via
      `VfsUtil.saveText` on the EDT; wrap the write in a write action
      (`WriteAction`/`runWriteAction`) to satisfy the platform's write-lock
      contract, or write via `java.nio.file` off-EDT.
- [ ] **Theme change listener** — `applyTheme` runs once on load. Subscribe to
      LAF changes (`LafManagerListener`) and re-post the body class so the diagram
      follows IDE theme switches live.
- [ ] **Error surfacing** — the webview posts `{type:'error', message}` on a
      Mermaid failure; `handleMessage` currently ignores it. Surface via a
      notification or an inline panel state.
- [ ] **`ready` handshake robustness** — if the bundle never posts `ready`
      (load failure), queued messages never flush. Add a timeout/fallback or a
      load-error path (`onLoadError`).
- [ ] **Toolbar icon for toggle-action-mode** — reuse a clearer icon; current
      `ToggleVisibility` is a placeholder.

---

## Phase 2 — Sprotty topology / component / connection-group

Not started. The blocker is the layout round-trip: in VSCode, `manager.ts`
runs the two-step sprotty↔ELK layout host-side (webview measures bounds → host
runs `elkjs` → sends back). That logic is Node/`elkjs` and does not port cleanly
to the JVM.

### Recommended approach (least IntelliJ code)

- [ ] **Move layout into the webview bundle** (a `code`-side refactor): make
      `webview.js` self-lay-out with the `elkjs` it already bundles, so the host
      becomes a dumb relay like the Mermaid case. This also simplifies VSCode
      (`manager.ts` shrinks to fetch → post). Preferred over porting ELK to the
      JVM (ELK Java lib or shelling `elkjs`).
- [ ] Vendor `webview.js` into `resources/webview/` (extend `vendorWebview`),
      with `asyncChunks:false` if it also code-splits.
- [ ] New tool window (or reuse a shared "FPP Diagram" window) hosting
      `webview.js` via the same `FppWebviewBrowser` shim.
- [ ] Wire the sprotty kinds (`component`/`topology`/`connectionGroup`) in
      `FppOpenDiagramAction.offerChoices` (currently filtered to state machines
      only) once the renderer exists.
- [ ] Sprotty toolbar commands: fit, center, export, toggle-unused-ports.
- [ ] Confirm sprotty's `SModel` JSON (returned as a JSON object, not a string)
      round-trips through the shim; `handleMessage` must handle non-string
      results.

---

## Cross-cutting / later

- [ ] **CodeVision** — replace the editor-popup action with an inline
      "Open in Diagram" lens over each diagrammable def (parity with VSCode
      CodeLens), driven by `fpp/diagramElements`. Use the
      `com.intellij.codeInsight.codeVision.CodeVisionProvider` EP.
- [ ] **Live re-render on save** — on FPP document save, refresh the open
      diagram(s) and any lenses. Hook `FileDocumentManagerListener` /
      `BulkFileListener` and call `FppDiagramService.refreshCurrent()`.
- [ ] **Multiple diagrams open at once** — current design is a single tool-window
      panel (singleton). Decide whether to support multiple diagram tabs.
- [ ] **JCEF-unavailable UX** — panel already shows a fallback label; consider a
      link to enable JCEF / docs.
- [ ] **Dispose/lifecycle** — confirm temp dirs from `buildShell` are cleaned
      (currently `deleteOnExit`); consider disposing on panel dispose.
- [ ] **Tests** — LSP request (de)serialization round-trip; action
      enable/visible logic; smoke test the tool window factory.
- [ ] **Deprecation cleanup** — `LspServer`/`LspServerManager` →
      `LspClient`/`LspClientManager` (also affects existing `reloadWorkspace`).

---

## Key files

- `src/main/kotlin/.../FppLspServerProvider.kt` — `FppLsp4jServer` LSP requests.
- `src/main/kotlin/.../diagram/FppDiagramProtocol.kt` — wire DTOs.
- `src/main/kotlin/.../diagram/FppWebviewBrowser.kt` — JCEF host + shim (reusable).
- `src/main/kotlin/.../diagram/FppDiagramService.kt` — LSP requests + tool window driver.
- `src/main/kotlin/.../diagram/FppStateMachinePanel.kt` — SM panel + toolbar.
- `src/main/kotlin/.../diagram/FppStateMachineToolWindowFactory.kt` — tool window.
- `src/main/kotlin/.../diagram/FppDiagramActions.kt` — open + toolbar actions.
- `src/main/resources/META-INF/plugin.xml` — extensions/actions.
- `src/main/resources/webview/sm-webview.js` — vendored bundle.
- `build.gradle.kts` (`vendorWebview`), `gradle.properties` (JCEF modules).
- Shared source of the bundles: `editors/code/webview-sm/`, `editors/code/webview/`,
  `editors/code/src/diagram/` (`manager.ts` is the layout round-trip to move).