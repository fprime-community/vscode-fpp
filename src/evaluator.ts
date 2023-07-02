import * as vscode from 'vscode';

import * as Fpp from './parser/ast';
import { MemberTraverser } from "./traverser";

export interface TypeValidator {
    resolved?: Fpp.TypeDecl;

    /**
     * Validates that the evaluated type is correct
     * @param value Evaluated value to validate type of
     * @returns Formatted error or undefined if no error occured
     */
    validate(value: Fpp.ExprValue): string | undefined;
}

export class TypeNameValidator implements TypeValidator {
    constructor(public typeName: Fpp.TypeName, public resolved?: Fpp.TypeDecl) {
    }

    private static readonly integerBounds = new Map<Fpp.IntegralTypeKey, [number, number]>([
        ["U8", [0, 255]],
        ["I8", [-128, 127]],
        ["U16", [0, 65535]],
        ["I16", [-32767, +32767]]
    ]);

    validate(value: Fpp.ExprValue): string | undefined {
        if (this.typeName.complex) {

        } else {
            switch(this.typeName.type) {
                case 'string':
                    if (value.type !== Fpp.PrimExprType.string) {
                        return `Expected string, got ${value.type}`;
                    }

                    if (this.typeName.size && value.value.length > this.typeName.size.value) {
                        return `String too long ${value.value.length} > ${this.typeName.size.value}`;
                    }
                    break;
                case 'U8':
                case 'I8':
                case 'U16':
                case 'I16':
                case 'U32':
                case 'I32':
                case 'U64':
                case 'I64':
                    if (value.type !== Fpp.PrimExprType.integer) {
                        return `Expected integer, got ${value.type}`;
                    }

                    const bounds = TypeNameValidator.integerBounds.get(this.typeName.type);
                    if (bounds) {
                        if (value.value < bounds[0] || value.value > bounds[1]) {
                            return `Integer ${value.value} out of ${this.typeName.type} bounds [${bounds[0]}, ${bounds[1]}]`;
                        }
                    }

                    break;
                case 'F32':
                case 'F64':
                    if (value.type !== Fpp.PrimExprType.integer && value.type !== Fpp.PrimExprType.floating) {
                        return `Expected floating or integer, got ${value.type}`;
                    }
                    break;
                case 'bool':
                    if (value.type !== Fpp.PrimExprType.boolean) {
                        return `Expected boolean, got ${value.type}`;
                    }
            }
        }
    }
}

export abstract class ExprTraverser {
    private static readonly numberTypes = new Set<Fpp.PrimExprType>([
        Fpp.PrimExprType.integer,
        Fpp.PrimExprType.floating
    ]);

    private static readonly declValueMappings = new Map<string, Fpp.PrimExprType>([
        ["ArrayDecl", Fpp.PrimExprType.array],
        ["StructDecl", Fpp.PrimExprType.struct],
        ["EnumDecl", Fpp.PrimExprType.integer]
    ]);

    private static isNumericExpr(value: Fpp.ExprValue) {
        return ExprTraverser.numberTypes.has(value.type);
    }

    abstract resolveType(typeName: Fpp.TypeName, scope: Fpp.QualifiedIdentifier): Fpp.TypeDecl | undefined;
    abstract emit(uri: vscode.Uri, diagnostic: vscode.Diagnostic): void;
    abstract identifier(ast: Fpp.IdentifierExpr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue;

    private traverseImpl(ast: Fpp.Expr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
        switch (ast.type) {
            case 'ArrayExpr': return this.arrayExpr(ast, scope, validator.resolved);
            case 'BinaryExpr': return this.binaryExpr(ast, scope);
            case 'BooleanExpr': return this.booleanExpr(ast);
            case 'FloatLiteral': return this.floatLiteral(ast);
            case 'Identifier': return this.identifier(ast, scope, validator);
            case 'IntLiteral': return this.intLiteral(ast);
            case 'NegExpr': return this.negExpr(ast, scope);
            case 'StringLiteral': return this.stringLiteral(ast);
            case 'StructExpr': return this.structExpr(ast, scope, validator.resolved);
        }
    }

    private traverseStack: Fpp.Expr[] = [];

    traverse(ast: Fpp.Expr, scope: Fpp.QualifiedIdentifier, validator: TypeValidator): Fpp.ExprValue {
        if (ast.evaluated) {
            return ast.evaluated;
        }

        // Make sure we don't stack overflow trying to resolve the constant's value
        if (this.traverseStack.includes(ast)) {
            this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(MemberTraverser.asRange(ast.location),
                "Expression references itself"
            ));

            return {
                type: Fpp.PrimExprType.integer,
                value: 0
            };
        }

        this.traverseStack.push(ast);

        try {
            const value = this.traverseImpl(ast, scope, validator);
            const error = validator.validate(value);
            if (error) {
                this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                    MemberTraverser.asRange(ast.location), error)
                );
            }
    
