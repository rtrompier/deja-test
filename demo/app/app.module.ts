import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MdToolbarModule } from '@angular/material';
import { SampleModule } from '../../src';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    FormsModule,
    HttpModule,
    SampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
