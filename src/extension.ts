import * as vscode from 'vscode';

import { FppParser, QualIdentContext } from './grammar/FppParser';

import * as Fpp from './parser/ast';
import * as Settings from './settings';

import { CompletionRelevantInfo, getCandidates } from './completion';
import { declRules, ignoreTokens } from './parser/common';
import { FppProject } from './project';
import { FppAnnotator, tokenParents } from './passes/annotator';
import { MemberTraverser } from './passes/traverser';
import { DeclCollector, SymbolType, fppLegend, tokenTypeNames } from './passes/decl';
import { DiangosicManager } from './diagnostics';
import { RangeAssociation } from './associator';
import { ComponentsProvider } from './dictionary';
import { ConsolidatingItem, ConsolidatingTree } from './consolidate';
import { isKeyword } from './keywords';
import { generateSignature, signaturesDefinitions } from './signature';
import { locs, LocsQuickPickFile, LocsQuickPickItem, LocsQuickPickType } from './locs';

import { registerDefaultCommands } from 'sprotty-vscode';
import { DiagramType, FppWebviewPanelManager } from './diagram/manager';

function documentSymbolKind(type: SymbolType): vscode.SymbolKind | undefined {
    switch (type) {
        case SymbolType.graphGroup:
            return vscode.SymbolKind.Event;
        case SymbolType.module:
        case SymbolType.topology:
            return vscode.SymbolKind.Namespace;
        case SymbolType.component: return vscode.SymbolKind.Class;
        case SymbolType.componentInstance: return vscode.SymbolKind.Variable;
        case SymbolType.constant: return vscode.SymbolKind.Constant;
        case SymbolType.port: return vscode.SymbolKind.Interface;
        case SymbolType.interface: return vscode.SymbolKind.Interface;
        case SymbolType.type: return vscode.SymbolKind.Enum;
        case SymbolType.inputPortDecl: return vscode.SymbolKind.Interface;
        case SymbolType.outputPortDecl: return vscode.SymbolKind.Interface;
        case SymbolType.command: return vscode.SymbolKind.Function;
        case SymbolType.event: return vscode.SymbolKind.String;
        case SymbolType.parameter: return vscode.SymbolKind.Property;
        case SymbolType.telemetry: return vscode.SymbolKind.Field;

        case SymbolType.inputPortInstance:
        case SymbolType.outputPortInstance:
        case SymbolType.formalParameter:
        case SymbolType.modifier:
        case SymbolType.specialPort:
            // These are not symbols that will show up in the outline
            return;
    }
}

class FppDocumentSymbol extends vscode.DocumentSymbol implements ConsolidatingItem {
    children: FppDocumentSymbol[] = [];

    constructor(
        name: string,
        detail: string,
        readonly token: SymbolType,
        kind: vscode.SymbolKind,
        readonly uri: vscode.Uri,
        range: vscode.Range,
        selectionRange: vscode.Range
    ) {
        super(name, detail, kind, range, selectionRange);
    }

    isChild(child: FppDocumentSymbol): boolean {
        return tokenParents.get(child.token)?.includes(this.token) ?? false;
    }
}

