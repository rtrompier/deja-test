var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input } from '@angular/core';
import { Rect } from '../../common/core/graphics';
var DejaTilePositionDirective = (function () {
    function DejaTilePositionDirective(el) {
        this.element = el.nativeElement;
        this.element.style.display = 'none';
    }
    Object.defineProperty(DejaTilePositionDirective.prototype, "bounds", {
        set: function (rect) {
            if (rect) {
                var left = rect.left, top_1 = rect.top, width = rect.width, height = rect.height;
                this.element.style.left = left + "px";
                this.element.style.top = top_1 + "px";
                this.element.style.width = width + "px";
                this.element.style.height = height + "px";
                this.element.style.display = 'block';
            }
            else {
                this.element.style.display = 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    return DejaTilePositionDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Rect),
    __metadata("design:paramtypes", [Rect])
], DejaTilePositionDirective.prototype, "bounds", null);
DejaTilePositionDirective = __decorate([
    Directive({
        selector: '[deja-tile-position]',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaTilePositionDirective);
export { DejaTilePositionDirective };
//# sourceMappingURL=tile-position.directive.js.map