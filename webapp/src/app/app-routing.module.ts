import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginGuard } from './shared/user/user-login-guard.service';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule', canActivate: [UserLoginGuard]},
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'register', loadChildren: 'app/register/register.module#RegisterModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
