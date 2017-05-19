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
    DejaCodeViewerModule,
    DejaCircularPickerModule,
    DejaDateSelectorModule,
    DejaDatePickerModule,
    DejaDialogModule,
    DejaSelectModule,
    DejaTreeListModule,
    DejaTilesModule,
    DejaColorSelectorModule,
    DejaColorPickerModule,
    DejaBoldQueryModule,
    DejaIFrameModule,
    DejaMarkdownModule,
    DejaMenuModule,
    DejaMessageBoxModule,
    DejaEditableModule,
    DejaDragDropModule,
    DejaBackdropModule,
    DejaGridModule,
    DejaSortingModule,
    DejaAutosizeTextAreaModule,
    DejaMonacoEditorModule,
    DejaSnackbarModule,
    DejaRangeModule,
    DejaSplitterModule,
    DejaTooltipModule,
    DejaViewPortModule,
    DejaChipsModule,
    DejaMouseDragDropModule,
} from '../../index';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
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
        DejaCodeViewerModule,
        DejaCircularPickerModule,
        DejaDateSelectorModule,
        DejaDatePickerModule,
        DejaDialogModule,
        DejaSelectModule,
        DejaTreeListModule,
        DejaTilesModule,
        DejaColorSelectorModule,
        DejaColorPickerModule,
        DejaBoldQueryModule,
        DejaIFrameModule,
        DejaMarkdownModule,
        DejaMenuModule,
        DejaMessageBoxModule,
        DejaEditableModule,
        DejaDragDropModule,
        DejaMouseDragDropModule.forRoot(),
        DejaBackdropModule,
        DejaGridModule,
        DejaSortingModule,
        DejaAutosizeTextAreaModule,
        DejaMonacoEditorModule,
        DejaSnackbarModule,
        DejaRangeModule,
        DejaSplitterModule,
        DejaTooltipModule,
        DejaViewPortModule,
        DejaChipsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
