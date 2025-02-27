"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs_1 = require("fs");
function writeFile(path, data) {
    return fs_1.promises.writeFile(path, JSON.stringify(data, null, 2));
}
exports.writeFile = writeFile;
//# sourceMappingURL=file.js.map