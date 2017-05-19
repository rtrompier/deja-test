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
import { Directive, ElementRef, HostBinding, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core/index';
var noop = function () { };
var DejaEditableDirective = (function () {
    function DejaEditableDirective(elementRef, _control) {
        var _this = this;
        this._control = _control;
        this._inEdition = false;
        this._editMode = false;
        this._mandatory = false;
        this._multiline = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.edit$ = new BehaviorSubject([false, false]);
        this._disabled = null;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this.element = elementRef.nativeElement;
        Observable.fromEvent(this.element, 'mousedown')
            .subscribe(function (e) {
            if (_this.inEdition || _this.disabled) {
                e.cancelBubble = true;
                return false;
            }
            else if (_this.editMode) {
                _this.edit$.next([true, true]);
                e.cancelBubble = true;
                return false;
            }
        });
        var inEdition$ = Observable.from(this.edit$)
            .map(function (_a) {
            var value = _a[0], selectOnFocus = _a[1];
            if (selectOnFocus !== false) {
                Observable.timer(10)
                    .first()
                    .subscribe(function () {
                    _this.selectAll();
                    _this.focus();
                });
            }
            return value;
        })
            .do(function (value) {
            _this._inEdition = value;
            if (value) {
                _this.element.setAttribute('contenteditable', 'true');
            }
            else {
                _this.element.removeAttribute('contenteditable');
            }
        });
        var kill$ = inEdition$
            .filter(function (value) { return !value; });
        inEdition$
            .filter(function (value) { return value; })
            .subscribe(function () {
            Observable.fromEvent(_this.element.ownerDocument, 'mousedown')
                .takeUntil(kill$)
                .filter(function (event) { return !_this.isChildElement(event.target); })
                .subscribe(function () {
                var text = _this.element.innerText;
                _this.onTouchedCallback();
                if (text || !_this.mandatory) {
                    _this.value = text;
                }
                else {
                    _this.refreshView();
                }
                _this.inEdition = false;
            });
            Observable.fromEvent(_this.element, 'keydown')
                .takeUntil(kill$)
                .subscribe(function (e) {
                e.cancelBubble = true;
                e.stopPropagation();
                if (e.keyCode === KeyCodes.Enter && !_this.multiline) {
                    var text = _this.element.innerText;
                    if (text || !_this.mandatory) {
                        _this.value = text;
                    }
                    else {
                        _this.refreshView();
                    }
                    _this.inEdition = false;
                    return false;
                }
                else if (e.keyCode === KeyCodes.Escape) {
                    _this.refreshView();
                    _this.inEdition = false;
                    return false;
                }
                return false;
            });
        });
    }
    Object.defineProperty(DejaEditableDirective.prototype, "mandatory", {
        get: function () {
            return this._mandatory;
        },
        set: function (value) {
            this._mandatory = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "multiline", {
        get: function () {
            return this._multiline;
        },
        set: function (value) {
            this._multiline = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "disabled", {
        get: function () {
            return this._control ? this._control.disabled : this._disabled;
        },
        set: function (value) {
            var disabled = value != null && "" + value !== 'false';
            this._disabled = disabled || null;
            if (this.disabled) {
                this.edit$.next([false, false]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "editMode", {
        get: function () {
            return this._editMode;
        },
        set: function (value) {
            this._editMode = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "inEdition", {
        get: function () {
            return this._inEdition;
        },
        set: function (value) {
            if (this.disabled) {
                return;
            }
            this.edit$.next([value != null && "" + value !== 'false', false]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "value", {
        get: function () {
            return this.model;
        },
        set: function (model) {
            if (model !== this.model) {
                this.writeValue(model);
                this.onChangeCallback(model);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaEditableDirective.prototype.writeValue = function (value) {
        this.model = value;
        this.refreshView();
    };
    DejaEditableDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DejaEditableDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DejaEditableDirective.prototype.focus = function () {
        this.element.focus();
    };
    DejaEditableDirective.prototype.selectAll = function () {
        var range = document.createRange();
        range.selectNodeContents(this.element);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };
    DejaEditableDirective.prototype.edit = function (selectOnFocus) {
        this.edit$.next([!this.disabled, selectOnFocus]);
    };
    DejaEditableDirective.prototype.isChildElement = function (element) {
        var parentElement = element;
        while (parentElement && parentElement !== this.element) {
            parentElement = parentElement.parentElement;
        }
        return parentElement === this.element;
    };
    DejaEditableDirective.prototype.refreshView = function () {
        if (!this.model) {
            return;
        }
        this.element.innerText = this.model;
    };
    return DejaEditableDirective;
}());
__decorate([
    HostBinding('attr.disabled'),
    __metadata("design:type", Object)
], DejaEditableDirective.prototype, "_disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaEditableDirective.prototype, "mandatory", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaEditableDirective.prototype, "multiline", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaEditableDirective.prototype, "disabled", null);
__decorate([
    Input('deja-editable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaEditableDirective.prototype, "editMode", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaEditableDirective.prototype, "inEdition", null);
DejaEditableDirective = __decorate([
    Directive({
        selector: '[deja-editable]',
    }),
    __param(1, Self()), __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, NgControl])
], DejaEditableDirective);
export { DejaEditableDirective };
//# sourceMappingURL=content-editable.directive.js.map