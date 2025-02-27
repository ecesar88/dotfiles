"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const configuration_1 = require("./configuration");
const tagMatcher_1 = require("./tagMatcher");
const tagParser_1 = require("./tagParser");
function jumpToMatchingTag() {
    return __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const tagsList = tagParser_1.parseTags(editor.document.getText(), configuration_1.default.emptyElements);
        const position = editor.selection.active;
        const positionOffset = editor.document.offsetAt(position);
        const match = tagMatcher_1.findMatchingTag(tagsList, positionOffset, configuration_1.default.highlightFromName, configuration_1.default.highlightFromAttributes);
        if (match) {
            const openingTagStartPos = editor.document.positionAt(match.opening.start);
            const openingTagRange = new vscode.Range(openingTagStartPos, editor.document.positionAt(match.opening.end));
            const newPosition = openingTagRange.contains(position)
                ? editor.document.positionAt(match.closing.start + 1)
                : openingTagStartPos.translate(0, 1);
            editor.selection = new vscode.Selection(newPosition, newPosition);
            editor.revealRange(editor.selection);
        }
        else {
            vscode.window.showInformationMessage('No matching tag was found');
        }
    });
}
exports.jumpToMatchingTag = jumpToMatchingTag;
function selectPairContents() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const tagsList = tagParser_1.parseTags(editor.document.getText(), configuration_1.default.emptyElements);
    const position = editor.selection.active;
    const positionOffset = editor.document.offsetAt(position);
    const activePair = tagMatcher_1.getTagForPosition(tagsList, positionOffset);
    if (activePair) {
        const openingTagEndPos = editor.document.positionAt(activePair.opening.end);
        const closingTagStartPos = editor.document.positionAt(activePair.closing.start);
        const tagContentSelection = new vscode.Selection(openingTagEndPos, closingTagStartPos);
        editor.selection = tagContentSelection;
        editor.revealRange(tagContentSelection);
    }
    else {
        vscode.window.showInformationMessage('No matching tag was found');
    }
}
exports.selectPairContents = selectPairContents;
//# sourceMappingURL=commands.js.map