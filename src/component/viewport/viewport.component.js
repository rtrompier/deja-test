var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ViewportDirection, ViewportMode, ViewPortService } from '../../common/core/item-list';
export var DejaViewPortScrollStyle;
(function (DejaViewPortScrollStyle) {
    DejaViewPortScrollStyle[DejaViewPortScrollStyle["scrollbar"] = 0] = "scrollbar";
    DejaViewPortScrollStyle[DejaViewPortScrollStyle["buttons"] = 1] = "buttons";
})(DejaViewPortScrollStyle || (DejaViewPortScrollStyle = {}));
var DejaViewPortComponent = (function () {
    function DejaViewPortComponent(changeDetectorRef, viewPort) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.viewPort = viewPort;
        this.hasUpButton = false;
        this.hasDownButton = false;
        this.isHorizontal = false;
        this.hasButtons = false;
        this.subscriptions = [];
        this.hasButtons$ = new Subject();
        this.buttonsStep = 20;
        this.scrollPosition = 0;
        this.subscriptions.push(Observable.fromEvent(window, 'resize')
            .debounceTime(5)
            .subscribe(function () {
            _this.viewPort.deleteSizeCache();
            _this.viewPort.refresh();
            _this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.push(viewPort.viewPort$
            .subscribe(function (viewPortResult) {
            if (viewPort.mode !== ViewportMode.disabled) {
                _this.vpItems = viewPortResult.visibleItems;
                _this.vpStartIndex = viewPortResult.startIndex;
                _this.vpEndIndex = viewPortResult.endIndex;
            }
            else {
                _this.vpStartIndex = 0;
                _this.vpEndIndex = 0;
            }
            if (_this.hasButtons) {
                _this.startOffset = _this.scrollPos - viewPortResult.beforeSize;
                _this.beforeSize = null;
                _this.afterSize = null;
                _this.hasUpButton = _this.scrollPos > 0;
                _this.hasDownButton = _this.scrollPos + viewPortResult.listSize < viewPortResult.beforeSize + viewPortResult.viewPortSize + viewPortResult.afterSize;
            }
            else {
                _this.startOffset = 0;
                _this.beforeSize = viewPortResult.beforeSize || null;
                _this.afterSize = viewPortResult.afterSize || null;
                _this.hasUpButton = false;
                _this.hasDownButton = false;
            }
            var scroll = function (vp) {
                if (!_this.hasButtons) {
                    if (_this.element) {
                        if (_this.isHorizontal) {
                            _this.element.scrollLeft = vp.scrollPos;
                        }
                        else {
                            _this.element.scrollTop = vp.scrollPos;
                        }
                        _this.scrollPosition = vp.scrollPos;
                    }
                }
                else {
                    _this.scrollPos = vp.scrollPos;
                    _this.startOffset = _this.scrollPos - vp.beforeSize;
                }
                _this.changeDetectorRef.markForCheck();
            };
            if (viewPortResult.scrollPos !== undefined) {
                var listItems = _this.element ? _this.element.getElementsByClassName('listitem') : [];
                var rebind = listItems.length !== viewPortResult.visibleItems.length;
                if (!rebind) {
                    scroll(viewPortResult);
                }
                else {
                    _this.changeDetectorRef.markForCheck();
                    Observable.timer(1)
                        .first()
                        .subscribe(function () { return scroll(viewPortResult); });
                }
            }
            else {
                _this.changeDetectorRef.markForCheck();
            }
        }));
        this.subscriptions.push(Observable.from(this.hasButtons$)
            .filter(function (value) { return _this.hasButtons !== value; })
            .do(function (value) { return _this.hasButtons = value; })
            .delay(1)
            .do(function (value) {
            if (value) {
                var mousedown$ = Observable.merge(Observable.fromEvent(_this.downButton.nativeElement, 'mousedown'), Observable.fromEvent(_this.upButton.nativeElement, 'mousedown'));
                var mouseup$_1 = Observable.merge(Observable.fromEvent(_this.downButton.nativeElement, 'mouseup'), Observable.fromEvent(_this.upButton.nativeElement, 'mouseup'), Observable.fromEvent(_this.downButton.nativeElement, 'mouseleave'), Observable.fromEvent(_this.upButton.nativeElement, 'mouseleave'));
                _this.mouseDown$Sub = mousedown$.subscribe(function (event) {
                    var target = event.currentTarget;
                    var direction = target.id === 'up' ? -1 : +1;
                    mouseup$_1.first()
                        .subscribe(function (upEvent) {
                        _this.scrollPos += direction * (upEvent.ctrlKey ? _this.clientSize : _this.buttonsStep);
                    });
                    Observable.timer(750)
                        .takeUntil(mouseup$_1)
                        .subscribe(function () {
                        Observable.interval(50)
                            .takeUntil(mouseup$_1)
                            .subscribe(function () {
                            _this.scrollPos += direction * (event.ctrlKey ? _this.clientSize : _this.buttonsStep * 2);
                        });
                    });
                });
                _this.mouseWheel$Sub = Observable
                    .fromEvent(_this.element, 'mousewheel')
                    .subscribe(function (event) {
                    _this.scrollPos = _this.scrollPos + event.deltaY;
                });
            }
            else {
                if (_this.mouseDown$Sub) {
                    _this.mouseDown$Sub.unsubscribe();
                    delete _this.mouseDown$Sub;
                }
                if (_this.mouseWheel$Sub) {
                    _this.mouseWheel$Sub.unsubscribe();
                    delete _this.mouseWheel$Sub;
                }
            }
            _this.scrollPos = 0;
        })
            .delay(1)
            .subscribe(function () { return _this.viewPort.refresh(); }));
    }
    Object.defineProperty(DejaViewPortComponent.prototype, "items", {
        set: function (items) {
            this._items = items ? items.map(function (item) { return ({
                model: item,
            }); }) : [];
            if (this.viewPort.mode === ViewportMode.disabled) {
                this.vpItems = this._items;
            }
            this.viewPort.items$.next(this._items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "scrollingStyle", {
        set: function (value) {
            var scrollingStyle = typeof value === 'string' ? DejaViewPortScrollStyle[value] : value;
            this.hasButtons$.next(scrollingStyle === DejaViewPortScrollStyle.buttons);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "direction", {
        set: function (value) {
            var direction = typeof value === 'string' ? ViewportDirection[value] : value;
            this.viewPort.direction$.next(direction);
            this.isHorizontal = direction === ViewportDirection.horizontal;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "itemSize", {
        get: function () {
            return this.viewPort.itemsSize;
        },
        set: function (value) {
            if (value) {
                this.viewPort.itemsSize$.next(+value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "wrapperElement", {
        set: function (element) {
            var _this = this;
            this.element = element.nativeElement;
            this.viewPort.element$.next(this.element);
            this.subscriptions.push(this.scroll$Sub = Observable.fromEvent(this.element, 'scroll')
                .map(function (event) { return event.target; })
                .map(function (target) { return Math.round(_this.isHorizontal ? target.scrollLeft : target.scrollTop); })
                .subscribe(function (scrollPos) {
                _this.viewPort.scrollPosition$.next(scrollPos);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "itemTemplate", {
        get: function () { return this.itemTemplateExternal || this.itemTemplateInternal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "clientSize", {
        get: function () {
            if (!this.element) {
                return 0;
            }
            return this.isHorizontal ? this.element.clientWidth : this.element.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "scrollPos", {
        get: function () {
            return this.scrollPosition;
        },
        set: function (value) {
            var scrollPos = Math.max(value, 0);
            this.scrollPosition = scrollPos;
            this.viewPort.scrollPosition$.next(scrollPos);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "viewportMode", {
        get: function () {
            return this.viewPort.mode;
        },
        set: function (mode) {
            this.viewPort.mode$.next(mode);
        },
        enumerable: true,
        configurable: true
    });
    DejaViewPortComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        if (this.mouseDown$Sub) {
            this.mouseDown$Sub.unsubscribe();
        }
        if (this.mouseWheel$Sub) {
            this.mouseWheel$Sub.unsubscribe();
        }
    };
    DejaViewPortComponent.prototype.refresh = function () {
        this.changeDetectorRef.markForCheck();
    };
    DejaViewPortComponent.prototype.refreshViewPort = function (item) {
        item.size = undefined;
        this.viewPort.refresh(item);
        this.changeDetectorRef.markForCheck();
    };
    DejaViewPortComponent.prototype.ensureVisible = function (item) {
        this.viewPort.ensureItem$.next(item);
    };
    DejaViewPortComponent.prototype.getCssSize = function (item) {
        var itemSize = this.getItemSize(item);
        return itemSize ? itemSize + "px" : 'auto';
    };
    DejaViewPortComponent.prototype.getItemSize = function (item) {
        if (this.viewPort.mode === ViewportMode.disabled) {
            return null;
        }
        else if (this.viewPort.mode === ViewportMode.fixed) {
            return this.itemSize;
        }
        else if (this.viewPort.mode === ViewportMode.auto) {
            return item.size || null;
        }
        else {
            return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : this.itemSize;
        }
    };
    return DejaViewPortComponent;
}());
__decorate([
    HostBinding('attr.hasUpBtn'),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "hasUpButton", void 0);
__decorate([
    HostBinding('attr.hasDownBtn'),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "hasDownButton", void 0);
__decorate([
    HostBinding('attr.horizontal'),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "isHorizontal", void 0);
__decorate([
    HostBinding('attr.buttons'),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "hasButtons", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "itemTemplateExternal", void 0);
__decorate([
    ContentChild('itemTemplate'),
    __metadata("design:type", Object)
], DejaViewPortComponent.prototype, "itemTemplateInternal", void 0);
__decorate([
    ViewChild('down'),
    __metadata("design:type", ElementRef)
], DejaViewPortComponent.prototype, "downButton", void 0);
__decorate([
    ViewChild('up'),
    __metadata("design:type", ElementRef)
], DejaViewPortComponent.prototype, "upButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaViewPortComponent.prototype, "items", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaViewPortComponent.prototype, "scrollingStyle", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaViewPortComponent.prototype, "direction", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaViewPortComponent.prototype, "itemSize", null);
__decorate([
    ViewChild('wrapper'),
    __metadata("design:type", ElementRef),
    __metadata("design:paramtypes", [ElementRef])
], DejaViewPortComponent.prototype, "wrapperElement", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaViewPortComponent.prototype, "viewportMode", null);
DejaViewPortComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [ViewPortService],
        selector: 'deja-viewport',
        styleUrls: ['./viewport.component.scss'],
        templateUrl: './viewport.component.html',
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, ViewPortService])
], DejaViewPortComponent);
export { DejaViewPortComponent };
//# sourceMappingURL=viewport.component.js.map