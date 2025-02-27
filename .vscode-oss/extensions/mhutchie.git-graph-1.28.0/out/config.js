"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const vscode = require("vscode");
const VIEW_COLUMN_MAPPING = {
    'Active': vscode.ViewColumn.Active,
    'Beside': vscode.ViewColumn.Beside,
    'One': vscode.ViewColumn.One,
    'Two': vscode.ViewColumn.Two,
    'Three': vscode.ViewColumn.Three,
    'Four': vscode.ViewColumn.Four,
    'Five': vscode.ViewColumn.Five,
    'Six': vscode.ViewColumn.Six,
    'Seven': vscode.ViewColumn.Seven,
    'Eight': vscode.ViewColumn.Eight,
    'Nine': vscode.ViewColumn.Nine
};
class Config {
    constructor(repo) {
        this.config = vscode.workspace.getConfiguration('git-graph', repo ? vscode.Uri.file(repo) : undefined);
    }
    get commitDetailsView() {
        return {
            autoCenter: !!this.getRenamedExtensionSetting('commitDetailsView.autoCenter', 'autoCenterCommitDetailsView', true),
            fileTreeCompactFolders: !!this.getRenamedExtensionSetting('commitDetailsView.fileView.fileTree.compactFolders', 'commitDetailsViewFileTreeCompactFolders', true),
            fileViewType: this.getRenamedExtensionSetting('commitDetailsView.fileView.type', 'defaultFileViewType', 'File Tree') === 'File List'
                ? 2
                : 1,
            location: this.getRenamedExtensionSetting('commitDetailsView.location', 'commitDetailsViewLocation', 'Inline') === 'Docked to Bottom'
                ? 1
                : 0
        };
    }
    get contextMenuActionsVisibility() {
        let userConfig = this.config.get('contextMenuActionsVisibility', {});
        let config = {
            branch: { checkout: true, rename: true, delete: true, merge: true, rebase: true, push: true, createPullRequest: true, createArchive: true, copyName: true },
            commit: { addTag: true, createBranch: true, checkout: true, cherrypick: true, revert: true, drop: true, merge: true, rebase: true, reset: true, copyHash: true, copySubject: true },
            remoteBranch: { checkout: true, delete: true, fetch: true, merge: true, pull: true, createPullRequest: true, createArchive: true, copyName: true },
            stash: { apply: true, createBranch: true, pop: true, drop: true, copyName: true, copyHash: true },
            tag: { viewDetails: true, delete: true, push: true, createArchive: true, copyName: true },
            uncommittedChanges: { stash: true, reset: true, clean: true, openSourceControlView: true }
        };
        mergeConfigObjects(config, userConfig);
        return config;
    }
    get customBranchGlobPatterns() {
        let inPatterns = this.config.get('customBranchGlobPatterns', []);
        let outPatterns = [];
        for (let i = 0; i < inPatterns.length; i++) {
            if (typeof inPatterns[i].name === 'string' && typeof inPatterns[i].glob === 'string') {
                outPatterns.push({ name: inPatterns[i].name, glob: '--glob=' + inPatterns[i].glob });
            }
        }
        return outPatterns;
    }
    get customEmojiShortcodeMappings() {
        let inMappings = this.config.get('customEmojiShortcodeMappings', []);
        let outMappings = [];
        for (let i = 0; i < inMappings.length; i++) {
            if (typeof inMappings[i].shortcode === 'string' && typeof inMappings[i].emoji === 'string') {
                outMappings.push({ shortcode: inMappings[i].shortcode, emoji: inMappings[i].emoji });
            }
        }
        return outMappings;
    }
    get customPullRequestProviders() {
        let providers = this.config.get('customPullRequestProviders', []);
        return Array.isArray(providers)
            ? providers
                .filter((provider) => typeof provider.name === 'string' && typeof provider.templateUrl === 'string')
                .map((provider) => ({ name: provider.name, templateUrl: provider.templateUrl }))
            : [];
    }
    get dateFormat() {
        let configValue = this.getRenamedExtensionSetting('date.format', 'dateFormat', 'Date & Time'), type = 0, iso = false;
        if (configValue === 'Relative') {
            type = 2;
        }
        else {
            if (configValue.endsWith('Date Only'))
                type = 1;
            if (configValue.startsWith('ISO'))
                iso = true;
        }
        return { type: type, iso: iso };
    }
    get dateType() {
        return this.getRenamedExtensionSetting('date.type', 'dateType', 'Author Date') === 'Commit Date'
            ? 1
            : 0;
    }
    get defaultColumnVisibility() {
        let obj = this.config.get('defaultColumnVisibility', {});
        if (typeof obj === 'object' && obj !== null && typeof obj['Date'] === 'boolean' && typeof obj['Author'] === 'boolean' && typeof obj['Commit'] === 'boolean') {
            return { author: obj['Author'], commit: obj['Commit'], date: obj['Date'] };
        }
        else {
            return { author: true, commit: true, date: true };
        }
    }
    get dialogDefaults() {
        let resetCommitMode = this.config.get('dialog.resetCurrentBranchToCommit.mode', 'Mixed');
        let resetUncommittedMode = this.config.get('dialog.resetUncommittedChanges.mode', 'Mixed');
        return {
            addTag: {
                pushToRemote: !!this.config.get('dialog.addTag.pushToRemote', false),
                type: this.config.get('dialog.addTag.type', 'Annotated') === 'Lightweight' ? 'lightweight' : 'annotated'
            },
            applyStash: {
                reinstateIndex: !!this.config.get('dialog.applyStash.reinstateIndex', false)
            },
            cherryPick: {
                noCommit: !!this.config.get('dialog.cherryPick.noCommit', false),
                recordOrigin: !!this.config.get('dialog.cherryPick.recordOrigin', false)
            },
            createBranch: {
                checkout: !!this.config.get('dialog.createBranch.checkOut', false)
            },
            deleteBranch: {
                forceDelete: !!this.config.get('dialog.deleteBranch.forceDelete', false)
            },
            fetchRemote: {
                prune: !!this.config.get('dialog.fetchRemote.prune', false),
                pruneTags: !!this.config.get('dialog.fetchRemote.pruneTags', false)
            },
            merge: {
                noCommit: !!this.config.get('dialog.merge.noCommit', false),
                noFastForward: !!this.config.get('dialog.merge.noFastForward', true),
                squash: !!this.config.get('dialog.merge.squashCommits', false)
            },
            popStash: {
                reinstateIndex: !!this.config.get('dialog.popStash.reinstateIndex', false)
            },
            pullBranch: {
                noFastForward: !!this.config.get('dialog.pullBranch.noFastForward', false),
                squash: !!this.config.get('dialog.pullBranch.squashCommits', false)
            },
            rebase: {
                ignoreDate: !!this.config.get('dialog.rebase.ignoreDate', true),
                interactive: !!this.config.get('dialog.rebase.launchInteractiveRebase', false)
            },
            resetCommit: {
                mode: resetCommitMode === 'Soft' ? "soft" : (resetCommitMode === 'Hard' ? "hard" : "mixed")
            },
            resetUncommitted: {
                mode: resetUncommittedMode === 'Hard' ? "hard" : "mixed"
            },
            stashUncommittedChanges: {
                includeUntracked: !!this.config.get('dialog.stashUncommittedChanges.includeUntracked', true)
            }
        };
    }
    get squashMergeMessageFormat() {
        return this.config.get('dialog.merge.squashMessageFormat', 'Default') === 'Git SQUASH_MSG'
            ? 1
            : 0;
    }
    get squashPullMessageFormat() {
        return this.config.get('dialog.pullBranch.squashMessageFormat', 'Default') === 'Git SQUASH_MSG'
            ? 1
            : 0;
    }
    get enhancedAccessibility() {
        return !!this.config.get('enhancedAccessibility', false);
    }
    get fileEncoding() {
        return this.config.get('fileEncoding', 'utf8');
    }
    get graph() {
        const colours = this.getRenamedExtensionSetting('graph.colours', 'graphColours', []);
        return {
            colours: Array.isArray(colours) && colours.length > 0
                ? colours.filter((v) => v.match(/^\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8}|rgb[a]?\s*\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))\s*$/) !== null)
                : ['#0085d9', '#d9008f', '#00d90a', '#d98500', '#a300d9', '#ff0000', '#00d9cc', '#e138e8', '#85d900', '#dc5b23', '#6f24d6', '#ffcc00'],
            style: this.getRenamedExtensionSetting('graph.style', 'graphStyle', 'rounded') === 'angular'
                ? 1
                : 0,
            grid: { x: 16, y: 24, offsetX: 16, offsetY: 12, expandY: 250 },
            uncommittedChanges: this.config.get('graph.uncommittedChanges', 'Open Circle at the Uncommitted Changes') === 'Open Circle at the Checked Out Commit'
                ? 1
                : 0
        };
    }
    get integratedTerminalShell() {
        return this.config.get('integratedTerminalShell', '');
    }
    get keybindings() {
        return {
            find: this.getKeybinding('keyboardShortcut.find', 'f'),
            refresh: this.getKeybinding('keyboardShortcut.refresh', 'r'),
            scrollToHead: this.getKeybinding('keyboardShortcut.scrollToHead', 'h'),
            scrollToStash: this.getKeybinding('keyboardShortcut.scrollToStash', 's')
        };
    }
    get maxDepthOfRepoSearch() {
        return this.config.get('maxDepthOfRepoSearch', 0);
    }
    get markdown() {
        return !!this.config.get('markdown', true);
    }
    get openNewTabEditorGroup() {
        const location = this.getRenamedExtensionSetting('openNewTabEditorGroup', 'openDiffTabLocation', 'Active');
        return typeof location === 'string' && typeof VIEW_COLUMN_MAPPING[location] !== 'undefined'
            ? VIEW_COLUMN_MAPPING[location]
            : vscode.ViewColumn.Active;
    }
    get openToTheRepoOfTheActiveTextEditorDocument() {
        return !!this.config.get('openToTheRepoOfTheActiveTextEditorDocument', false);
    }
    get referenceLabels() {
        const alignmentConfigValue = this.getRenamedExtensionSetting('referenceLabels.alignment', 'referenceLabelAlignment', 'Normal');
        const alignment = alignmentConfigValue === 'Branches (on the left) & Tags (on the right)'
            ? 1
            : alignmentConfigValue === 'Branches (aligned to the graph) & Tags (on the right)'
                ? 2
                : 0;
        return {
            branchLabelsAlignedToGraph: alignment === 2,
            combineLocalAndRemoteBranchLabels: !!this.getRenamedExtensionSetting('referenceLabels.combineLocalAndRemoteBranchLabels', 'combineLocalAndRemoteBranchLabels', true),
            tagLabelsOnRight: alignment !== 0
        };
    }
    get fetchAvatars() {
        return !!this.getRenamedExtensionSetting('repository.commits.fetchAvatars', 'fetchAvatars', false);
    }
    get initialLoadCommits() {
        return this.getRenamedExtensionSetting('repository.commits.initialLoad', 'initialLoadCommits', 300);
    }
    get loadMoreCommits() {
        return this.getRenamedExtensionSetting('repository.commits.loadMore', 'loadMoreCommits', 100);
    }
    get loadMoreCommitsAutomatically() {
        return !!this.getRenamedExtensionSetting('repository.commits.loadMoreAutomatically', 'loadMoreCommitsAutomatically', true);
    }
    get muteCommits() {
        return {
            commitsNotAncestorsOfHead: !!this.getRenamedExtensionSetting('repository.commits.mute.commitsThatAreNotAncestorsOfHead', 'muteCommitsThatAreNotAncestorsOfHead', false),
            mergeCommits: !!this.getRenamedExtensionSetting('repository.commits.mute.mergeCommits', 'muteMergeCommits', true)
        };
    }
    get commitOrder() {
        const ordering = this.getRenamedExtensionSetting('repository.commits.order', 'commitOrdering', 'date');
        return ordering === 'author-date'
            ? "author-date"
            : ordering === 'topo'
                ? "topo"
                : "date";
    }
    get showSignatureStatus() {
        return !!this.getRenamedExtensionSetting('repository.commits.showSignatureStatus', 'showSignatureStatus', false);
    }
    get fetchAndPrune() {
        return !!this.getRenamedExtensionSetting('repository.fetchAndPrune', 'fetchAndPrune', false);
    }
    get fetchAndPruneTags() {
        return !!this.config.get('repository.fetchAndPruneTags', false);
    }
    get includeCommitsMentionedByReflogs() {
        return !!this.getRenamedExtensionSetting('repository.includeCommitsMentionedByReflogs', 'includeCommitsMentionedByReflogs', false);
    }
    get onRepoLoad() {
        const branches = this.config.get('repository.onLoad.showSpecificBranches', []);
        return {
            scrollToHead: !!this.getRenamedExtensionSetting('repository.onLoad.scrollToHead', 'openRepoToHead', false),
            showCheckedOutBranch: !!this.getRenamedExtensionSetting('repository.onLoad.showCheckedOutBranch', 'showCurrentBranchByDefault', false),
            showSpecificBranches: Array.isArray(branches)
                ? branches.filter((branch) => typeof branch === 'string')
                : []
        };
    }
    get onlyFollowFirstParent() {
        return !!this.getRenamedExtensionSetting('repository.onlyFollowFirstParent', 'onlyFollowFirstParent', false);
    }
    get showCommitsOnlyReferencedByTags() {
        return !!this.getRenamedExtensionSetting('repository.showCommitsOnlyReferencedByTags', 'showCommitsOnlyReferencedByTags', true);
    }
    get showRemoteBranches() {
        return !!this.config.get('repository.showRemoteBranches', true);
    }
    get showRemoteHeads() {
        return !!this.config.get('repository.showRemoteHeads', true);
    }
    get showTags() {
        return !!this.getRenamedExtensionSetting('repository.showTags', 'showTags', true);
    }
    get showUncommittedChanges() {
        return !!this.getRenamedExtensionSetting('repository.showUncommittedChanges', 'showUncommittedChanges', true);
    }
    get showUntrackedFiles() {
        return !!this.getRenamedExtensionSetting('repository.showUntrackedFiles', 'showUntrackedFiles', true);
    }
    get signCommits() {
        return !!this.config.get('repository.sign.commits', false);
    }
    get signTags() {
        return !!this.config.get('repository.sign.tags', false);
    }
    get useMailmap() {
        return !!this.getRenamedExtensionSetting('repository.useMailmap', 'useMailmap', false);
    }
    get repoDropdownOrder() {
        return this.config.get('repositoryDropdownOrder', 'Full Path') === 'Name'
            ? 1
            : 0;
    }
    get retainContextWhenHidden() {
        return !!this.config.get('retainContextWhenHidden', true);
    }
    get showStatusBarItem() {
        return !!this.config.get('showStatusBarItem', true);
    }
    get tabIconColourTheme() {
        return this.config.get('tabIconColourTheme', 'colour') === 'grey'
            ? 1
            : 0;
    }
    get gitPaths() {
        const configValue = vscode.workspace.getConfiguration('git').get('path', null);
        if (configValue === null) {
            return [];
        }
        else if (typeof configValue === 'string') {
            return [configValue];
        }
        else if (Array.isArray(configValue)) {
            return configValue.filter((value) => typeof value === 'string');
        }
        else {
            return [];
        }
    }
    getKeybinding(section, defaultValue) {
        const configValue = this.config.get(section);
        if (typeof configValue === 'string' && Config.KEYBINDING_REGEXP.test(configValue)) {
            return configValue.substring(11).toLowerCase();
        }
        else {
            return defaultValue;
        }
    }
    getRenamedExtensionSetting(newSection, oldSection, defaultValue) {
        const newValues = this.config.inspect(newSection), oldValues = this.config.inspect(oldSection);
        if (typeof newValues !== 'undefined' && typeof newValues.workspaceValue !== 'undefined')
            return newValues.workspaceValue;
        if (typeof oldValues !== 'undefined' && typeof oldValues.workspaceValue !== 'undefined')
            return oldValues.workspaceValue;
        if (typeof newValues !== 'undefined' && typeof newValues.globalValue !== 'undefined')
            return newValues.globalValue;
        if (typeof oldValues !== 'undefined' && typeof oldValues.globalValue !== 'undefined')
            return oldValues.globalValue;
        return defaultValue;
    }
}
Config.KEYBINDING_REGEXP = /^CTRL\/CMD \+ [A-Z]$/;
function getConfig(repo) {
    return new Config(repo);
}
exports.getConfig = getConfig;
function mergeConfigObjects(base, user) {
    if (typeof base !== typeof user)
        return;
    let keys = Object.keys(base);
    for (let i = 0; i < keys.length; i++) {
        if (typeof base[keys[i]] === 'object') {
            if (typeof user[keys[i]] === 'object') {
                mergeConfigObjects(base[keys[i]], user[keys[i]]);
            }
        }
        else if (typeof user[keys[i]] === typeof base[keys[i]]) {
            base[keys[i]] = user[keys[i]];
        }
    }
}
//# sourceMappingURL=config.js.map