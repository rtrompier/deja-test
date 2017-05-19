var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Diacritics } from '../../common/core/diacritics/index';
var DejaBoldQueryComponent = (function () {
    function DejaBoldQueryComponent() {
    }
    Object.defineProperty(DejaBoldQueryComponent.prototype, "query", {
        set: function (value) {
            value = Diacritics.remove(value);
            if (this._query !== value) {
                this._query = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "value", {
        set: function (value) {
            this._value = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    DejaBoldQueryComponent.prototype.refresh = function () {
        if (this._value && this._query && this._query.length) {
            var sc = new RegExp(this._query, 'i');
            var value_1 = this._value.toString();
            var search = Diacritics.remove(value_1);
            var splitted = search.split(sc);
            var position_1 = 0;
            var queryLength_1 = this._query.length;
            var contents_1 = [];
            splitted.forEach(function (text) {
                if (text) {
                    contents_1.push(value_1.slice(position_1, position_1 + text.length));
                    position_1 += text.length;
                }
                if (position_1 + queryLength_1 <= value_1.length) {
                    contents_1.push('<b>');
                    contents_1.push(value_1.slice(position_1, position_1 + queryLength_1));
                    contents_1.push('</b>');
                    position_1 += queryLength_1;
                }
            });
            this.content = contents_1.join('');
        }
        else {
            this.content = this._value;
        }
    };
    return DejaBoldQueryComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaBoldQueryComponent.prototype, "query", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaBoldQueryComponent.prototype, "value", null);
DejaBoldQueryComponent = __decorate([
    Component({
        selector: 'deja-bold-query',
        styleUrls: [
            './bold-query.component.scss',
        ],
        template: "<span [innerHTML]=\"content\"></span>",
    })
], DejaBoldQueryComponent);
export { DejaBoldQueryComponent };
//# sourceMappingURL=bold-query.component.js.map