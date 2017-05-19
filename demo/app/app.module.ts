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

import { DejaAccordionModule } from '../../index';
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
