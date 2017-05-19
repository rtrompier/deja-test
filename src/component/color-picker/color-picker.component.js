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
import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Color } from '../../common/core/graphics/index';
var noop = function () { };
var DejaColorPickerComponent = (function () {
    function DejaColorPickerComponent(elementRef, _control) {
        this.elementRef = elementRef;
        this._control = _control;
        this.dropdownAlignment = 'left bottom';
        this.isOpen = false;
        this.colorhover = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._small = false;
        this._disabled = null;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(DejaColorPickerComponent.prototype, "containerElement", {
        get: function () {
            return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorPickerComponent.prototype, "small", {
        get: function () {
            return this._small;
        },
        set: function (value) {
            this._small = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorPickerComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (!Color.equals(value, this._value)) {
                this.writeValue(value);
                this.onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaColorPickerComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    DejaColorPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DejaColorPickerComponent.prototype.onClick = function (event) {
        if (this.disabled) {
            return;
        }
        var target = event.currentTarget;
        if (target.id !== 'colorbtn' || target.ownerDocument.activeElement.id !== 'colorbtn') {
            return;
        }
        this.isOpen = !this.isOpen;
        return false;
    };
    DejaColorPickerComponent.prototype.onColorChange = function (color) {
        this.isOpen = false;
        this.value = color;
    };
    return DejaColorPickerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaColorPickerComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaColorPickerComponent.prototype, "dropdownContainerId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaColorPickerComponent.prototype, "dropdownAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaColorPickerComponent.prototype, "isOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaColorPickerComponent.prototype, "colorhover", void 0);
__decorate([
    HostBinding('attr.disabled'),
    __metadata("design:type", Object)
], DejaColorPickerComponent.prototype, "_disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaColorPickerComponent.prototype, "small", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaColorPickerComponent.prototype, "disabled", null);
DejaColorPickerComponent = __decorate([
    Component({
        selector: 'deja-color-picker',
        styleUrls: [
            './color-picker.component.scss',
        ],
        templateUrl: './color-picker.component.html',
    }),
    __param(1, Self()), __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, NgControl])
], DejaColorPickerComponent);
export { DejaColorPickerComponent };
//# sourceMappingURL=color-picker.component.js.map