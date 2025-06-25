export class ReferenceTracker<T> {
    private references = new Map<string, Map<string, T[]>>();
    private fileReferences = new Map<string, string[]>();

    add(resolvedReference: string, sourceFile: string, referencedFrom: T) {
        // First, track what references are in this file
        const fileRefs = this.fileReferences.get(sourceFile);
        if (fileRefs) {
            fileRefs.push(resolvedReference);
        } else {
            this.fileReferences.set(sourceFile, [resolvedReference]);
        }

        // Now track the reference location
        const refs = this.references.get(resolvedReference);
        if (!refs) {
            this.references.set(resolvedReference, new Map<string, T[]>([
                [sourceFile, [referencedFrom]]
            ]));
        } else {
            const referencesFromThisFile = refs.get(sourceFile);
            if (referencesFromThisFile) {
                referencesFromThisFile.push(referencedFrom);
            } else {
                refs.set(sourceFile, [referencedFrom]);
            }
        }
    }

    get(fullyQualified: string): Iterable<[string, T[]]> {
        return this.references.get(fullyQualified) ?? [];
    }

    dispose(source: string) {
        const fileRefs = this.fileReferences.get(source) ?? [];
        for (const decl of fileRefs) {
            const refs = this.references.get(decl);
            if (refs) {
                refs.delete(source);

                // Free up unused memory
                if (refs.size === 0) {
                    this.references.delete(decl);
                }
            }
        }

        this.fileReferences.delete(source);
    }
}
