"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const data = require("./themeData.json");
function createEditorTokens(config) {
    return config.editorTheme in data.editorThemes
        ? data.editorThemes[config.editorTheme]
        : data.editorThemes.oneDarkPro;
}
function configFactory(configuration) {
    let result = data.tokenColors.default;
    function uniqBy(baseArray, overrides) {
        const obj = {};
        baseArray
            .concat(overrides)
            .forEach(item => (obj[item.name + item.scope] = item));
        return Object.values(obj);
    }
    if (configuration.bold) {
        result = uniqBy(result, data.tokenColors.bold);
    }
    if (configuration.italic) {
        result = uniqBy(result, data.tokenColors.italic);
    }
    // Fill in color placeholders with concrete color values
    const colorObj = configuration.vivid
        ? data.textColors.vivid
        : data.textColors.classic;
    result.forEach(token => {
        if (token.settings.foreground) {
            if (token.settings.foreground in colorObj) {
                token.settings.foreground = colorObj[token.settings.foreground];
            }
        }
    });
    return {
        semanticTokenColors: {
            enumMember: {
                foreground: colorObj.fountainBlue
            },
            'variable.constant': {
                foreground: colorObj.whiskey
            },
            'variable.defaultLibrary': {
                foreground: colorObj.chalky
            }
        },
        tokenColors: result
    };
}
class Theme {
    constructor(configuration) {
        this.name = 'One Dark Pro';
        this.type = 'dark';
        this.semanticHighlighting = true;
        const themeTokens = configFactory(configuration);
        this.semanticTokenColors = themeTokens.semanticTokenColors;
        this.tokenColors = themeTokens.tokenColors;
        this.colors = createEditorTokens(configuration);
    }
}
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map