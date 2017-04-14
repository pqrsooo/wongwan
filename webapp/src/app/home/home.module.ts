import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, CoreModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule { }
