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
import { Observable, Subject } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
var DejaMouseDraggableDirective = (function () {
    function DejaMouseDraggableDirective(elementRef, dragDropService) {
        var _this = this;
        var element = elementRef.nativeElement;
        var leave$ = Observable.fromEvent(element, 'mouseleave');
        var mouseUp$ = Observable.fromEvent(element.ownerDocument, 'mouseup');
        Observable.fromEvent(element, 'mouseenter')
            .subscribe(function () {
            Observable.fromEvent(element, 'mousedown')
                .takeUntil(leave$)
                .filter(function (event) { return event.buttons === 1; })
                .subscribe(function (event) {
                var moveUp$ = new Subject();
                var target;
                var match = function (el) {
                    return el.tagName === _this.context.target.toUpperCase() || el.id === _this.context.target.substr(1) || el.hasAttribute(_this.context.target.substring(1, _this.context.target.length - 1));
                };
                var startDrag = function () {
                    var kill$ = Observable.merge(mouseUp$, moveUp$)
                        .first()
                        .do(function () {
                        dragDropService.dragCursor$.next(undefined);
                        dragDropService.dragging$.next(false);
                    });
                    Observable.fromEvent(element.ownerDocument, 'mousemove')
                        .takeUntil(kill$)
                        .subscribe(function (ev) {
                        if (target && ev.buttons === 1) {
                            var bounds = new Rect(element.getBoundingClientRect());
                            var position = new Position(ev.pageX, ev.pageY);
                            var html = bounds.containsPoint(position) ? target.innerHTML : undefined;
                            dragDropService.dragCursor$.next({
                                position: position,
                                html: html,
                                width: target.offsetWidth,
                                height: target.offsetHeight,
                                className: _this.context.className,
                                originalEvent: ev,
                            });
                        }
                        else {
                            moveUp$.next();
                        }
                        ev.preventDefault();
                        return false;
                    });
                    dragDropService.dragging$.next(true);
                };
                if (_this.context) {
                    if (_this.context.target) {
                        target = event.target;
                        while (target && !match(target)) {
                            target = target.parentElement;
                        }
                    }
                    else {
                        target = element;
                    }
                    if (target && _this.context.dragStart) {
                        var dragContext = _this.context.dragStart(target);
                        if (dragContext) {
                            if (dragContext.subscribe) {
                                dragContext
                                    .first()
                                    .subscribe(function (ddctx) {
                                    dragDropService.context = ddctx;
                                    if (ddctx) {
                                        startDrag();
                                    }
                                });
                                return;
                            }
                            else {
                                dragDropService.context = dragContext;
                                startDrag();
                            }
                        }
                    }
                }
            });
        });
    }
    Object.defineProperty(DejaMouseDraggableDirective.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    return DejaMouseDraggableDirective;
}());
__decorate([
    Input('deja-mouse-draggable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaMouseDraggableDirective.prototype, "context", null);
DejaMouseDraggableDirective = __decorate([
    Directive({
        selector: '[deja-mouse-draggable]',
    }),
    __metadata("design:paramtypes", [ElementRef, DejaMouseDragDropService])
], DejaMouseDraggableDirective);
export { DejaMouseDraggableDirective };
//# sourceMappingURL=mouse-draggable.directive.js.map