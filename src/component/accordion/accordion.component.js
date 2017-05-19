var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, Input, NgModule, ViewEncapsulation } from '@angular/core';
var DejaAccordionComponent = (function () {
    function DejaAccordionComponent() {
        this.groups = [];
    }
    DejaAccordionComponent.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    return DejaAccordionComponent;
}());
__decorate([
    HostBinding('class.accordion'),
    __metadata("design:type", Object)
], DejaAccordionComponent.prototype, "true", void 0);
DejaAccordionComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'deja-accordion',
        styleUrls: ['./accordion.component.scss'],
        template: '<ng-content></ng-content>',
    })
], DejaAccordionComponent);
export { DejaAccordionComponent };
var DejaAccordionGroupComponent = (function () {
    function DejaAccordionGroupComponent(accordion) {
        this.accordion = accordion;
        this.accordion.addGroup(this);
    }
    DejaAccordionGroupComponent.prototype.toggleOpen = function (event) {
        var target = event.target;
        var element = event.currentTarget;
        while (target.parentElement && target !== element) {
            if (target.localName === 'deja-accordion-header') {
                this.isOpen = !this.isOpen;
            }
            target = target.parentElement;
        }
    };
    return DejaAccordionGroupComponent;
}());
__decorate([
    HostBinding('class.open'), Input(),
    __metadata("design:type", Boolean)
], DejaAccordionGroupComponent.prototype, "isOpen", void 0);
__decorate([
    HostBinding('class.accordion-group'),
    __metadata("design:type", Object)
], DejaAccordionGroupComponent.prototype, "true", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], DejaAccordionGroupComponent.prototype, "toggleOpen", null);
DejaAccordionGroupComponent = __decorate([
    Component({
        selector: 'deja-accordion-group',
        template: '<ng-content></ng-content>',
    }),
    __metadata("design:paramtypes", [DejaAccordionComponent])
], DejaAccordionGroupComponent);
export { DejaAccordionGroupComponent };
var DejaAccordionHeaderComponent = (function () {
    function DejaAccordionHeaderComponent() {
    }
    return DejaAccordionHeaderComponent;
}());
__decorate([
    HostBinding('class.accordion-header'),
    __metadata("design:type", Object)
], DejaAccordionHeaderComponent.prototype, "true", void 0);
DejaAccordionHeaderComponent = __decorate([
    Component({
        selector: 'deja-accordion-header',
        template: "<ng-content></ng-content>",
    })
], DejaAccordionHeaderComponent);
export { DejaAccordionHeaderComponent };
var DejaAccordionBodyComponent = (function () {
    function DejaAccordionBodyComponent() {
    }
    return DejaAccordionBodyComponent;
}());
__decorate([
    HostBinding('class.accordion-body'),
    __metadata("design:type", Object)
], DejaAccordionBodyComponent.prototype, "true", void 0);
DejaAccordionBodyComponent = __decorate([
    Component({
        selector: 'deja-accordion-body',
        template: '<ng-content></ng-content>',
    })
], DejaAccordionBodyComponent);
export { DejaAccordionBodyComponent };
var DEJA_ACCORDION_DIRECTIVES = [DejaAccordionComponent, DejaAccordionGroupComponent, DejaAccordionHeaderComponent, DejaAccordionBodyComponent];
var DejaAccordionModule = (function () {
    function DejaAccordionModule() {
    }
    return DejaAccordionModule;
}());
DejaAccordionModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: DEJA_ACCORDION_DIRECTIVES,
        declarations: DEJA_ACCORDION_DIRECTIVES,
    })
], DejaAccordionModule);
export { DejaAccordionModule };
//# sourceMappingURL=accordion.component.js.map