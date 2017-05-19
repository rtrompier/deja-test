var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
var DejaTextMetricsService = (function () {
    function DejaTextMetricsService() {
        var _this = this;
        this.element$ = new Subject();
        this.charSize$ = new BehaviorSubject(null);
        Observable.from(this.element$)
            .delay(1)
            .first()
            .subscribe(function (element) {
            var charSize = [];
            for (var i = 0; i < 255; i++) {
                var c = String.fromCharCode(i);
                charSize[i] = _this.getTextWidth(c, element);
            }
            _this.charSize$.next(charSize);
        });
    }
    Object.defineProperty(DejaTextMetricsService.prototype, "metricsElem", {
        set: function (elem) {
            this.element$.next(elem);
        },
        enumerable: true,
        configurable: true
    });
    DejaTextMetricsService.prototype.getTextWidth = function (text, elem) {
        this.computedStyles = window.getComputedStyle(elem);
        var font = this.computedStyles.fontSize + ' ' + this.computedStyles.fontFamily;
        var canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        var context = canvas.getContext('2d');
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width * 1.1;
    };
    DejaTextMetricsService.prototype.getTextMaxWidth = function (texts, elem) {
        var _this = this;
        var maxWidth = 0;
        texts.forEach(function (text) {
            var width = _this.getTextWidth(text, elem);
            if (width > maxWidth) {
                maxWidth = width;
            }
        });
        return maxWidth;
    };
    DejaTextMetricsService.prototype.getTextHeight = function (maxWidth, text) {
        var _this = this;
        return this.getNumberOfLines(maxWidth, text)
            .map(function (numberOfLines) {
            var computedLineHeight = parseInt(_this.computedStyles.lineHeight.replace('px', ''), 10);
            var lineHeight = (!isNaN(computedLineHeight)) ?
                computedLineHeight :
                Math.floor(parseInt(_this.computedStyles.fontSize.replace('px', ''), 10) * 1.5);
            return lineHeight * +numberOfLines;
        });
    };
    DejaTextMetricsService.prototype.getNumberOfLines = function (maxWidth, text) {
        return this.charSize$
            .filter(function (charSize) { return charSize !== null; })
            .map(function (charSize) {
            var arr = text.split(' ');
            var tmpSize = 0;
            var numberOfLines = 1;
            arr.forEach(function (txt) {
                var w = 0;
                for (var j = 0; j < txt.length; j++) {
                    var charCode = txt.charCodeAt(j);
                    w += (charSize[charCode]) ? charSize[charCode] : charSize.reduce(function (a, b) { return a + b; }, 0) / charSize.length;
                }
                if (tmpSize + w > maxWidth) {
                    tmpSize = w;
                    numberOfLines++;
                }
                else {
                    tmpSize += w;
                }
            });
            return numberOfLines;
        });
    };
    return DejaTextMetricsService;
}());
DejaTextMetricsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DejaTextMetricsService);
export { DejaTextMetricsService };
//# sourceMappingURL=text-metrics.service.js.map