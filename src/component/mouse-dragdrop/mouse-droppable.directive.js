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
import { Observable } from 'rxjs/Rx';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
var DejaMouseDroppableDirective = (function () {
    function DejaMouseDroppableDirective(elementRef, dragDropService) {
        var _this = this;
        var element = elementRef.nativeElement;
        var dragging$ = Observable.from(dragDropService.dragging$);
        var kill$ = dragging$
            .filter(function (value) { return !value; });
        dragging$
            .filter(function (value) { return value; })
            .subscribe(function () {
            kill$
                .first()
                .subscribe(function () {
                if (_this._dragContext) {
                    if (_this.context && _this.context.drop) {
                        _this.context.drop(_this._dragContext);
                    }
                    _this._dragContext = undefined;
                }
                dragDropService.dropCursor$.next(undefined);
            });
            Observable.from(dragDropService.dragCursor$)
                .takeUntil(kill$)
                .subscribe(function (dragCursor) {
                var bounds = new Rect(element.getBoundingClientRect());
                if (_this.context && dragCursor) {
                    var _a = dragCursor.originalEvent, pageX = _a.pageX, pageY = _a.pageY;
                    if (bounds.containsPoint(new Position(pageX, pageY))) {
                        if (!_this._dragContext) {
                            _this._dragContext = dragDropService.context;
                            if (_this.context.dragEnter) {
                                var dropContext = _this.context.dragEnter(_this._dragContext, dragCursor);
                                if (dropContext) {
                                    var dropContextObs = dropContext;
                                    if (dropContextObs.subscribe) {
                                        dropContextObs
                                            .first()
                                            .subscribe(function (cursor) {
                                            dragDropService.dropCursor$.next(cursor);
                                        });
                                        return;
                                    }
                                    else {
                                        dragDropService.dropCursor$.next(dropContext);
                                    }
                                }
                            }
                        }
                        else if (_this.context.dragOver) {
                            var overContext = _this.context.dragOver(_this._dragContext, dragCursor);
                            if (overContext) {
                                dragDropService.dropCursor$.next(overContext);
                            }
                        }
                    }
                    else if (_this._dragContext) {
                        if (_this.context && _this.context.dragLeave) {
                            _this.context.dragLeave(_this._dragContext);
                        }
                        _this._dragContext = undefined;
                        dragDropService.dropCursor$.next(undefined);
                    }
                }
            });
        });
    }
    Object.defineProperty(DejaMouseDroppableDirective.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    return DejaMouseDroppableDirective;
}());
__decorate([
    Input('deja-mouse-droppable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaMouseDroppableDirective.prototype, "context", null);
DejaMouseDroppableDirective = __decorate([
    Directive({
        selector: '[deja-mouse-droppable]',
    }),
    __metadata("design:paramtypes", [ElementRef, DejaMouseDragDropService])
], DejaMouseDroppableDirective);
export { DejaMouseDroppableDirective };
//# sourceMappingURL=mouse-droppable.directive.js.map