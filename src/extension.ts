import * as vscode from 'vscode';

import { FppParser, QualIdentContext } from './grammar/FppParser';

import * as Fpp from './parser/ast';
import * as Settings from './settings';

import Signatures from "./signatures.json";
import { CompletionRelevantInfo, getCandidates } from './completion';
import { declRules, ignoreTokens } from './parser/common';
import { FppProject } from './project';
import { FppAnnotator, tokenParents } from './annotator';
import { MemberTraverser } from './traverser';
import { DeclCollector, FppTokenType, fppLegend, tokenTypeNames } from './decl';
import { DiangosicManager } from './diagnostics';
import { RangeAssociation } from './associator';
import { ComponentsProvider } from './dictionary';
import { ConsolidatingItem, ConsolidatingTree } from './consolidate';
import { isKeyword } from './keywords';

const signaturesDefinitions = (Signatures as Record<string, ISignature>);

interface ISignature {
    signature: string;
    parameters: Record<string, string | string[]>;
    stateMap?: {
        offset: number;
        map: Record<string, number[]>
    } | string[];
}

function locs(context: vscode.ExtensionContext) {
    return context.workspaceState.get<string>("fpp.locsFile");
}

function generateSignature(signature: ISignature, activeParameter: string): vscode.SignatureInformation {
    const parameters: vscode.ParameterInformation[] = [];
    let activeParameterIdx: number | undefined = undefined;

    let i = 0;
    for (const [name, desc] of Object.entries(signature.parameters)) {
        let description: string;
        if (typeof desc === "string") {
            description = desc;
        } else {
            description = desc.join("\n");
        }

        if (name === activeParameter) {
            activeParameterIdx = i;
        }

        parameters.push(new vscode.ParameterInformation(name, new vscode.MarkdownString(description)));
        i++;
    }

    if (activeParameterIdx === undefined) {
        // Keywords and symbols are not explicitely
        // defined in the signature file
        // We still include and highlight them in the signature
        parameters.push(new vscode.ParameterInformation(activeParameter));
        activeParameterIdx = parameters.length - 1;
    }

    const out = new vscode.SignatureInformation(signature.signature);
    out.parameters = parameters;
    out.activeParameter = activeParameterIdx;
    return out;
}

function documentSymbolKind(type: FppTokenType): vscode.SymbolKind | undefined {
    switch (type) {
        case FppTokenType.graphGroup:
            return vscode.SymbolKind.Event;
        case FppTokenType.module:
        case FppTokenType.topology:
            return vscode.SymbolKind.Namespace;
        case FppTokenType.component: return vscode.SymbolKind.Class;
        case FppTokenType.componentInstance: return vscode.SymbolKind.Variable;
        case FppTokenType.constant: return vscode.SymbolKind.Constant;
        case FppTokenType.port: return vscode.SymbolKind.Interface;
        case FppTokenType.type: return vscode.SymbolKind.Enum;
        case FppTokenType.inputPortDecl: return vscode.SymbolKind.Interface;
        case FppTokenType.outputPortDecl: return vscode.SymbolKind.Interface;
        case FppTokenType.command: return vscode.SymbolKind.Function;
        case FppTokenType.event: return vscode.SymbolKind.String;
        case FppTokenType.parameter: return vscode.SymbolKind.Property;
        case FppTokenType.telemetry: return vscode.SymbolKind.Field;

        case FppTokenType.inputPortInstance:
        case FppTokenType.outputPortInstance:
        case FppTokenType.formalParameter:
        case FppTokenType.modifier:
        case FppTokenType.specialPort:
            // These are not symbols that will show up in the outline
            return;
    }
}

class FppDocumentSymbol extends vscode.DocumentSymbol implements ConsolidatingItem {
    children: FppDocumentSymbol[] = [];

