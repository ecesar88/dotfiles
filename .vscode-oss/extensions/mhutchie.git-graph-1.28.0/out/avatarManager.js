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
exports.AvatarManager = void 0;
const crypto = require("crypto");
const fs = requireWithFallback("original-fs", "fs");
const https = require("https");
const url = require("url");
const disposable_1 = require("./utils/disposable");
const event_1 = require("./utils/event");
class AvatarManager extends disposable_1.Disposable {
    constructor(dataSource, extensionState, logger) {
        super();
        this.remoteSourceCache = {};
        this.interval = null;
        this.githubTimeout = 0;
        this.gitLabTimeout = 0;
        this.dataSource = dataSource;
        this.extensionState = extensionState;
        this.logger = logger;
        this.avatarStorageFolder = this.extensionState.getAvatarStoragePath();
        this.avatarEventEmitter = new event_1.EventEmitter();
        this.avatars = this.extensionState.getAvatarCache();
        this.queue = new AvatarRequestQueue(() => {
            if (this.interval !== null)
                return;
            this.interval = setInterval(() => {
                this.fetchAvatarsInterval();
            }, 10000);
            this.fetchAvatarsInterval();
        });
        this.registerDisposables(disposable_1.toDisposable(() => {
            this.stopInterval();
        }), this.avatarEventEmitter);
    }
    stopInterval() {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
            this.remoteSourceCache = {};
        }
    }
    fetchAvatarImage(email, repo, remote, commits) {
        if (typeof this.avatars[email] !== 'undefined') {
            let t = (new Date()).getTime();
            if (this.avatars[email].timestamp < t - 1209600000 || (this.avatars[email].identicon && this.avatars[email].timestamp < t - 345600000)) {
                this.queue.add(email, repo, remote, commits, false);
            }
            this.emitAvatar(email).catch(() => {
                this.removeAvatarFromCache(email);
                this.queue.add(email, repo, remote, commits, true);
            });
        }
        else {
            this.queue.add(email, repo, remote, commits, true);
        }
    }
    getAvatarImage(email) {
        return new Promise((resolve) => {
            if (typeof this.avatars[email] !== 'undefined' && this.avatars[email].image !== null) {
                fs.readFile(this.avatarStorageFolder + '/' + this.avatars[email].image, (err, data) => {
                    resolve(err ? null : 'data:image/' + this.avatars[email].image.split('.')[1] + ';base64,' + data.toString('base64'));
                });
            }
            else {
                resolve(null);
            }
        });
    }
    get onAvatar() {
        return this.avatarEventEmitter.subscribe;
    }
    removeAvatarFromCache(email) {
        delete this.avatars[email];
        this.extensionState.removeAvatarFromCache(email);
    }
    clearCache() {
        this.avatars = {};
        this.extensionState.clearAvatarCache();
    }
    fetchAvatarsInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.hasItems()) {
                let avatarRequest = this.queue.takeItem();
                if (avatarRequest === null)
                    return;
                let remoteSource = yield this.getRemoteSource(avatarRequest);
                switch (remoteSource.type) {
                    case 'github':
                        this.fetchFromGithub(avatarRequest, remoteSource.owner, remoteSource.repo);
                        break;
                    case 'gitlab':
                        this.fetchFromGitLab(avatarRequest);
                        break;
                    default:
                        this.fetchFromGravatar(avatarRequest);
                }
            }
            else {
                this.stopInterval();
            }
        });
    }
    getRemoteSource(avatarRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.remoteSourceCache[avatarRequest.repo] === 'object') {
                return this.remoteSourceCache[avatarRequest.repo];
            }
            else {
                let remoteSource = { type: 'gravatar' };
                if (avatarRequest.remote !== null) {
                    let remoteUrl = yield this.dataSource.getRemoteUrl(avatarRequest.repo, avatarRequest.remote);
                    if (remoteUrl !== null) {
                        let match;
                        if ((match = remoteUrl.match(/^(https:\/\/github\.com\/|git@github\.com:)([^\/]+)\/(.*)\.git$/)) !== null) {
                            remoteSource = { type: 'github', owner: match[2], repo: match[3] };
                        }
                        else if (remoteUrl.startsWith('https://gitlab.com/') || remoteUrl.startsWith('git@gitlab.com:')) {
                            remoteSource = { type: 'gitlab' };
                        }
                    }
                }
                this.remoteSourceCache[avatarRequest.repo] = remoteSource;
                return remoteSource;
            }
        });
    }
    fetchFromGithub(avatarRequest, owner, repo) {
        let t = (new Date()).getTime();
        if (t < this.githubTimeout) {
            this.queue.addItem(avatarRequest, this.githubTimeout, false);
            this.fetchAvatarsInterval();
            return;
        }
        this.logger.log('Requesting Avatar for ' + maskEmail(avatarRequest.email) + ' from GitHub');
        const commitIndex = avatarRequest.commits.length < 5
            ? avatarRequest.commits.length - 1 - avatarRequest.attempts
            : Math.round((4 - avatarRequest.attempts) * 0.25 * (avatarRequest.commits.length - 1));
        let triggeredOnError = false;
        const onError = () => {
            if (!triggeredOnError) {
                triggeredOnError = true;
                this.githubTimeout = t + 300000;
                this.queue.addItem(avatarRequest, this.githubTimeout, false);
            }
        };
        https.get({
            hostname: 'api.github.com', path: '/repos/' + owner + '/' + repo + '/commits/' + avatarRequest.commits[commitIndex],
            headers: { 'User-Agent': 'vscode-git-graph' },
            agent: false, timeout: 15000
        }, (res) => {
            let respBody = '';
            res.on('data', (chunk) => { respBody += chunk; });
            res.on('end', () => __awaiter(this, void 0, void 0, function* () {
                if (res.headers['x-ratelimit-remaining'] === '0') {
                    this.githubTimeout = parseInt(res.headers['x-ratelimit-reset']) * 1000;
                    this.logger.log('GitHub API Rate Limit Reached - Paused fetching from GitHub until the Rate Limit is reset');
                }
                if (res.statusCode === 200) {
                    let commit = JSON.parse(respBody);
                    if (commit.author && commit.author.avatar_url) {
                        let img = yield this.downloadAvatarImage(avatarRequest.email, commit.author.avatar_url + '&size=162');
                        if (img !== null) {
                            this.saveAvatar(avatarRequest.email, img, false);
                        }
                        else {
                            this.logger.log('Failed to download avatar from GitHub for ' + maskEmail(avatarRequest.email));
                        }
                        return;
                    }
                }
                else if (res.statusCode === 403) {
                    this.queue.addItem(avatarRequest, this.githubTimeout, false);
                    return;
                }
                else if (res.statusCode === 422 && avatarRequest.commits.length > avatarRequest.attempts + 1 && avatarRequest.attempts < 4) {
                    this.queue.addItem(avatarRequest, 0, true);
                    return;
                }
                else if (res.statusCode >= 500) {
                    this.githubTimeout = t + 600000;
                    this.queue.addItem(avatarRequest, this.githubTimeout, false);
                    return;
                }
                this.fetchFromGravatar(avatarRequest);
            }));
            res.on('error', onError);
        }).on('error', onError);
    }
    fetchFromGitLab(avatarRequest) {
        let t = (new Date()).getTime();
        if (t < this.gitLabTimeout) {
            this.queue.addItem(avatarRequest, this.gitLabTimeout, false);
            this.fetchAvatarsInterval();
            return;
        }
        this.logger.log('Requesting Avatar for ' + maskEmail(avatarRequest.email) + ' from GitLab');
        let triggeredOnError = false;
        const onError = () => {
            if (!triggeredOnError) {
                triggeredOnError = true;
                this.gitLabTimeout = t + 300000;
                this.queue.addItem(avatarRequest, this.gitLabTimeout, false);
            }
        };
        https.get({
            hostname: 'gitlab.com', path: '/api/v4/users?search=' + avatarRequest.email,
            headers: { 'User-Agent': 'vscode-git-graph', 'Private-Token': 'w87U_3gAxWWaPtFgCcus' },
            agent: false, timeout: 15000,
        }, (res) => {
            let respBody = '';
            res.on('data', (chunk) => { respBody += chunk; });
            res.on('end', () => __awaiter(this, void 0, void 0, function* () {
                if (res.headers['ratelimit-remaining'] === '0') {
                    this.gitLabTimeout = parseInt(res.headers['ratelimit-reset']) * 1000;
                    this.logger.log('GitLab API Rate Limit Reached - Paused fetching from GitLab until the Rate Limit is reset');
                }
                if (res.statusCode === 200) {
                    let users = JSON.parse(respBody);
                    if (users.length > 0 && users[0].avatar_url) {
                        let img = yield this.downloadAvatarImage(avatarRequest.email, users[0].avatar_url);
                        if (img !== null) {
                            this.saveAvatar(avatarRequest.email, img, false);
                        }
                        else {
                            this.logger.log('Failed to download avatar from GitLab for ' + maskEmail(avatarRequest.email));
                        }
                        return;
                    }
                }
                else if (res.statusCode === 429) {
                    this.queue.addItem(avatarRequest, this.gitLabTimeout, false);
                    return;
                }
                else if (res.statusCode >= 500) {
                    this.gitLabTimeout = t + 600000;
                    this.queue.addItem(avatarRequest, this.gitLabTimeout, false);
                    return;
                }
                this.fetchFromGravatar(avatarRequest);
            }));
            res.on('error', onError);
        }).on('error', onError);
    }
    fetchFromGravatar(avatarRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Requesting Avatar for ' + maskEmail(avatarRequest.email) + ' from Gravatar');
            const hash = crypto.createHash('md5').update(avatarRequest.email.trim().toLowerCase()).digest('hex');
            let img = yield this.downloadAvatarImage(avatarRequest.email, 'https://secure.gravatar.com/avatar/' + hash + '?s=162&d=404'), identicon = false;
            if (img === null) {
                img = yield this.downloadAvatarImage(avatarRequest.email, 'https://secure.gravatar.com/avatar/' + hash + '?s=162&d=identicon');
                identicon = true;
            }
            if (img !== null) {
                this.saveAvatar(avatarRequest.email, img, identicon);
            }
            else {
                this.logger.log('No Avatar could be found for ' + maskEmail(avatarRequest.email));
            }
        });
    }
    downloadAvatarImage(email, imageUrl) {
        return (new Promise((resolve) => {
            const hash = crypto.createHash('md5').update(email).digest('hex');
            const imgUrl = url.parse(imageUrl);
            let completed = false;
            const complete = (fileName = null) => {
                if (!completed) {
                    completed = true;
                    resolve(fileName);
                }
            };
            https.get({
                hostname: imgUrl.hostname, path: imgUrl.path,
                headers: { 'User-Agent': 'vscode-git-graph' },
                agent: false, timeout: 15000
            }, (res) => {
                let imageBufferArray = [];
                res.on('data', (chunk) => { imageBufferArray.push(chunk); });
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        let format = res.headers['content-type'].split('/')[1];
                        fs.writeFile(this.avatarStorageFolder + '/' + hash + '.' + format, Buffer.concat(imageBufferArray), err => {
                            complete(err ? null : hash + '.' + format);
                        });
                    }
                    else {
                        complete();
                    }
                });
                res.on('error', complete);
            }).on('error', complete);
        })).catch(() => null);
    }
    emitAvatar(email) {
        return new Promise((resolve, reject) => {
            if (this.avatarEventEmitter.hasSubscribers()) {
                this.getAvatarImage(email).then((image) => {
                    if (image === null) {
                        reject();
                    }
                    else {
                        this.avatarEventEmitter.emit({
                            email: email,
                            image: image
                        });
                        resolve(true);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    saveAvatar(email, image, identicon) {
        if (typeof this.avatars[email] !== 'undefined') {
            if (!identicon || this.avatars[email].identicon) {
                this.avatars[email].image = image;
                this.avatars[email].identicon = identicon;
            }
            this.avatars[email].timestamp = (new Date()).getTime();
        }
        else {
            this.avatars[email] = { image: image, timestamp: (new Date()).getTime(), identicon: identicon };
        }
        this.extensionState.saveAvatar(email, this.avatars[email]);
        this.logger.log('Saved Avatar for ' + maskEmail(email));
        this.emitAvatar(email).then((sent) => this.logger.log(sent
            ? 'Sent Avatar for ' + maskEmail(email) + ' to the Git Graph View'
            : 'Avatar for ' + maskEmail(email) + ' is ready to be used the next time the Git Graph View is opened'), () => this.logger.log('Failed to Send Avatar for ' + maskEmail(email) + ' to the Git Graph View'));
    }
}
exports.AvatarManager = AvatarManager;
class AvatarRequestQueue {
    constructor(itemsAvailableCallback) {
        this.queue = [];
        this.itemsAvailableCallback = itemsAvailableCallback;
    }
    add(email, repo, remote, commits, immediate) {
        const existingRequest = this.queue.find((request) => request.email === email && request.repo === repo);
        if (existingRequest) {
            commits.forEach((commit) => {
                if (!existingRequest.commits.includes(commit)) {
                    existingRequest.commits.push(commit);
                }
            });
        }
        else {
            this.insertItem({
                email: email,
                repo: repo,
                remote: remote,
                commits: commits,
                checkAfter: immediate || this.queue.length === 0
                    ? 0
                    : this.queue[this.queue.length - 1].checkAfter + 1,
                attempts: 0
            });
        }
    }
    addItem(item, checkAfter, failedAttempt) {
        item.checkAfter = checkAfter;
        if (failedAttempt)
            item.attempts++;
        this.insertItem(item);
    }
    hasItems() {
        return this.queue.length > 0;
    }
    takeItem() {
        if (this.queue.length > 0 && this.queue[0].checkAfter < (new Date()).getTime())
            return this.queue.shift();
        return null;
    }
    insertItem(item) {
        var l = 0, r = this.queue.length - 1, c, prevLength = this.queue.length;
        while (l <= r) {
            c = l + r >> 1;
            if (this.queue[c].checkAfter <= item.checkAfter) {
                l = c + 1;
            }
            else {
                r = c - 1;
            }
        }
        this.queue.splice(l, 0, item);
        if (prevLength === 0)
            this.itemsAvailableCallback();
    }
}
function maskEmail(email) {
    return email.substring(0, email.indexOf('@')) + '@*****';
}
//# sourceMappingURL=avatarManager.js.map