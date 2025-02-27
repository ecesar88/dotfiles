"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDisposable = exports.Disposable = void 0;
class Disposable {
    constructor() {
        this.disposables = [];
    }
    dispose() {
        this.disposables.forEach((disposable) => disposable.dispose());
        this.disposables = [];
    }
    registerDisposable(disposable) {
        this.disposables.push(disposable);
    }
    registerDisposables(...disposables) {
        this.disposables.push(...disposables);
    }
}
exports.Disposable = Disposable;
function toDisposable(fn) {
    return {
        dispose: fn
    };
}
exports.toDisposable = toDisposable;
//# sourceMappingURL=disposable.js.map