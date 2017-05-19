var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ContentChild, EventEmitter, HostBinding, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
var noop = function () { };
var DejaChipsComponent = (function () {
    function DejaChipsComponent(_control) {
        this._control = _control;
        this.readonly = false;
        this.close = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._disabled = null;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(DejaChipsComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (value != null && "" + value !== 'false') || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaChipsComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaChipsComponent.prototype, "value", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this.writeValue(value);
            this.onChangeCallback(value);
        },
        enumerable: true,
        configurable: true
    });
    DejaChipsComponent.prototype.writeValue = function (value) {
        this._items = value;
    };
    DejaChipsComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaChipsComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    Object.defineProperty(DejaChipsComponent.prototype, "itemTemplate", {
        get: function () {
            return this.itemTemplateExternal || this.itemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    DejaChipsComponent.prototype.getTextValue = function (value) {
        if (!value) {
            return '';
        }
        else {
            if (this.textField && value[this.textField]) {
                return value[this.textField];
            }
            else if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            }
            else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    };
    DejaChipsComponent.prototype.onClose = function (item, index) {
        this.items.splice(index, 1);
        this.onChangeCallback(this.items);
        this.close.emit(item);
    };
    return DejaChipsComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaChipsComponent.prototype, "_items", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaChipsComponent.prototype, "textField", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaChipsComponent.prototype, "itemTemplateExternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaChipsComponent.prototype, "readonly", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaChipsComponent.prototype, "close", void 0);
__decorate([
    HostBinding('attr.disabled'),
    __metadata("design:type", Object)
], DejaChipsComponent.prototype, "_disabled", void 0);
__decorate([
    ContentChild('columnHeaderTemplate'),
    __metadata("design:type", Object)
], DejaChipsComponent.prototype, "itemTemplateInternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaChipsComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaChipsComponent.prototype, "items", null);
DejaChipsComponent = __decorate([
    Component({
        selector: 'deja-chips',
        styleUrls: [
            './chips.component.scss',
        ],
        templateUrl: './chips.component.html',
    }),
    __param(0, Self()), __param(0, Optional()),
    __metadata("design:paramtypes", [NgControl])
], DejaChipsComponent);
export { DejaChipsComponent };
//# sourceMappingURL=chips.component.js.map