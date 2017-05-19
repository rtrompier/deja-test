var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DejaTooltipService } from '.';
var DejaTooltipDirective = (function () {
    function DejaTooltipDirective(elementRef, tooltipService) {
        var _this = this;
        this.show = new EventEmitter();
        var element = elementRef.nativeElement;
        var leave$ = Observable.fromEvent(element, 'mouseleave');
        Observable.fromEvent(element, 'mouseenter')
            .flatMap(function (e) { return Observable.of(e).delay(200).takeUntil(leave$); })
            .subscribe(function () {
            tooltipService.params[_this.name] = {
                model: _this.model,
                ownerElement: elementRef,
                ownerAlignment: _this.ownerAlignment,
                dropdownAlignment: _this.dropdownAlignment,
            };
            _this.show.emit();
        });
    }
    return DejaTooltipDirective;
}());
__decorate([
    Input('tooltip-model'),
    __metadata("design:type", Object)
], DejaTooltipDirective.prototype, "model", void 0);
__decorate([
    Input('deja-tooltip'),
    __metadata("design:type", String)
], DejaTooltipDirective.prototype, "name", void 0);
__decorate([
    Input('tooltip-owner-alignment'),
    __metadata("design:type", String)
], DejaTooltipDirective.prototype, "ownerAlignment", void 0);
__decorate([
    Input('tooltip-alignment'),
    __metadata("design:type", String)
], DejaTooltipDirective.prototype, "dropdownAlignment", void 0);
__decorate([
    Output('tooltip-show'),
    __metadata("design:type", Object)
], DejaTooltipDirective.prototype, "show", void 0);
DejaTooltipDirective = __decorate([
    Directive({
        selector: '[deja-tooltip]',
    }),
    __metadata("design:paramtypes", [ElementRef, DejaTooltipService])
], DejaTooltipDirective);
export { DejaTooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map