            return value;
        } finally {
            this.traverseStack.pop();
        }
    }

    protected arrayExpr(ast: Fpp.ArrayExpr, scope: Fpp.QualifiedIdentifier, resolved?: Fpp.TypeDecl): Fpp.ArrayExprValue {
        let memberType: Fpp.TypeDecl | undefined;
        let memberValidator: TypeValidator;

        if (resolved && resolved.type === "ArrayDecl") {
            memberType = this.resolveType(resolved.fppType, resolved.scope);
            memberValidator = new TypeNameValidator(resolved.fppType, memberType);
        } else {
            memberValidator = { validate: () => { return undefined; } };
        }

        return {
            type: Fpp.PrimExprType.array,
            value: ast.value.map(v => this.traverse(v, scope, memberValidator))
        };
    }

    private static readonly numericValidator: TypeValidator = {
        validate(value: Fpp.ExprValue): string | undefined {
            if (value.type !== Fpp.PrimExprType.integer && value.type !== Fpp.PrimExprType.floating) {
                return "Expected numeric expression";
            }
        }
    };

    protected binaryExpr(ast: Fpp.BinaryExpr, scope: Fpp.QualifiedIdentifier): Fpp.ExprValue {
        const leftValue = this.traverse(ast.left, scope, ExprTraverser.numericValidator);
        const rightValue = this.traverse(ast.right, scope, ExprTraverser.numericValidator);

        // Make sure we can perform the operation
        if (!ExprTraverser.isNumericExpr(leftValue) || !ExprTraverser.isNumericExpr(rightValue)) {
            return leftValue;
        }

        let value = (leftValue as Fpp.NumericExprValue).value;
        switch (ast.operator.value) {
            case '+':
                value += (rightValue as Fpp.NumericExprValue).value;
                break;
            case '-':
                value -= (rightValue as Fpp.NumericExprValue).value;
                break;
            case '*':
                value *= (rightValue as Fpp.NumericExprValue).value;
                break;
            case '/':
                value /= (rightValue as Fpp.NumericExprValue).value;
                break;
        }

        return {
            // FIXME(tumbar) This seems like a good way but maybe theres a better way?
            type: Number.isInteger(value) ? Fpp.PrimExprType.integer : Fpp.PrimExprType.floating,
            value
        };
    }

    protected booleanExpr(ast: Fpp.BooleanExpr): Fpp.BoolExprValue {
        return {
            type: Fpp.PrimExprType.boolean,
            value: ast.value
        };
    }

    protected floatLiteral(ast: Fpp.LiteralFloatExpr): Fpp.FloatExprValue {
        return {
            type: Fpp.PrimExprType.floating,
            value: ast.value
        };
    }

    protected intLiteral(ast: Fpp.LiteralIntExpr): Fpp.IntExprValue {
        return {
            type: Fpp.PrimExprType.integer,
            value: ast.value
        };
    }

    protected negExpr(ast: Fpp.NegExpr, scope: Fpp.QualifiedIdentifier): Fpp.ExprValue {
        const val = this.traverse(ast.value, scope, ExprTraverser.numericValidator);
        if (!ExprTraverser.isNumericExpr(val)) {
            this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                MemberTraverser.asRange(ast.location), `Cannot negate a ${val.type}`)
            );
            return val;
        }

        return {
            type: (val as Fpp.NumericExprValue).type,
            value: -(val as Fpp.NumericExprValue).value
        };
    }

    protected stringLiteral(ast: Fpp.LiteralStringExpr): Fpp.StrExprValue {
        return {
            type: Fpp.PrimExprType.string,
            value: ast.value
        };
    }

    protected structExpr(ast: Fpp.StructExpr, scope: Fpp.QualifiedIdentifier, resolved?: Fpp.TypeDecl): Fpp.ExprValue {
        const value: Record<string, Fpp.ExprValue> = {};

        if (!resolved || resolved.type !== "StructDecl") {
            return {
                type: Fpp.PrimExprType.struct,
                value: {}
            };
        }

        // Make sure all members are included
        // Make sure there are no extra members
        // Make sure the member values match the required types
        const definedSet = new Map<string, Fpp.StructAssignment>();
        const memberSet = new Map<string, Fpp.StructMember>(
            resolved.members.map((e) => [e.name.value, e])
        );

        for (const member of ast.value) {
            const memberDefinition = memberSet.get(member.name.value);
            if (!memberDefinition) {
                this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                    MemberTraverser.asRange(member.name.location),
                    `${member.name.value} is not a member of ${resolved.name.value}`
                ));

                continue;
            } else {
                // Validate the member value types
                let memberType: Fpp.TypeDecl | undefined = this.resolveType(memberDefinition.fppType, memberDefinition.scope);
                if (memberDefinition.size) {
                    const typeNameTok = { value: "Annonymous Array", location: Fpp.implicitLocation };
                    memberType = {
                        name: typeNameTok,
                        scope: [...scope],
                        type: "ArrayDecl",
                        fppType: memberDefinition.fppType,
                        size: memberDefinition.size,
                        location: Fpp.implicitLocation
                    };
                }

                value[member.name.value] = this.traverse(member.value, scope, new TypeNameValidator(memberDefinition.fppType, memberType));
            }

            if (definedSet.has(member.name.value)) {
                const diag = new vscode.Diagnostic(
                    MemberTraverser.asRange(member.name.location),
                    `Value for ${member.name.value} provided multiple times`,
                    vscode.DiagnosticSeverity.Warning
                );
                diag.relatedInformation = [new vscode.DiagnosticRelatedInformation(
                    MemberTraverser.asLocation(definedSet.get(member.name.value)!.name.location),
                    "Previously defined here"
                )];

                this.emit(vscode.Uri.file(ast.location.source), diag);
            } else {
                definedSet.set(member.name.value, member);
            }
        }

        const notProvided: string[] = [];
        for (const [key, _] of memberSet) {
            if (!definedSet.has(key)) {
                notProvided.push(key);
            }
        }

        if (notProvided.length > 0) {
            this.emit(vscode.Uri.file(ast.location.source), new vscode.Diagnostic(
                MemberTraverser.asRange(ast.location),
                `Missing struct members from value: ${notProvided.join(" ")}`
            ));
        }

        return {
            type: Fpp.PrimExprType.struct,
            value
        };
    }
}
