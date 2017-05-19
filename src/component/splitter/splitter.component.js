var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer, ViewEncapsulation } from '@angular/core';
var gutterSize = 'gutterSize';
var disabled = 'disabled';
var DejaSplitterComponent = (function () {
    function DejaSplitterComponent(cdRef, elementRef, renderer) {
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.direction = 'horizontal';
        this.gutterSize = 10;
        this.disabled = false;
        this.dragStart = new EventEmitter(false);
        this.dragProgress = new EventEmitter(false);
        this.dragEnd = new EventEmitter(false);
        this.minPercent = 0.3;
        this.areas = [];
        this.isDragging = false;
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.eventsDragFct = [];
    }
    Object.defineProperty(DejaSplitterComponent.prototype, "styleFlexDirection", {
        get: function () {
            return this.direction === 'horizontal' ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "styleWidth", {
        get: function () {
            return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "styleHeight", {
        get: function () {
            return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "nbGutters", {
        get: function () {
            return this.areas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    DejaSplitterComponent.prototype.ngOnChanges = function (changes) {
        if (changes[gutterSize] || changes[disabled]) {
            this.refresh();
        }
    };
    DejaSplitterComponent.prototype.ngOnDestroy = function () {
        this.stopDragging();
    };
    DejaSplitterComponent.prototype.addArea = function (component, orderUser, sizeUser, minPixel) {
        this.areas.push({
            component: component,
            orderUser: orderUser,
            order: -1,
            sizeUser: sizeUser,
            size: -1,
            minPixel: minPixel,
        });
        this.refresh();
    };
    DejaSplitterComponent.prototype.updateArea = function (component, orderUser, sizeUser, minPixel) {
        var item = this.areas.find(function (a) { return a.component === component; });
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            this.refresh();
        }
    };
    DejaSplitterComponent.prototype.removeArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            var index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach(function (a, i) { return a.order = i * 2; });
            this.refresh();
        }
    };
    DejaSplitterComponent.prototype.startDragging = function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        var areaA = this.areas.find(function (a) { return a.order === gutterOrder - 1; });
        var areaB = this.areas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        var prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        var start = {
            x: startEvent.screenX,
            y: startEvent.screenY,
        };
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mousemove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchmove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mouseup', function () { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchend', function () { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchcancel', function () { return _this.stopDragging(); }));
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this.notify('start');
    };
    DejaSplitterComponent.prototype.refresh = function () {
        var _this = this;
        this.stopDragging();
        var nbCorrectOrder = this.areas.filter(function (a) { return a.orderUser && !isNaN(a.orderUser); }).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort(function (a, b) { return +a.orderUser - +b.orderUser; });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        var totalSize = this.areas.map(function (a) { return a.sizeUser; }).reduce(function (acc, s) { return acc + s; }, 0);
        var nbCorrectSize = this.areas.filter(function (a) { return a.sizeUser && !isNaN(a.sizeUser) && a.sizeUser >= _this.minPercent; }).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== this.areas.length) {
            var size_1 = Number((100 / this.areas.length).toFixed(3));
            this.areas.forEach(function (a) { return a.size = size_1; });
        }
        else {
            this.areas.forEach(function (a) { return a.size = Number(a.sizeUser); });
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    DejaSplitterComponent.prototype.refreshStyleSizes = function () {
        var f = this.gutterSize * this.nbGutters / this.areas.length;
        this.areas.forEach(function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); });
    };
    DejaSplitterComponent.prototype.dragEvent = function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        var end = {
            x: event.screenX,
            y: event.screenY,
        };
        this.drag(start, end, areaA, areaB);
    };
    DejaSplitterComponent.prototype.drag = function (start, end, areaA, areaB) {
        var offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        var newSizePixelA = this.areaASize - offsetPixel;
        var newSizePixelB = this.areaBSize + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        var newSizePercentA = newSizePixelA / this.containerSize * 100;
        var newSizePercentB = newSizePixelB / this.containerSize * 100;
        if (newSizePercentA <= this.minPercent) {
            newSizePercentA = this.minPercent;
            newSizePercentB = areaA.size + areaB.size - this.minPercent;
        }
        else if (newSizePercentB <= this.minPercent) {
            newSizePercentB = this.minPercent;
            newSizePercentA = areaA.size + areaB.size - this.minPercent;
        }
        else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }
        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;
        this.refreshStyleSizes();
        this.notify('progress');
    };
    DejaSplitterComponent.prototype.stopDragging = function () {
        if (!this.isDragging) {
            return;
        }
        this.areas.forEach(function (a) { return a.component.unlockEvents(); });
        while (this.eventsDragFct.length > 0) {
            var fct = this.eventsDragFct.pop();
            if (fct) {
                fct();
            }
        }
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.isDragging = false;
        this.notify('end');
    };
    DejaSplitterComponent.prototype.notify = function (type) {
        var data = this.areas.map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            default:
                return null;
        }
    };
    return DejaSplitterComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "direction", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaSplitterComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaSplitterComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "gutterSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "dragStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "dragProgress", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaSplitterComponent.prototype, "dragEnd", void 0);
__decorate([
    HostBinding('style.flex-direction'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DejaSplitterComponent.prototype, "styleFlexDirection", null);
__decorate([
    HostBinding('style.width'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DejaSplitterComponent.prototype, "styleWidth", null);
__decorate([
    HostBinding('style.height'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DejaSplitterComponent.prototype, "styleHeight", null);
DejaSplitterComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        selector: 'deja-splitter',
        styleUrls: ['./splitter.scss'],
        templateUrl: './splitter.html',
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        ElementRef,
        Renderer])
], DejaSplitterComponent);
export { DejaSplitterComponent };
//# sourceMappingURL=splitter.component.js.map