import * as vscode from 'vscode';

import path from 'path';
import { Worker } from 'worker_threads';

import * as Fpp from './ast';
import { IFppMessage, IFPPResponse, IFppWorkerRequest } from './message';
import { RangeAssociator } from '../associator';
import { RangeRuleAssociation } from './common';

export interface DocumentOrFile {
    path: string;
    version: number; // 0 for files
    getText(): string;
    getTextSub?(): [string, string];
}

interface ParseRequest {
    filename: string;
    document: DocumentOrFile;
    resolve: (msg: FppMessage) => void;
    reject: (err: any) => void;
}

export class FppMessage {
    constructor(
        readonly path: string,
        readonly version: number,
        readonly ast: Fpp.TranslationUnit,
        readonly ranges: Map<string, RangeAssociator<RangeRuleAssociation>>,
        readonly syntaxErrors: [string, vscode.Diagnostic][]
    ) {
    }

    static deserialize(msg: IFppMessage): FppMessage {
        return new FppMessage(
            msg.path,
            msg.version,
            msg.ast,
            new Map<string, RangeAssociator<RangeRuleAssociation>>(
                msg.ranges.map(v => [
                    v[0],
                    new RangeAssociator<RangeRuleAssociation>(v[1])
                ])
            ),
            msg.syntaxErrors.map((diag) => ([
                diag.source, new vscode.Diagnostic(
                    new vscode.Range(...diag.range),
                    diag.message
                )
            ]))
        );
    }
}

export class FppWorker extends Worker implements vscode.Disposable {
    private readonly readyPromise: Promise<void>;

    private inProgress?: ParseRequest;
    private wasCancelled: boolean;

    private readonly pending = new Map<string, Promise<FppMessage>>();
    private readonly queue: ParseRequest[] = [];

    private readyResolve?: () => void;

    constructor() {
        super(path.join(__dirname, 'worker.js'));

        this.wasCancelled = false;

        this.readyPromise = new Promise<void>((resolve) => {
            this.readyResolve = resolve;
        });

        this.on('message', (rawMsg: IFPPResponse) => {
            if (rawMsg.code === "startup") {
                this.readyResolve?.();
                this.readyResolve = undefined;
                return;
            }

            if (!this.inProgress) {
                throw new Error("Got message reply when no parse in progress");
            }

            if (!this.wasCancelled) {
                if (rawMsg.code === "success") {
                    const msg = FppMessage.deserialize(rawMsg.msg);
                    this.inProgress.resolve(msg);
                } else {
                    this.inProgress.reject(rawMsg.msg);
                }
            } else {
                this.inProgress.reject(null);
            }

            this.inProgress = undefined;
            this.wasCancelled = false;
            this.scheduleNext();
        });

        this.on('exit', (code) => {
            vscode.window.showErrorMessage(`FPP worker exited unexpectedly with code: ${code}`);
        });

        this.on('error', (err) => {
            console.error(err);
            vscode.window.showErrorMessage(`FPP worker ran into an error: ${err}`);
        });
    }

    dispose() {
        this.terminate();
    }

    private scheduleNext() {
        if (this.inProgress) {
            return;
        }

        const nextItem = this.queue.pop();
        if (nextItem) {
            this.inProgress = nextItem;
            this.postMessage({
                path: nextItem.filename,
                version: nextItem.document.version,
                text: nextItem.document.getText(),
                subText: nextItem.document.getTextSub?.()
            } satisfies IFppWorkerRequest);
        }
    }

    ready(): Promise<void> {
        return this.readyPromise;
    }

    parse(document: DocumentOrFile, token?: vscode.CancellationToken): Promise<FppMessage> {
        const key = document.path;
        if (this.inProgress?.filename === key && this.inProgress.document.version < document.version) {
            this.wasCancelled = true;
        }

        // TODO(tumbar) Find out if the cancellation is done when typing fast
        // Does it happen before or after the new parse request is sent?
        token?.onCancellationRequested(() => {
            if (this.inProgress?.filename === key) {
                this.wasCancelled = true;
            } else {
                const idx = this.queue.findIndex(v => v.filename === key);
                if (idx >= 0) {
                    this.queue.splice(idx)[0]?.reject(new Error("cancelled"));
                }
            }
        });

        const pending = this.pending.get(key);
        if (pending) {
            // Update the document if the parse is still pending
            const request = this.queue.find(v => v.filename === key);
            if (request) {
                request.document = document;
            }

            return pending;
        } else {
            const promise = new Promise<FppMessage>((resolve, reject) => {
                this.queue.push({
                    filename: key,
                    document,
                    resolve,
                    reject
                });
                this.scheduleNext();
            });

            this.pending.set(key, promise);
            return promise.finally(() => {
                this.pending.delete(key);
            });
        }
    }
}
