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
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper'
import {MatRadioModule} from '@angular/material/radio';

import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { RegisterComponent} from "./components/register/register.component";
import { DisplayPropertiesComponent } from "./components/display-properties/display-properties.component";
import { PropertyComponent } from "./components/property/property.component";
import { LoginComponent} from "./components/login/login.component";

import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {LayoutComponent} from "./components/layout/layout.component";
import {CreatePropertyComponent} from "./components/create-property/create-property.component";
import {SavedPropertiesComponent} from "./components/saved-properties/saved-properties.component";
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {CreatePropertyDialogComponent} from "./components/create-property-dialog/create-property-dialog.component";
import {CreatePropertyMapComponent} from "./components/create-property-map/create-property-map.component";
import {MatPaginatorModule} from '@angular/material/paginator';
import {PropertiesMapComponent} from "./components/properties-map/properties-map.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PropertyDetailsComponent} from "./components/property-details/property-details.component";
import {FormatImageUrlPipe} from "./pipes/format-image-url..pipe";
import {MarkerPopupComponent} from "./components/marker-popup/marker-popup.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from "./components/profile/profile-component";
import {MatTabsModule} from '@angular/material/tabs';
import {DisplayHistoryComponent} from "./components/display-history/display-history.component";
import {FavouritesComponent} from "./components/profile-favourites/favourites.component";
import {UserPropertiesComponent} from "./components/display-user-properties/user-properties.component";
import {BookingsComponent} from "./components/display-bookings/bookings.component";




@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NavigationComponent,
    RegisterComponent,
    DisplayPropertiesComponent,
    PropertyComponent,
    LoginComponent,
    LayoutComponent,
    CreatePropertyComponent,
    SavedPropertiesComponent,
    CreatePropertyDialogComponent,
    CreatePropertyMapComponent,
    PropertyDetailsComponent,
    PropertiesMapComponent,
    FormatImageUrlPipe,
    MarkerPopupComponent,
    ProfileComponent,
    DisplayHistoryComponent,
    FavouritesComponent,
    UserPropertiesComponent,
    BookingsComponent,
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
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    FormsModule,
    MatStepperModule,
    MatRadioModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    NgbModule,
    MatTabsModule,
  ],
  providers: [
    // {
    //   provide: MAP_SERVICE_TOKEN,
    //   useClass: MapService,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
