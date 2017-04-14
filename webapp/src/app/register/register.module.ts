import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

@NgModule({
  imports: [RegisterRoutingModule, SharedModule],
  exports: [],
  declarations: [RegisterComponent],
  providers: [RegisterService],
})
export class RegisterModule { }
