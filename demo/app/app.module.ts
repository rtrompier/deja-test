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

// import { 
//     DejaAccordionModule,
    // DejaCodeViewerModule,
    // DejaCircularPickerModule,
    // DejaDateSelectorModule,
    // DejaDatePickerModule,
    // DejaDialogModule,
    // DejaSelectModule,
    // DejaTreeListModule,
    // DejaTilesModule,
    // DejaColorSelectorModule,
    // DejaColorPickerModule,
    // DejaBoldQueryModule,
    // DejaIFrameModule,
    // DejaMarkdownModule,
    // DejaMenuModule,
    // DejaMessageBoxModule,
    // DejaEditableModule,
    // DejaDragDropModule,
    // DejaBackdropModule,
    // DejaGridModule,
    // DejaSortingModule,
    // DejaAutosizeTextAreaModule,
    // DejaMonacoEditorModule,
    // DejaSnackbarModule,
    // DejaRangeModule,
    // DejaSplitterModule,
    // DejaTooltipModule,
    // DejaViewPortModule,
    // DejaChipsModule,
    // DejaMouseDragDropModule,
// } from '../../dist';

// import { DejaAccordionModule } from '../../src/index'; //Long au build | Long au rebuild
// import { DejaAccordionModule } from '../../src/component/accordion/index'; //Long au build | rapide au rebuild
import { DejaAccordionModule } from '../../dist'; //Long au build | Long au rebuild


// import { DejaSelectModule } from '../../src/component/select/index';
// import { DejaMarkdownModule } from '../../src/component/markdown/index';
// import { DejaMouseDragDropModule } from '../../src/component/mouse-dragdrop/index';
// import { DejaGridModule } from '../../src/component/data-grid/index';

import { HomeComponent } from './home/home.component';
import { HomeComponentsComponent } from './home-components/home-components.component';
import { HomeGuidesComponent } from './home-guides/home-guides.component';
import { DejaAccordionDemoComponent } from './accordion/accordion-demo.component';

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
        // DejaSelectModule,
        // DejaMarkdownModule,
        // DejaMouseDragDropModule.forRoot(),
        // DejaGridModule,
        // DejaIFrameModule,
        // DejaBackdropModule,

        /*DejaCodeViewerModule,
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
        DejaChipsModule,*/
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
