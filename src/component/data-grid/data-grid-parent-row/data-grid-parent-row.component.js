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
import { IDejaGridParentRow } from '../index';
var DejaGridParentRowComponent = (function () {
    function DejaGridParentRowComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.columnLayout = {};
    }
    Object.defineProperty(DejaGridParentRowComponent.prototype, "columns", {
        set: function (columns) {
            var _this = this;
            var left = 0;
            this.columnLayout.columns = [];
            columns.forEach(function (column) {
                if (_this.row[column.name]) {
                    if (_this.columnLayout.column0 === 0) {
                        _this.columnLayout.column0 = left;
                    }
                    _this.columnLayout.columns.push({
                        column: column,
                        left: left,
                    });
                }
                left += column.w;
            });
            this.columnLayout.column0 = left;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "cellTemplate", {
        get: function () {
            return this.cellTemplateExternal || this.cellTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "parentTitleTemplate", {
        get: function () {
            return this.parentTitleTemplateExternal || this.parentTitleTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    return DejaGridParentRowComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", IDejaGridParentRow)
], DejaGridParentRowComponent.prototype, "row", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridParentRowComponent.prototype, "cellTemplateExternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaGridParentRowComponent.prototype, "parentTitleTemplateExternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaGridParentRowComponent.prototype, "flatIndex", void 0);
__decorate([
    ContentChild('parentTitleTemplate'),
    __metadata("design:type", Object)
], DejaGridParentRowComponent.prototype, "parentTitleTemplateInternal", void 0);
__decorate([
    ContentChild('cellTemplate'),
    __metadata("design:type", Object)
], DejaGridParentRowComponent.prototype, "cellTemplateInternal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaGridParentRowComponent.prototype, "columns", null);
DejaGridParentRowComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'deja-grid-parent-row',
        styleUrls: ['./data-grid-parent-row.component.scss'],
        templateUrl: './data-grid-parent-row.component.html',
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], DejaGridParentRowComponent);
export { DejaGridParentRowComponent };
//# sourceMappingURL=data-grid-parent-row.component.js.map