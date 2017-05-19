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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core/keycodes.enum';
import { DejaChildValidatorDirective } from '../../common/core/validation';
import { DejaDateSelectorComponent } from '../date-selector';
import { formatToMask } from './';
var noop = function () { };
var DejaDatePickerComponent = (function () {
    function DejaDatePickerComponent(elementRef, changeDetectorRef, _control, _parentForm, _parentFormGroup) {
        var _this = this;
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this._control = _control;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.dropdownAlignment = 'left right top bottom';
        this.ownerAlignment = 'left bottom';
        this.placeholder = 'Date';
        this.dateChange = new EventEmitter();
        this._showDropDown = false;
        this.date = new Date();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        if (this._parentForm) {
            this._parentForm.ngSubmit.subscribe(function () {
                _this.changeDetectorRef.markForCheck();
            });
        }
        if (this._parentFormGroup) {
            this._parentFormGroup.ngSubmit.subscribe(function () {
                _this.changeDetectorRef.markForCheck();
            });
        }
    }
    DejaDatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
        if (!this.format) {
            this.format = 'YYYY-MM-DD' + ((this.time) ? ' HH:mm' : '');
        }
        var mask = [];
        var array = this.format.match(formattingTokens);
        array.forEach(function (val) {
            if (formatToMask[val]) {
                mask = mask.concat(formatToMask[val]);
            }
            else {
                mask.push(val);
            }
        });
        this.mask = mask;
        Observable
            .fromEvent(this.inputElementRef.nativeElement, 'keydown')
            .filter(function (event) { return !_this._showDropDown &&
            (event.keyCode === KeyCodes.KeyD ||
                event.keyCode === KeyCodes.UpArrow ||
                event.keyCode === KeyCodes.DownArrow); })
            .subscribe(function (event) {
            event.preventDefault();
            switch (event.keyCode) {
                case (KeyCodes.KeyD):
                    _this.value = new Date();
                    break;
                case (KeyCodes.UpArrow):
                    if (_this.date) {
                        var d = new Date(_this.date);
                        d.setDate(_this.date.getDate() + 1);
                        _this.value = d;
                    }
                    break;
                case (KeyCodes.DownArrow):
                    if (_this.date) {
                        var d = new Date(_this.date);
                        d.setDate(_this.date.getDate() - 1);
                        _this.value = d;
                    }
                    break;
                default:
                    break;
            }
        });
    };
    Object.defineProperty(DejaDatePickerComponent.prototype, "containerElement", {
        get: function () {
            return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDatePickerComponent.prototype, "showDropDown", {
        get: function () {
            return this._showDropDown;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._showDropDown) {
                this._showDropDown = value;
                if (value) {
                    var inputElement = this.inputElementRef.nativeElement;
                    this.keyDownSubscription = Observable
                        .fromEvent(inputElement, 'keydown')
                        .subscribe(function (event) {
                        _this.dateSelectorComponent.keyDown(event);
                    });
                }
                else {
                    if (this.keyDownSubscription) {
                        this.keyDownSubscription.unsubscribe();
                        delete this.keyDownSubscription;
                    }
                }
            }
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDatePickerComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (value != null && "" + value !== 'false') ? true : null;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDatePickerComponent.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this._time = (value != null && "" + value !== 'false') ? true : null;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DejaDatePickerComponent.prototype.close = function () {
        this.showDropDown = false;
    };
    DejaDatePickerComponent.prototype.open = function () {
        this.showDropDown = true;
    };
    Object.defineProperty(DejaDatePickerComponent.prototype, "value", {
        get: function () {
            return this.date;
        },
        set: function (v) {
            if (v !== this.date) {
                this.writeValue(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaDatePickerComponent.prototype.writeValue = function (value) {
        if (value !== this.date) {
            this.date = value;
            this.inputModel = (this.format && this.date) ? moment(this.date).format(this.format) : (this.date) ? this.date.toLocaleString() : null;
            this.changeDetectorRef.markForCheck();
        }
    };
    DejaDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaDatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DejaDatePickerComponent.prototype.ngAfterContentInit = function () {
        if (this.inputValidatorDirective) {
            this.inputValidatorDirective.parentControl = this._control;
        }
    };
    DejaDatePickerComponent.prototype.setFocus = function () {
        var inputElement = this.inputElementRef.nativeElement;
        inputElement.focus();
    };
    DejaDatePickerComponent.prototype.toggleDateSelector = function (event) {
        if (this.disabled) {
            return;
        }
        var target = event.currentTarget;
        if (target.id !== 'calendar-button') {
            return;
        }
        this.showDropDown = !this.showDropDown;
        return false;
    };
    DejaDatePickerComponent.prototype.onDateChange = function (newDate) {
        this.value = newDate;
    };
    DejaDatePickerComponent.prototype.updateModel = function (date) {
        if (typeof date === 'string' && date.replace(/_/g, '').length === this.format.length) {
            var d = moment(date, this.format).toDate();
            if (!moment(d).isValid()) {
                d = new Date();
            }
            date = d;
        }
        if (typeof date !== 'string') {
            this.value = date;
        }
    };
    DejaDatePickerComponent.prototype.reset = function () {
        this.value = undefined;
        delete this.inputModel;
        this.onChangeCallback(this.value);
        this.close();
    };
    return DejaDatePickerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Date)
], DejaDatePickerComponent.prototype, "dateMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DejaDatePickerComponent.prototype, "dateMin", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaDatePickerComponent.prototype, "dropdownContainerId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDatePickerComponent.prototype, "dropdownAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDatePickerComponent.prototype, "ownerAlignment", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaDatePickerComponent.prototype, "format", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaDatePickerComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaDatePickerComponent.prototype, "disableDates", void 0);
__decorate([
    ViewChild(DejaDateSelectorComponent),
    __metadata("design:type", DejaDateSelectorComponent)
], DejaDatePickerComponent.prototype, "dateSelectorComponent", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaDatePickerComponent.prototype, "dateChange", void 0);
__decorate([
    ContentChild('hintTemplate'),
    __metadata("design:type", Object)
], DejaDatePickerComponent.prototype, "mdHint", void 0);
__decorate([
    ViewChild('inputelement'),
    __metadata("design:type", ElementRef)
], DejaDatePickerComponent.prototype, "inputElementRef", void 0);
__decorate([
    ViewChild(DejaChildValidatorDirective),
    __metadata("design:type", DejaChildValidatorDirective)
], DejaDatePickerComponent.prototype, "inputValidatorDirective", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDatePickerComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDatePickerComponent.prototype, "time", null);
DejaDatePickerComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.Default,
        selector: 'deja-date-picker',
        styleUrls: ['./date-picker.component.scss'],
        templateUrl: './date-picker.component.html',
    }),
    __param(2, Self()), __param(2, Optional()), __param(3, Optional()), __param(4, Optional()),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgControl, NgForm, FormGroupDirective])
], DejaDatePickerComponent);
export { DejaDatePickerComponent };
//# sourceMappingURL=date-picker.component.js.map