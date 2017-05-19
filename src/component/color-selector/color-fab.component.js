var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DejaColorFab } from './index';
var DejaColorFabComponent = (function () {
    function DejaColorFabComponent(el) {
        this.subscriptions = [];
        this.element = el.nativeElement;
    }
    Object.defineProperty(DejaColorFabComponent.prototype, "color", {
        set: function (colorFab) {
            var _this = this;
            this._colorFab = colorFab;
            if (colorFab) {
                var toogleAttribute_1 = function (attribute, value) {
                    if (value) {
                        _this.element.setAttribute(attribute, value.toString());
                    }
                    else {
                        _this.element.removeAttribute(attribute);
                    }
                };
                this.subscriptions.push(Observable.from(colorFab.active$).subscribe(function (value) { return toogleAttribute_1('active', value); }));
                this.subscriptions.push(Observable.combineLatest(colorFab.color$, colorFab.disabled$)
                    .map(function (_a) {
                    var color = _a[0], disabled = _a[1];
                    return color && disabled ? color.grayScale : color;
                })
                    .subscribe(function (color) { return _this.element.style.backgroundColor = color ? color.toHex() : ''; }));
            }
            else {
                this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
                this.subscriptions = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFabComponent.prototype, "tile", {
        get: function () {
            return this._colorFab;
        },
        enumerable: true,
        configurable: true
    });
    DejaColorFabComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return DejaColorFabComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", DejaColorFab),
    __metadata("design:paramtypes", [DejaColorFab])
], DejaColorFabComponent.prototype, "color", null);
DejaColorFabComponent = __decorate([
    Component({
        selector: 'deja-color-fab',
        styleUrls: [
            './color-fab.component.scss',
        ],
        template: '<ng-content></ng-content>',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaColorFabComponent);
export { DejaColorFabComponent };
//# sourceMappingURL=color-fab.component.js.map