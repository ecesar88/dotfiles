"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEditorConfig = exports.fromEditorConfig = exports.resolveFile = exports.resolveCoreConfig = exports.pickWorkspaceDefaults = exports.applyTextEditorOptions = exports.resolveTextEditorOptions = void 0;
const editorconfig = require("editorconfig");
const vscode_1 = require("vscode");
const languageExtensionMap_1 = require("./languageExtensionMap");
/**
 * Resolves `TextEditorOptions` for a `TextDocument`, combining the editor's
 * default configuration with that of EditorConfig's configuration.
 */
async function resolveTextEditorOptions(doc, { onBeforeResolve, onEmptyConfig, } = {}) {
    const editorconfigSettings = await resolveCoreConfig(doc, {
        onBeforeResolve,
    });
    if (editorconfigSettings) {
        return fromEditorConfig(editorconfigSettings, pickWorkspaceDefaults(doc));
    }
    if (onEmptyConfig) {
        const rp = resolveFile(doc).relativePath;
        if (rp) {
            onEmptyConfig(rp);
        }
    }
    return {};
}
exports.resolveTextEditorOptions = resolveTextEditorOptions;
/**
 * Applies new `TextEditorOptions` to the active text editor.
 */
async function applyTextEditorOptions(newOptions, { onNoActiveTextEditor, onSuccess, } = {}) {
    const editor = vscode_1.window.activeTextEditor;
    if (!editor) {
        if (onNoActiveTextEditor) {
            onNoActiveTextEditor();
        }
        return;
    }
    editor.options = newOptions;
    if (onSuccess) {
        onSuccess(newOptions);
    }
}
exports.applyTextEditorOptions = applyTextEditorOptions;
/**
 * Picks EditorConfig-relevant props from the editor's default configuration.
 */
function pickWorkspaceDefaults(doc) {
    const workspaceConfig = vscode_1.workspace.getConfiguration('editor', doc);
    const detectIndentation = workspaceConfig.get('detectIndentation');
    return detectIndentation
        ? {}
        : {
            tabSize: workspaceConfig.get('tabSize'),
            insertSpaces: workspaceConfig.get('insertSpaces'),
        };
}
exports.pickWorkspaceDefaults = pickWorkspaceDefaults;
/**
 * Resolves an EditorConfig configuration for the file related to a
 * `TextDocument`.
 */
async function resolveCoreConfig(doc, { onBeforeResolve, } = {}) {
    const { fileName, relativePath } = resolveFile(doc);
    if (!fileName) {
        return {};
    }
    if (relativePath) {
        onBeforeResolve === null || onBeforeResolve === void 0 ? void 0 : onBeforeResolve(relativePath);
    }
    const config = await editorconfig.parse(fileName);
    if (config.indent_size === 'tab') {
        config.indent_size = config.tab_width;
    }
    return config;
}
exports.resolveCoreConfig = resolveCoreConfig;
function resolveFile(doc) {
    if (doc.languageId === 'Log') {
        return {};
    }
    const file = getFile();
    return {
        fileName: file && file.toString(),
        relativePath: file && vscode_1.workspace.asRelativePath(file, true),
    };
    function getFile() {
        if (!doc.isUntitled) {
            return doc.fileName;
        }
        const ext = languageExtensionMap_1.default[doc.languageId] || doc.languageId;
        const folder = vscode_1.workspace.getWorkspaceFolder(doc.uri);
        return (folder &&
            folder.uri.with({
                path: `${doc.fileName}.${ext}`,
            }));
    }
}
exports.resolveFile = resolveFile;
/**
 * Convert .editorconfig values to vscode editor options
 */
function fromEditorConfig(config = {}, defaults = pickWorkspaceDefaults()) {
    var _a, _b;
    const resolved = {
        tabSize: config.indent_style === 'tab'
            ? (_a = config.tab_width) !== null && _a !== void 0 ? _a : config.indent_size : (_b = config.indent_size) !== null && _b !== void 0 ? _b : config.tab_width,
    };
    if (resolved.tabSize === 'tab') {
        resolved.tabSize = config.tab_width;
    }
    return {
        ...(config.indent_style === 'tab' ||
            config.indent_size === 'tab' ||
            config.indent_style === 'space'
            ? {
                insertSpaces: config.indent_style === 'space',
            }
            : {}),
        tabSize: resolved.tabSize && resolved.tabSize >= 0
            ? resolved.tabSize
            : defaults.tabSize,
    };
}
exports.fromEditorConfig = fromEditorConfig;
/**
 * Convert vscode editor options to .editorconfig values
 */
function toEditorConfig(options) {
    const result = {};
    switch (options.insertSpaces) {
        case true:
            result.indent_style = 'space';
            if (options.tabSize) {
                result.indent_size = resolveTabSize(options.tabSize);
            }
            break;
        case false:
        case 'auto':
            result.indent_style = 'tab';
            if (options.tabSize) {
                result.tab_width = resolveTabSize(options.tabSize);
            }
            break;
    }
    return result;
    /**
     * Convert vscode tabSize option into numeric value
     */
    function resolveTabSize(tabSize) {
        return tabSize === 'auto' ? 4 : parseInt(String(tabSize), 10);
    }
}
exports.toEditorConfig = toEditorConfig;
//# sourceMappingURL=api.js.map