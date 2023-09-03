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

const routes: Routes = [
  {path: '', component: SearchBarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'post', component: CreatePropertyComponent, canActivate: [AuthGuard]},
  {path: 'saved', component: SavedPropertiesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
