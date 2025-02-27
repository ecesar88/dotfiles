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
exports.activate = void 0;
const path_1 = require("path");
const fs = require("fs");
const vscode_1 = require("vscode");
const Changelog_1 = require("./webviews/Changelog");
const utils_1 = require("./utils");
/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
function activate() {
    return __awaiter(this, void 0, void 0, function* () {
        const flagPath = path_1.join(__dirname, '../temp', 'flag.txt');
        if (!fs.existsSync(flagPath)) {
            utils_1.writeFile(flagPath, '');
            const configArr = [
                { defaultVal: false, type: 'bold' },
                { defaultVal: true, type: 'italic' },
                { defaultVal: false, type: 'vivid' }
            ];
            const configuration = vscode_1.workspace.getConfiguration('oneDarkPro');
            const isDefaultConfig = configArr.every(item => {
                return configuration.get(item.type) === item.defaultVal;
            });
            if (!isDefaultConfig) {
                utils_1.updateTheme();
            }
            if (!configuration.get('markdownStyle')) {
                utils_1.updateCSS();
            }
        }
        // Observe changes in the config
        vscode_1.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('oneDarkPro')) {
                utils_1.updateTheme();
                utils_1.updateCSS();
            }
        });
        vscode_1.commands.registerCommand('oneDarkPro.showChangelog', () => {
            new Changelog_1.ChangelogWebview().show();
        });
        const settingArr = ['Vivid', 'Italic', 'Bold'];
        settingArr.forEach(settingItem => {
            vscode_1.commands.registerCommand(`oneDarkPro.set${settingItem}`, () => {
                vscode_1.workspace
                    .getConfiguration()
                    .update(`oneDarkPro.${settingItem.toLowerCase()}`, true, vscode_1.ConfigurationTarget.Global);
            });
            vscode_1.commands.registerCommand(`oneDarkPro.cancel${settingItem}`, () => {
                vscode_1.workspace
                    .getConfiguration()
                    .update(`oneDarkPro.${settingItem.toLowerCase()}`, false, vscode_1.ConfigurationTarget.Global);
            });
        });
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map