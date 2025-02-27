"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const vscode = require("vscode");
const disposable_1 = require("./utils/disposable");
class Logger extends disposable_1.Disposable {
    constructor() {
        super();
        this.channel = vscode.window.createOutputChannel('Git Graph');
        this.registerDisposable(this.channel);
    }
    log(message) {
        const date = new Date();
        const timestamp = date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds()) + '.' + pad3(date.getMilliseconds());
        this.channel.appendLine('[' + timestamp + '] ' + message);
    }
    logCmd(cmd, args) {
        this.log('> ' + cmd + ' ' + args.map((arg) => {
            return arg.startsWith('--format=')
                ? '--format=...'
                : arg.includes(' ') ? '"' + arg.replace(/"/g, '\\"') + '"' : arg;
        }).join(' '));
    }
    logError(message) {
        this.log('ERROR: ' + message);
    }
}
exports.Logger = Logger;
function pad2(n) {
    return (n > 9 ? '' : '0') + n;
}
function pad3(n) {
    return (n > 99 ? '' : n > 9 ? '0' : '00') + n;
}
//# sourceMappingURL=logger.js.map