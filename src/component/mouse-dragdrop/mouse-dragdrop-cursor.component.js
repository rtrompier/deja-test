var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
var DejaMouseDragDropCursorComponent = (function () {
    function DejaMouseDragDropCursorComponent(elementRef, dragDropService) {
        var _this = this;
        this.dragDropService = dragDropService;
        this.position$ = new BehaviorSubject(undefined);
        this.cursor$ = new BehaviorSubject(undefined);
        var element = elementRef.nativeElement;
        Observable
            .from(this.position$)
            .subscribe(function (pos) {
            element.style.left = pos ? pos.left + "px" : '-1000px';
            element.style.top = pos ? pos.top + "px" : '-1000px';
        });
        var cursor$ = Observable.from(this.cursor$);
        cursor$
            .filter(function (dragCursor) { return !dragCursor; })
            .do(function (dragCursor) {
            if (_this._currentCursor) {
                _this.contentElement.style.opacity = '0';
                _this.iconElement.style.opacity = '0';
            }
            _this._currentCursor = dragCursor;
        })
            .delay(300)
            .subscribe(function () {
            _this.position$.next(null);
            element.style.display = 'none';
        });
        cursor$
            .filter(function (dragCursor) { return !!dragCursor; })
            .do(function (dragCursor) {
            element.style.display = '';
            _this.contentElement.style.opacity = '0';
            _this.iconElement.style.opacity = '0';
            _this._currentCursor = dragCursor;
        })
            .filter(function (dragCursor) { return !dragCursor.className || dragCursor.className !== 'hidden'; })
            .do(function (dragCursor) {
            if (!!dragCursor.html) {
                _this.contentElement.innerHTML = dragCursor.html;
                element.className = dragCursor.className;
                _this.contentElement.style.width = (dragCursor.width || 48) + "px";
                _this.contentElement.style.height = (dragCursor.height || 48) + "px";
            }
            else {
                _this.iconElement.style.opacity = '1';
            }
        })
            .delay(1)
            .subscribe(function (dragCursor) {
            if (!!dragCursor.html) {
                _this.contentElement.style.opacity = '1';
            }
        });
        Observable.from(this.dragDropService.dragCursor$)
            .subscribe(function (dragCursor) {
            if (!!dragCursor !== !!_this._dragCursor) {
                _this._dragCursor = dragCursor;
            }
            if (_this._dropCursor && _this._dragCursor) {
                dragCursor.className = _this._dropCursor.className || _this._dragCursor.className;
                dragCursor.html = _this._dropCursor.html || _this._dragCursor.html;
                dragCursor.width = _this._dropCursor.width || _this._dragCursor.width;
                dragCursor.height = _this._dropCursor.height || _this._dragCursor.height;
            }
            if (!!dragCursor !== !!_this._currentCursor || (dragCursor && !!dragCursor.html !== !!_this._currentCursor.html)) {
                _this.cursor$.next(dragCursor);
            }
            else if (dragCursor) {
                _this.position$.next(dragCursor.position);
            }
        });
        Observable.from(this.dragDropService.dropCursor$)
            .subscribe(function (dropCursor) {
            _this._dropCursor = dropCursor;
        });
    }
    Object.defineProperty(DejaMouseDragDropCursorComponent.prototype, "iconElement", {
        get: function () {
            return this.icon.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMouseDragDropCursorComponent.prototype, "contentElement", {
        get: function () {
            return this.content.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    return DejaMouseDragDropCursorComponent;
}());
__decorate([
    ViewChild('block'),
    __metadata("design:type", ElementRef)
], DejaMouseDragDropCursorComponent.prototype, "icon", void 0);
__decorate([
    ViewChild('content'),
    __metadata("design:type", ElementRef)
], DejaMouseDragDropCursorComponent.prototype, "content", void 0);
DejaMouseDragDropCursorComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'deja-mouse-dragdrop-cursor',
        styleUrls: [
            './mouse-dragdrop-cursor.component.scss',
        ],
        templateUrl: './mouse-dragdrop-cursor.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef, DejaMouseDragDropService])
], DejaMouseDragDropCursorComponent);
export { DejaMouseDragDropCursorComponent };
//# sourceMappingURL=mouse-dragdrop-cursor.component.js.map