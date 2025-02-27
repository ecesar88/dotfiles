"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Checks if tag is is comparable with Match type (has opening and matching tags)
function isTagPairValid(pair) {
    return (!!pair.closing &&
        !!pair.opening &&
        pair.opening.end !== undefined &&
        pair.opening.start !== undefined);
}
function findMatchingTag(tagsList, position, matchFromName, matchFromAttributes) {
    for (let i = tagsList.length - 1; i >= 0; i--) {
        if (!isTagPairValid(tagsList[i])) {
            continue;
        }
        const openingStart = tagsList[i].opening.start;
        const openingEnd = tagsList[i].opening.end;
        const closingStart = tagsList[i].closing.start;
        const closingEnd = tagsList[i].closing.end;
        const positionInName = (position > openingStart &&
            position <= openingStart + tagsList[i].opening.name.length + 1) ||
            (position > closingStart + 1 &&
                position <= closingStart + tagsList[i].closing.name.length + 2);
        const positionInAttributes = !positionInName &&
            ((position > openingStart && position < openingEnd) ||
                (position > closingStart && position < closingEnd));
        if ((positionInName && matchFromName) || (positionInAttributes && matchFromAttributes)) {
            return {
                attributeNestingLevel: tagsList[i].attributeNestingLevel,
                opening: tagsList[i].opening,
                closing: tagsList[i].closing
            };
        }
    }
    return undefined;
}
exports.findMatchingTag = findMatchingTag;
function getTagsForPosition(tagsList, position) {
    return tagsList.filter((pair) => isTagPairValid(pair) && position > pair.opening.start && position < pair.closing.end);
}
exports.getTagsForPosition = getTagsForPosition;
function getTagForPosition(tagsList, position, includeSelfClosing = false) {
    return getTagsForPosition(tagsList, position)
        .filter((tag) => tag.opening !== tag.closing || includeSelfClosing)
        .slice(-1)[0];
}
exports.getTagForPosition = getTagForPosition;
//# sourceMappingURL=tagMatcher.js.map