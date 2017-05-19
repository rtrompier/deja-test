var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Color } from '../../common/core/graphics/color';
import { DejaEditableDirective } from '../content-editable';
var DejaTileGroupComponent = DejaTileGroupComponent_1 = (function () {
    function DejaTileGroupComponent() {
        var _this = this;
        this.close = new EventEmitter();
        this.titleChanged = new EventEmitter();
        this.backgroundColor = DejaTileGroupComponent_1.defaultColor;
        this.foregroundColor = null;
        this.edit$ = new Subject();
        this._designMode = false;
        Observable.from(this.edit$)
            .filter(function () { return _this._designMode; })
            .debounceTime(100)
            .subscribe(function () { return _this.title.edit(true); });
    }
    Object.defineProperty(DejaTileGroupComponent.prototype, "color", {
        set: function (color) {
            this.backgroundColor = color || DejaTileGroupComponent_1.defaultColor;
            this.foregroundColor = Color.parse(this.backgroundColor).bestTextColor.toHex();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTileGroupComponent.prototype, "designMode", {
        get: function () {
            return this._designMode;
        },
        set: function (value) {
            this._designMode = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    return DejaTileGroupComponent;
}());
DejaTileGroupComponent.defaultColor = 'rgb(38, 50, 56)';
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "model", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "close", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "titleChanged", void 0);
__decorate([
    HostBinding('style.background-color'),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "backgroundColor", void 0);
__decorate([
    HostBinding('style.color'),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "foregroundColor", void 0);
__decorate([
    ViewChild(DejaEditableDirective),
    __metadata("design:type", DejaEditableDirective)
], DejaTileGroupComponent.prototype, "title", void 0);
__decorate([
    HostBinding('attr.designMode'),
    __metadata("design:type", Object)
], DejaTileGroupComponent.prototype, "_designMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTileGroupComponent.prototype, "color", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaTileGroupComponent.prototype, "designMode", null);
DejaTileGroupComponent = DejaTileGroupComponent_1 = __decorate([
    Component({
        selector: 'deja-tile-group',
        styleUrls: [
            './tile-group.component.scss',
        ],
        templateUrl: './tile-group.component.html',
    }),
    __metadata("design:paramtypes", [])
], DejaTileGroupComponent);
export { DejaTileGroupComponent };
var DejaTileGroupComponent_1;
//# sourceMappingURL=tile-group.component.js.map