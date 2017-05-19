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
import { Component, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Color, ColorEvent } from '../../common/core/graphics/index';
import { DejaColorFab } from './index';
var noop = function () { };
var DejaColorSelectorComponent = DejaColorSelectorComponent_1 = (function () {
    function DejaColorSelectorComponent(elementRef, _control) {
        var _this = this;
        this._control = _control;
        this.colorhover = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._colors$ = new BehaviorSubject([]);
        this._colorFabs = [];
        this._subColorFabs = [];
        this._selectedBaseIndex = 0;
        this._disabled = false;
        this.selectedBaseIndex$ = new BehaviorSubject(0);
        this.selectedSubIndex$ = new BehaviorSubject(0);
        this.hilightedBaseIndex$ = new Subject();
        this.hilightedSubIndex$ = new Subject();
        var element = elementRef.nativeElement;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this.colorFabs$ = Observable.from(this._colors$)
            .map(function (colors) { return colors.map(function (color, index) { return new DejaColorFab(color, _this._disabled, index === _this._selectedBaseIndex); }); })
            .do(function (colorFabs) { return _this._colorFabs = colorFabs; });
        var hilightedBaseIndex$ = Observable.from(this.hilightedBaseIndex$)
            .distinctUntilChanged()
            .debounce(function (colorIndex) { return Observable.timer(colorIndex !== undefined ? 100 : 1000); })
            .do(function (colorIndex) {
            _this.hilightedBaseIndex = colorIndex;
            if (colorIndex) {
                var subColor = _this._colorFabs && _this._colorFabs[colorIndex] && _this._colorFabs[colorIndex].color;
                _this.colorhover.emit(new ColorEvent(subColor));
            }
            else {
                _this.colorhover.emit(new ColorEvent(_this.value));
            }
        })
            .map(function (colorIndex) { return colorIndex !== undefined ? colorIndex : _this._selectedBaseIndex || 0; });
        var selectedBaseIndex$ = Observable.from(this.selectedBaseIndex$)
            .do(function (colorIndex) { return _this._selectedBaseIndex = colorIndex; });
        this.subColorFabs$ = Observable.merge(hilightedBaseIndex$, selectedBaseIndex$)
            .distinctUntilChanged()
            .do(function (colorIndex) {
            if (_this._colorFabs) {
                _this._colorFabs.forEach(function (colorFab, index) { return colorFab.active$.next(index === colorIndex); });
            }
        })
            .debounceTime(100)
            .do(function () { return element.setAttribute('sub-tr', ''); })
            .map(function (baseIndex) { return _this._colorFabs && _this._colorFabs[baseIndex] && _this._colorFabs[baseIndex].color.subColors; })
            .map(function (colors) { return colors && colors.map(function (color, index) { return new DejaColorFab(color, _this._disabled, index === _this._selectedSubIndex); }); })
            .do(function (subColorFabs) {
            _this._subColorFabs = subColorFabs;
            Observable.timer(100).first().subscribe(function () {
                element.removeAttribute('sub-tr');
            });
        });
        var hilightedSubIndex$ = Observable.from(this.hilightedSubIndex$)
            .distinctUntilChanged()
            .debounce(function (subColorIndex) { return Observable.timer(subColorIndex !== undefined ? 200 : 1100); })
            .do(function (subColorIndex) {
            _this.hilightedSubIndex = subColorIndex;
            if (subColorIndex !== undefined) {
                var subColor = _this._subColorFabs && _this._subColorFabs[subColorIndex] && _this._subColorFabs[subColorIndex].color;
                _this.colorhover.emit(new ColorEvent(subColor));
            }
            else {
                _this.colorhover.emit(new ColorEvent(_this.value));
            }
        })
            .map(function (subColorIndex) { return subColorIndex !== undefined ? subColorIndex : _this._selectedSubIndex || 0; });
        var selectedSubIndex$ = Observable.from(this.selectedSubIndex$)
            .distinctUntilChanged()
            .do(function (subColorIndex) { return _this._selectedSubIndex = subColorIndex; });
        Observable.merge(hilightedSubIndex$, selectedSubIndex$)
            .subscribe(function (subColorIndex) {
            if (_this._subColorFabs) {
                _this._subColorFabs.forEach(function (colorFab, index) { return colorFab.active$.next(index === subColorIndex); });
            }
        });
        Observable.fromEvent(element, 'mousemove')
            .filter(function (_event) { return !_this._disabled; })
            .subscribe(function (event) {
            var _a = event.target, id = _a.id, attributes = _a.attributes;
            var targetIndex = attributes[DejaColorSelectorComponent_1.indexAttribute];
            if (id === 'basecolor') {
                _this.hilightedBaseIndex$.next(+targetIndex.value);
                _this.hilightedSubIndex$.next(_this.hilightedSubIndex);
            }
            else if (id === 'subcolor') {
                _this.hilightedBaseIndex$.next(_this.hilightedBaseIndex);
                _this.hilightedSubIndex$.next(+targetIndex.value);
            }
            else {
                _this.hilightedBaseIndex$.next();
                _this.hilightedSubIndex$.next();
            }
        });
        Observable.fromEvent(element, 'click')
            .filter(function (_event) { return !_this._disabled; })
            .subscribe(function (event) {
            var target = event.target;
            if (target.id === 'basecolor' || target.id === 'subcolor') {
                _this.value = Color.parse(target.style.backgroundColor);
            }
        });
    }
    Object.defineProperty(DejaColorSelectorComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            var disabled = (value != null && "" + value !== 'false');
            if (this._colorFabs) {
                this._colorFabs.forEach(function (colorFab) { return colorFab.disabled = disabled; });
            }
            if (this._subColorFabs) {
                this._subColorFabs.forEach(function (colorFab) { return colorFab.disabled = disabled; });
            }
            this._disabled = disabled || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "colors", {
        set: function (colors) {
            this._colors$.next(colors);
            this.selectedBaseIndex$.next(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "selectedColor", {
        set: function (color) {
            var _this = this;
            if (this._colorFabs) {
                var find = this._colorFabs.find(function (colorFab, index) {
                    var baseColor = colorFab.color;
                    var subIndex = baseColor.subColors && baseColor.subColors.findIndex(function (subColor) { return Color.equals(subColor, color); });
                    if (subIndex !== undefined && subIndex >= 0) {
                        _this.selectedBaseIndex$.next(index);
                        Observable.timer(1).first().subscribe(function () { return _this.selectedSubIndex$.next(subIndex); });
                        return true;
                    }
                    else if (Color.equals(baseColor, color)) {
                        _this.selectedBaseIndex$.next(index);
                        Observable.timer(1).first().subscribe(function () { return _this.selectedSubIndex$.next(0); });
                        return true;
                    }
                    return false;
                });
                if (!find) {
                    this.selectedBaseIndex$.next(0);
                    Observable.timer(1).first().subscribe(function () { return _this.selectedSubIndex$.next(0); });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (!Color.equals(value, this._value)) {
                this.writeValue(value);
                this.onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaColorSelectorComponent.prototype.writeValue = function (value) {
        this.selectedColor = value;
    };
    DejaColorSelectorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaColorSelectorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return DejaColorSelectorComponent;
}());
DejaColorSelectorComponent.indexAttribute = 'index';
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaColorSelectorComponent.prototype, "colorhover", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaColorSelectorComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaColorSelectorComponent.prototype, "colors", null);
DejaColorSelectorComponent = DejaColorSelectorComponent_1 = __decorate([
    Component({
        selector: 'deja-color-selector',
        styleUrls: [
            './color-selector.component.scss',
        ],
        templateUrl: './color-selector.component.html',
    }),
    __param(1, Self()), __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, NgControl])
], DejaColorSelectorComponent);
export { DejaColorSelectorComponent };
var DejaColorSelectorComponent_1;
//# sourceMappingURL=color-selector.component.js.map