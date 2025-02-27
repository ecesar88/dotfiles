"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = [];
        this.event = (listener) => {
            this.listeners.push(listener);
            return {
                dispose: () => {
                    const removeListener = this.listeners.indexOf(listener);
                    if (removeListener > -1) {
                        this.listeners.splice(removeListener, 1);
                    }
                }
            };
        };
    }
    dispose() {
        this.listeners = [];
    }
    emit(event) {
        this.listeners.forEach((listener) => {
            try {
                listener(event);
            }
            catch (_) { }
        });
    }
    hasSubscribers() {
        return this.listeners.length > 0;
    }
    get subscribe() {
        return this.event;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event.js.map