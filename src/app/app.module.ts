import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from 'ngx-datatable-bootstrap4';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {DbOperationsService} from './db-operations.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  providers: [DbOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
