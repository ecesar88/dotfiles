"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const transformations_1 = require("./transformations");
const api_1 = require("./api");
class DocumentWatcher {
    constructor(outputChannel = vscode_1.window.createOutputChannel('EditorConfig')) {
        this.outputChannel = outputChannel;
        this.preSaveTransformations = [
            new transformations_1.SetEndOfLine(),
            new transformations_1.TrimTrailingWhitespace(),
            new transformations_1.InsertFinalNewline(),
        ];
        this.onEmptyConfig = (relativePath) => {
            this.log(`${relativePath}: No configuration.`);
        };
        this.onBeforeResolve = (relativePath) => {
            this.log(`${relativePath}: Using EditorConfig core...`);
        };
        this.onNoActiveTextEditor = () => {
            this.log('No more open editors.');
        };
        this.onSuccess = (newOptions) => {
            if (!this.doc) {
                this.log(`[no file]: ${JSON.stringify(newOptions)}`);
                return;
            }
            const { relativePath } = api_1.resolveFile(this.doc);
            this.log(`${relativePath}: ${JSON.stringify(newOptions)}`);
        };
        this.log('Initializing document watcher...');
        const subscriptions = [];
        subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(async (editor) => {
            if (editor && editor.document) {
                const newOptions = await api_1.resolveTextEditorOptions((this.doc = editor.document), {
                    onEmptyConfig: this.onEmptyConfig,
                });
                api_1.applyTextEditorOptions(newOptions, {
                    onNoActiveTextEditor: this.onNoActiveTextEditor,
                    onSuccess: this.onSuccess,
                });
            }
        }));
        subscriptions.push(vscode_1.window.onDidChangeWindowState(async (state) => {
            if (state.focused && this.doc) {
                const newOptions = await api_1.resolveTextEditorOptions(this.doc, {
                    onEmptyConfig: this.onEmptyConfig,
                });
                api_1.applyTextEditorOptions(newOptions, {
                    onNoActiveTextEditor: this.onNoActiveTextEditor,
                    onSuccess: this.onSuccess,
                });
            }
        }));
        subscriptions.push(vscode_1.workspace.onDidSaveTextDocument(doc => {
            if (path.basename(doc.fileName) === '.editorconfig') {
                this.log('.editorconfig file saved.');
            }
        }));
        subscriptions.push(vscode_1.workspace.onWillSaveTextDocument(async (e) => {
            let selections = [];
            const activeEditor = vscode_1.window.activeTextEditor;
            const activeDoc = activeEditor === null || activeEditor === void 0 ? void 0 : activeEditor.document;
            if (activeDoc && activeDoc === e.document && activeEditor) {
                selections = activeEditor.selections;
            }
            const transformations = this.calculatePreSaveTransformations(e.document, e.reason);
            e.waitUntil(transformations);
            if (selections.length) {
                const edits = await transformations;
                if (activeEditor && edits.length) {
                    activeEditor.selections = selections;
                }
            }
        }));
        this.disposable = vscode_1.Disposable.from.apply(this, subscriptions);
    }
    log(...messages) {
        this.outputChannel.appendLine(messages.join(' '));
    }
    dispose() {
        this.disposable.dispose();
    }
    async calculatePreSaveTransformations(doc, reason) {
        const editorconfigSettings = await api_1.resolveCoreConfig(doc, {
            onBeforeResolve: this.onBeforeResolve,
        });
        const relativePath = vscode_1.workspace.asRelativePath(doc.fileName);
        if (!editorconfigSettings) {
            this.log(`${relativePath}: No configuration found for pre-save.`);
            return [];
        }
        return [
            ...this.preSaveTransformations.flatMap(transformer => {
                const { edits, message } = transformer.transform(editorconfigSettings, doc, reason);
                if (edits instanceof Error) {
                    this.log(`${relativePath}: ${edits.message}`);
                    return [];
                }
                if (message) {
                    this.log(`${relativePath}: ${message}`);
                }
                return edits;
            }),
        ];
    }
}
exports.default = DocumentWatcher;
//# sourceMappingURL=DocumentWatcher.js.map