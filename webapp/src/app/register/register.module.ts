import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterService } from './register.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [RegisterRoutingModule, SharedModule],
  exports: [],
  declarations: [RegisterComponent],
  providers: [RegisterService],
})
export class RegisterModule { }
