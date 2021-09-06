import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxArcTextModule } from 'ngx-arc-text';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { DataService } from './services/data.service';
import { GeocodeService } from './services/geocode.service';
import { HomeComponent } from './home/home.component';
import { InfosComponent } from './infos/infos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxArcTextModule,
    AutocompleteLibModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    DataService,
    GeocodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
