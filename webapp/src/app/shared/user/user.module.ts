import { NgModule } from '@angular/core';

import { UserLoginGuard } from './user-login-guard.service';
import { UserService } from './user.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [UserService, UserLoginGuard],
})
export class UserModule { }
