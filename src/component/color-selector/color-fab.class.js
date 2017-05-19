import { BehaviorSubject } from 'rxjs/Rx';
var DejaColorFab = (function () {
    function DejaColorFab(_color, _disabled, _active) {
        this._color = _color;
        this._disabled = _disabled;
        this._active = _active;
        this.color$ = new BehaviorSubject(_color);
        this.disabled$ = new BehaviorSubject(_disabled);
        this.active$ = new BehaviorSubject(_active);
    }
    Object.defineProperty(DejaColorFab.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this.color$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFab.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this.disabled$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFab.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this.active$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    return DejaColorFab;
}());
export { DejaColorFab };
//# sourceMappingURL=color-fab.class.js.map