    constructor(
        name: string,
        detail: string,
        readonly token: FppTokenType,
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

class FppSymbolInformation extends vscode.SymbolInformation implements ConsolidatingItem {
    children: FppDocumentSymbol[] = [];

    constructor(
        name: string,
        readonly token: FppTokenType,
        kind: vscode.SymbolKind,
        containerName: string,
        location: vscode.Location
    ) {
        super(name, kind, containerName, location);
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

    private project: FppProject;

    private subscriptions: vscode.Disposable[];
    private componentsProvider: ComponentsProvider;

    onDidChangeSemanticTokens: vscode.Event<void>;

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
            let file = filePath ? vscode.Uri.file(filePath) : undefined;

            if (!file) {
                // Attempt to glob search for locs file
                file = await this.searchForLocs();
            }

            if (!file) {
                vscode.window.showWarningMessage('No fpp.locs is loaded', 'Open').then((value) => {
                    if (value === "Open") {
                        vscode.commands.executeCommand('fpp.open');
                    }
                });
            }

            // Don't allow the language providers interfere with the project loading
            this.setProject(file)
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
                        vscode.window.registerTreeDataProvider('fpp.components', this.componentsProvider),
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
        symbols: [FppTokenType, string, vscode.Range, vscode.Range, string[]][] = [];

        private memberDeclType(member: Fpp.Member): FppTokenType | undefined {
            switch (member.type) {
                case 'AbstractTypeDecl': return FppTokenType.type;
                case 'ArrayDecl': return FppTokenType.type;
                case 'ComponentDecl': return FppTokenType.component;
                case 'ComponentInstanceDecl': return FppTokenType.componentInstance;
                case 'ConstantDecl': return FppTokenType.constant;
                case 'ModuleDecl': return FppTokenType.module;
                case 'PortDecl': return FppTokenType.port;
                case 'StructDecl': return FppTokenType.type;
                case 'TopologyDecl': return FppTokenType.topology;
                case 'EnumDecl': return FppTokenType.type;
                case 'DirectGraphDecl': return FppTokenType.graphGroup;
                case 'CommandDecl': return FppTokenType.command;
                case 'ParamDecl': return FppTokenType.parameter;
                case 'GeneralPortInstanceDecl': return FppTokenType.inputPortDecl;
                case 'SpecialPortInstanceDecl': return FppTokenType.specialPort;
                case 'TelemetryChannelDecl': return FppTokenType.telemetry;
                case 'EventDecl': return FppTokenType.event;
                case 'InternalPortDecl': return FppTokenType.specialPort;

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
                    FppTokenType.constant,
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

    async setProject(locsFile: vscode.Uri | undefined) {
        await this.context.workspaceState.update('fpp.locsFile', locsFile?.path);
        await this.project.set(locsFile);
    }

    reload() {
        return this.project.reload();
    }

    async provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens | undefined> {
        return (await this.project.get(document, token, { disableRefresh: true })).tokens.get(document.uri.path)?.build();
    }

    async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Definition | undefined> {
        const definition = (await this.project.get(document, token)).definitions.get(document.uri.path)?.get(position);
        if (definition) {
            return FppAnnotator.asLocation(definition.name.location);
        }
    }

    async provideDocumentLinks(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.DocumentLink[]> {
        return (await this.project.get(document, token)).links.get(document.uri.path) ?? [];
    }

    async provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Hover | undefined> {
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

                    const possibleFppTypes: FppTokenType[] = [
                        FppTokenType.type,
                        FppTokenType.port,
                        FppTokenType.component
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
            let signatureBlock: string = `(${definition.type.replace("Decl", "")}) ${fullName}`;
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

    private referenceCompletion(declType: FppTokenType, context: QualIdentContext, scope: string[]): vscode.CompletionItem[] {
        const declTypeMap = new Map<FppTokenType, [Map<string, Fpp.Decl>, vscode.CompletionItemKind]>([
            [FppTokenType.topology, [this.project.decl.topologies, vscode.CompletionItemKind.Module]],
            [FppTokenType.component, [this.project.decl.components, vscode.CompletionItemKind.Class]],
            [FppTokenType.componentInstance, [this.project.decl.componentInstances, vscode.CompletionItemKind.Variable]],
            [FppTokenType.constant, [this.project.decl.constants, vscode.CompletionItemKind.EnumMember]],
            [FppTokenType.port, [this.project.decl.ports, vscode.CompletionItemKind.Class]],
            [FppTokenType.type, [this.project.decl.types, vscode.CompletionItemKind.Class]],
            [FppTokenType.inputPortInstance, [this.project.decl.generalInputPortInstances, vscode.CompletionItemKind.Function]],
            [FppTokenType.outputPortInstance, [this.project.decl.generalOutputPortInstances, vscode.CompletionItemKind.Function]],
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

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[]> {

        // First things first, check if we are in a comment
        // The parser does not know how to recognize comments since
        // they are expelled at lexing time
        // FPP only has find line comments which makes things simple
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

            const singleQualIdentMappings: [number, FppTokenType][] = [
                // This is in order of priority
                // Only the first two need to be injested first
                [FppParser.RULE_expr, FppTokenType.constant],
                [FppParser.RULE_typeName, FppTokenType.type],
                [FppParser.RULE_formalParameterList, FppTokenType.type],

                [FppParser.RULE_generalPortInstanceType, FppTokenType.port],
                [FppParser.RULE_componentInstanceDecl, FppTokenType.component],
                [FppParser.RULE_componentInstanceSpec, FppTokenType.componentInstance],
                // This is special since we there are two in the rule
                // [FppParser.RULE_connectionNode, FppTokenType.componentInstance],
                [FppParser.RULE_patternGraphSources, FppTokenType.componentInstance],
                [FppParser.RULE_topologyImportStmt, FppTokenType.topology],
                [FppParser.RULE_generalPortInstanceDecl, FppTokenType.port],

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
                    connectionInfo.context.childCount <= 1 ? FppTokenType.outputPortInstance : FppTokenType.inputPortInstance,
                    qualIdentInfo?.context as QualIdentContext, candidates.scope
                ));
            }
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

    dispose() {
        this.subscriptions.map(e => e.dispose());
        this.subscriptions = [];

        this.project.dispose();
    }
}

interface LocsQuickPickOpen extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Default;
    isOpen: true;
}

interface LocsQuickPickFile extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Default;
    isOpen: false;
    uri: vscode.Uri;
}

interface LocsQuickPickSeparator extends vscode.QuickPickItem {
    kind: vscode.QuickPickItemKind.Separator;
}

type LocsQuickPickItem = LocsQuickPickOpen | LocsQuickPickFile | LocsQuickPickSeparator;

export function activate(context: vscode.ExtensionContext) {
    const extension = new FppExtension(context);

    context.subscriptions.push(
        extension,
        vscode.commands.registerCommand('fpp.reload', extension.reload.bind(extension)),
        vscode.commands.registerCommand('fpp.load', (file?: vscode.Uri) => {
            if (!file) {
                return vscode.commands.executeCommand('fpp.open');
            } else {
                return extension.setProject(file);
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
                            isOpen: true
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
                            isOpen: false,
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
                    if (picked.isOpen) {
                        vscode.commands.executeCommand('fpp.open');
                    } else {
                        extension.setProject(picked.uri);
                    }
                }
            });
        }),
        vscode.commands.registerCommand('fpp.close', async () => {
            await extension.setProject(undefined);
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
                    extension.setProject(value[0]);
                }
            });
        }),
        Settings.onLocsSearchChanged(() => {
            // Don't re-scan if a locs file is already loaded
            if (!locs(context)) {
                extension.searchForLocs().then((f) => extension.setProject(f));
            }
        })
    );
}

export function deactivate() { }
