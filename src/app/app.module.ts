import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCardModule} from '@angular/material/card';

import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LoginComponent} from "./components/register/login.component";
import { DisplayPropertiesComponent } from "./components/display-properties/display-properties.component";
import { PropertyComponent } from "./components/property/property.component";

import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NavigationComponent,
    LoginComponent,
    DisplayPropertiesComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
