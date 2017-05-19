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
import { Observable } from 'rxjs/Rx';
import { UUID } from '../../common/core';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
var DejaDraggableDirective = (function () {
    function DejaDraggableDirective(elementRef, clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.draggable = null;
        this.draginfokey = 'draginfos';
        this.objectKey = 'object';
        this.elementKey = 'element';
        this.uuidKey = 'uuid';
        var element = elementRef.nativeElement;
        if (!clipboardService) {
            throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
        }
        Observable.fromEvent(element, 'dragstart')
            .filter(function () { return !!_this.context; })
            .subscribe(function (event) {
            var dragInfos = {};
            _this.dragdropid = new UUID().toString();
            dragInfos[_this.uuidKey] = _this.dragdropid;
            var object = (_this.context && _this.context.object) || element;
            dragInfos[_this.objectKey] = object;
            dragInfos[_this.elementKey] = element;
            _this.clipboardService.set(_this.draginfokey, dragInfos);
            if (object) {
                object.dragged = true;
            }
            if (_this.context && _this.context.dragstartcallback) {
                var e = event;
                e.dragInfo = dragInfos;
                e.dragObject = _this.context.object;
                e.dragElement = element;
                _this.context.dragstartcallback(e);
                if (e.defaultPrevented) {
                    event.preventDefault();
                }
            }
            Observable.fromEvent(element, 'dragend')
                .first()
                .subscribe(function (evt) {
                var dragEndInfos = _this.clipboardService.get(_this.draginfokey);
                var obj = dragEndInfos && dragEndInfos[_this.objectKey];
                if (obj) {
                    delete obj.dragged;
                }
                if (_this.context && _this.context.dragendcallback) {
                    var e = evt;
                    e.dragInfo = dragEndInfos;
                    e.dragObject = obj;
                    e.dragElement = dragEndInfos[_this.elementKey];
                    _this.context.dragendcallback(e);
                    if (e.defaultPrevented) {
                        evt.stopPropagation();
                    }
                }
                _this.clipboardService.clear();
                _this.dragdropid = undefined;
            });
        });
    }
    Object.defineProperty(DejaDraggableDirective.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
            this.draggable = !!value ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    return DejaDraggableDirective;
}());
__decorate([
    HostBinding('attr.dragdropid'),
    __metadata("design:type", Object)
], DejaDraggableDirective.prototype, "dragdropid", void 0);
__decorate([
    HostBinding('attr.draggable'),
    __metadata("design:type", Object)
], DejaDraggableDirective.prototype, "draggable", void 0);
__decorate([
    Input('deja-draggable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDraggableDirective.prototype, "context", null);
DejaDraggableDirective = __decorate([
    Directive({
        selector: '[deja-draggable]',
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, DejaClipboardService])
], DejaDraggableDirective);
export { DejaDraggableDirective };
//# sourceMappingURL=draggable.directive.js.map