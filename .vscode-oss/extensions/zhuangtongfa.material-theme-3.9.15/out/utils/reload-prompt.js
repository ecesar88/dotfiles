"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptToReload = void 0;
const vscode_1 = require("vscode");
function promptToReload() {
    const action = 'Reload';
    vscode_1.window
        .showInformationMessage('Please reload to apply the theme configuration changes.', action)
        .then(selectedAction => {
        if (selectedAction === action) {
            vscode_1.commands.executeCommand('workbench.action.reloadWindow');
        }
    });
}
exports.promptToReload = promptToReload;
//# sourceMappingURL=reload-prompt.js.map