"use strict";
function requireWithFallback(electronModule, nodeModule) { try { return require(electronModule); } catch (err) {} return require(nodeModule); }
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
exports.RepoManager = void 0;
const fs = requireWithFallback("original-fs", "fs");
const path = require("path");
const vscode = require("vscode");
const config_1 = require("./config");
const extensionState_1 = require("./extensionState");
const utils_1 = require("./utils");
const bufferedQueue_1 = require("./utils/bufferedQueue");
const disposable_1 = require("./utils/disposable");
const event_1 = require("./utils/event");
class RepoManager extends disposable_1.Disposable {
    constructor(dataSource, extensionState, onDidChangeConfiguration, logger) {
        super();
        this.folderWatchers = {};
        this.dataSource = dataSource;
        this.extensionState = extensionState;
        this.logger = logger;
        this.repos = extensionState.getRepos();
        this.ignoredRepos = extensionState.getIgnoredRepos();
        this.maxDepthOfRepoSearch = config_1.getConfig().maxDepthOfRepoSearch;
        this.configWatcher = vscode.workspace.createFileSystemWatcher('**/.vscode/vscode-git-graph.json');
        this.configWatcher.onDidCreate(this.onConfigWatcherCreateOrChange.bind(this));
        this.configWatcher.onDidChange(this.onConfigWatcherCreateOrChange.bind(this));
        this.repoEventEmitter = new event_1.EventEmitter();
        this.onWatcherCreateQueue = new bufferedQueue_1.BufferedQueue(this.processOnWatcherCreateEvent.bind(this), this.sendRepos.bind(this));
        this.onWatcherChangeQueue = new bufferedQueue_1.BufferedQueue(this.processOnWatcherChangeEvent.bind(this), this.sendRepos.bind(this));
        this.checkRepoConfigQueue = new bufferedQueue_1.BufferedQueue(this.checkRepoForNewConfig.bind(this), this.sendRepos.bind(this));
        this.startupTasks();
        this.registerDisposables(vscode.workspace.onDidChangeWorkspaceFolders((e) => __awaiter(this, void 0, void 0, function* () {
            let changes = false, path;
            if (e.added.length > 0) {
                for (let i = 0; i < e.added.length; i++) {
                    path = utils_1.getPathFromUri(e.added[i].uri);
                    if (yield this.searchDirectoryForRepos(path, this.maxDepthOfRepoSearch))
                        changes = true;
                    this.startWatchingFolder(path);
                }
            }
            if (e.removed.length > 0) {
                for (let i = 0; i < e.removed.length; i++) {
                    path = utils_1.getPathFromUri(e.removed[i].uri);
                    if (this.removeReposWithinFolder(path))
                        changes = true;
                    this.stopWatchingFolder(path);
                }
            }
            if (changes)
                this.sendRepos();
        })), onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('git-graph.maxDepthOfRepoSearch')) {
                this.maxDepthOfRepoSearchChanged();
            }
        }), this.repoEventEmitter, this.configWatcher, this.onWatcherCreateQueue, this.onWatcherChangeQueue, this.checkRepoConfigQueue, disposable_1.toDisposable(() => {
            const folders = Object.keys(this.folderWatchers);
            for (let i = 0; i < folders.length; i++) {
                this.stopWatchingFolder(folders[i]);
            }
        }));
    }
    get onDidChangeRepos() {
        return this.repoEventEmitter.subscribe;
    }
    maxDepthOfRepoSearchChanged() {
        const newDepth = config_1.getConfig().maxDepthOfRepoSearch;
        if (newDepth > this.maxDepthOfRepoSearch) {
            this.maxDepthOfRepoSearch = newDepth;
            this.searchWorkspaceForRepos();
        }
        else {
            this.maxDepthOfRepoSearch = newDepth;
        }
    }
    startupTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeReposNotInWorkspace();
            if (!(yield this.checkReposExist()))
                this.sendRepos();
            this.checkReposForNewConfig();
            yield this.checkReposForNewSubmodules();
            yield this.searchWorkspaceForRepos();
            this.startWatchingFolders();
        });
    }
    removeReposNotInWorkspace() {
        let rootsExact = [], rootsFolder = [], workspaceFolders = vscode.workspace.workspaceFolders, repoPaths = Object.keys(this.repos), path;
        if (typeof workspaceFolders !== 'undefined') {
            for (let i = 0; i < workspaceFolders.length; i++) {
                path = utils_1.getPathFromUri(workspaceFolders[i].uri);
                rootsExact.push(path);
                rootsFolder.push(utils_1.pathWithTrailingSlash(path));
            }
        }
        for (let i = 0; i < repoPaths.length; i++) {
            let repoPathFolder = utils_1.pathWithTrailingSlash(repoPaths[i]);
            if (rootsExact.indexOf(repoPaths[i]) === -1 && !rootsFolder.find(root => repoPaths[i].startsWith(root)) && !rootsExact.find(root => root.startsWith(repoPathFolder))) {
                this.removeRepo(repoPaths[i]);
            }
        }
    }
    registerRepo(path, loadRepo) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let root = yield this.dataSource.repoRoot(path);
            if (root === null) {
                resolve({ root: null, error: 'The folder "' + path + '" is not a Git repository.' });
            }
            else if (typeof this.repos[root] !== 'undefined') {
                resolve({ root: null, error: 'The folder "' + path + '" is contained within the known repository "' + root + '".' });
            }
            else {
                if (this.ignoredRepos.includes(root)) {
                    this.ignoredRepos.splice(this.ignoredRepos.indexOf(root), 1);
                    this.extensionState.setIgnoredRepos(this.ignoredRepos);
                }
                yield this.addRepo(root);
                this.sendRepos(loadRepo ? root : null);
                resolve({ root: root, error: null });
            }
        }));
    }
    ignoreRepo(repo) {
        if (this.isKnownRepo(repo)) {
            if (!this.ignoredRepos.includes(repo))
                this.ignoredRepos.push(repo);
            this.extensionState.setIgnoredRepos(this.ignoredRepos);
            this.removeRepo(repo);
            this.sendRepos();
            return true;
        }
        else {
            return false;
        }
    }
    getRepos() {
        let repoPaths = Object.keys(this.repos).sort((a, b) => a.localeCompare(b)), repos = {};
        for (let i = 0; i < repoPaths.length; i++) {
            repos[repoPaths[i]] = this.repos[repoPaths[i]];
        }
        return repos;
    }
    getNumRepos() {
        return Object.keys(this.repos).length;
    }
    getRepoContainingFile(path) {
        let repoPaths = Object.keys(this.repos), repo = null;
        for (let i = 0; i < repoPaths.length; i++) {
            if (path.startsWith(utils_1.pathWithTrailingSlash(repoPaths[i])) && (repo === null || repo.length < repoPaths[i].length))
                repo = repoPaths[i];
        }
        return repo;
    }
    getReposInFolder(path) {
        let pathFolder = utils_1.pathWithTrailingSlash(path), repoPaths = Object.keys(this.repos), reposInFolder = [];
        for (let i = 0; i < repoPaths.length; i++) {
            if (repoPaths[i] === path || repoPaths[i].startsWith(pathFolder))
                reposInFolder.push(repoPaths[i]);
        }
        return reposInFolder;
    }
    getKnownRepo(repo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isKnownRepo(repo)) {
                return repo;
            }
            let canonicalRepo = yield utils_1.realpath(repo);
            let repoPaths = Object.keys(this.repos);
            for (let i = 0; i < repoPaths.length; i++) {
                if (canonicalRepo === (yield utils_1.realpath(repoPaths[i]))) {
                    return repoPaths[i];
                }
            }
            return null;
        });
    }
    isKnownRepo(repo) {
        return typeof this.repos[repo] !== 'undefined';
    }
    addRepo(repo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ignoredRepos.includes(repo)) {
                return false;
            }
            else {
                this.repos[repo] = Object.assign({}, extensionState_1.DEFAULT_REPO_STATE);
                this.extensionState.saveRepos(this.repos);
                this.logger.log('Added new repo: ' + repo);
                yield this.checkRepoForNewConfig(repo, true);
                yield this.searchRepoForSubmodules(repo);
                return true;
            }
        });
    }
    removeRepo(repo) {
        delete this.repos[repo];
        this.extensionState.saveRepos(this.repos);
        this.logger.log('Removed repo: ' + repo);
    }
    removeReposWithinFolder(path) {
        let reposInFolder = this.getReposInFolder(path);
        for (let i = 0; i < reposInFolder.length; i++) {
            this.removeRepo(reposInFolder[i]);
        }
        return reposInFolder.length > 0;
    }
    isDirectoryWithinRepos(path) {
        let repoPaths = Object.keys(this.repos);
        for (let i = 0; i < repoPaths.length; i++) {
            if (path === repoPaths[i] || path.startsWith(utils_1.pathWithTrailingSlash(repoPaths[i])))
                return true;
        }
        return false;
    }
    sendRepos(loadRepo = null) {
        this.repoEventEmitter.emit({
            repos: this.getRepos(),
            numRepos: this.getNumRepos(),
            loadRepo: loadRepo
        });
    }
    checkReposExist() {
        return new Promise(resolve => {
            let repoPaths = Object.keys(this.repos), changes = false;
            utils_1.evalPromises(repoPaths, 3, path => this.dataSource.repoRoot(path)).then(results => {
                for (let i = 0; i < repoPaths.length; i++) {
                    if (results[i] === null) {
                        this.removeRepo(repoPaths[i]);
                        changes = true;
                    }
                    else if (repoPaths[i] !== results[i]) {
                        this.transferRepoState(repoPaths[i], results[i]);
                        changes = true;
                    }
                }
                if (changes)
                    this.sendRepos();
                resolve(changes);
            });
        });
    }
    setRepoState(repo, state) {
        this.repos[repo] = state;
        this.extensionState.saveRepos(this.repos);
    }
    transferRepoState(oldRepo, newRepo) {
        this.repos[newRepo] = this.repos[oldRepo];
        delete this.repos[oldRepo];
        this.extensionState.saveRepos(this.repos);
        this.extensionState.transferRepo(oldRepo, newRepo);
        this.logger.log('Transferred repo state: ' + oldRepo + ' -> ' + newRepo);
    }
    searchWorkspaceForRepos() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Searching workspace for new repos ...');
            let rootFolders = vscode.workspace.workspaceFolders, changes = false;
            if (typeof rootFolders !== 'undefined') {
                for (let i = 0; i < rootFolders.length; i++) {
                    if (yield this.searchDirectoryForRepos(utils_1.getPathFromUri(rootFolders[i].uri), this.maxDepthOfRepoSearch))
                        changes = true;
                }
            }
            this.logger.log('Completed searching workspace for new repos');
            if (changes)
                this.sendRepos();
            return changes;
        });
    }
    searchDirectoryForRepos(directory, maxDepth) {
        return new Promise(resolve => {
            if (this.isDirectoryWithinRepos(directory)) {
                resolve(false);
                return;
            }
            this.dataSource.repoRoot(directory).then((root) => __awaiter(this, void 0, void 0, function* () {
                if (root !== null) {
                    resolve(yield this.addRepo(root));
                }
                else if (maxDepth > 0) {
                    fs.readdir(directory, (err, dirContents) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            resolve(false);
                        }
                        else {
                            let dirs = [];
                            for (let i = 0; i < dirContents.length; i++) {
                                if (dirContents[i] !== '.git' && (yield isDirectory(directory + '/' + dirContents[i]))) {
                                    dirs.push(directory + '/' + dirContents[i]);
                                }
                            }
                            resolve((yield utils_1.evalPromises(dirs, 2, dir => this.searchDirectoryForRepos(dir, maxDepth - 1))).indexOf(true) > -1);
                        }
                    }));
                }
                else {
                    resolve(false);
                }
            })).catch(() => resolve(false));
        });
    }
    checkReposForNewSubmodules() {
        return __awaiter(this, void 0, void 0, function* () {
            let repoPaths = Object.keys(this.repos), changes = false;
            for (let i = 0; i < repoPaths.length; i++) {
                if (yield this.searchRepoForSubmodules(repoPaths[i]))
                    changes = true;
            }
            if (changes)
                this.sendRepos();
        });
    }
    searchRepoForSubmodules(repo) {
        return __awaiter(this, void 0, void 0, function* () {
            let submodules = yield this.dataSource.getSubmodules(repo), changes = false;
            for (let i = 0; i < submodules.length; i++) {
                if (!this.isKnownRepo(submodules[i])) {
                    if (yield this.addRepo(submodules[i]))
                        changes = true;
                }
            }
            return changes;
        });
    }
    startWatchingFolders() {
        let rootFolders = vscode.workspace.workspaceFolders;
        if (typeof rootFolders !== 'undefined') {
            for (let i = 0; i < rootFolders.length; i++) {
                this.startWatchingFolder(utils_1.getPathFromUri(rootFolders[i].uri));
            }
        }
    }
    startWatchingFolder(path) {
        const watcher = vscode.workspace.createFileSystemWatcher(path + '/**');
        watcher.onDidCreate(this.onWatcherCreate.bind(this));
        watcher.onDidChange(this.onWatcherChange.bind(this));
        watcher.onDidDelete(this.onWatcherDelete.bind(this));
        this.folderWatchers[path] = watcher;
    }
    stopWatchingFolder(path) {
        this.folderWatchers[path].dispose();
        delete this.folderWatchers[path];
    }
    onWatcherCreate(uri) {
        let path = utils_1.getPathFromUri(uri);
        if (path.indexOf('/.git/') > -1)
            return;
        if (path.endsWith('/.git'))
            path = path.slice(0, -5);
        this.onWatcherCreateQueue.enqueue(path);
    }
    onWatcherChange(uri) {
        let path = utils_1.getPathFromUri(uri);
        if (path.indexOf('/.git/') > -1)
            return;
        if (path.endsWith('/.git'))
            path = path.slice(0, -5);
        this.onWatcherChangeQueue.enqueue(path);
    }
    onWatcherDelete(uri) {
        let path = utils_1.getPathFromUri(uri);
        if (path.indexOf('/.git/') > -1)
            return;
        if (path.endsWith('/.git'))
            path = path.slice(0, -5);
        if (this.removeReposWithinFolder(path))
            this.sendRepos();
    }
    processOnWatcherCreateEvent(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield isDirectory(path)) {
                if (yield this.searchDirectoryForRepos(path, this.maxDepthOfRepoSearch)) {
                    return true;
                }
            }
            return false;
        });
    }
    processOnWatcherChangeEvent(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield doesPathExist(path))) {
                if (this.removeReposWithinFolder(path)) {
                    return true;
                }
            }
            return false;
        });
    }
    checkReposForNewConfig() {
        Object.keys(this.repos).forEach((repo) => this.checkRepoConfigQueue.enqueue(repo));
    }
    checkRepoForNewConfig(repo, isRepoNew = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield readExternalConfigFile(repo);
                const state = this.repos[repo];
                if (state && file !== null && typeof file.exportedAt === 'number' && file.exportedAt > state.lastImportAt) {
                    const validationError = validateExternalConfigFile(file);
                    if (validationError === null) {
                        const action = isRepoNew ? 'Yes' : yield vscode.window.showInformationMessage('A newer Git Graph Repository Configuration File has been detected for the repository "' + (state.name || utils_1.getRepoName(repo)) + '". Would you like to override your current repository configuration with the new changes?', 'Yes', 'No');
                        if (this.isKnownRepo(repo) && action) {
                            const state = this.repos[repo];
                            if (action === 'Yes') {
                                applyExternalConfigFile(file, state);
                            }
                            state.lastImportAt = file.exportedAt;
                            this.extensionState.saveRepos(this.repos);
                            if (!isRepoNew && action === 'Yes') {
                                utils_1.showInformationMessage('Git Graph Repository Configuration was successfully imported for the repository "' + (state.name || utils_1.getRepoName(repo)) + '".');
                            }
                            return true;
                        }
                    }
                    else {
                        utils_1.showErrorMessage('The value for "' + validationError + '" in the configuration file "' + utils_1.getPathFromStr(path.join(repo, '.vscode', 'vscode-git-graph.json')) + '" is invalid.');
                    }
                }
            }
            catch (_) { }
            return false;
        });
    }
    onConfigWatcherCreateOrChange(uri) {
        const path = utils_1.getPathFromUri(uri);
        const repo = this.getRepoContainingFile(path);
        if (repo !== null) {
            this.checkRepoConfigQueue.enqueue(repo);
        }
    }
    exportRepoConfig(repo) {
        const file = generateExternalConfigFile(this.repos[repo]);
        return writeExternalConfigFile(repo, file).then((message) => {
            utils_1.showInformationMessage(message);
            if (this.isKnownRepo(repo)) {
                this.repos[repo].lastImportAt = file.exportedAt;
                this.extensionState.saveRepos(this.repos);
            }
            return null;
        }, (error) => error);
    }
}
exports.RepoManager = RepoManager;
function isDirectory(path) {
    return new Promise(resolve => {
        fs.stat(path, (err, stats) => {
            resolve(err ? false : stats.isDirectory());
        });
    });
}
function doesPathExist(path) {
    return new Promise(resolve => {
        fs.stat(path, err => resolve(!err));
    });
}
function readExternalConfigFile(repo) {
    return new Promise((resolve) => {
        fs.readFile(path.join(repo, '.vscode', 'vscode-git-graph.json'), (err, data) => {
            if (err) {
                resolve(null);
            }
            else {
                try {
                    const contents = JSON.parse(data.toString());
                    resolve(typeof contents === 'object' ? contents : null);
                }
                catch (_) {
                    resolve(null);
                }
            }
        });
    });
}
function writeExternalConfigFile(repo, file) {
    return new Promise((resolve, reject) => {
        const vscodePath = path.join(repo, '.vscode');
        fs.mkdir(vscodePath, (err) => {
            if (!err || err.code === 'EEXIST') {
                const configPath = path.join(vscodePath, 'vscode-git-graph.json');
                fs.writeFile(configPath, JSON.stringify(file, null, 4), (err) => {
                    if (err) {
                        reject('Failed to write the Git Graph Repository Configuration File to "' + utils_1.getPathFromStr(configPath) + '".');
                    }
                    else {
                        resolve('Successfully exported the Git Graph Repository Configuration to "' + utils_1.getPathFromStr(configPath) + '".');
                    }
                });
            }
            else {
                reject('An unexpected error occurred while checking if the "' + utils_1.getPathFromStr(vscodePath) + '" directory exists. This directory is used to store the Git Graph Repository Configuration file.');
            }
        });
    });
}
function generateExternalConfigFile(state) {
    const file = {};
    if (state.commitOrdering !== "default") {
        file.commitOrdering = state.commitOrdering;
    }
    if (state.fileViewType !== 0) {
        switch (state.fileViewType) {
            case 1:
                file.fileViewType = "tree";
                break;
            case 2:
                file.fileViewType = "list";
                break;
        }
    }
    if (state.hideRemotes.length > 0) {
        file.hideRemotes = state.hideRemotes;
    }
    if (state.includeCommitsMentionedByReflogs !== 0) {
        file.includeCommitsMentionedByReflogs = state.includeCommitsMentionedByReflogs === 1;
    }
    if (state.issueLinkingConfig !== null) {
        file.issueLinkingConfig = state.issueLinkingConfig;
    }
    if (state.name !== null) {
        file.name = state.name;
    }
    if (state.onlyFollowFirstParent !== 0) {
        file.onlyFollowFirstParent = state.onlyFollowFirstParent === 1;
    }
    if (state.onRepoLoadShowCheckedOutBranch !== 0) {
        file.onRepoLoadShowCheckedOutBranch = state.onRepoLoadShowCheckedOutBranch === 1;
    }
    if (state.onRepoLoadShowSpecificBranches !== null) {
        file.onRepoLoadShowSpecificBranches = state.onRepoLoadShowSpecificBranches;
    }
    if (state.pullRequestConfig !== null) {
        let provider;
        switch (state.pullRequestConfig.provider) {
            case 0:
                provider = "bitbucket";
                break;
            case 1:
                provider = "custom";
                break;
            case 2:
                provider = "github";
                break;
            case 3:
                provider = "gitlab";
                break;
        }
        file.pullRequestConfig = Object.assign({}, state.pullRequestConfig, { provider: provider });
    }
    if (state.showRemoteBranchesV2 !== 0) {
        file.showRemoteBranches = state.showRemoteBranchesV2 === 1;
    }
    if (state.showTags !== 0) {
        file.showTags = state.showTags === 1;
    }
    file.exportedAt = (new Date()).getTime();
    return file;
}
function validateExternalConfigFile(file) {
    if (typeof file.commitOrdering !== 'undefined' && file.commitOrdering !== "date" && file.commitOrdering !== "author-date" && file.commitOrdering !== "topo") {
        return 'commitOrdering';
    }
    if (typeof file.fileViewType !== 'undefined' && file.fileViewType !== "tree" && file.fileViewType !== "list") {
        return 'fileViewType';
    }
    if (typeof file.hideRemotes !== 'undefined' && (!Array.isArray(file.hideRemotes) || file.hideRemotes.some((remote) => typeof remote !== 'string'))) {
        return 'hideRemotes';
    }
    if (typeof file.includeCommitsMentionedByReflogs !== 'undefined' && typeof file.includeCommitsMentionedByReflogs !== 'boolean') {
        return 'includeCommitsMentionedByReflogs';
    }
    if (typeof file.issueLinkingConfig !== 'undefined' && (typeof file.issueLinkingConfig !== 'object' || file.issueLinkingConfig === null || typeof file.issueLinkingConfig.issue !== 'string' || typeof file.issueLinkingConfig.url !== 'string')) {
        return 'issueLinkingConfig';
    }
    if (typeof file.name !== 'undefined' && typeof file.name !== 'string') {
        return 'name';
    }
    if (typeof file.onlyFollowFirstParent !== 'undefined' && typeof file.onlyFollowFirstParent !== 'boolean') {
        return 'onlyFollowFirstParent';
    }
    if (typeof file.onRepoLoadShowCheckedOutBranch !== 'undefined' && typeof file.onRepoLoadShowCheckedOutBranch !== 'boolean') {
        return 'onRepoLoadShowCheckedOutBranch';
    }
    if (typeof file.onRepoLoadShowSpecificBranches !== 'undefined' && (!Array.isArray(file.onRepoLoadShowSpecificBranches) || file.onRepoLoadShowSpecificBranches.some((branch) => typeof branch !== 'string'))) {
        return 'onRepoLoadShowSpecificBranches';
    }
    if (typeof file.pullRequestConfig !== 'undefined' && (typeof file.pullRequestConfig !== 'object' ||
        file.pullRequestConfig === null ||
        (file.pullRequestConfig.provider !== "bitbucket" &&
            (file.pullRequestConfig.provider !== "custom" || typeof file.pullRequestConfig.custom !== 'object' || file.pullRequestConfig.custom === null || typeof file.pullRequestConfig.custom.name !== 'string' || typeof file.pullRequestConfig.custom.templateUrl !== 'string') &&
            file.pullRequestConfig.provider !== "github" &&
            file.pullRequestConfig.provider !== "gitlab") ||
        typeof file.pullRequestConfig.hostRootUrl !== 'string' ||
        typeof file.pullRequestConfig.sourceRemote !== 'string' ||
        typeof file.pullRequestConfig.sourceOwner !== 'string' ||
        typeof file.pullRequestConfig.sourceRepo !== 'string' ||
        (typeof file.pullRequestConfig.destRemote !== 'string' && file.pullRequestConfig.destRemote !== null) ||
        typeof file.pullRequestConfig.destOwner !== 'string' ||
        typeof file.pullRequestConfig.destRepo !== 'string' ||
        typeof file.pullRequestConfig.destProjectId !== 'string' ||
        typeof file.pullRequestConfig.destBranch !== 'string')) {
        return 'pullRequestConfig';
    }
    if (typeof file.showRemoteBranches !== 'undefined' && typeof file.showRemoteBranches !== 'boolean') {
        return 'showRemoteBranches';
    }
    if (typeof file.showTags !== 'undefined' && typeof file.showTags !== 'boolean') {
        return 'showTags';
    }
    return null;
}
function applyExternalConfigFile(file, state) {
    if (typeof file.commitOrdering !== 'undefined') {
        state.commitOrdering = file.commitOrdering;
    }
    if (typeof file.fileViewType !== 'undefined') {
        switch (file.fileViewType) {
            case "tree":
                state.fileViewType = 1;
                break;
            case "list":
                state.fileViewType = 2;
                break;
        }
    }
    if (typeof file.hideRemotes !== 'undefined') {
        state.hideRemotes = file.hideRemotes;
    }
    if (typeof file.includeCommitsMentionedByReflogs !== 'undefined') {
        state.includeCommitsMentionedByReflogs = file.includeCommitsMentionedByReflogs ? 1 : 2;
    }
    if (typeof file.issueLinkingConfig !== 'undefined') {
        state.issueLinkingConfig = {
            issue: file.issueLinkingConfig.issue,
            url: file.issueLinkingConfig.url
        };
    }
    if (typeof file.name !== 'undefined') {
        state.name = file.name;
    }
    if (typeof file.onlyFollowFirstParent !== 'undefined') {
        state.onlyFollowFirstParent = file.onlyFollowFirstParent ? 1 : 2;
    }
    if (typeof file.onRepoLoadShowCheckedOutBranch !== 'undefined') {
        state.onRepoLoadShowCheckedOutBranch = file.onRepoLoadShowCheckedOutBranch ? 1 : 2;
    }
    if (typeof file.onRepoLoadShowSpecificBranches !== 'undefined') {
        state.onRepoLoadShowSpecificBranches = file.onRepoLoadShowSpecificBranches;
    }
    if (typeof file.pullRequestConfig !== 'undefined') {
        let provider;
        switch (file.pullRequestConfig.provider) {
            case "bitbucket":
                provider = 0;
                break;
            case "custom":
                provider = 1;
                break;
            case "github":
                provider = 2;
                break;
            case "gitlab":
                provider = 3;
                break;
        }
        state.pullRequestConfig = {
            provider: provider,
            custom: provider === 1
                ? {
                    name: file.pullRequestConfig.custom.name,
                    templateUrl: file.pullRequestConfig.custom.templateUrl
                }
                : null,
            hostRootUrl: file.pullRequestConfig.hostRootUrl,
            sourceRemote: file.pullRequestConfig.sourceRemote,
            sourceOwner: file.pullRequestConfig.sourceOwner,
            sourceRepo: file.pullRequestConfig.sourceRepo,
            destRemote: file.pullRequestConfig.destRemote,
            destOwner: file.pullRequestConfig.destOwner,
            destRepo: file.pullRequestConfig.destRepo,
            destProjectId: file.pullRequestConfig.destProjectId,
            destBranch: file.pullRequestConfig.destBranch
        };
    }
    if (typeof file.showRemoteBranches !== 'undefined') {
        state.showRemoteBranchesV2 = file.showRemoteBranches ? 1 : 2;
    }
    if (typeof file.showTags !== 'undefined') {
        state.showTags = file.showTags ? 1 : 2;
    }
}
//# sourceMappingURL=repoManager.js.map