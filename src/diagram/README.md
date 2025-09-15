## Live diagram synthesis in the FPP VS Code extension.

<img width="1920" alt="Screenshot 2025-06-11 at 5 29 18 PM (2)" src="https://github.com/user-attachments/assets/293c98bf-d3b1-4e23-b3d1-c713fcd38c84" />

In large-scale system design, architecture diagrams provide crucial feedback that guide key decision making. However, useful as they are, it is often difficult to get up-to-date diagrams in a convenient, accessible way. The goal of this PR is to make diagrams as accessible as possible by generating them live in the FPP VS Code extension.

#### Features Available
1. A webview side pane showing a currently rendered diagram;
2. VS Code buttons to open, center, fit, and export a diagram SVG, and a button to show/hide unconnected ports;
3. Re-rendering a diagram on file save;
4. CodeLens buttons to visualize components, topologies, and connection groups.

### How diagrams work
This diagram feature depends on two key open-source projects: [Elkjs](https://github.com/kieler/elkjs) (layout on the backend) and [Sprotty](https://github.com/eclipse-sprotty/sprotty) (rendering on the frontend).
They complement the current VS Code extension in the following way.

When the extension starts up, the existing FPP parser traverses through all `.fpp` files (or alternatively looks for a `.locs` file that helps resolve references in the project). During the process, the parser, which runs on a separate Node.js thread, populates a `declCollector` object with information on FPP components, types, connections, topologies, and deployments. Since the `declCollector` is constantly refreshed as the user types in the editor, the up-to-date information in `declCollector` will be used to construct diagrams.

When the user requests for a diagram, the glue code interfacing with VS Code provided by Sprotty ([sprotty-vscode](https://github.com/eclipse-sprotty/sprotty-vscode)) launches a webview pane on the right. The VS Code webview can run any arbitrary, complete HTML document, which [sprotty-vscode](https://github.com/eclipse-sprotty/sprotty-vscode) helps generate, but it does asks for the extension developer to provide a `webview.js`. In our project, this is all the code under `packages/webview`, which defines _how_ a diagram should be rendered on the front end by the core Sprotty library ([sprotty](https://github.com/eclipse-sprotty/sprotty/tree/master/packages/sprotty)). To understand how Sprotty renders a diagram, please refer to the [Sprotty documentation](https://sprotty.org/docs/introduction/). Note that the webview does not determine _what_ to render—that is determined and sent by the backend, i.e., the extension's Node.js process.

When the user requests for a diagram, the backend extension process constructs a model in the [ELK JSON](https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html) format. This ELK model describes _what_ to render: the nodes representing FPP components, the ports embedded inside each component, the labels to be displayed inside the component and beside the ports, the edges between ports, etc. These information all come from the aforementioned `declCollector`. The magic of the Elkjs framework is, once the dimensions of these individual graph components are determined, Elkjs runs sophisticated [layout algorithms](https://eclipse.dev/elk/reference/algorithms.html) to determine concrete `x` and `y` position of each component, and concrete routing of edges such that the diagram appears "beautiful". Once Elkjs finishes layout in a separate Node.js worker thread, the extension converts the ELK model into a [Sprotty model](https://sprotty.org/docs/ref/smodel/), which the front end understands, and sends it to the front end webview.

The webview receives the Sprotty model and renders it in the webview window for the user. Actions such as "center", "fit", and "export SVG" are handled on the front end. When the user saves a file, the backend sends a new model to the front end to render.

### How to add a new visualization

As an example, we outline the steps to add a new visualization for FPP state machines.

Note: This section is last checked in September 2025, and can go out of date as the codebase evolves.

#### Step 1: Create CodeLens buttons.

Every time we encounter a state machine, we want to have an `Open in Diagram` button floating on top of the `state machine` keyword. To do so, go to [`extension.ts`](../extension.ts) and edit the function `provideCodeLenses()`.

#### Step 2: Create a method for generating a state machine SGraph.

Create a method in [`generator.ts`](./generator.ts) with the following signature.
```TypeScript
static async stateMachine(decl: DeclCollector, diagramConfig: FppDiagramConfig, fullyQualifiedName: string): Promise<SGraph | undefined> {
    return undefined; // TODO
}
```

This `stateMachine()` method is called by `displayDiagram()` in [`manager.ts`](./manager.ts), which is called when the codelens button is pressed.

#### Step 3: Populate the body of `stateMachine()`.

The general strategy for implementing these graph generation methods is to produce an `FppElkNode` object, which is an ELK graph, that captures _what_ you want to render. After this is done, call `convertElkGraphToSGraph(elkGraph)` to convert it into an SGraph, i.e., the graph actually sent to webview for rendering.

The reason why we generate an ELK graph object, rather than generating an SGraph directly, is to be able to test out different ELK render options, which are crucial for making diagrams look nice. If we start with SGraph, it is quite trickly to get the corresponding ELK graph (one would have to use an esoteric Sprotty API), making it hard to test the options.

With the ELK object in JSON, here is an online ELK visualizer: https://rtsys.informatik.uni-kiel.de/elklive/json.html. If the server is down, run it locally by cloning this repo: https://github.com/kieler/elk-live.

Every `FppElkNode` object needs to have a nested `data` object, which contains a `SNodeType` field. This field is used when translating the ELK graph into an SGraph and must be filled in. Once you fill in this field, make sure to navigate to [`webview/src/di.config.ts`](../../webview/src/di.config.ts) and make sure the `SNodeType` is referenced in one of the `configureModelElement()` calls, otherwise the diagram would not render.
