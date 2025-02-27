"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definitionAfterInheritance_1 = require("./definitionAfterInheritance");
const tokenMatch_1 = require("./tokenMatch");
class RuleBuilder {
    constructor(languageDefinitions) {
        this.start = new Map();
        this.intermediate = new Map();
        this.final = new Map();
        for (const userLanguage of languageDefinitions) {
            this.start.set(userLanguage.language, userLanguage);
        }
    }
    get(languageId) {
        const stackResult = this.final.get(languageId);
        if (stackResult) {
            return stackResult;
        }
        const baseLanguage = this.start.get(languageId);
        if (baseLanguage) {
            const history = new Set();
            const scopesThisToBase = this.getAllScopes(baseLanguage, [], history);
            const scopeMap = new Map();
            // Set base map first then let extended languages overwrite
            for (let i = scopesThisToBase.length; i-- > 0;) {
                for (const scope of scopesThisToBase[i]) {
                    if (!scope.startsWith) {
                        console.error("Missing 'startsWith' property");
                        console.error(scope);
                        continue;
                    }
                    scopeMap.set(scope.startsWith, scope);
                }
            }
            const extendedLanguage = new definitionAfterInheritance_1.default(baseLanguage.language, scopeMap);
            this.intermediate.set(extendedLanguage.language, extendedLanguage);
            const tokens = new Map();
            for (const scope of scopeMap.values()) {
                if (!scope.startsWith) {
                    console.error("Missing 'startsWith' property");
                    console.error(scope);
                    continue;
                }
                if (scope.openSuffix && scope.closeSuffix) {
                    const openToken = new tokenMatch_1.default(scope.startsWith, scope.openSuffix);
                    tokens.set(openToken.type, openToken);
                    const closeToken = new tokenMatch_1.default(scope.startsWith, scope.closeSuffix);
                    tokens.set(closeToken.type, closeToken);
                }
                else {
                    const token = new tokenMatch_1.default(scope.startsWith);
                    tokens.set(token.type, token);
                }
            }
            this.final.set(languageId, tokens);
            return tokens;
        }
    }
    getAllScopes(userLanguageDefinition, allScopeDefinitions, history) {
        if (history.has(userLanguageDefinition)) {
            console.error("Cycle detected while parsing user languages: " +
                userLanguageDefinition.language + " => " +
                [...history.values()]);
            return allScopeDefinitions;
        }
        history.add(userLanguageDefinition);
        if (userLanguageDefinition.scopes) {
            allScopeDefinitions.push(userLanguageDefinition.scopes);
        }
        if (userLanguageDefinition.extends) {
            const parsedLanguage = this.intermediate.get(userLanguageDefinition.extends);
            if (parsedLanguage) {
                allScopeDefinitions.push([...parsedLanguage.scopes.values()]);
                return allScopeDefinitions;
            }
            const unParsedLanguage = this.start.get(userLanguageDefinition.extends);
            if (unParsedLanguage) {
                this.getAllScopes(unParsedLanguage, allScopeDefinitions, history);
            }
            else {
                console.error("Could not find user defined language: " + userLanguageDefinition.extends);
            }
        }
        return allScopeDefinitions;
    }
}
exports.RuleBuilder = RuleBuilder;
//# sourceMappingURL=ruleBuilder.js.map