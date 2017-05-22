import { MaterialColors } from '../../src/common/core/style/material-colors';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routing } from './route';

import { AppComponent } from './app.component';

import {
    DejaAccordionModule,
    DejaAutosizeTextAreaModule,
    DejaBackdropModule,
    DejaChipsModule,
    DejaCircularPickerModule,
    DejaCodeViewerModule,
    DejaColorPickerModule,
    DejaColorSelectorModule,
    DejaDatePickerModule,
    DejaDateSelectorModule,
    DejaDialogModule,
    DejaDragDropModule,
    DejaDropDownModule,
    DejaEditableModule,
    DejaGridModule,
    DejaIFrameModule,
    DejaListLoaderModule,
    DejaMarkdownModule,
    DejaMenuModule,
    DejaMessageBoxModule,
    DejaMonacoEditorModule,
    DejaMouseDragDropModule,
    DejaRangeModule,
    DejaSelectModule,
    DejaSnackbarModule,
    DejaSplitterModule,
    DejaTilesModule,
    DejaTooltipModule,
    DejaTreeListModule,
    DejaViewPortModule,
// } from '../../dist';
} from '../../src/index';

import { HomeComponentsComponent } from './home-components/home-components.component';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { HomeComponent } from './home/home.component';

import { DejaAccordionDemoComponent } from './accordion/accordion-demo.component';
import { DejaCircularPickerDemoComponent } from './circular-picker/circular-picker-demo';
import { DejaColorSelectorDemoComponent } from './color-selector/color-selector-demo';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HomeComponentsComponent,
        HomeGuidesComponent,
        DejaAccordionDemoComponent,
        DejaCircularPickerDemoComponent,
        DejaColorSelectorDemoComponent
    ],
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        routing,

        MaterialModule,
        FlexLayoutModule,

        DejaAccordionModule,
        DejaAutosizeTextAreaModule,
        DejaBackdropModule,
        DejaChipsModule,
        DejaCircularPickerModule,
        DejaCodeViewerModule,
        DejaColorPickerModule,
        DejaColorSelectorModule,
        DejaEditableModule,
        DejaGridModule,
        DejaDatePickerModule,
        DejaDateSelectorModule,
        DejaDialogModule,
        DejaDragDropModule,
        DejaDropDownModule,
        DejaIFrameModule,
        DejaListLoaderModule,
        DejaMarkdownModule,
        DejaMenuModule,
        DejaMessageBoxModule,
        DejaMonacoEditorModule,
        DejaMouseDragDropModule,
        DejaRangeModule,
        DejaSelectModule,
        DejaSnackbarModule,
        DejaSplitterModule,
        DejaTilesModule,
        DejaTooltipModule,
        DejaTreeListModule,
        DejaViewPortModule,
    ],
    providers: [
        MaterialColors,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
