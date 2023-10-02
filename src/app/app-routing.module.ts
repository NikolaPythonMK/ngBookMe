import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import {RegisterComponent} from "./components/register/register.component";
import {PropertyComponent} from "./components/property/property.component";
import {DisplayPropertiesComponent} from "./components/display-properties/display-properties.component";
import {LoginComponent} from "./components/login/login.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {CreatePropertyComponent} from "./components/create-property/create-property.component";
import {AuthGuard} from "./guards/AuthGuard";
import {SavedPropertiesComponent} from "./components/saved-properties/saved-properties.component";
import {PropertyDetailsComponent} from "./components/property-details/property-details.component";
import {ProfileComponent} from "./components/profile/profile-component";
import {DisplayHistoryComponent} from "./components/display-history/display-history.component";
import {FavouritesComponent} from "./components/profile-favourites/favourites.component";
import {UserPropertiesComponent} from "./components/display-user-properties/user-properties.component";
import {BookingsComponent} from "./components/display-bookings/bookings.component";
import {PropertyUpdateComponent} from "./components/property-update/property-update.component";
import {HelpAndSupportComponent} from "./components/help-and-support/help-and-support.component";
import {ResetPasswordDialogComponent} from "./components/reset-password-dialog/reset-password-dialog.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  {path: '', component: SearchBarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'post', component: CreatePropertyComponent, canActivate: [AuthGuard]},
  {path: 'saved', component: SavedPropertiesComponent, canActivate: [AuthGuard]},
  {path: 'property/:id', component: PropertyDetailsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      {path: 'recently-viewed', component: DisplayHistoryComponent},
      {path: 'bookmarks', component: FavouritesComponent},
      {path: 'my-properties', component: UserPropertiesComponent},
      {path: 'bookings', component: BookingsComponent}
    ]
  },
  {path: 'update/:id', component: PropertyUpdateComponent},
  {path: 'help-and-support', component: HelpAndSupportComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
