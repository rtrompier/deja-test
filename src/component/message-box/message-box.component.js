var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChild, Input } from '@angular/core';
var DejaMessageBoxComponent = (function () {
    function DejaMessageBoxComponent() {
    }
    Object.defineProperty(DejaMessageBoxComponent.prototype, "horizontal", {
        get: function () {
            return this._horizontal;
        },
        set: function (value) {
            this._horizontal = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    DejaMessageBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.icon && this.type) {
            this.icon = this.getIconFromType(this.type);
        }
        if (this.actions) {
            this.actions.forEach(function (action) {
                if (!action.icon && action.type) {
                    action.icon = _this.getIconFromType(action.type);
                }
            });
        }
    };
    DejaMessageBoxComponent.prototype.getIconFromType = function (type) {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary';
                return 'info_outline';
            case 'success':
                return 'check';
            case 'warn':
                return 'warning';
            case 'danger':
                return 'error_outline';
            default:
                return null;
        }
    };
    return DejaMessageBoxComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMessageBoxComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMessageBoxComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMessageBoxComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaMessageBoxComponent.prototype, "actions", void 0);
__decorate([
    ContentChild('actionsTemplate'),
    __metadata("design:type", Object)
], DejaMessageBoxComponent.prototype, "actionsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaMessageBoxComponent.prototype, "horizontal", null);
DejaMessageBoxComponent = __decorate([
    Component({
        selector: 'deja-message-box',
        styleUrls: ['./message-box.component.scss'],
        templateUrl: './message-box.component.html',
    }),
    __metadata("design:paramtypes", [])
], DejaMessageBoxComponent);
export { DejaMessageBoxComponent };
//# sourceMappingURL=message-box.component.js.map