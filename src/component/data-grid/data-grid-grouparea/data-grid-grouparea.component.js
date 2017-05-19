var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
var DejaGridGroupAreaComponent = (function () {
    function DejaGridGroupAreaComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.groupsChanged = new EventEmitter();
        this.groupRemoved = new EventEmitter();
        this._groups = [];
        this.columnGroupKey = 'deja-grid-column';
        this.groupGroupKey = 'deja-grid-group';
    }
    Object.defineProperty(DejaGridGroupAreaComponent.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        set: function (columns) {
            this._groups = columns || [];
        },
        enumerable: true,
        configurable: true
    });
    DejaGridGroupAreaComponent.prototype.getDragContext = function (group) {
        var _this = this;
        return {
            dragendcallback: function (event) {
                if (!event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    return;
                }
            },
            dragstartcallback: function (event) {
                event.dragInfo[_this.groupGroupKey] = group;
            },
        };
    };
    DejaGridGroupAreaComponent.prototype.getDropContext = function () {
        var _this = this;
        return {
            dragovercallback: function (event) {
                if (event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    var sourceColumn_1 = event.dragInfo[_this.columnGroupKey];
                    if (!_this.groups.find(function (column) { return column === sourceColumn_1; })) {
                        event.preventDefault();
                    }
                }
                else if (event.dragInfo.hasOwnProperty(_this.groupGroupKey)) {
                    var targetElement = _this.getGroupElementFromHTMLElement(event.target);
                    var targetIndex = targetElement && +targetElement.getAttribute('index');
                    if (targetIndex === undefined) {
                        return;
                    }
                    var targetBounds = targetElement.getBoundingClientRect();
                    var sourceColumn_2 = event.dragInfo[_this.groupGroupKey];
                    var sourceIndex = _this.groups.findIndex(function (column) { return column === sourceColumn_2; });
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
                    _this.groups.splice(sourceIndex, 1);
                    _this.groups.splice(targetIndex, 0, sourceColumn_2);
                    _this.changeDetectorRef.markForCheck();
                    event.preventDefault();
                }
                else {
                    return;
                }
            },
            dropcallback: function (event) {
                var raiseEvent = function (group) {
                    var e = {
                        column: group,
                        columns: _this.groups,
                        originalEvent: event,
                    };
                    _this.groupsChanged.emit(e);
                    event.preventDefault();
                };
                if (event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    var sourceColumn = event.dragInfo[_this.columnGroupKey];
                    var targetElement = _this.getGroupElementFromHTMLElement(event.target);
                    var targetIndex = targetElement && +targetElement.getAttribute('index');
                    if (targetIndex !== undefined) {
                        var targetBounds = targetElement.getBoundingClientRect();
                        if (event.x <= targetBounds.left + targetBounds.width / 2) {
                            _this.groups.splice(targetIndex, 0, sourceColumn);
                        }
                        else if (targetIndex < _this.groups.length - 1) {
                            _this.groups.splice(targetIndex + 1, 0, sourceColumn);
                        }
                        else {
                            _this.groups.push(sourceColumn);
                        }
                    }
                    else {
                        _this.groups.push(sourceColumn);
                    }
                    raiseEvent(sourceColumn);
                }
                else if (event.dragInfo.hasOwnProperty(_this.groupGroupKey)) {
                    var sourceColumn = event.dragInfo[_this.groupGroupKey];
                    raiseEvent(sourceColumn);
                }
                _this.changeDetectorRef.markForCheck();
            },
        };
    };
    DejaGridGroupAreaComponent.prototype.removeGroup = function (event, index) {
        var column = this.groups.splice(index, 1);
        var e = {
            column: column[0],
            columns: this.groups,
            originalEvent: event,
        };
        this.groupRemoved.emit(e);
        event.stopPropagation();
        return false;
    };
    DejaGridGroupAreaComponent.prototype.getGroupColumnFromHTMLElement = function (element) {
        var groupElement = this.getGroupElementFromHTMLElement(element);
        var groupName = groupElement && groupElement.getAttribute('groupname');
        return groupName && this.groups.find(function (column) { return column.name === groupName; });
    };
    DejaGridGroupAreaComponent.prototype.getGroupElementFromHTMLElement = function (element) {
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute('groupname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    return DejaGridGroupAreaComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaGridGroupAreaComponent.prototype, "groupsChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaGridGroupAreaComponent.prototype, "groupRemoved", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaGridGroupAreaComponent.prototype, "groups", null);
DejaGridGroupAreaComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-grid-grouparea',
        styleUrls: ['./data-grid-grouparea.component.scss'],
        templateUrl: './data-grid-grouparea.component.html',
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], DejaGridGroupAreaComponent);
export { DejaGridGroupAreaComponent };
//# sourceMappingURL=data-grid-grouparea.component.js.map