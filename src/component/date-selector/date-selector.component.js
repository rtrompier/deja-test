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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core/keycodes.enum';
export var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
    DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
    DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
    DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
    DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
    DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
    DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek || (DaysOfWeek = {}));
var noop = function () { };
var DejaDateSelectorComponent = (function () {
    function DejaDateSelectorComponent(elementRef, changeDetectorRef, _control) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this._control = _control;
        this.startDay = DaysOfWeek.Monday;
        this.dateChange = new EventEmitter();
        this.local = 'fr';
        this.beginOffset = Math.PI / 3;
        this.clocks = {
            hours: {
                ranges: [
                    { min: 1, max: 12, beginOffset: Math.PI / 3 },
                    { min: 13, max: 24, beginOffset: Math.PI / 3 },
                ],
            },
            minutes: {
                ranges: [
                    { min: 0, max: 59, labelInterval: 5 },
                ],
            },
        };
        this.keyboardNavigation = false;
        this.keyboardNavigation$ = new Subject();
        this.currentDate = new Date();
        this.days = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        var element = elementRef.nativeElement;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        Observable.fromEvent(element, 'click').subscribe(function (event) {
            var target = event.target;
            if (target.hasAttribute('dateindex')) {
                var dateSelectorItem = _this.currentDays[+target.getAttribute('dateindex')];
                if (!dateSelectorItem.disabled) {
                    _this.value = dateSelectorItem.date;
                }
            }
        });
        Observable.from(this.keyboardNavigation$)
            .subscribe(function () {
            _this.keyboardNavigation = true;
            Observable.fromEvent(element, 'mouseenter')
                .first()
                .subscribe(function () {
                _this.keyboardNavigation = false;
                _this.changeDetectorRef.markForCheck();
            });
        });
    }
    Object.defineProperty(DejaDateSelectorComponent.prototype, "time", {
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
    DejaDateSelectorComponent.prototype.ngAfterContentInit = function () {
        if (!this.displayedDate) {
            this.displayedDate = this.currentDate;
            this.bind();
        }
    };
    Object.defineProperty(DejaDateSelectorComponent.prototype, "value", {
        get: function () {
            return this.selectedDate;
        },
        set: function (v) {
            if (v !== this.selectedDate) {
                this.writeValue(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaDateSelectorComponent.prototype.writeValue = function (value) {
        if (value !== this.selectedDate) {
            if (this.selectedDate) {
                var h = (value) ? value.getHours() : 0;
                var m = (value) ? value.getMinutes() : 0;
                if ((!this.time && this.selectedDate.toLocaleTimeString() !== value.toLocaleTimeString())
                    || (this.time && ((this.selectedDate.getHours() === 0 && this.selectedDate.getMinutes() === 0) && (h !== 0 && m !== 0) || (this.selectedDate.toLocaleDateString() !== value.toLocaleDateString())))) {
                    value.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes(), this.selectedDate.getSeconds());
                }
            }
            this.selectedDate = value;
            this.displayedDate = value || this.currentDate;
            this.bind();
        }
    };
    DejaDateSelectorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaDateSelectorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DejaDateSelectorComponent.prototype.getAllDaysInMonth = function (month, year) {
        var days = [];
        var day = 1;
        var date = new Date(year, month, day);
        while (date.getDay() !== this.startDay) {
            date = new Date(year, month, --day);
            var dateSelectorItem = {
                background: true,
                date: date,
            };
            days.splice(0, 0, dateSelectorItem);
        }
        var d = 0;
        for (d = 1; d <= this.daysInMonth(month + 1, year); d++) {
            date = new Date(year, month, d);
            var dateSelectorItem = {
                currentDate: (this.currentDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) ? true : null,
                date: date,
            };
            days.push(dateSelectorItem);
        }
        while (true) {
            date = new Date(year, month, d);
            if (date.getDay() === this.startDay) {
                break;
            }
            else {
                var dateSelectorItem = {
                    background: true,
                    date: date,
                };
                days.push(dateSelectorItem);
                d++;
            }
        }
        if (days.length < 42) {
            var x = 42 - days.length;
            this.emptyDays = new Array(x);
        }
        else {
            this.emptyDays = null;
        }
        return days;
    };
    DejaDateSelectorComponent.prototype.daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    DejaDateSelectorComponent.prototype.keyDown = function (event) {
        if (!this.selectedDate) {
            this.selectedDate = new Date(this.currentDate);
        }
        this.keyboardNavigation$.next();
        switch (event.keyCode) {
            case KeyCodes.PageUp:
            case KeyCodes.PageDown:
            case KeyCodes.UpArrow:
            case KeyCodes.DownArrow:
            case KeyCodes.LeftArrow:
            case KeyCodes.RightArrow:
                event.preventDefault();
                var d = new Date(this.selectedDate);
                switch (event.keyCode) {
                    case KeyCodes.PageUp:
                        this.setMonthIfPossible(d, -1);
                        break;
                    case KeyCodes.PageDown:
                        this.setMonthIfPossible(d, 1);
                        break;
                    case KeyCodes.UpArrow:
                        this.setDateIfPossible(d, -7);
                        break;
                    case KeyCodes.DownArrow:
                        this.setDateIfPossible(d, 7);
                        break;
                    case KeyCodes.LeftArrow:
                        this.setDateIfPossible(d, -1);
                        break;
                    case KeyCodes.RightArrow:
                        this.setDateIfPossible(d, 1);
                        break;
                    default:
                        break;
                }
                break;
            case KeyCodes.Space:
            case KeyCodes.Enter:
                event.preventDefault();
                this.onChangeCallback(this.selectedDate);
                break;
            default:
                return true;
        }
    };
    DejaDateSelectorComponent.prototype.changeMonth = function (x) {
        this.setMonthIfPossible(this.displayedDate, x);
    };
    DejaDateSelectorComponent.prototype.changeYear = function (x) {
        this.setYearIfPossible(this.displayedDate, x);
    };
    DejaDateSelectorComponent.prototype.updateHours = function (hours) {
        var d;
        if (hours === 24) {
            hours = 0;
        }
        if (this.selectedDate) {
            d = new Date(this.selectedDate);
        }
        else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }
        d.setHours(hours);
        this.value = d;
    };
    DejaDateSelectorComponent.prototype.updateMinutes = function (minutes) {
        var d;
        if (this.selectedDate) {
            d = new Date(this.selectedDate);
        }
        else {
            d = new Date();
            d.setHours(0, 0, 0, 0);
        }
        d.setMinutes(minutes);
        this.value = d;
    };
    DejaDateSelectorComponent.prototype.getHoursModel = function () {
        return this.displayedDate.getHours() || 24;
    };
    DejaDateSelectorComponent.prototype.bind = function () {
        var _this = this;
        var month = this.displayedDate.getMonth();
        var year = this.displayedDate.getFullYear();
        this.currentDays = this.getAllDaysInMonth(month, year);
        this.currentDays.forEach(function (day) { return day.disabled = _this.isDisabledDate(day.date); });
        for (var i = 0; i < 7; i++) {
            this.days[i] = this.currentDays[i].date.toLocaleString('fr', { weekday: 'narrow' });
        }
        if (this.selectedDate && this.selectedDate.getFullYear() === year && this.selectedDate.getMonth() === month) {
            var selectedDay_1 = this.selectedDate.getDate();
            this.currentDays.forEach(function (day) { return day.selected = day.date.getDate() === selectedDay_1 && day.date.getMonth() === month; });
        }
        this.changeDetectorRef.markForCheck();
    };
    DejaDateSelectorComponent.prototype.isDisabledDate = function (date) {
        if (this.disableDates && this.disableDates instanceof Array) {
            var find = this.disableDates.find(function (d) {
                if (typeof d === 'number') {
                    return d === date.getDay();
                }
                else {
                    return d.toLocaleDateString() === date.toLocaleDateString();
                }
            });
            if (typeof find !== 'undefined') {
                return true;
            }
        }
        if ((this.dateMax && date.getTime() > this.dateMax.getTime()) || (this.dateMin && date.getTime() < this.dateMin.getTime())) {
            return true;
        }
        return false;
    };
    DejaDateSelectorComponent.prototype.setDateIfPossible = function (date, num) {
        var d = new Date(date);
        d.setDate(d.getDate() + num);
        if ((this.dateMin && d.getTime() < this.dateMin.getTime()) || (this.dateMax && d.getTime() > this.dateMax.getTime())) {
            this.displayedDate = d;
            this.bind();
        }
        else if (this.disableDates && this.isDisabledDate(d)) {
            this.setDateIfPossible(d, num);
        }
        else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    };
    DejaDateSelectorComponent.prototype.setMonthIfPossible = function (date, num) {
        var d = new Date(date);
        d.setMonth(d.getMonth() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        }
        else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    };
    DejaDateSelectorComponent.prototype.setYearIfPossible = function (date, num) {
        var d = new Date(date);
        d.setFullYear(d.getFullYear() + num);
        if (this.disableDates && this.isDisabledDate(d)) {
            num = (num < 0) ? -1 : 1;
            this.setDateIfPossible(d, num);
        }
        else {
            this.selectedDate = d;
            this.displayedDate = d;
            this.bind();
        }
    };
    return DejaDateSelectorComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaDateSelectorComponent.prototype, "startDay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaDateSelectorComponent.prototype, "disableDates", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DejaDateSelectorComponent.prototype, "dateMax", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DejaDateSelectorComponent.prototype, "dateMin", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaDateSelectorComponent.prototype, "dateChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaDateSelectorComponent.prototype, "time", null);
DejaDateSelectorComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-date-time-selector',
        styleUrls: ['./date-selector.scss'],
        templateUrl: './date-selector.component.html',
    }),
    __param(2, Self()), __param(2, Optional()),
    __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef, NgControl])
], DejaDateSelectorComponent);
export { DejaDateSelectorComponent };
//# sourceMappingURL=date-selector.component.js.map