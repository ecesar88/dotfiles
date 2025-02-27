"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCSS = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const fs = require("fs");
const _1 = require("./");
const getCSSPath = file => path_1.join(__dirname, '../../', 'styles', file);
function updateCSS() {
    const configuration = vscode_1.workspace.getConfiguration('oneDarkPro');
    const files = [
        'atom-one-dark-inside.css',
        'base-inside.css',
        'markdown-inside.css'
    ];
    if (!configuration.get('markdownStyle')) {
        files.forEach(file => {
            fs.writeFileSync(getCSSPath(file), '');
        });
    }
    else {
        files.forEach(file => {
            fs.writeFileSync(getCSSPath(`./${file}`), fs.readFileSync(getCSSPath(`./origin/${file}`)));
        });
    }
    _1.promptToReload();
}
exports.updateCSS = updateCSS;
//# sourceMappingURL=updateCSS.js.map