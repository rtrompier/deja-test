import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from './route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

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
// } from '../../dist';
} from '../../src/index';

// import { HomeComponent } from './home/home.component';
// import { HomeComponentsComponent } from './home-components/home-components.component';
// import { HomeGuidesComponent } from './home-guides/home-guides.component';

@NgModule({
    declarations: [
        AppComponent,
        // HomeComponent,
        // HomeComponentsComponent,
        // HomeGuidesComponent,
        // DejaAccordionDemoComponent,
    ],
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        // RouterModule,
        // routing,

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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
