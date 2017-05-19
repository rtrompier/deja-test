var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaDropDownComponent } from '../dropdown/index';
import { DejaTooltipService } from './tooltip.service';
var DejaTooltipComponent = (function () {
    function DejaTooltipComponent(elementRef, tooltipService) {
        var _this = this;
        this.tooltipService = tooltipService;
        this.hide = new EventEmitter();
        var element = elementRef.nativeElement;
        var hide$ = Observable.from(this.hide)
            .do(function () { return _this.model = undefined; });
        Observable.fromEvent(element.ownerDocument, 'mousemove')
            .takeUntil(hide$)
            .debounceTime(20)
            .filter(function () { return _this.model; })
            .map(function (event) { return new Position(event.pageX, event.pageY); })
            .filter(function (position) {
            var containerElement = _this.dropdown.dropdownElement;
            var containerBounds = new Rect(containerElement.getBoundingClientRect());
            return !containerBounds.containsPoint(position);
        })
            .filter(function (position) {
            var ownerElement = _this.params.ownerElement.nativeElement || _this.params.ownerElement;
            var ownerRect = new Rect(ownerElement.getBoundingClientRect());
            return !ownerRect.containsPoint(position);
        })
            .delay(300)
            .subscribe(function () { return _this.hide.emit(); });
    }
    DejaTooltipComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];
        var model$ = this.params.model;
        if (model$.subscribe) {
            model$.subscribe(function (model) { return _this.model = model; }, function () { return _this.hide.emit(); });
        }
        else {
            var promise = this.params.model;
            if (promise.then) {
                promise
                    .then(function (model) { return _this.model = model; })
                    .catch(function () { return _this.hide.emit(); });
            }
            else {
                this.model = this.params.model;
            }
        }
    };
    return DejaTooltipComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaTooltipComponent.prototype, "containerElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaTooltipComponent.prototype, "name", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTooltipComponent.prototype, "hide", void 0);
__decorate([
    ViewChild('dropdown'),
    __metadata("design:type", DejaDropDownComponent)
], DejaTooltipComponent.prototype, "dropdown", void 0);
__decorate([
    ContentChild('tooltipTemplate'),
    __metadata("design:type", Object)
], DejaTooltipComponent.prototype, "tooltipTemplate", void 0);
DejaTooltipComponent = __decorate([
    Component({
        selector: 'deja-tooltip',
        templateUrl: 'tooltip.component.html',
        styleUrls: [
            './tooltip.component.scss',
        ],
    }),
    __metadata("design:paramtypes", [ElementRef, DejaTooltipService])
], DejaTooltipComponent);
export { DejaTooltipComponent };
//# sourceMappingURL=tooltip.component.js.map