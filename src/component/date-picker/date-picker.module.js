var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DejaBackdropModule } from '../backdrop';
import { DejaCircularPickerModule } from '../circular-picker/circular-picker.module';
import { DejaDateSelectorModule } from '../date-selector';
import { DejaDropDownModule } from '../dropdown';
import { DejaDatePickerComponent } from './date-picker.component';
var DejaDatePickerModule = (function () {
    function DejaDatePickerModule() {
    }
    return DejaDatePickerModule;
}());
DejaDatePickerModule = __decorate([
    NgModule({
        declarations: [DejaDatePickerComponent],
        exports: [DejaDatePickerComponent],
        imports: [
            CommonModule,
            FormsModule,
            MdIconModule,
            MdInputModule,
            MdButtonModule,
            DejaBackdropModule,
            DejaCircularPickerModule,
            DejaDateSelectorModule,
            DejaDropDownModule,
            TextMaskModule,
        ],
    })
], DejaDatePickerModule);
export { DejaDatePickerModule };
//# sourceMappingURL=date-picker.module.js.map