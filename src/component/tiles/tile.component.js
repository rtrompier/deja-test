var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter } from '@angular/core';
import { Component, ElementRef, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DejaTile } from './index';
var DejaTileComponent = (function () {
    function DejaTileComponent(el) {
        this.modelChanged = new EventEmitter();
        this.close = new EventEmitter();
        this.subscriptions = [];
        this.element = el.nativeElement;
        this.element.setAttribute('hidden', '0');
    }
    Object.defineProperty(DejaTileComponent.prototype, "tile", {
        get: function () {
            return this._tile;
        },
        set: function (tile) {
            var _this = this;
            this._tile = tile;
            if (tile) {
                var toogleAttribute_1 = function (attribute, value) {
                    if (value) {
                        _this.element.setAttribute(attribute, value.toString());
                    }
                    else {
                        _this.element.removeAttribute(attribute);
                    }
                };
                if (tile.fading) {
                    this.element.setAttribute('fading', '0');
                }
                this.subscriptions.push(Observable.from(tile.pixelBounds$)
                    .first()
                    .filter(function () { return tile.fading; })
                    .do(function () { return _this.element.setAttribute('fading', '1'); })
                    .delay(200)
                    .subscribe(function () {
                    _this.element.removeAttribute('fading');
                }));
                this.subscriptions.push(Observable.from(tile.pixelBounds$)
                    .subscribe(function (bounds) {
                    if (!tile.isHidden) {
                        _this.element.removeAttribute('hidden');
                    }
                    _this.element.style.left = bounds.left + "px";
                    _this.element.style.top = bounds.top + "px";
                    _this.element.style.width = bounds.width + "px";
                    _this.element.style.height = bounds.height + "px";
                }));
                this.subscriptions.push(Observable.from(tile.pressed$).subscribe(function (value) { return toogleAttribute_1('pressed', value); }));
                this.subscriptions.push(Observable.from(tile.selected$).subscribe(function (value) { return toogleAttribute_1('selected', value); }));
                this.subscriptions.push(Observable.from(tile.dragging$).subscribe(function (value) { return toogleAttribute_1('drag', value); }));
                this.subscriptions.push(Observable.from(tile.dropping$).subscribe(function (value) { return toogleAttribute_1('drop', value); }));
                this.subscriptions.push(Observable.from(tile.cutted$).subscribe(function (value) { return toogleAttribute_1('cutted', value); }));
                this.subscriptions.push(Observable.from(tile.expanded$).subscribe(function (value) { return toogleAttribute_1('expanded', value); }));
                this.subscriptions.push(Observable.from(tile.deleted$).subscribe(function () { return _this.element.remove(); }));
                var tooogleHide$ = Observable.from(tile.hidden$)
                    .do(function (value) {
                    toogleAttribute_1('hidden', value ? '1' : '2');
                });
                this.subscriptions.push(tooogleHide$
                    .debounceTime(1000)
                    .filter(function (value) { return value; })
                    .subscribe(function () { return _this.element.setAttribute('hidden', '0'); }));
                this.subscriptions.push(tooogleHide$
                    .debounceTime(1)
                    .filter(function (value) { return !value; })
                    .subscribe(function () { return _this.element.removeAttribute('hidden'); }));
            }
            else {
                this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
                this.subscriptions = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaTileComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return DejaTileComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaTileComponent.prototype, "template", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaTileComponent.prototype, "designMode", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTileComponent.prototype, "modelChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTileComponent.prototype, "close", void 0);
__decorate([
    Input(),
    __metadata("design:type", DejaTile),
    __metadata("design:paramtypes", [DejaTile])
], DejaTileComponent.prototype, "tile", null);
DejaTileComponent = __decorate([
    Component({
        selector: 'deja-tile',
        styleUrls: [
            './tile.component.scss',
        ],
        templateUrl: './tile.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaTileComponent);
export { DejaTileComponent };
//# sourceMappingURL=tile.component.js.map