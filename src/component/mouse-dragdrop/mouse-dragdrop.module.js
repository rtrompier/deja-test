var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { DejaMouseDraggableDirective } from './mouse-draggable.directive';
import { DejaMouseDroppableDirective } from './mouse-droppable.directive';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { DejaMouseDragDropCursorComponent } from './mouse-dragdrop-cursor.component';
var DejaMouseDragDropModule = DejaMouseDragDropModule_1 = (function () {
    function DejaMouseDragDropModule() {
    }
    DejaMouseDragDropModule.forRoot = function () {
        return {
            ngModule: DejaMouseDragDropModule_1,
            providers: [DejaMouseDragDropService],
        };
    };
    return DejaMouseDragDropModule;
}());
DejaMouseDragDropModule = DejaMouseDragDropModule_1 = __decorate([
    NgModule({
        declarations: [DejaMouseDraggableDirective, DejaMouseDroppableDirective, DejaMouseDragDropCursorComponent],
        exports: [DejaMouseDraggableDirective, DejaMouseDroppableDirective, DejaMouseDragDropCursorComponent],
        providers: [],
    })
], DejaMouseDragDropModule);
export { DejaMouseDragDropModule };
var DejaMouseDragDropModule_1;
//# sourceMappingURL=mouse-dragdrop.module.js.map