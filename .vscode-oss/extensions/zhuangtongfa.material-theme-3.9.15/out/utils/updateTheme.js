"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheme = void 0;
const path_1 = require("path");
const themes_1 = require("../themes");
const _1 = require("./");
function updateTheme() {
    const THEME_PATH = path_1.join(__dirname, '../../', 'themes', 'OneDark-Pro.json');
    const theme = themes_1.generateTheme.fromSettings();
    _1.writeFile(THEME_PATH, theme).then(_1.promptToReload);
}
exports.updateTheme = updateTheme;
//# sourceMappingURL=updateTheme.js.map