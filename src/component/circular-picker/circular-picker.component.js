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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';
import { Circle } from '../../common/core/graphics/index';
import { Position } from '../../common/core/graphics/position';
var noop = function () { };
export var ClockwiseFactorEnum;
(function (ClockwiseFactorEnum) {
    ClockwiseFactorEnum[ClockwiseFactorEnum["clockwise"] = -1] = "clockwise";
    ClockwiseFactorEnum[ClockwiseFactorEnum["counterClockwise"] = 1] = "counterClockwise";
})(ClockwiseFactorEnum || (ClockwiseFactorEnum = {}));
var DejaCircularPickerComponent = (function () {
    function DejaCircularPickerComponent(elementRef, changeDetectorRef, _control) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this._control = _control;
        this.clockwiseFactor = ClockwiseFactorEnum.clockwise;
        this.fullDiameter = 310;
        this.labelsDiameter = 43;
        this.outerLabels = false;
        this._disabled = false;
        this.TwoPI = Math.PI * 2;
        this.radius = 0;
        this.configs = [];
        this.circularValues = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        var element = elementRef.nativeElement;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        Observable.fromEvent(element, 'mousedown')
            .filter(function (event) { return event.buttons === 1; })
            .debounceTime(100)
            .subscribe(function (mouseEvent) {
            _this.clickedTime = Date.now();
            var cursorElement = _this.getHTMLElement(mouseEvent.target, 'cursor');
            var valueElement = _this.getHTMLElement(mouseEvent.target, 'value');
            if (cursorElement) {
                _this.cursorElement = cursorElement;
            }
            else if (valueElement) {
                _this.value = +valueElement.getAttribute('value');
            }
            if (cursorElement || valueElement) {
                var kill$_1 = new Subject();
                if (!element.ownerDocument.body.className.match(/noselect/)) {
                    element.ownerDocument.body.className += 'noselect';
                }
                var cancelMouse$ = Observable.merge(kill$_1, Observable
                    .fromEvent(element.ownerDocument, 'mouseup'))
                    .first()
                    .do(function () {
                    delete _this.cursorElement;
                    delete _this.clickedTime;
                    element.ownerDocument.body.className = element.ownerDocument.body.className.replace(/\bnoselect\b/, '');
                });
                var pickerElem = _this.picker.nativeElement;
                var clientRect_1 = pickerElem.getBoundingClientRect();
                Observable
                    .fromEvent(element.ownerDocument, 'mousemove')
                    .takeUntil(cancelMouse$)
                    .sampleTime(10)
                    .subscribe(function (event) {
                    if (event.buttons !== 1) {
                        kill$_1.next();
                        return;
                    }
                    var circle = Circle.fromOuterRect(clientRect_1);
                    var contains = false;
                    if (_this.outerLabels) {
                        circle = circle.inflate(_this.labelsDiameter);
                        for (var i = 0; i < _this.configs.length; i++) {
                            contains = circle.containsPoint(new Position(event.pageX, event.pageY));
                            if (contains) {
                                _this.selectedConfig = _this.configs[i];
                                break;
                            }
                            else {
                                circle = circle.inflate(_this.labelsDiameter);
                            }
                        }
                    }
                    else {
                        var x = _this.labelsDiameter * (_this.configs.length - 1);
                        circle = circle.inflate(-x);
                        for (var i = _this.configs.length; i > 0; i--) {
                            contains = circle.containsPoint(new Position(event.pageX, event.pageY));
                            if (contains) {
                                _this.selectedConfig = _this.configs[i - 1];
                                break;
                            }
                            else {
                                circle = circle.inflate(_this.labelsDiameter);
                            }
                        }
                    }
                    var newValue = _this.pointToValue(event.pageX - clientRect_1.left, event.pageY - clientRect_1.top, _this.selectedConfig);
                    if (newValue !== _this.value) {
                        _this.value = newValue;
                    }
                });
            }
        });
    }
    Object.defineProperty(DejaCircularPickerComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    DejaCircularPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var diameter = this.fullDiameter - this.labelsDiameter;
        this.radius = diameter / 2;
        this.ranges.forEach(function (range) {
            range.interval = (range.interval) ? range.interval : 1;
            range.labelInterval = (range.labelInterval) ? range.labelInterval : 1;
            range.beginOffset = (range.beginOffset) ? range.beginOffset : Math.PI / 2;
            _this.configs.push({
                range: range,
                stepAngle: _this.TwoPI / Math.floor((range.max - range.min + 1) / range.interval),
                steps: Math.floor((range.max - range.min + 1) / range.interval),
            });
        });
        this.selectedConfig = this.configs[0];
        this.bind();
        this.updateCursor();
    };
    Object.defineProperty(DejaCircularPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this.writeValue(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaCircularPickerComponent.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
            this.updateCursor();
        }
    };
    DejaCircularPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaCircularPickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DejaCircularPickerComponent.prototype.pointToValue = function (x, y, config) {
        var angleAtPoint = this.pointToAngle(x - this.radius, y - this.radius, config);
        var circleSegmentIndexAtPoint = config.steps - Math.ceil(angleAtPoint / config.stepAngle);
        if (circleSegmentIndexAtPoint < 0) {
            circleSegmentIndexAtPoint = config.steps;
        }
        return config.range.min + circleSegmentIndexAtPoint * config.range.interval;
    };
    DejaCircularPickerComponent.prototype.valueToPoint = function (value, radiusOffset, config) {
        var position = new Position();
        var valueAngle = this.valueToAngle(value, config);
        position.left = this.radius + (this.radius + radiusOffset) * Math.cos(valueAngle);
        position.top = this.radius - (this.radius + radiusOffset) * Math.sin(valueAngle);
        return position;
    };
    DejaCircularPickerComponent.prototype.pointToAngle = function (x, y, config) {
        return (-Math.atan2(y, x)
            - config.range.beginOffset
            - (config.stepAngle / 2)
            + this.TwoPI) % this.TwoPI;
    };
    DejaCircularPickerComponent.prototype.valueToAngle = function (value, config) {
        var circleSegmentIndex = Math.floor((value - config.range.min) / config.range.interval);
        return (circleSegmentIndex * config.stepAngle * this.clockwiseFactor) + config.range.beginOffset;
    };
    DejaCircularPickerComponent.prototype.bind = function () {
        var _this = this;
        this.circularValues = [];
        this.configs.forEach(function (config, configNumber) {
            for (var i = config.range.min; i <= config.range.max; i += (config.range.labelInterval * config.range.interval)) {
                var val = { value: i };
                var labelRadius = _this.labelsDiameter / 2;
                var configOffset = _this.labelsDiameter * configNumber;
                var labelPosition = _this.valueToPoint(i, (_this.outerLabels ? labelRadius + configOffset : -labelRadius - configOffset), config);
                val.position = new Position((labelPosition.left - labelRadius), (labelPosition.top - labelRadius));
                _this.circularValues.push(val);
            }
        });
    };
    DejaCircularPickerComponent.prototype.updateCursor = function () {
        var _this = this;
        if (!this.circularValues || !this.circularValues.length) {
            return;
        }
        if (this.value === undefined || this.value === null) {
            this.value = this.circularValues[0].value;
        }
        this.selectedConfig = this.configs.find(function (conf) {
            if (_this.value >= conf.range.min && _this.value <= conf.range.max) {
                return true;
            }
        });
        if (!this.selectedConfig) {
            this.selectedConfig = this.configs[0];
        }
        var selectedConfigIndex = this.configs.indexOf(this.selectedConfig);
        var cursorCenter;
        var cursorRadius = this.labelsDiameter / 2;
        cursorCenter = this.valueToPoint(this.value, (this.outerLabels ? cursorRadius + (this.labelsDiameter * selectedConfigIndex) : -cursorRadius - (this.labelsDiameter * selectedConfigIndex)), this.selectedConfig);
        this.cursor = {
            position: new Position((cursorCenter.left - cursorRadius), (cursorCenter.top - cursorRadius)),
            value: this.value,
        };
        this.cursorHand = {
            angle: this.valueToAngle(this.value, this.selectedConfig),
            width: (this.outerLabels) ? this.radius + (this.labelsDiameter * selectedConfigIndex) : this.radius - this.labelsDiameter - (this.labelsDiameter * selectedConfigIndex),
        };
        this.changeDetectorRef.markForCheck();
    };
    DejaCircularPickerComponent.prototype.getHTMLElement = function (element, attr) {
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute(attr)) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    return DejaCircularPickerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaCircularPickerComponent.prototype, "clockwiseFactor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaCircularPickerComponent.prototype, "fullDiameter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaCircularPickerComponent.prototype, "labelsDiameter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaCircularPickerComponent.prototype, "outerLabels", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaCircularPickerComponent.prototype, "ranges", void 0);
__decorate([
    ContentChild('labelTemplate'),
    __metadata("design:type", Object)
], DejaCircularPickerComponent.prototype, "labelTemplate", void 0);
__decorate([
    ContentChild('cursorTemplate'),
    __metadata("design:type", Object)
], DejaCircularPickerComponent.prototype, "cursorTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaCircularPickerComponent.prototype, "disabled", null);
__decorate([
    ViewChild('picker'),
    __metadata("design:type", ElementRef)
], DejaCircularPickerComponent.prototype, "picker", void 0);
DejaCircularPickerComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-circular-picker',
        styleUrls: ['./circular-picker.component.scss'],
        templateUrl: './circular-picker.component.html',
    }),
    __param(2, Self()), __param(2, Optional()),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgControl])
], DejaCircularPickerComponent);
export { DejaCircularPickerComponent };
//# sourceMappingURL=circular-picker.component.js.map