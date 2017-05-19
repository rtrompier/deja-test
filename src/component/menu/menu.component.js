var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
var DejaMenuComponent = (function () {
    function DejaMenuComponent(elementRef) {
        this.elementRef = elementRef;
        this.buttonAlignment = 'left bottom';
        this.menuAlignment = 'left bottom';
        this.isVisible = false;
        this.ownerElement = this.elementRef.nativeElement;
    }
    Object.defineProperty(DejaMenuComponent.prototype, "containerElement", {
        get: function () {
            return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
        },
        enumerable: true,
        configurable: true
    });
    DejaMenuComponent.prototype.show = function (event) {
        this.ownerElement = (event && event.target) || this.elementRef.nativeElement;
        this.isVisible = true;
    };
    DejaMenuComponent.prototype.close = function () {
        this.isVisible = false;
    };
    return DejaMenuComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMenuComponent.prototype, "dropdownContainerId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaMenuComponent.prototype, "buttonAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaMenuComponent.prototype, "menuAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaMenuComponent.prototype, "isVisible", void 0);
__decorate([
    Input(),
    __metadata("design:type", HTMLElement)
], DejaMenuComponent.prototype, "ownerElement", void 0);
DejaMenuComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'deja-menu',
        styleUrls: [
            './menu.component.scss',
        ],
        templateUrl: './menu.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaMenuComponent);
export { DejaMenuComponent };
//# sourceMappingURL=menu.component.js.map