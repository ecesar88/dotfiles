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
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const avatarManager_1 = require("./avatarManager");
const commands_1 = require("./commands");
const config_1 = require("./config");
const dataSource_1 = require("./dataSource");
const diffDocProvider_1 = require("./diffDocProvider");
const extensionState_1 = require("./extensionState");
const startup_1 = require("./life-cycle/startup");
const logger_1 = require("./logger");
const repoManager_1 = require("./repoManager");
const statusBarItem_1 = require("./statusBarItem");
const utils_1 = require("./utils");
const event_1 = require("./utils/event");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.Logger();
        logger.log('Starting Git Graph ...');
        const gitExecutableEmitter = new event_1.EventEmitter();
        const onDidChangeGitExecutable = gitExecutableEmitter.subscribe;
        const extensionState = new extensionState_1.ExtensionState(context, onDidChangeGitExecutable);
        let gitExecutable;
        try {
            gitExecutable = yield utils_1.findGit(extensionState);
            gitExecutableEmitter.emit(gitExecutable);
            logger.log('Using ' + gitExecutable.path + ' (version: ' + gitExecutable.version + ')');
        }
        catch (_) {
            gitExecutable = null;
            utils_1.showErrorMessage(utils_1.UNABLE_TO_FIND_GIT_MSG);
            logger.logError(utils_1.UNABLE_TO_FIND_GIT_MSG);
        }
        const configurationEmitter = new event_1.EventEmitter();
        const onDidChangeConfiguration = configurationEmitter.subscribe;
        const dataSource = new dataSource_1.DataSource(gitExecutable, onDidChangeConfiguration, onDidChangeGitExecutable, logger);
        const avatarManager = new avatarManager_1.AvatarManager(dataSource, extensionState, logger);
        const repoManager = new repoManager_1.RepoManager(dataSource, extensionState, onDidChangeConfiguration, logger);
        const statusBarItem = new statusBarItem_1.StatusBarItem(repoManager.getNumRepos(), repoManager.onDidChangeRepos, onDidChangeConfiguration, logger);
        const commandManager = new commands_1.CommandManager(context, avatarManager, dataSource, extensionState, repoManager, gitExecutable, onDidChangeGitExecutable, logger);
        const diffDocProvider = new diffDocProvider_1.DiffDocProvider(dataSource);
        context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(diffDocProvider_1.DiffDocProvider.scheme, diffDocProvider), vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('git-graph')) {
                configurationEmitter.emit(event);
            }
            else if (event.affectsConfiguration('git.path')) {
                const paths = config_1.getConfig().gitPaths;
                if (paths.length === 0)
                    return;
                utils_1.getGitExecutableFromPaths(paths).then((gitExecutable) => {
                    gitExecutableEmitter.emit(gitExecutable);
                    const msg = 'Git Graph is now using ' + gitExecutable.path + ' (version: ' + gitExecutable.version + ')';
                    utils_1.showInformationMessage(msg);
                    logger.log(msg);
                    repoManager.searchWorkspaceForRepos();
                }, () => {
                    const msg = 'The new value of "git.path" ("' + paths.join('", "') + '") does not ' + (paths.length > 1 ? 'contain a string that matches' : 'match') + ' the path and filename of a valid Git executable.';
                    utils_1.showErrorMessage(msg);
                    logger.logError(msg);
                });
            }
        }), diffDocProvider, commandManager, statusBarItem, repoManager, avatarManager, dataSource, configurationEmitter, extensionState, gitExecutableEmitter, logger);
        logger.log('Started Git Graph - Ready to use!');
        extensionState.expireOldCodeReviews();
        startup_1.onStartUp(context).catch(() => { });
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map