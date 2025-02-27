"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const configuration_1 = require("./configuration");
class TagStyler {
    constructor() {
        this.activeDecorations = [];
        this.decoratePair = (pair, editor) => {
            const openingDecoration = this.config.opening;
            const closingDecoration = this.config.closing || openingDecoration;
            const innerDecoration = this.config.inner;
            if (this.config.opening) {
                this.decorateTag(pair.opening, this.config.opening, editor, true);
            }
            if (pair.opening.start !== pair.closing.start) {
                if (closingDecoration) {
                    this.decorateTag(pair.closing, closingDecoration, editor, false);
                }
                if (innerDecoration) {
                    this.applyDecoration(editor, innerDecoration, new vscode.Range(editor.document.positionAt(pair.opening.end), editor.document.positionAt(pair.closing.start)));
                }
            }
        };
    }
    get config() {
        return configuration_1.default.styles || { opening: { name: { underline: 'yellow' } } };
    }
    clearDecorations() {
        this.activeDecorations.forEach((decoration) => decoration.dispose());
        this.activeDecorations = [];
    }
    decorateTag(tag, decorations, editor, isOpening) {
        const start = editor.document.positionAt(tag.start);
        const end = editor.document.positionAt(tag.end);
        const nameStart = start.translate(0, isOpening ? 1 : 2);
        const nameEnd = nameStart.translate(0, tag.name.length);
        const nameRange = new vscode.Range(nameStart, nameEnd);
        // Fallback to full if name doesn't exist, but styling does
        if (decorations.full || (decorations.name && nameRange.isEmpty)) {
            this.applyDecoration(editor, decorations.full || decorations.name, new vscode.Range(start, end));
        }
        if (decorations.name) {
            this.applyDecoration(editor, decorations.name, nameRange);
        }
        if (decorations.left) {
            this.applyDecoration(editor, decorations.left, new vscode.Range(start, start.translate(0, 1)));
        }
        if (decorations.right) {
            this.applyDecoration(editor, decorations.right, new vscode.Range(end.translate(0, -1), end));
        }
    }
    applyDecoration(editor, decorationConfig, range) {
        const selectionRange = new vscode.Range(editor.selection.anchor, editor.selection.active);
        const isSelected = !selectionRange.isEmpty && !!range.intersection(selectionRange);
        let borderColor = decorationConfig.surround || decorationConfig.underline;
        let options = configuration_1.default.showRuler
            ? {
                overviewRulerLane: vscode.OverviewRulerLane.Center,
                overviewRulerColor: decorationConfig.highlight ||
                    decorationConfig.surround ||
                    decorationConfig.underline ||
                    'yellow'
            }
            : {};
        // Removes decoration while selecting, and replaces it with underline
        if (!isSelected) {
            options.backgroundColor = decorationConfig.highlight;
        }
        else if (!borderColor) {
            borderColor = decorationConfig.highlight;
        }
        if (borderColor) {
            options.borderStyle = 'solid';
            options.borderColor = borderColor;
            options.borderWidth = decorationConfig.surround ? '1px' : '0 0 1px 0';
        }
        options = Object.assign(Object.assign({}, options), decorationConfig.custom);
        const decorationType = vscode.window.createTextEditorDecorationType(options);
        this.activeDecorations.push(decorationType);
        editor.setDecorations(decorationType, [range]);
    }
}
exports.default = TagStyler;
//# sourceMappingURL=tagStyler.js.map