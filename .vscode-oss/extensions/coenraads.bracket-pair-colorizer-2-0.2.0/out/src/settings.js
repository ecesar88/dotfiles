"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const colorMode_1 = require("./colorMode");
const gutterIconManager_1 = require("./gutterIconManager");
const textMateLoader_1 = require("./textMateLoader");
const vscode_1 = require("vscode");
class Settings {
    constructor() {
        this.TextMateLoader = new textMateLoader_1.default();
        this.isDisposed = false;
        const workspaceColors = vscode.workspace.getConfiguration("workbench.colorCustomizations", undefined);
        this.gutterIcons = new gutterIconManager_1.default();
        const configuration = vscode.workspace.getConfiguration("bracket-pair-colorizer-2", undefined);
        const activeScopeCSS = configuration.get("activeScopeCSS");
        if (!Array.isArray(activeScopeCSS)) {
            throw new Error("activeScopeCSS is not an array");
        }
        this.activeBracketCSSElements = activeScopeCSS.map((e) => [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);
        const scopeLineCSS = configuration.get("scopeLineCSS");
        if (!Array.isArray(scopeLineCSS)) {
            throw new Error("scopeLineCSS is not an array");
        }
        this.activeScopeLineCSSElements = scopeLineCSS.map((e) => [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);
        const borderStyle = this.activeScopeLineCSSElements.filter((e) => e[0] === "borderStyle");
        if (borderStyle && borderStyle[0].length === 2) {
            this.activeScopeLineCSSBorder = borderStyle[0][1];
        }
        else {
            this.activeScopeLineCSSBorder = "none";
        }
        this.highlightActiveScope = configuration.get("highlightActiveScope");
        if (typeof this.highlightActiveScope !== "boolean") {
            throw new Error("alwaysHighlightActiveScope is not a boolean");
        }
        this.showVerticalScopeLine = configuration.get("showVerticalScopeLine");
        if (typeof this.showVerticalScopeLine !== "boolean") {
            throw new Error("showVerticalScopeLine is not a boolean");
        }
        this.showHorizontalScopeLine = configuration.get("showHorizontalScopeLine");
        if (typeof this.showHorizontalScopeLine !== "boolean") {
            throw new Error("showHorizontalScopeLine is not a boolean");
        }
        this.scopeLineRelativePosition = configuration.get("scopeLineRelativePosition");
        if (typeof this.scopeLineRelativePosition !== "boolean") {
            throw new Error("scopeLineRelativePosition is not a boolean");
        }
        this.showBracketsInGutter = configuration.get("showBracketsInGutter");
        if (typeof this.showBracketsInGutter !== "boolean") {
            throw new Error("showBracketsInGutter is not a boolean");
        }
        this.showBracketsInRuler = configuration.get("showBracketsInRuler");
        if (typeof this.showBracketsInRuler !== "boolean") {
            throw new Error("showBracketsInRuler is not a boolean");
        }
        this.rulerPosition = configuration.get("rulerPosition");
        if (typeof this.rulerPosition !== "string") {
            throw new Error("rulerPosition is not a string");
        }
        this.unmatchedScopeColor = configuration.get("unmatchedScopeColor");
        if (typeof this.unmatchedScopeColor !== "string") {
            throw new Error("unmatchedScopeColor is not a string");
        }
        this.forceUniqueOpeningColor = configuration.get("forceUniqueOpeningColor");
        if (typeof this.forceUniqueOpeningColor !== "boolean") {
            throw new Error("forceUniqueOpeningColor is not a boolean");
        }
        this.forceIterationColorCycle = configuration.get("forceIterationColorCycle");
        if (typeof this.forceIterationColorCycle !== "boolean") {
            throw new Error("forceIterationColorCycle is not a boolean");
        }
        this.colorMode = colorMode_1.default[configuration.get("colorMode")];
        if (typeof this.colorMode !== "number") {
            throw new Error("colorMode enum could not be parsed");
        }
        this.colors = configuration.get("colors");
        if (!Array.isArray(this.colors)) {
            throw new Error("colors is not an array");
        }
        this.bracketDecorations = this.createBracketDecorations();
        const excludedLanguages = configuration.get("excludedLanguages");
        if (!Array.isArray(excludedLanguages)) {
            throw new Error("excludedLanguages is not an array");
        }
        this.excludedLanguages = new Set(excludedLanguages);
    }
    dispose() {
        if (!this.isDisposed) {
            this.bracketDecorations.forEach((decoration) => {
                decoration.dispose();
            });
            this.bracketDecorations.clear();
            this.gutterIcons.Dispose();
            this.isDisposed = true;
        }
    }
    createGutterBracketDecorations(color, bracket) {
        const gutterIcon = this.gutterIcons.GetIconUri(bracket, color);
        const decorationSettings = {
            gutterIconPath: gutterIcon,
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createRulerBracketDecorations(color) {
        const decorationSettings = {
            overviewRulerColor: color.includes(".") ? new vscode_1.ThemeColor(color) : color,
            overviewRulerLane: vscode.OverviewRulerLane[this.rulerPosition],
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createScopeBracketDecorations(color) {
        const decorationSettings = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };
        let opacity = "1";
        for (const element of this.activeBracketCSSElements) {
            const key = element[0];
            const value = element[1];
            if (key.includes("Color")) {
                const cssColor = value.replace("{color}", color);
                decorationSettings[key] = cssColor.includes(".") ? new vscode_1.ThemeColor(cssColor) : cssColor;
                continue;
            }
            if (key === "opacity") {
                opacity = value;
            }
            else {
                decorationSettings[key] = value;
            }
        }
        ;
        let borderColorType = typeof (decorationSettings["backgroundColor"]);
        if (borderColorType === "undefined") {
            decorationSettings["backgroundColor"] = "; opacity: " + opacity;
        }
        else if (borderColorType === "string") {
            decorationSettings["backgroundColor"] += "; opacity: " + opacity;
        }
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createScopeLineDecorations(color, top = true, right = true, bottom = true, left = true, yOffset) {
        const decorationSettings = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };
        const none = "none";
        const topBorder = top ? this.activeScopeLineCSSBorder : none;
        const rightBorder = right ? this.activeScopeLineCSSBorder : none;
        const botBorder = bottom ? this.activeScopeLineCSSBorder : none;
        const leftBorder = left ? this.activeScopeLineCSSBorder : none;
        let opacity = "1";
        for (const element of this.activeScopeLineCSSElements) {
            const key = element[0];
            const value = element[1];
            if (key.includes("Color")) {
                const cssColor = value.replace("{color}", color);
                decorationSettings[key] = cssColor.includes(".") ? new vscode_1.ThemeColor(cssColor) : cssColor;
                continue;
            }
            if (key === "opacity") {
                opacity = value;
            }
            else {
                decorationSettings[key] = value;
            }
        }
        let borderColorType = typeof (decorationSettings["borderColor"]);
        if (borderColorType === "undefined") {
            decorationSettings["borderColor"] = "; opacity: " + opacity;
        }
        else if (borderColorType === "string") {
            decorationSettings["borderColor"] += "; opacity: " + opacity;
        }
        let borderStyle = `${topBorder} ${rightBorder} ${botBorder} ${leftBorder}`;
        if (yOffset !== undefined && yOffset !== 0) {
            borderStyle += "; transform: translateY(" + yOffset * 100 + "%); z-index: 1;";
        }
        // tslint:disable-next-line:no-string-literal
        decorationSettings["borderStyle"] = borderStyle;
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createBracketDecorations() {
        const decorations = new Map();
        for (const color of this.colors) {
            const decoration = vscode.window.createTextEditorDecorationType({
                color: color.includes(".") ? new vscode_1.ThemeColor(color) : color,
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decorations.set(color, decoration);
        }
        const unmatchedDecoration = vscode.window.createTextEditorDecorationType({
            color: this.unmatchedScopeColor, rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        });
        decorations.set(this.unmatchedScopeColor, unmatchedDecoration);
        return decorations;
    }
}
exports.default = Settings;
//# sourceMappingURL=settings.js.map