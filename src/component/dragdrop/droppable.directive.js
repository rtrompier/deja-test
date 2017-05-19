var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, HostBinding, Input, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
var DejaDroppableDirective = (function () {
    function DejaDroppableDirective(elementRef, clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.droppable = null;
        this.draginfokey = 'draginfos';
        this.objectKey = 'object';
        this.droppedKey = 'dropped';
        this.elementKey = 'element';
        this._allEvents = false;
        if (!clipboardService) {
            throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
        }
        var element = elementRef.nativeElement;
        var dragDrop$ = new Subject();
        var kill$ = new Subject();
        var dragEnd$ = Observable.from(kill$).filter(function (value) { return !value; });
        Observable.from(dragDrop$)
            .distinctUntilChanged()
            .subscribe(function (value) {
            if (value === 'dragenter') {
                if (_this.context.dragentercallback) {
                    var event_1 = new CustomEvent('DejaDragEnter', { cancelable: false });
                    _this.context.dragentercallback(event_1);
                }
                Observable.fromEvent(element, 'drop')
                    .takeUntil(dragEnd$)
                    .subscribe(function (dropEvent) {
                    console.log('DejaDrop');
                    if (_this.context.dropcallback) {
                        var dragInfos = _this.clipboardService.get(_this.draginfokey);
                        if (dragInfos) {
                            var e = dropEvent;
                            e.dragInfo = dragInfos;
                            e.dragObject = dragInfos[_this.objectKey];
                            e.dragElement = element;
                            e.itsMe = dragInfos[_this.elementKey] === element;
                            _this.context.dropcallback(e);
                            if (e.defaultPrevented) {
                                e.dragInfo[_this.droppedKey] = true;
                                dropEvent.preventDefault();
                            }
                        }
                    }
                    dragDrop$.next('drop');
                });
                Observable.fromEvent(element, 'dragover')
                    .takeUntil(dragEnd$)
                    .subscribe(function (overEvent) {
                    if (!_this._allEvents && _this.lastTarget && _this.lastTarget === overEvent.target) {
                        if (_this.lastAccept) {
                            overEvent.preventDefault();
                        }
                        return;
                    }
                    if (_this.context.dragovercallback) {
                        var dragInfos = _this.clipboardService.get(_this.draginfokey);
                        if (dragInfos) {
                            var e = overEvent;
                            e.dragInfo = dragInfos;
                            e.dragObject = dragInfos[_this.objectKey];
                            e.dragElement = element;
                            e.itsMe = dragInfos[_this.elementKey] === element;
                            _this.context.dragovercallback(e);
                            _this.lastTarget = overEvent.target;
                            _this.lastAccept = e.defaultPrevented;
                            if (e.defaultPrevented) {
                                overEvent.preventDefault();
                            }
                        }
                    }
                });
            }
            else if (value === 'dragleave') {
                if (_this.context.dragleavecallback) {
                    var event_2 = new CustomEvent('DejaDragLeave', { cancelable: false });
                    _this.context.dragleavecallback(event_2);
                }
                kill$.next();
            }
            else {
                kill$.next();
            }
        });
        Observable.fromEvent(element, 'dragenter')
            .filter(function () { return !!_this.context; })
            .filter(function () { return !!_this.clipboardService.get(_this.draginfokey); })
            .subscribe(function () { return dragDrop$.next('dragenter'); });
        Observable.fromEvent(element, 'dragleave')
            .filter(function () { return !!_this.context; })
            .filter(function () { return !!_this.clipboardService.get(_this.draginfokey); })
            .subscribe(function (leaveEvent) {
            var bounds = element.getBoundingClientRect();
            var inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
            if (!inside) {
                dragDrop$.next('dragleave');
            }
        });
    }
    Object.defineProperty(DejaDroppableDirective.prototype, "allEvents", {
        set: function (value) {
            this._allEvents = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDroppableDirective.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
            this.droppable = !!value ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    return DejaDroppableDirective;
}());
__decorate([
    Input('continous-dragover'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDroppableDirective.prototype, "allEvents", null);
__decorate([
    HostBinding('attr.draggable'),
    __metadata("design:type", Object)
], DejaDroppableDirective.prototype, "droppable", void 0);
__decorate([
    Input('deja-droppable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDroppableDirective.prototype, "context", null);
DejaDroppableDirective = __decorate([
    Directive({
        selector: '[deja-droppable]',
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, DejaClipboardService])
], DejaDroppableDirective);
export { DejaDroppableDirective };
//# sourceMappingURL=droppable.directive.js.map