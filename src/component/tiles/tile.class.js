import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
var DejaTile = (function () {
    function DejaTile(tile) {
        this.tile = tile;
        this.cutted$ = new BehaviorSubject(false);
        this.dragging$ = new BehaviorSubject(false);
        this.dropping$ = new BehaviorSubject(false);
        this.pressed$ = new BehaviorSubject(false);
        this.selected$ = new BehaviorSubject(false);
        this.expanded$ = new BehaviorSubject(false);
        this.hidden$ = new Subject();
        this.pending$ = new BehaviorSubject(false);
        this.deleted$ = new Subject();
        this.pixelBounds$ = new Subject();
        this.isTemporary = false;
        this.fading = false;
        this._isCutted = false;
        this._isDragging = false;
        this._isDropping = false;
        this._isPressed = false;
        this._isSelected = false;
        this._isExpanded = false;
        this._isHidden = false;
        this._isPending = false;
        this._model = tile;
        this._id = tile.id;
        this._percentBounds = tile.bounds;
        this._color = tile.color;
        if (tile.effects) {
            this.isCutted = tile.effects.cutted;
            this.isSelected = tile.effects.selected;
            this._isPending = tile.effects.pending;
            this.fading = tile.effects.fading;
        }
        if (!this._id) {
            this._id = '#' + DejaTile.currentId++;
        }
    }
    Object.defineProperty(DejaTile.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "pixelBounds", {
        get: function () {
            return this._pixelBounds;
        },
        set: function (value) {
            if (!Rect.equals(this._pixelBounds, value)) {
                this._pixelBounds = value;
                this.pixelBounds$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isCutted", {
        get: function () {
            return this._isCutted;
        },
        set: function (value) {
            if (this._isCutted !== value) {
                this._isCutted = value;
                this.cutted$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isDragging", {
        get: function () {
            return this._isDragging;
        },
        set: function (value) {
            if (this._isDragging !== value) {
                this._isDragging = value;
                this.dragging$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isDropping", {
        get: function () {
            return this._isDropping;
        },
        set: function (value) {
            if (this._isDropping !== value) {
                this._isDropping = value;
                this.dropping$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isPressed", {
        get: function () {
            return this._isPressed;
        },
        set: function (value) {
            if (this._isPressed !== value) {
                this._isPressed = value;
                this.pressed$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            if (this._isSelected !== value) {
                this._isSelected = value;
                this.selected$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isExpanded", {
        get: function () {
            return this._isExpanded;
        },
        set: function (value) {
            if (this._isExpanded !== value) {
                this._isExpanded = value;
                this.expanded$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isHidden", {
        get: function () {
            return this._isHidden;
        },
        set: function (value) {
            if (this._isHidden !== value) {
                this._isHidden = value;
                this.hidden$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isPending", {
        get: function () {
            return this._isPending;
        },
        set: function (value) {
            if (this._isPending !== value) {
                this._isPending = value;
                this.pending$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "type", {
        get: function () {
            return this.tile.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "percentBounds", {
        get: function () {
            return this._percentBounds;
        },
        set: function (bounds) {
            this._percentBounds = bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "templateModel", {
        get: function () {
            return this.tile.templateModel;
        },
        enumerable: true,
        configurable: true
    });
    DejaTile.prototype.makeId = function () {
        this._id = '#' + DejaTile.currentId++;
    };
    DejaTile.prototype.refreshBounds = function () {
        this.percentBounds = this.model.bounds;
    };
    DejaTile.prototype.equalsTo = function (tile) {
        if (this.model.id) {
            return this.model.id === tile.id;
        }
        else {
            return this.model === tile;
        }
    };
    DejaTile.prototype.clone = function () {
        return new DejaTile(this.toTileModel());
    };
    DejaTile.prototype.delete = function () {
        this.deleted$.next();
    };
    DejaTile.prototype.toTileModel = function () {
        return {
            id: this.id,
            type: this.type,
            bounds: this.percentBounds,
            color: this._color,
            templateModel: this.templateModel,
            effects: {
                pending: this.isPending || undefined,
                cutted: this.isCutted || undefined,
                selected: this.isSelected || undefined,
            }
        };
    };
    return DejaTile;
}());
export { DejaTile };
DejaTile.currentId = 0;
//# sourceMappingURL=tile.class.js.map