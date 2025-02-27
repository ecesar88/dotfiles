"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const commands_1 = require("./commands");
const configuration_1 = require("./configuration");
const tagMatcher_1 = require("./tagMatcher");
const tagParser_1 = require("./tagParser");
const tagStyler_1 = require("./tagStyler");
// TODO: highlighting scope (vertically)
// TODO: disable default tag highlighting (active selections)
function updateTagStatusBarItem(status, tagsList, position) {
    const tagsForPosition = tagMatcher_1.getTagsForPosition(tagsList, position);
    status.text = tagsForPosition.reduce((str, pair, i, pairs) => {
        const name = pair.opening.name;
        if (i === 0) {
            return name;
        }
        const separator = pairs[i - 1].attributeNestingLevel < pair.attributeNestingLevel ? ' ~ ' : ' › ';
        return str + separator + name;
    }, '');
    status.text = status.text.trim().replace('›  ›', '»');
    if (tagsForPosition.length > 1) {
        status.show();
    }
    else {
        status.hide();
    }
}
function activate(context) {
    // Updates version for future migrations
    const extension = vscode.extensions.getExtension('vincaslt.highlight-matching-tag');
    const newVersion = extension && extension.packageJSON.version;
    // Can get previous version, by reading it from hmtVersion global state, as it will be updated only here
    context.globalState.update('hmtVersion', newVersion);
    const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 120);
    const tagStyler = new tagStyler_1.default();
    status.tooltip = 'Path to tag';
    let editorText = '';
    let tagsList = [];
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((evt) => {
        const editor = evt.textEditor;
        if (!configuration_1.default.isEnabled || !editor || editor !== vscode.window.activeTextEditor) {
            return;
        }
        if (editorText !== editor.document.getText()) {
            editorText = editor.document.getText();
            tagsList = tagParser_1.parseTags(editorText, configuration_1.default.emptyElements);
        }
        // Tag breadcrumbs
        if (configuration_1.default.showPath) {
            updateTagStatusBarItem(status, tagsList, editor.document.offsetAt(editor.selection.active));
        }
        // Highlight matching tags
        tagStyler.clearDecorations();
        let matches = [];
        if (configuration_1.default.highlightFromContent) {
            matches = editor.selections
                .map((sel) => tagMatcher_1.getTagForPosition(tagsList, editor.document.offsetAt(sel.active), configuration_1.default.highlightSelfClosing))
                .filter((match) => match !== undefined);
        }
        else {
            matches = editor.selections
                .map((sel) => tagMatcher_1.findMatchingTag(tagsList, editor.document.offsetAt(sel.active), configuration_1.default.highlightFromName, configuration_1.default.highlightFromAttributes))
                .filter((match) => match && (match.opening !== match.closing || configuration_1.default.highlightSelfClosing));
        }
        matches.forEach((match) => tagStyler.decoratePair(match, editor));
    }));
    context.subscriptions.push(vscode.commands.registerCommand('highlight-matching-tag.jumpToMatchingTag', commands_1.jumpToMatchingTag));
    context.subscriptions.push(vscode.commands.registerCommand('highlight-matching-tag.selectPairContents', commands_1.selectPairContents));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map