var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics/rect';
import { KeyCodes } from '../../common/core/keycodes.enum';
var DejaDropDownComponent = (function () {
    function DejaDropDownComponent(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.hide = new EventEmitter();
        this.showed = new EventEmitter();
        this.ownerLeftMargin = 0;
        this.ownerTopMargin = 0;
        this.ownerRightMargin = 0;
        this.ownerBottomMargin = 0;
        this.avoidOnwerOverflow = true;
        this.show$ = new Subject();
        this.closeOnEscape$ = new BehaviorSubject(true);
        this.ownerAlignents = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };
        this.dropdownAlignments = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };
        this.resetAllParams = {
            left: true,
            top: true,
            width: true,
            height: true,
            valign: true,
            halign: true,
        };
        var element = elementRef.nativeElement;
        var setDropDownPosition = function (dropDownPosition) {
            var left = dropDownPosition.left, top = dropDownPosition.top, width = dropDownPosition.width, height = dropDownPosition.height, valign = dropDownPosition.valign, halign = dropDownPosition.halign;
            if (left !== undefined) {
                element.style.left = left !== null ? left + "px" : '';
            }
            if (top !== undefined) {
                element.style.top = top !== null ? top + "px" : '';
            }
            if (width !== undefined) {
                element.style.width = width !== null ? width + "px" : '';
            }
            if (height !== undefined) {
                element.style.height = height !== null ? height + "px" : '';
            }
            if (valign !== undefined) {
                if (valign) {
                    element.setAttribute('valign', valign);
                }
                else {
                    element.removeAttribute('valign');
                }
            }
            if (halign !== undefined) {
                if (halign) {
                    element.setAttribute('halign', halign);
                }
                else {
                    element.removeAttribute('halign');
                }
            }
        };
        var unRregisterEscape$ = Observable.from(this.closeOnEscape$)
            .filter(function (value) { return !value; });
        var registerEscape$ = Observable.from(this.closeOnEscape$)
            .filter(function (value) { return value; });
        var keyUp$ = Observable.fromEvent(element.ownerDocument, 'keydown');
        Observable.combineLatest(keyUp$, registerEscape$)
            .takeUntil(unRregisterEscape$)
            .filter(function (_a) {
            var event = _a[0];
            return event.keyCode === KeyCodes.Escape;
        })
            .subscribe(function () { return _this.hide.emit(); });
        Observable.from(this.show$)
            .map(function (resetParams) {
            setDropDownPosition({
                left: resetParams.left ? -1000 : undefined,
                top: resetParams.top ? -1000 : undefined,
                width: resetParams.width ? (resetParams.width !== true ? resetParams.width || null : null) : undefined,
                height: resetParams.height ? (resetParams.height !== true ? resetParams.height || null : null) : undefined,
                valign: resetParams.valign ? null : undefined,
                halign: resetParams.halign ? null : undefined,
            });
            var reshow = Object.keys(resetParams).find(function (key) { return !resetParams[key]; });
            return reshow;
        })
            .debounce(function (reshow) { return Observable.timer(reshow ? 0 : 100); })
            .do(function () {
            var ownerElement = _this.ownerElement.nativeElement || _this.ownerElement;
            var ownerRect = ownerElement.getBoundingClientRect();
            var ownerBounds = Rect.fromLTRB(ownerRect.left + +_this.ownerLeftMargin, ownerRect.top + +_this.ownerTopMargin, ownerRect.right - +_this.ownerRightMargin, ownerRect.bottom - +_this.ownerBottomMargin);
            var body = _this.elementRef.nativeElement.ownerDocument.body;
            var bodyRect = body.getBoundingClientRect();
            var containerElement = _this.containerElement && _this.containerElement.nativeElement || _this.containerElement;
            var containerRect = !containerElement ? bodyRect : containerElement.getBoundingClientRect();
            var minLeft = Math.max(bodyRect.left, containerRect.left);
            var maxRight = Math.min(bodyRect.right, containerRect.right);
            var minTop = Math.max(bodyRect.top, containerRect.top);
            var maxBottom = Math.min(bodyRect.bottom, containerRect.bottom);
            var dropdownContElement = _this.elementRef.nativeElement;
            var dropdownRect = dropdownContElement.getBoundingClientRect();
            var left;
            var top;
            var width = dropdownRect.width;
            var height = dropdownRect.height;
            if (_this.ownerAlignents.left) {
                if (_this.dropdownAlignments.left) {
                    left = ownerBounds.left;
                }
                else if (_this.dropdownAlignments.right) {
                    left = ownerBounds.left - width;
                }
                else {
                    left = ownerBounds.left - width / 2;
                }
            }
            if (_this.ownerAlignents.top) {
                if (_this.dropdownAlignments.top) {
                    top = ownerBounds.top;
                }
                else if (_this.dropdownAlignments.bottom) {
                    top = ownerBounds.top - height;
                }
                else {
                    top = ownerBounds.top + ownerBounds.height / 2 - height / 2;
                }
            }
            if (_this.ownerAlignents.right) {
                if (_this.ownerAlignents.left) {
                    width = ownerBounds.width;
                }
                else if (_this.dropdownAlignments.left) {
                    left = ownerBounds.right;
                }
                else if (_this.dropdownAlignments.right) {
                    left = ownerBounds.right - width;
                }
                else {
                    left = ownerBounds.right - width / 2;
                }
            }
            if (_this.ownerAlignents.bottom) {
                if (_this.ownerAlignents.top) {
                    height = ownerBounds.height;
                }
                else if (_this.dropdownAlignments.top) {
                    top = ownerBounds.bottom;
                }
                else if (_this.dropdownAlignments.bottom) {
                    top = ownerBounds.bottom - height;
                }
                else {
                    top = ownerBounds.bottom - height / 2;
                }
            }
            if (top === undefined) {
                top = ownerBounds.top + ownerBounds.height / 2 - height / 2;
            }
            if (left === undefined) {
                left = ownerBounds.left + ownerBounds.width / 2 - width / 2;
            }
            var dropdownBounds = new Rect(left, top, width, height);
            if (minLeft > dropdownBounds.left) {
                dropdownBounds.left = minLeft;
            }
            if (minTop > dropdownBounds.top) {
                dropdownBounds.top = minTop;
            }
            if (dropdownBounds.right > maxRight && _this.dropdownAlignments.right) {
                dropdownBounds.left = Math.max(maxRight - dropdownBounds.width, minLeft);
            }
            if (dropdownBounds.bottom > maxBottom && _this.dropdownAlignments.bottom) {
                dropdownBounds.top = Math.max(maxBottom - dropdownBounds.height, minTop);
            }
            if (dropdownBounds.intersectWith(ownerBounds) && _this.avoidOnwerOverflow) {
                if (dropdownBounds.left < ownerBounds.right && dropdownBounds.right > ownerBounds.left) {
                    var overflowTop = dropdownBounds.bottom - ownerBounds.top;
                    var overflowBottom = ownerBounds.bottom - dropdownBounds.top;
                    if (overflowTop > 0 && overflowBottom > 0) {
                        var topHeight = Math.min(ownerBounds.top - minTop, dropdownBounds.height);
                        var bottomHeight = Math.min(maxBottom - ownerBounds.bottom, dropdownBounds.height);
                        if (overflowBottom > 0 && bottomHeight < topHeight) {
                            dropdownBounds.top = ownerBounds.top - topHeight;
                            if (dropdownBounds.height > topHeight) {
                                dropdownBounds.height = topHeight;
                            }
                        }
                        else {
                            dropdownBounds.top = ownerBounds.bottom;
                            if (dropdownBounds.height > bottomHeight) {
                                dropdownBounds.height = bottomHeight;
                            }
                        }
                    }
                }
                if (dropdownBounds.top < ownerBounds.bottom && dropdownBounds.bottom > ownerBounds.top) {
                    var overflowLeft = dropdownBounds.right - ownerBounds.left;
                    var overflowRight = ownerBounds.right - dropdownBounds.left;
                    if (overflowLeft > 0 && overflowRight > 0) {
                        var leftWidth = Math.min(ownerBounds.left - minLeft, dropdownBounds.width);
                        var rightWidth = Math.min(maxRight - ownerBounds.right, dropdownBounds.width);
                        if (overflowRight > 0 && rightWidth < leftWidth) {
                            dropdownBounds.left = ownerBounds.left - leftWidth;
                            if (dropdownBounds.width > leftWidth) {
                                dropdownBounds.width = leftWidth;
                            }
                        }
                        else {
                            dropdownBounds.left = ownerBounds.right;
                            if (dropdownBounds.width > rightWidth) {
                                dropdownBounds.width = rightWidth;
                            }
                        }
                    }
                }
            }
            if (minLeft > dropdownBounds.left) {
                dropdownBounds.left = minLeft;
                if (_this.dropdownAlignments.right) {
                    if (_this.ownerAlignents.left) {
                        dropdownBounds.width = Math.max(5, ownerBounds.left - minLeft);
                    }
                    else if (_this.ownerAlignents.right) {
                        dropdownBounds.width = ownerBounds.right - minLeft;
                    }
                }
            }
            if (minTop > dropdownBounds.top) {
                dropdownBounds.top = minTop;
                if (_this.dropdownAlignments.bottom) {
                    if (_this.ownerAlignents.top) {
                        dropdownBounds.height = Math.max(5, ownerBounds.top - minTop);
                    }
                    else if (_this.ownerAlignents.bottom) {
                        dropdownBounds.height = ownerBounds.bottom - minTop;
                    }
                }
            }
            if (dropdownBounds.right > maxRight) {
                if (_this.dropdownAlignments.left) {
                    dropdownBounds.width = maxRight - dropdownBounds.left;
                }
                else if (maxRight - dropdownBounds.width < minLeft) {
                    dropdownBounds.left = minLeft;
                    dropdownBounds.width = maxRight - minLeft;
                }
                else {
                    dropdownBounds.left = maxRight - dropdownBounds.width;
                }
            }
            if (dropdownBounds.bottom > maxBottom) {
                if (_this.dropdownAlignments.top) {
                    dropdownBounds.height = maxBottom - dropdownBounds.top;
                }
                else if (maxBottom - dropdownBounds.height < minTop) {
                    dropdownBounds.top = minTop;
                    dropdownBounds.height = maxBottom - minTop;
                }
                else {
                    dropdownBounds.top = maxBottom - dropdownBounds.height;
                }
            }
            var dropDownPosition = {};
            if (dropdownBounds.top >= ownerBounds.bottom) {
                dropDownPosition.valign = 'bottom';
            }
            else if (dropdownBounds.bottom <= ownerBounds.top) {
                dropDownPosition.valign = 'top';
            }
            else {
                dropDownPosition.valign = 'center';
            }
            if (dropdownBounds.left >= ownerBounds.right) {
                dropDownPosition.halign = 'right';
            }
            else if (dropdownBounds.right <= ownerBounds.left) {
                dropDownPosition.halign = 'left';
            }
            else {
                dropDownPosition.halign = 'center';
            }
            var parentElement = dropdownContElement.offsetParent;
            var parentRect = parentElement && parentElement.getBoundingClientRect();
            var relativeBounds = (parentRect && dropdownBounds.offset(-parentRect.left, -parentRect.top)) || dropdownBounds;
            dropDownPosition.left = relativeBounds.left;
            dropDownPosition.top = relativeBounds.top;
            dropDownPosition.width = relativeBounds.width;
            dropDownPosition.height = relativeBounds.height;
            setDropDownPosition(dropDownPosition);
        })
            .delay(1)
            .subscribe(function () { return _this.showed.emit(new Event('showed')); });
    }
    Object.defineProperty(DejaDropDownComponent.prototype, "closeOnEscape", {
        set: function (value) {
            this.closeOnEscape$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDropDownComponent.prototype, "ownerAlignment", {
        set: function (value) {
            var _this = this;
            this.ownerAlignents = {
                bottom: false,
                left: false,
                right: false,
                top: false,
            };
            if (value) {
                value.split(/\s+/).map(function (align) { return _this.ownerAlignents[align] = true; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDropDownComponent.prototype, "dropdownAlignment", {
        set: function (value) {
            var _this = this;
            this.dropdownAlignments = {
                bottom: false,
                left: false,
                right: false,
                top: false,
            };
            if (value) {
                value.split(/\s+/).map(function (align) { return _this.dropdownAlignments[align] = true; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDropDownComponent.prototype, "dropdownElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    DejaDropDownComponent.prototype.ngAfterViewInit = function () {
        this.show$.next(this.resetAllParams);
    };
    DejaDropDownComponent.prototype.show = function (resetParams) {
        this.show$.next(resetParams || this.resetAllParams);
    };
    return DejaDropDownComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "hide", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "showed", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "ownerElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "ownerLeftMargin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "ownerTopMargin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "ownerRightMargin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "ownerBottomMargin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "containerElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDropDownComponent.prototype, "avoidOnwerOverflow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DejaDropDownComponent.prototype, "closeOnEscape", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaDropDownComponent.prototype, "ownerAlignment", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaDropDownComponent.prototype, "dropdownAlignment", null);
DejaDropDownComponent = __decorate([
    Component({
        selector: 'deja-dropdown',
        styleUrls: [
            './dropdown.component.scss',
        ],
        template: "<ng-content></ng-content>",
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaDropDownComponent);
export { DejaDropDownComponent };
//# sourceMappingURL=dropdown.component.js.map