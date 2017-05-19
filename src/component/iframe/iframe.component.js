var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
var DejaIFrameComponent = (function () {
    function DejaIFrameComponent() {
    }
    Object.defineProperty(DejaIFrameComponent.prototype, "sourceUrl", {
        set: function (url) {
            var iframeElement = this.iframe.nativeElement;
            if (url) {
                iframeElement.setAttribute('src', url);
            }
            else {
                iframeElement.removeAttribute('src');
            }
        },
        enumerable: true,
        configurable: true
    });
    return DejaIFrameComponent;
}());
__decorate([
    ViewChild('iframe'),
    __metadata("design:type", ElementRef)
], DejaIFrameComponent.prototype, "iframe", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaIFrameComponent.prototype, "sourceUrl", null);
DejaIFrameComponent = __decorate([
    Component({
        selector: 'deja-iframe',
        styleUrls: [
            './iframe.component.scss',
        ],
        template: '<iframe id="djframe" #iframe><ng-content></ng-content></iframe>'
    })
], DejaIFrameComponent);
export { DejaIFrameComponent };
//# sourceMappingURL=iframe.component.js.map