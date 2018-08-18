import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ChartComponent } from './chart/chart.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {ScheduleService} from "./services/schedule.service";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ScheduleFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AmazingTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
