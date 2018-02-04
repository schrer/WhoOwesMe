import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator.component';
import {DetailsComponent} from "./components/details.component";
import {CalcBackendService} from "./service/calc-backend.service";
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CalcBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
