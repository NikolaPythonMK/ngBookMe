import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import {LoginComponent} from "./components/register/login.component";
import {PropertyComponent} from "./components/property/property.component";
import {DisplayPropertiesComponent} from "./components/display-properties/display-properties.component";

const routes: Routes = [
  {path: '', component: SearchBarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test', component: DisplayPropertiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
