interface IPosition {
    line: number;
    character: number;
}

interface IRange {
    start: IPosition;
    end: IPosition;
}

export interface RangeAssociation<T> {
    range: IRange;
    value: T;
}

// [startLine, endLine, startCol, endCol, value][]
export type IRangeAssociation = [number, number, number, number, string][];

export class RangeAssociator<T> implements Iterable<[IRange, T]> {
    private lines = new Map<number, RangeAssociation<T>[]>();
    private serializeT: (value: T) => string;

    constructor(
        serialized?: IRangeAssociation,
        serialize: (value: T) => string = JSON.stringify,
        deserialize: (json: string) => T = JSON.parse,
    ) {
        this.serializeT = serialize;

        if (serialized) {
            for (const [startLine, endLine, start, end, value] of serialized) {
                for (let line = startLine; line <= endLine; line++) {
                    let lineAssociations = this.lines.get(line);
                    if (!lineAssociations) {
                        lineAssociations = [];
                        this.lines.set(line, lineAssociations);
                    }

                    lineAssociations.push({
                        range: {
                            start: { line: startLine, character: start },
                            end: { line: endLine, character: end }
                        },
                        value: deserialize(value)
                    });
                }
            }
        }
    }

    *[Symbol.iterator](): Iterator<[IRange, T]> {
        for (const [_, associations] of this.lines) {
            for (const association of associations) {
                yield [association.range, association.value];
            }
        }
    }

    serialize(): IRangeAssociation {
        const out: IRangeAssociation = [];
        for (const [line, tokens] of this.lines) {
            for (const tok of tokens) {
                // Don't double dip the serialization
                if (line === tok.range.end.line) {
                    out.push([
                        tok.range.start.line, tok.range.end.line,
                        tok.range.start.character, tok.range.end.character,
                        this.serializeT(tok.value)
                    ]);
                }
            }
        }

        return out;
    }

    add(range: IRange, value: T) {
        const association: RangeAssociation<T> = { range, value };

        for (let line = range.start.line; line <= range.end.line; line++) {
            if (!this.lines.has(line)) {
                this.lines.set(line, [association]);
            } else {
                this.lines.get(line)!.push(association);
            }
        }
    }

    getAssociation(position: IPosition): RangeAssociation<T> | undefined {
        const tokens = this.lines.get(position.line);
        if (!tokens) {
            return undefined;
        }

        for (const tok of tokens) {
            // Check if the position is contained in the range
            if (tok.range.start.line === tok.range.end.line) {
                if (tok.range.start.line <= position.line &&
                    position.line <= tok.range.end.line &&
                    tok.range.start.character <= position.character &&
                    position.character <= tok.range.end.character
                ) {
                    return tok;
                }
            } else if (
                (tok.range.start.line === position.line && tok.range.start.character <= position.character) ||
                (tok.range.end.line === position.line && position.character <= tok.range.end.character) ||
                (position.line > tok.range.start.line && position.line < tok.range.end.line)
            ) {
                return tok;
            }
        }
    }

    get(position: IPosition): T | undefined {
        return this.getAssociation(position)?.value;
    }
}
