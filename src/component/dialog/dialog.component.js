var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementRef } from '@angular/core';
import { Component, ContentChild, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core/keycodes.enum';
var DejaDialogComponent = (function () {
    function DejaDialogComponent(elementRef) {
        var _this = this;
        this.closed = new EventEmitter();
        var element = elementRef.nativeElement;
        Observable.fromEvent(element.ownerDocument, 'keyup')
            .filter(function (event) { return !!(event.keyCode === KeyCodes.Enter && _this.okButton && _this.okButton._elementRef) || !!(event.keyCode === KeyCodes.Escape && _this.cancelButton && _this.cancelButton._elementRef); })
            .subscribe(function (event) {
            if (event.keyCode === KeyCodes.Enter) {
                _this.okButton._elementRef.nativeElement.click();
            }
            if (event.keyCode === KeyCodes.Escape) {
                _this.cancelButton._elementRef.nativeElement.click();
            }
        });
    }
    DejaDialogComponent.prototype.close = function (event) {
        event.preventDefault();
        var close = true;
        var target = event.target;
        var element = event.currentTarget;
        while (target.parentElement && target !== element) {
            if (target.className === 'dialog') {
                close = false;
            }
            target = target.parentElement;
        }
        if (close) {
            this.closed.emit();
        }
    };
    return DejaDialogComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaDialogComponent.prototype, "closed", void 0);
__decorate([
    ContentChild('okaction'),
    __metadata("design:type", Object)
], DejaDialogComponent.prototype, "okButton", void 0);
__decorate([
    ContentChild('cancelaction'),
    __metadata("design:type", Object)
], DejaDialogComponent.prototype, "cancelButton", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], DejaDialogComponent.prototype, "close", null);
DejaDialogComponent = __decorate([
    Component({
        selector: 'deja-dialog',
        styleUrls: ['./dialog.component.scss'],
        templateUrl: './dialog.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaDialogComponent);
export { DejaDialogComponent };
//# sourceMappingURL=dialog.component.js.map