class FppExtension implements
    vscode.CompletionItemProvider,
    vscode.DefinitionProvider,
    vscode.DocumentLinkProvider,
    vscode.DocumentSemanticTokensProvider,
    vscode.DocumentSymbolProvider,
    vscode.HoverProvider,
    vscode.ReferenceProvider,
    vscode.SignatureHelpProvider,
    vscode.Disposable {

    readonly project: FppProject;

    private subscriptions: vscode.Disposable[];
    private componentsProvider: ComponentsProvider;
    private _onDidChangeCodeLenses = new vscode.EventEmitter<void>();

    onDidChangeSemanticTokens: vscode.Event<void>;
    onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;


    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        this.project = new FppProject({ scheme: 'file', language: 'fpp' });

        this.onDidChangeSemanticTokens = this.project.onRefresh;

        this.componentsProvider = new ComponentsProvider(this.project.decl);

        // Once the worker boots up, load the project
        this.subscriptions = [];
        this.project.ready().then(async () => {
            // Check if a locs file is already selected by this workspace
            const filePath = locs(this.context);
            let projectPromise: Promise<void>;
            if (filePath === "*") {
                projectPromise = this.setProjectScanWorkspace();
            } else {
                let file = filePath ? vscode.Uri.file(filePath) : undefined;

                if (!file) {
                    // Attempt to glob search for locs file
                    file = await this.searchForLocs();
                }

                projectPromise = this.setProjectLocs(file);
            }

            // Don't allow the language providers interfere with the project loading
            projectPromise
                .finally(() => {
                    this.subscriptions = [
                        // Update the internal ast on document change
                        vscode.workspace.onDidChangeTextDocument((e) => {
                            if (vscode.languages.match(this.project.documentSelector, e.document)) {
                                // Reparse the document to update the information
                                this.project.parse(e.document);
                            }
                        }),
                        // Refresh project dictionary listing
                        this.project.onRefresh(this.componentsProvider.refresh.bind(this.componentsProvider)),
                        vscode.languages.registerDocumentSemanticTokensProvider(this.project.documentSelector, this, fppLegend),
                        vscode.languages.registerDefinitionProvider(this.project.documentSelector, this),
                        vscode.languages.registerDocumentLinkProvider(this.project.documentSelector, this),
                        vscode.languages.registerHoverProvider(this.project.documentSelector, this),
                        vscode.languages.registerCompletionItemProvider(this.project.documentSelector, this, " ", ".", ":"),
                        vscode.languages.registerSignatureHelpProvider(this.project.documentSelector, this, " ", ",", "[", "(", "{", "=", ":"),
                        vscode.languages.registerReferenceProvider(this.project.documentSelector, this),
                        vscode.languages.registerDocumentSymbolProvider(this.project.documentSelector, this),
                        vscode.languages.registerCodeLensProvider(this.project.documentSelector, this),
                        vscode.window.registerTreeDataProvider('fpp.components', this.componentsProvider),
                        vscode.workspace.onDidChangeConfiguration((cfg) => {
                            if (cfg.affectsConfiguration("fpp.enableCodeLens")) {
                                this._onDidChangeCodeLenses.fire();
                            }
                        }),
                    ];
                });
        });
    }

    /**
     * Searches through the locs search paths in order to find an `fpp.locs` file
     * @returns Promise to locs file or `undefined` if not found
     */
    async searchForLocs() {
        try {
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
                title: "Searching for fpp.locs",
                cancellable: true
            }, async (progress, token) => {
                const searchPaths = Settings.locsSearch();
                const excludeGlob = Settings.excludeLocs();

                for (const searchPath of searchPaths) {
                    progress.report({
                        message: `Searching ${searchPath}`,
                        increment: (100 / searchPath.length)
                    });

                    const found = await vscode.workspace.findFiles(
                        searchPath,
                        excludeGlob,
                        1,
                        token
                    );

                    if (found.length > 0) {
                        return found[0];
                    }
                }

                return undefined;
            });
        }
        catch (e) {
            vscode.window.showWarningMessage(`Failed to find locs.fpp: ${e}`);
        }
    }

    private readonly symbolTraverser = new class extends MemberTraverser {
        symbols: [SymbolType, string, vscode.Range, vscode.Range, string[]][] = [];

        private memberDeclType(member: Fpp.Member): SymbolType | undefined {
            switch (member.type) {
                case 'AbstractTypeDecl': return SymbolType.type;
                case 'ArrayDecl': return SymbolType.type;
                case 'ComponentDecl': return SymbolType.component;
                case 'ComponentInstanceDecl': return SymbolType.componentInstance;
                case 'ConstantDecl': return SymbolType.constant;
                case 'ModuleDecl': return SymbolType.module;
                case 'PortDecl': return SymbolType.port;
                case 'StructDecl': return SymbolType.type;
                case 'TopologyDecl': return SymbolType.topology;
                case 'EnumDecl': return SymbolType.type;
                case 'DirectGraphDecl': return SymbolType.graphGroup;
                case 'CommandDecl': return SymbolType.command;
                case 'ParamDecl': return SymbolType.parameter;
                case 'GeneralPortInstanceDecl': return SymbolType.inputPortDecl;
                case 'SpecialPortInstanceDecl': return SymbolType.specialPort;
                case 'TelemetryChannelDecl': return SymbolType.telemetry;
                case 'EventDecl': return SymbolType.event;
                case 'InternalPortDecl': return SymbolType.specialPort;

                case 'LocationStmt':
                case 'IncludeStmt':
                case 'ComponentInstanceSpec':
                case 'PatternGraphStmt':
                case 'TopologyImportStmt':
                case 'MatchStmt':
                // These are not declarations
            }
        }

        protected traverse(ast: Fpp.Member, scope: Fpp.QualifiedIdentifier): void {
            const tokType = this.memberDeclType(ast);
            if (tokType !== undefined) {
                const decl = ast as Fpp.Decl;

                this.symbols.push([
                    tokType,
                    decl.location.source,
                    MemberTraverser.asRange(ast.location),
                    MemberTraverser.asRange(decl.name.location),
                    [...scope.map(v => v.value), decl.name.value]
                ]);
            }

            super.traverse(ast, scope);
        }

        protected enumDecl(ast: Fpp.EnumDecl, scope: Fpp.QualifiedIdentifier): void {
            for (const member of ast.members) {
                this.symbols.push([
                    SymbolType.constant,
                    ast.location.source,
                    MemberTraverser.asRange(member.location),
                    MemberTraverser.asRange(member.name.location),
                    [...scope.map(v => v.value), ast.name.value, member.name.value]
                ]);
            }
        }
    }();

    async provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.DocumentSymbol[] | undefined> {
        const ast = await this.project.parse(document, token);

        this.symbolTraverser.symbols = [];
        this.symbolTraverser.pass(ast.ast);

        const symbols = new ConsolidatingTree<FppDocumentSymbol>();
        for (const [tokType, grammarSource, fullRange, nameRange, fqName] of this.symbolTraverser.symbols) {
            const kind = documentSymbolKind(tokType);
            if (kind === undefined) {
                continue;
            }

            symbols.set(fqName.join('.'), new FppDocumentSymbol(
                fqName[fqName.length - 1],
                tokenTypeNames[tokType],
                tokType, kind,
                vscode.Uri.file(grammarSource),
                fullRange, nameRange
            ));
        }

        // Resolve the parent tree
        // Simplify the scope tree that is currently flat
        symbols.consolidate();

        return symbols.all();
    }

    async provideReferences(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.ReferenceContext,
        token: vscode.CancellationToken
    ): Promise<vscode.Location[] | undefined> {

        if (this.inComment(document, position)) {
            return;
        }

        // Check if this definition exists
        let fullyQualified: string | undefined = this.project.decl.translationUnitDeclarations.get(document.uri.path)?.get(position)?.[1];
        if (!fullyQualified) {
            // See if this is a reference to a declaration
            let definition = (await this.project.get(document, token)).definitions.get(document.uri.path)?.get(position);
            if (!definition) {
                return;
            }

            fullyQualified = DiangosicManager.flat(definition.scope ?? [], definition.name);
        }

        const allReferences = this.project.decl.references.get(fullyQualified);

        const out: vscode.Location[] = [];
        for (const [source, references] of allReferences) {
            const uri = vscode.Uri.file(source);

            for (const ref of references) {
                out.push(new vscode.Location(uri, ref));
            }
        }

        return out;
    }

    ready(): Promise<void> {
        return this.project.ready();
    }

    async setProjectLocs(locsFile: vscode.Uri | undefined) {
        await this.context.workspaceState.update('fpp.locsFile', locsFile?.path);
        await this.project.locsFile(locsFile);
    }

    async setProjectScanWorkspace() {
        await this.context.workspaceState.update('fpp.locsFile', '*');
        await this.project.workspaceScan();
    }

    reload() {
        return this.project.reload();
    }

    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens | undefined> {
        return (await this.project.get(document, token, {
            disableRefresh: true
        })).tokens.get(document.uri.path)?.build();
    }

    async provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Definition | undefined> {
        const definition = (await this.project.get(
            document, token
        )).definitions.get(document.uri.path)?.get(position);

        if (definition) {
            return FppAnnotator.asLocation(definition.name.location);
        }
    }

    async provideDocumentLinks(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.DocumentLink[]> {
        return (await this.project.get(document, token)).links.get(document.uri.path) ?? [];
    }

    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> {
        if (this.inComment(document, position)) {
            return;
        }

        let association: RangeAssociation<Fpp.Decl> | undefined;

        // Check if this definition exists
        const declAssociation = this.project.decl.translationUnitDeclarations.get(document.uri.path)?.getAssociation(position);
        if (declAssociation) {
            const { range, value } = declAssociation;
            const decl = this.project.decl.get(value[1], value[0]);
            association = decl ? { range: range, value: decl } : undefined;
        } else {
            // Check if we are hovering over a variable reference
            association = (await this.project.get(document, token)).definitions.get(document.uri.path)?.getAssociation(position);
        }

        let range: vscode.Range | undefined = undefined;
        const md: vscode.MarkdownString[] = [];

        if (association) {
            const definition = association.value;
            let typeName: string | undefined;
            if (definition.fppType) {
                if (definition.fppType.complex) {
                    typeName = MemberTraverser.flat(definition.fppType.type);

                    const possibleFppTypes: SymbolType[] = [
                        SymbolType.type,
                        SymbolType.port,
                        SymbolType.component
                    ];

                    let resolved = false;
                    for (const fppTokType of possibleFppTypes) {
                        const resolvedFppType = this.project.decl.resolve(definition.fppType.type, definition.scope, fppTokType);
                        if (resolvedFppType) {
                            typeName = MemberTraverser.flat(resolvedFppType);
                            resolved = true;
                            break;
                        }
                    }

                    if (!resolved) {
                        typeName = `${typeName} (Unresolved)`;
                    }
                } else {
                    typeName = definition.fppType.type;
                }
            }

            const fullName = FppAnnotator.flat(definition.scope, definition.name);

            const mdAssociation = new vscode.MarkdownString();
            let signatureBlock: string = `(${definition.type.replace("Decl", "").replace("Def", "")}) ${fullName}`;
            if (typeName) {
                signatureBlock += `: ${typeName}`;
            }

            if (definition.annotatedValue) {
                signatureBlock += ' ' + definition.annotatedValue;
            }

            mdAssociation.appendCodeblock(signatureBlock, 'typescript');
            md.push(mdAssociation);

            // Add the optional annotation
            let annotationStr: string = '';
            if (definition.annotation) {
                annotationStr = definition.annotation;
            }

            if (definition.annotatedMembers) {
                annotationStr += '\n\n' + definition.annotatedMembers.map(v => ` *@${definition.annotatedMemberName ?? 'param'}* \`${v[0]}\` ${v[1]}`).join('\n\n');

                if (definition.type === 'PortDecl' && (definition as Fpp.PortDecl).returnType) {
                    annotationStr += `\n\n @return ${DeclCollector.typeName((definition as Fpp.PortDecl).returnType!)}`;
                }
            }

            if (annotationStr.length > 0) {
                md.push(new vscode.MarkdownString(annotationStr));
            }

            range = new vscode.Range(
                association.range.start.line, association.range.start.character,
                association.range.end.line, association.range.end.character
            );
        }

        if (!range) {
            return undefined;
        }

        return new vscode.Hover(md, range);
    }

    private inComment(document: vscode.TextDocument, position: vscode.Position): boolean {
        const currentLine = document.lineAt(position.line);
        let commentIdx = currentLine.text.indexOf('#');
        commentIdx = commentIdx < 0 ? currentLine.text.indexOf('@') : commentIdx;

        // We are writing a comment since the cursor is after a line comment start
        return commentIdx >= 0 && commentIdx <= position.character;
    }

    private generateReferenceListFromScope(
        map: Map<string, Fpp.Decl>,
        context: QualIdentContext | undefined,
        scope: readonly string[],
        kind: vscode.CompletionItemKind
    ): vscode.CompletionItem[] {
        let writtenSoFar: string = '';
        if (context) {
            writtenSoFar = context.text.replaceAll(" ", "");
        }

        const out: vscode.CompletionItem[] = [];

        let scopeBuildUp: string[] = [];
        const scopeTeardown = [...scope].reverse();

        const keys = Array.from(map.keys());

        while (true) {
            const prefix = [...scopeBuildUp, writtenSoFar].join(".");
            const foundItems = keys.filter(v => v.startsWith(prefix));

            const nextToks = new Set<string>(
                foundItems.map(found => found.slice(prefix.length).split('.')[0])
            );

            for (let tok of nextToks) {
                const decl = map.get(`${prefix}${tok}`);
                if (decl) {
                    if (isKeyword(tok)) {
                        tok = `$${tok}`;
                    }

                    const item = new vscode.CompletionItem(tok, kind);
                    item.detail = decl.annotation;
                    out.push(item);
                } else {
                    out.push(new vscode.CompletionItem(tok, kind));
                }
            }

            const nextScope = scopeTeardown.pop();
            if (nextScope) {
                scopeBuildUp.push(nextScope);
            } else {
                break;
            }
        }

        return out;
    }

    private referenceCompletion(declType: SymbolType, context: QualIdentContext, scope: string[]): vscode.CompletionItem[] {
        const declTypeMap = new Map<SymbolType, [Map<string, Fpp.Decl>, vscode.CompletionItemKind]>([
            [SymbolType.topology, [this.project.decl.topologies, vscode.CompletionItemKind.Module]],
            [SymbolType.component, [this.project.decl.components, vscode.CompletionItemKind.Class]],
            [SymbolType.componentInstance, [this.project.decl.componentInstances, vscode.CompletionItemKind.Variable]],
            [SymbolType.interface, [this.project.decl.interfaces, vscode.CompletionItemKind.Interface]],
            [SymbolType.constant, [this.project.decl.constants, vscode.CompletionItemKind.EnumMember]],
            [SymbolType.port, [this.project.decl.ports, vscode.CompletionItemKind.Class]],
            [SymbolType.type, [this.project.decl.types, vscode.CompletionItemKind.Class]],
            [SymbolType.inputPortInstance, [this.project.decl.inputPortInstances, vscode.CompletionItemKind.Function]],
            [SymbolType.outputPortInstance, [this.project.decl.outputPortInstances, vscode.CompletionItemKind.Function]],
            [SymbolType.action, [this.project.decl.actions, vscode.CompletionItemKind.Function]],
            [SymbolType.stateMachine, [this.project.decl.stateMachines, vscode.CompletionItemKind.Class]],
            [SymbolType.signal, [this.project.decl.signals, vscode.CompletionItemKind.Event]],
            [SymbolType.state, [this.project.decl.states, vscode.CompletionItemKind.EnumMember]]
        ]);

        const mapping = declTypeMap.get(declType);
        if (mapping) {
            return this.generateReferenceListFromScope(
                mapping[0],
                context,
                scope,
                mapping[1]
            );
        }

        return [];
    }

    private symbolsInScope<T extends Fpp.Decl>(map: Map<string, T>, scope: string[]): [string, T][] {
        const prefix = scope.join(".");
        return Array.from(map.entries())
            .filter(([qualIdent, _]) => qualIdent.startsWith(prefix));
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
    ): vscode.ProviderResult<vscode.CompletionItem[]> {

        // First things first, check if we are in a comment
        // The parser does not know how to recognize comments since
        // they are expelled at lexing time
        // FPP only has single line comments which makes things simple
        if (this.inComment(document, position)) {
            return;
        }

        const candidates = getCandidates(document, position);
        const out: vscode.CompletionItem[] = [];

        const keywords: string[] = [];
        for (const candidate of candidates.tokens) {
            if (ignoreTokens.has(candidate)) {
                continue;
            }

            const displayName = candidates.parser.vocabulary.getDisplayName(candidate);
            if (displayName.startsWith("'")) {
                keywords.push(displayName.replaceAll("'", ""));
            }
        }

        keywords.sort().map(keyword => {
            out.push(
                new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword)
            );
        });

        // Check if we either expected an identifier next or if we are currently
        // trying to resolve a qualified identifier.
        // It can't just be a simple identifier because that could be the declaration
        // name which shouldn't bring up any completion items.
        // If RULE_qualIdent does not should up in the candiate.rules its because we expect
        // EITHER a qualIdent or a keyword next. This means that we did not create a qualIdent
        // context in the parser.
        const expectsQualIdent = candidates.tokens.has(FppParser.IDENTIFIER) && keywords.length > 0;
        const qualIdentInfo = candidates.rules.get(FppParser.RULE_qualIdent);
        const expectsExpr = candidates.rules.get(FppParser.RULE_expr);
        if (qualIdentInfo || expectsQualIdent || expectsExpr) {
            // A qualified identifier references some declaration
            // We need to figure out what type this is referencing

            const singleQualIdentMappings: [number, SymbolType][] = [
                // This is in order of priority
                // Only the first two need to be injested first
                [FppParser.RULE_expr, SymbolType.constant],
                [FppParser.RULE_typeName, SymbolType.type],
                [FppParser.RULE_formalParameterList, SymbolType.type],

                [FppParser.RULE_generalPortInstanceType, SymbolType.port],
                [FppParser.RULE_componentInstanceDecl, SymbolType.component],
                [FppParser.RULE_componentInstanceSpec, SymbolType.componentInstance],
                // This is special since we there are two in the rule
                // [FppParser.RULE_connectionNode, FppTokenType.componentInstance],
                [FppParser.RULE_patternGraphSources, SymbolType.componentInstance],
                [FppParser.RULE_importTopologyStmt, SymbolType.topology],
                [FppParser.RULE_importInterfaceStmt, SymbolType.interface],
                [FppParser.RULE_generalPortInstanceDecl, SymbolType.port],

                [FppParser.RULE_stateMachineInstance, SymbolType.stateMachine],

                // I'm not doing this cause its annoying ;)
                // Also who the hell writes these manually
                // [FppParser.RULE_locationStmt, FppTokenType.],
            ];

            for (const [ruleIdx, type] of singleQualIdentMappings) {
                if (candidates.rules.has(ruleIdx)) {
                    return out.concat(this.referenceCompletion(
                        type, qualIdentInfo?.context as QualIdentContext, candidates.scope
                    ));
                }
            }

            // Rule the manual rules
            const connectionInfo = candidates.rules.get(FppParser.RULE_connection);
            if (connectionInfo) {
                return out.concat(this.referenceCompletion(
                    connectionInfo.context.childCount <= 1 ? SymbolType.outputPortInstance : SymbolType.inputPortInstance,
                    qualIdentInfo?.context as QualIdentContext, candidates.scope
                ));
            }
        }

        if (candidates.rules.get(FppParser.RULE_doExpr)) {
            if (candidates.tokens.has(FppParser.IDENTIFIER)) {
                const decls = this.symbolsInScope(this.project.decl.actions, candidates.scope);
                return decls.map(([_, v]) => new vscode.CompletionItem(v.name.value, vscode.CompletionItemKind.Function));
            }
        }

        const stateTransition = candidates.rules.get(FppParser.RULE_stateTransition);
        if (stateTransition) {
            if (candidates.tokens.has(FppParser.IDENTIFIER)) {
                // Decide what to suggest based on the previous token
                const lastToken = stateTransition.context.stop;
                if (lastToken) {
                    switch (lastToken.type) {
                        case FppParser.ON:
                            return this.symbolsInScope(this.project.decl.signals, candidates.scope)
                                .map(([_, v]) => new vscode.CompletionItem(v.name.value, vscode.CompletionItemKind.Function));
                        case FppParser.IF:
                            return this.symbolsInScope(this.project.decl.guards, candidates.scope)
                                .map(([_, v]) => new vscode.CompletionItem(v.name.value, vscode.CompletionItemKind.Variable));
                    }
                }
            }
        }

        const choiceDef = candidates.rules.get(FppParser.RULE_choiceDef);
        if (choiceDef) {
            if (candidates.tokens.has(FppParser.IDENTIFIER)) {
                // Decide what to suggest based on the previous token
                const lastToken = choiceDef.context.stop;
                if (lastToken) {
                    switch (lastToken.type) {
                        case FppParser.CHOICE:
                            return this.symbolsInScope(this.project.decl.guards, candidates.scope)
                                .map(([_, v]) => new vscode.CompletionItem(v.name.value, vscode.CompletionItemKind.Function));
                        case FppParser.IF:
                            return this.symbolsInScope(this.project.decl.guards, candidates.scope)
                                .map(([_, v]) => new vscode.CompletionItem(v.name.value, vscode.CompletionItemKind.Variable));
                    }
                }
            }
        }

        if (candidates.rules.get(FppParser.RULE_transitionExpr)) {
            // The current scope should be the state machine scope
            // All states that start with this should be suggested
            const decls = this.symbolsInScope(this.project.decl.states, candidates.scope);
            const scope = candidates.scope.join(".");
            return decls.map(([key, _]) => new vscode.CompletionItem(
                key.substring(scope.length + 1),
                vscode.CompletionItemKind.Function
            ));
        }

        return out;
    }

    private getSignatureRelevantInfo(ruleIdx: number, relevant: CompletionRelevantInfo) {
        const ruleName = FppParser.ruleNames[ruleIdx];

        if (!signaturesDefinitions[ruleName]) {
            return;
        }

        const stateMap = signaturesDefinitions[ruleName].stateMap;

        let paramName: string;
        if (!stateMap) {
            return;
        } else if (Array.isArray(stateMap)) {
            paramName = stateMap[relevant.context.childCount];
        } else {
            const map = new Map<number, string>();

            for (const [key, states] of Object.entries(stateMap.map)) {
                for (const stateOffset of states) {
                    map.set(stateOffset, key);
                }
            }

            const prmName = map.get(relevant.state - stateMap.offset);
            if (!prmName) {
                return;
            }

            paramName = prmName;
        }

        return generateSignature(signaturesDefinitions[ruleName], paramName);
    }

    async provideSignatureHelp(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.SignatureHelpContext
    ): Promise<vscode.SignatureHelp | undefined> {
        if (this.inComment(document, position)) {
            return;
        }

        // Provide all signatures of candidate rules
        const matched = (await this.project.parse(document, token)).ranges.get(document.uri.path)?.getAssociation(position);
        if (matched) {
            const ruleName = FppParser.ruleNames[matched.value.rule];
            const iSignature = signaturesDefinitions[ruleName];
            if (!iSignature) {
                return undefined;
            }

            return {
                signatures: [generateSignature(iSignature, matched.value.param)],
                activeParameter: 0,
                activeSignature: 0
            };
        }

        const candidates = getCandidates(document, position, declRules);

        const signatures: vscode.SignatureInformation[] = [];
        for (const [ruleIdx, relevant] of candidates.rules) {
            const signature = this.getSignatureRelevantInfo(ruleIdx, relevant);
            if (signature) {
                signatures.push(signature);
            }
        }

        return {
            signatures,
            activeParameter: 0,
            activeSignature: 0
        };
    }

    async provideCodeLenses(
        document: vscode.TextDocument,
        _token: vscode.CancellationToken
    ): Promise<vscode.CodeLens[]> {

        if (vscode.workspace.getConfiguration("fpp").get("enableCodeLens", true)) {

            const text = document.getText();
            const lenses: vscode.CodeLens[] = [];

            // This regex matches the word "connections" as a whole word, followed by one or more spaces,
            // then captures the next word (the group name) in a capture group.
            // - \bconnections: matches the word "connections" as a whole word
            // - \s+: matches one or more whitespace characters after "connections"
            // - (\w+): captures the group name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the group name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "connections Downlink" will capture "Downlink" as match[1].
            const regexConnGroups = /\bconnections\s+(\w+)\s*(?:\{)?/gm;

            // This regex matches component declarations like "active component", "passive component", or "queued component",
            // followed by the component name, and optionally a "{" character.
            // - \b: matches a word boundary to ensure matching at the start of a word
            // - (?:active|passive|queued): non-capturing group that matches "active", "passive", or "queued"
            // - \s+: matches one or more whitespace characters after the type
            // - component: matches the literal word "component"
            // - \s+: matches one or more whitespace characters after "component"
            // - (\w+): captures the component name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the component name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "active component MyComponent {" will capture "MyComponent" as match[1]
            const regexComponent = /\b(?:active|passive|queued)\s+component\s+(\w+)\s*(?:\{)?/gm;

            // This regex matches topology declarations like "topology MyTopology {", capturing the topology name.
            // - \b: matches a word boundary to ensure matching at the start of a word
            // - topology: matches the literal word "topology"
            // - \s+: matches one or more whitespace characters after "topology"
            // - (\w+): captures the topology name (one or more word characters) after the whitespace
            // - \s*: matches optional whitespace after the topology name
            // - (?:\{)?: optionally matches a "{" character (non-capturing, may be on the same or next line)
            // Example match: "topology MyTopology {" will capture "MyTopology" as match[1]
            const regexTopology = /\btopology\s+(\w+)\s*(?:\{)?/gm;

            let matchConnGroups: RegExpExecArray | null;
            let matchComponents: RegExpExecArray | null;
            let matchTopology: RegExpExecArray | null;

            while ((matchConnGroups = regexConnGroups.exec(text))) {
                const elemName = matchConnGroups[1];
                const offsetInMatch = matchConnGroups[0].indexOf(elemName);
                const offsetInDoc = matchConnGroups.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this connection group',
                    command: 'fpp.displayDiagram',
                    arguments: [DiagramType.connectionGroup, fullName]
                });
                lenses.push(lens);
            }

            while ((matchComponents = regexComponent.exec(text))) {
                const elemName = matchComponents[1];
                const offsetInMatch = matchComponents[0].indexOf(elemName);
                const offsetInDoc = matchComponents.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this component',
                    command: 'fpp.displayDiagram',
                    arguments: [DiagramType.component, fullName]
                });
                lenses.push(lens);
            }

            while ((matchTopology = regexTopology.exec(text))) {
                const elemName = matchTopology[1];
                const offsetInMatch = matchTopology[0].indexOf(elemName);
                const offsetInDoc = matchTopology.index + offsetInMatch;
                const position = document.positionAt(offsetInDoc);
                const range = new vscode.Range(position, position);

                // Try to resolve the matched name.
                let association = await this.getAssociation(document, position);
                if (!association) {
                    continue;
                }
                const definition = association!.value;
                const fullName = FppAnnotator.flat(definition.scope, definition.name);
                const lens = new vscode.CodeLens(range, {
                    title: `Open in Diagram: ${elemName}`,
                    tooltip: 'Click to visualize this topology',
                    command: 'fpp.displayDiagram',
                    arguments: [DiagramType.topology, fullName]
                });
                lenses.push(lens);
            }

            return lenses;
        }
        return [];
    }

    // Called right before CodeLens is rendered for the user.
    public resolveCodeLens(codeLens: vscode.CodeLens, _token: vscode.CancellationToken) {
        if (vscode.workspace.getConfiguration("fpp").get("enableCodeLens", true)) {
            // Usually for registering commands, in our case,
            // commands have been registered.
            return codeLens;
        }
        return null;
    }

    private async getAssociation(document: vscode.TextDocument, position: vscode.Position): Promise<RangeAssociation<Fpp.Decl> | undefined> {
        let association: RangeAssociation<Fpp.Decl> | undefined;

        // Check if this definition exists
        const declAssociation = this.project.decl.translationUnitDeclarations.get(document.uri.path)?.getAssociation(position);
        if (declAssociation) {
            const { range, value } = declAssociation;
            const decl = this.project.decl.get(value[1], value[0]);
            association = decl ? { range: range, value: decl } : undefined;
        }
        else {
            // Check if we are hovering over a variable reference
            association = (await this.project.get(document)).definitions.get(document.uri.path)?.getAssociation(position);
        }
        return association;
    }

    dispose() {
        this.subscriptions.map(e => e.dispose());
        this.subscriptions = [];

        this.project.dispose();
    }
}

