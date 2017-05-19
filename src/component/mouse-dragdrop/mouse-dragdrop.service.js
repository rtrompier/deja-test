var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
var DejaMouseDragDropService = (function () {
    function DejaMouseDragDropService() {
        var _this = this;
        this._context = {};
        this._isDragging = false;
        this.dragCursor$ = new BehaviorSubject(undefined);
        this.dropCursor$ = new Subject();
        this.dragging$ = new BehaviorSubject(false);
        this.dragging$
            .do(function (value) { return _this._isDragging = value; })
            .filter(function (value) { return !value; })
            .subscribe(function () { return _this._context = {}; });
    }
    Object.defineProperty(DejaMouseDragDropService.prototype, "isDragging", {
        get: function () {
            return this._isDragging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMouseDragDropService.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    return DejaMouseDragDropService;
}());
DejaMouseDragDropService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DejaMouseDragDropService);
export { DejaMouseDragDropService };
//# sourceMappingURL=mouse-dragdrop.service.js.map