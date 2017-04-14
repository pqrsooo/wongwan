import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [LoginRoutingModule, SharedModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule { }
