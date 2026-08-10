// The `@mermaid-js/layout-elk` package only ships types for its bare `.` entry.
// We import the concrete ESM build path (webpack won't resolve the `import`-only
// export condition), so declare it here. The default export is the array of
// layout loaders `mermaid.registerLayoutLoaders` expects.
declare module '@mermaid-js/layout-elk/dist/mermaid-layout-elk.core.mjs' {
    import type { LayoutLoaderDefinition } from 'mermaid';
    const layouts: LayoutLoaderDefinition[];
    export default layouts;
}
