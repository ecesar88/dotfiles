"use strict";
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
exports.BufferedQueue = void 0;
const disposable_1 = require("./disposable");
class BufferedQueue extends disposable_1.Disposable {
    constructor(onItem, onChanges, bufferDuration = 1000) {
        super();
        this.queue = [];
        this.timeout = null;
        this.processing = false;
        this.bufferDuration = bufferDuration;
        this.onItem = onItem;
        this.onChanges = onChanges;
        this.registerDisposable(disposable_1.toDisposable(() => {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        }));
    }
    enqueue(item) {
        const itemIndex = this.queue.indexOf(item);
        if (itemIndex > -1) {
            this.queue.splice(itemIndex, 1);
        }
        this.queue.push(item);
        if (!this.processing) {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.run();
            }, this.bufferDuration);
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.processing = true;
            let item, changes = false;
            while (item = this.queue.shift()) {
                if (yield this.onItem(item)) {
                    changes = true;
                }
            }
            this.processing = false;
            if (changes)
                this.onChanges();
        });
    }
}
exports.BufferedQueue = BufferedQueue;
//# sourceMappingURL=bufferedQueue.js.map