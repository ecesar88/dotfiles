"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangelogWebview = void 0;
const Webview_1 = require("./Webview");
const fs = require("fs");
const path = require("path");
const marked = require("marked");
class ChangelogWebview extends Webview_1.WebviewController {
    get id() {
        return 'Onedark Pro.Changelog';
    }
    get title() {
        return 'Onedark Pro theme Changelog';
    }
    get content() {
        const content = fs.readFileSync(path.join(__dirname, '../../', 'CHANGELOG.md'), 'utf-8');
        return marked(content);
    }
}
exports.ChangelogWebview = ChangelogWebview;
//# sourceMappingURL=Changelog.js.map