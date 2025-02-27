"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarItem = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
const disposable_1 = require("./utils/disposable");
class StatusBarItem extends disposable_1.Disposable {
    constructor(initialNumRepos, onDidChangeRepos, onDidChangeConfiguration, logger) {
        super();
        this.isVisible = false;
        this.numRepos = 0;
        this.logger = logger;
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        statusBarItem.text = 'Git Graph';
        statusBarItem.tooltip = 'View Git Graph';
        statusBarItem.command = 'git-graph.view';
        this.statusBarItem = statusBarItem;
        this.registerDisposables(onDidChangeRepos((event) => {
            this.setNumRepos(event.numRepos);
        }), onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('git-graph.showStatusBarItem')) {
                this.refresh();
            }
        }), statusBarItem);
        this.setNumRepos(initialNumRepos);
    }
    setNumRepos(numRepos) {
        this.numRepos = numRepos;
        this.refresh();
    }
    refresh() {
        const shouldBeVisible = config_1.getConfig().showStatusBarItem && this.numRepos > 0;
        if (this.isVisible !== shouldBeVisible) {
            if (shouldBeVisible) {
                this.statusBarItem.show();
                this.logger.log('Showing "Git Graph" Status Bar Item');
            }
            else {
                this.statusBarItem.hide();
                this.logger.log('Hiding "Git Graph" Status Bar Item');
            }
            this.isVisible = shouldBeVisible;
        }
    }
}
exports.StatusBarItem = StatusBarItem;
//# sourceMappingURL=statusBarItem.js.map