"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTheme = void 0;
const vscode_1 = require("vscode");
const Theme_1 = require("./Theme");
const defaultSettings = require("../defaultConfig.json");
exports.generateTheme = {
    default: function () {
        return new Theme_1.Theme(defaultSettings);
    },
    fromSettings: function () {
        const configuration = vscode_1.workspace.getConfiguration('oneDarkPro');
        return new Theme_1.Theme({
            bold: configuration.get('bold', defaultSettings.bold),
            editorTheme: configuration.get('editorTheme', defaultSettings.editorTheme),
            italic: configuration.get('italic', defaultSettings.italic),
            vivid: configuration.get('vivid', defaultSettings.vivid)
        });
    }
};
//# sourceMappingURL=generator.js.map