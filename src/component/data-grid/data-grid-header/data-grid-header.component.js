var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { IDejaGridColumnLayout } from '../index';
var DejaGridHeaderComponent = (function () {
    function DejaGridHeaderComponent(elementRef, changeDetectorRef) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.columnSizeChanged = new EventEmitter();
        this.columnLayoutChanged = new EventEmitter();
        this.columnHeaderClicked = new EventEmitter();
        this._columnsDraggable = false;
        this._columnsSortable = false;
        this._columnsSizable = false;
        this._columnLayout = {};
        this.backupColumnOrder = [];
        this.columnGroupKey = 'deja-grid-column';
        this.subscriptions = [];
        var element = elementRef.nativeElement;
        this.subscriptions.push(Observable.fromEvent(element, 'mousedown')
            .filter(function (event) { return event.buttons === 1; })
            .subscribe(function (downEvent) {
            var target = event.target;
            var column = _this.getColumnFromHTMLElement(event.target);
            if (target.hasAttribute('separator')) {
                if (_this.columnsSizable && column.sizeable !== false) {
                    _this.sizedColumn = column;
                    var sizedOrigin_1 = downEvent.pageX;
                    var kill$_1 = new Subject();
                    var mouseUp$ = Observable.fromEvent(document, 'mouseup');
                    mouseUp$.first().subscribe(function () {
                        var e = {
                            column: null,
                        };
                        _this.columnSizeChanged.emit(e);
                        _this.changeDetectorRef.markForCheck();
                        _this.sizedColumn = undefined;
                    });
                    Observable.fromEvent(element.ownerDocument, 'mousemove')
                        .takeUntil(Observable.merge(mouseUp$, kill$_1))
                        .subscribe(function (event) {
                        if (event.buttons === 1) {
                            var e = {
                                column: _this.sizedColumn,
                                offsetWidth: event.pageX - sizedOrigin_1,
                                originalEvent: event,
                            };
                            _this.columnSizeChanged.emit(e);
                            _this.changeDetectorRef.markForCheck();
                        }
                        else {
                            kill$_1.next();
                        }
                    });
                    event.stopPropagation();
                    return false;
                }
            }
            else {
                var clickedColumn_1 = column;
                Observable.fromEvent(element, 'mouseup')
                    .first()
                    .timeout(1000)
                    .subscribe(function (upEvent) {
                    var columnElement = _this.getColumnElementFromHTMLElement(upEvent.target);
                    if ((columnElement && columnElement.getAttribute('colname')) === clickedColumn_1.name) {
                        var e = {
                            column: clickedColumn_1,
                            originalEvent: upEvent,
                        };
                        _this.columnHeaderClicked.emit(e);
                        _this.changeDetectorRef.markForCheck();
                    }
                }, function (_error) { });
            }
        }));
    }
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsDraggable", {
        get: function () {
            return this._columnsDraggable;
        },
        set: function (value) {
            this._columnsDraggable = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsSortable", {
        get: function () {
            return this._columnsSortable;
        },
        set: function (value) {
            this._columnsSortable = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsSizable", {
        get: function () {
            return this._columnsSizable;
        },
        set: function (value) {
            this._columnsSizable = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnLayout", {
        get: function () {
            return this._columnLayout;
        },
        set: function (layout) {
            this._columnLayout = layout || {
                columns: [],
                scrollLeft: 0,
                vpAfterWidth: 0,
                vpBeforeWidth: 0,
                refresh$: new Subject(),
            };
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnHeaderTemplate", {
        get: function () {
            return this.columnHeaderTemplateExternal || this.columnHeaderTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    DejaGridHeaderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    DejaGridHeaderComponent.prototype.refresh = function () {
        this.changeDetectorRef.markForCheck();
    };
    DejaGridHeaderComponent.prototype.getDragContext = function (column) {
        var _this = this;
        if ((!this.columnsDraggable && !this.columnsSortable) || column.draggable === false) {
            return null;
        }
        return {
            dragendcallback: function (event) {
                if (!event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    return;
                }
                column.dragged = false;
                _this.backupColumnOrder = [];
                _this.changeDetectorRef.markForCheck();
            },
            dragstartcallback: function (event) {
                if (!_this.sizedColumn) {
                    event.dragInfo[_this.columnGroupKey] = column;
                    column.dragged = true;
                    _this.backupColumnOrder = [];
                    _this._columnLayout.columns.forEach(function (col) { return _this.backupColumnOrder.push(col); });
                }
                else {
                    event.preventDefault();
                }
            },
        };
    };
    DejaGridHeaderComponent.prototype.getDropContext = function () {
        var _this = this;
        return {
            dragleavecallback: function () {
                if (_this.backupColumnOrder.length) {
                    _this._columnLayout.columns = [];
                    _this.backupColumnOrder.forEach(function (col) { return _this._columnLayout.columns.push(col); });
                }
            },
            dragovercallback: function (event) {
                if (!_this.columnsSortable || !event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    return;
                }
                var targetElement = _this.getColumnElementFromHTMLElement(event.target);
                var targetBounds = targetElement.getBoundingClientRect();
                var targetIndex = targetElement && +targetElement.getAttribute('index');
                if (targetIndex === undefined) {
                    return;
                }
                var sourceColumn = event.dragInfo[_this.columnGroupKey];
                var sourceIndex = _this._columnLayout.columns.findIndex(function (og) { return og === sourceColumn; });
                if (sourceIndex === targetIndex) {
                    event.preventDefault();
                    return;
                }
                else if (targetIndex === sourceIndex + 1) {
                    if (event.x <= targetBounds.left + targetBounds.width / 2) {
                        event.preventDefault();
                        return;
                    }
                }
                else if (targetIndex === sourceIndex - 1) {
                    if (event.x >= targetBounds.left + targetBounds.width / 2) {
                        event.preventDefault();
                        return;
                    }
                }
                _this._columnLayout.columns.splice(sourceIndex, 1);
                _this._columnLayout.columns.splice(targetIndex, 0, sourceColumn);
                event.preventDefault();
                _this.changeDetectorRef.markForCheck();
            },
            dropcallback: function (event) {
                var sourceColumn = event.dragInfo[_this.columnGroupKey];
                var targetIndex = _this._columnLayout.columns.findIndex(function (og) { return og === sourceColumn; });
                var e = {
                    column: sourceColumn,
                    originalEvent: event,
                    target: (++targetIndex < _this._columnLayout.columns.length) ? _this._columnLayout.columns[targetIndex] : null,
                };
                _this.columnLayoutChanged.emit(e);
                event.preventDefault();
            },
        };
    };
    DejaGridHeaderComponent.prototype.getColumnElementFromHTMLElement = function (element) {
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute('colname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    DejaGridHeaderComponent.prototype.getColumnFromHTMLElement = function (element) {
        var columnElement = this.getColumnElementFromHTMLElement(element);
        var colName = columnElement && columnElement.getAttribute('colname');
        return colName && this._columnLayout.columns.find(function (column) { return column.name === colName; });
    };
    return DejaGridHeaderComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "columnHeaderTemplateExternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "sortInfos", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "columnSizeChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "columnLayoutChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "columnHeaderClicked", void 0);
__decorate([
    ContentChild('columnHeaderTemplate'),
    __metadata("design:type", Object)
], DejaGridHeaderComponent.prototype, "columnHeaderTemplateInternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaGridHeaderComponent.prototype, "columnsDraggable", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaGridHeaderComponent.prototype, "columnsSortable", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaGridHeaderComponent.prototype, "columnsSizable", null);
__decorate([
    Input(),
    __metadata("design:type", IDejaGridColumnLayout),
    __metadata("design:paramtypes", [IDejaGridColumnLayout])
], DejaGridHeaderComponent.prototype, "columnLayout", null);
DejaGridHeaderComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-grid-header',
        styleUrls: ['./data-grid-header.component.scss'],
        templateUrl: './data-grid-header.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef])
], DejaGridHeaderComponent);
export { DejaGridHeaderComponent };
//# sourceMappingURL=data-grid-header.component.js.map