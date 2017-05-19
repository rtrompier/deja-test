var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IDejaGridColumnLayout } from '../index';
var DejaGridRowComponent = (function () {
    function DejaGridRowComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this._columnLayout = {};
    }
    Object.defineProperty(DejaGridRowComponent.prototype, "columnLayout", {
        get: function () {
            return this._columnLayout;
        },
        set: function (layout) {
            var _this = this;
            if (this.refresh$sub) {
                this.refresh$sub.unsubscribe();
                this.refresh$sub = undefined;
            }
            this._columnLayout = layout || {
                columns: [],
                scrollLeft: 0,
                vpAfterWidth: 0,
                vpBeforeWidth: 0,
                refresh$: undefined,
            };
            if (this._columnLayout.refresh$) {
                this.refresh$sub = Observable.from(this._columnLayout.refresh$)
                    .subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridRowComponent.prototype, "cellTemplate", {
        get: function () {
            return this.cellTemplateExternal || this.cellTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    return DejaGridRowComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridRowComponent.prototype, "row", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridRowComponent.prototype, "cellTemplateExternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaGridRowComponent.prototype, "flatIndex", void 0);
__decorate([
    ContentChild('cellTemplate'),
    __metadata("design:type", Object)
], DejaGridRowComponent.prototype, "cellTemplateInternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", IDejaGridColumnLayout),
    __metadata("design:paramtypes", [IDejaGridColumnLayout])
], DejaGridRowComponent.prototype, "columnLayout", null);
DejaGridRowComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-grid-row',
        styleUrls: ['./data-grid-row.component.scss'],
        templateUrl: './data-grid-row.component.html',
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], DejaGridRowComponent);
export { DejaGridRowComponent };
//# sourceMappingURL=data-grid-row.component.js.map