export function activate(context: vscode.ExtensionContext) {
    const extension = new FppExtension(context);

    // When pushing Disposible into context.subscriptions,
    // the extension automatically calls dispose() on each
    // item in the array.
    context.subscriptions.push(
        extension,
        vscode.commands.registerCommand('fpp.reload', extension.reload.bind(extension)),
        vscode.commands.registerCommand('fpp.load', (file?: vscode.Uri) => {
            if (!file) {
                return vscode.commands.executeCommand('fpp.open');
            } else {
                return extension.setProjectLocs(file);
            }
        }),
        vscode.commands.registerCommand('fpp.select', () => {
            vscode.window.showQuickPick(
                (async () => {
                    const currentLocs = locs(context);

                    const searchPaths = Settings.locsSearch();
                    const excludeGlob = Settings.excludeLocs();

                    const files = new Map<string, vscode.Uri>();
                    const items: LocsQuickPickItem[] = [
                        {
                            kind: vscode.QuickPickItemKind.Default,
                            label: '$(open) Open',
                            locsKind: LocsQuickPickType.locsOpenDialog
                        },
                        {
                            kind: vscode.QuickPickItemKind.Default,
                            label: 'Scan entire workspace for .fpp files',
                            locsKind: LocsQuickPickType.workspaceScan
                        },
                        {
                            kind: vscode.QuickPickItemKind.Separator,
                            label: ''
                        }
                    ];

                    for (const searchPath of searchPaths) {
                        for (const file of await vscode.workspace.findFiles(
                            searchPath,
                            excludeGlob,
                        )) {
                            files.set(vscode.workspace.asRelativePath(file), file);
                        }
                    }

                    for (const [relPath, uri] of files.entries()) {
                        items.push({
                            kind: vscode.QuickPickItemKind.Default,
                            label: relPath,
                            uri,
                            locsKind: LocsQuickPickType.locsFile,
                            description: currentLocs === uri.path ? '(Active)' : undefined
                        } as LocsQuickPickFile);
                    }

                    return items;
                })(),
                {
                    title: 'Select FPP Locs for project indexing',
                    canPickMany: false,
                }
            ).then((picked) => {
                if (picked?.kind === vscode.QuickPickItemKind.Default) {
                    switch (picked.locsKind) {
                        case LocsQuickPickType.locsOpenDialog:
                            vscode.commands.executeCommand('fpp.open');
                            break;
                        case LocsQuickPickType.locsFile:
                            extension.setProjectLocs(picked.uri);
                            break;
                        case LocsQuickPickType.workspaceScan:
                            extension.setProjectScanWorkspace();
                            break;
                    }
                }
            });
        }),
        vscode.commands.registerCommand('fpp.close', async () => {
            await extension.setProjectLocs(undefined);
        }),
        vscode.commands.registerCommand('fpp.open', () => {
            const currentLocs = locs(context);
            vscode.window.showOpenDialog({
                defaultUri: currentLocs ? vscode.Uri.file(currentLocs) : undefined,
                openLabel: "Open locs",
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                filters: { "FPP": ["fpp"] },
                title: "Open 'locs.fpp' files in build directory"
            }).then((value) => {
                if (value) {
                    extension.setProjectLocs(value[0]);
                }
            });
        }),
        Settings.onLocsSearchChanged(() => {
            // Don't re-scan if a locs file is already loaded
            if (!locs(context)) {
                extension.searchForLocs().then((f) => extension.setProjectLocs(f));
            }
        }),
        vscode.workspace.onDidSaveTextDocument((document) => {
            // Re-render diagram on save.
            if (document.languageId === 'fpp') {
                vscode.commands.executeCommand('fpp.updateDiagram');
            }
        })
    );

    // Set up webview panel manager for freestyle webviews.
    const webviewPanelManager = new FppWebviewPanelManager({
        extensionUri: context.extensionUri,
        defaultDiagramType: 'fppDiagrams',
        supportedFileExtensions: ['.fpp'],
        singleton: true
    }, extension.project);
    registerDefaultCommands(webviewPanelManager, context, { extensionPrefix: 'fpp' });
    console.log("Instantiated FPP webview panel manager.");

    // Register command to update diagram on save.
    context.subscriptions.push(
        vscode.commands.registerCommand('fpp.updateDiagram', () => {
            webviewPanelManager.updateDiagram();
        })
    );

    // Set up CodeLens provider to have neat buttons float above definitions.
    context.subscriptions.push(
        vscode.commands.registerCommand("fpp.displayDiagram",
            (diagramType: DiagramType, elemName: string) => webviewPanelManager.displayDiagram(diagramType, elemName)
        ),
    );
}

export function deactivate() { }
