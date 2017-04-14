import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginModule } from "app/login/login.module";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
