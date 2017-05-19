var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';
var DejaAutosizeTextAreaDirective = DejaAutosizeTextAreaDirective_1 = (function () {
    function DejaAutosizeTextAreaDirective(elementRef) {
        this.elementRef = elementRef;
        this.resize$ = new Subject();
        var textAreaElement = this.elementRef.nativeElement;
        Observable.from(this.resize$)
            .first()
            .subscribe(function () {
            textAreaElement.setAttribute('rows', '1');
            textAreaElement.style.overflowY = 'hidden';
        });
        Observable.from(this.resize$)
            .debounceTime(5)
            .do(function () { return textAreaElement.style.height = '18px'; })
            .subscribe(function () {
            textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
        });
    }
    DejaAutosizeTextAreaDirective.prototype.ngAfterViewInit = function () {
        this.resize$.next();
    };
    DejaAutosizeTextAreaDirective.prototype.validate = function () {
        this.resize$.next();
        return null;
    };
    return DejaAutosizeTextAreaDirective;
}());
DejaAutosizeTextAreaDirective = DejaAutosizeTextAreaDirective_1 = __decorate([
    Directive({
        providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DejaAutosizeTextAreaDirective_1; }), multi: true },
        ],
        selector: 'textarea[deja-autosize]',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaAutosizeTextAreaDirective);
export { DejaAutosizeTextAreaDirective };
var DejaAutosizeTextAreaDirective_1;
//# sourceMappingURL=autosize-textarea.directive.js.map