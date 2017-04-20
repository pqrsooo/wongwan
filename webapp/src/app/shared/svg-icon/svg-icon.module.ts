import { NgModule } from '@angular/core';

import { SvgIconManagerService } from './svg-icon-manager.service';
import { SvgIconComponent } from './svg-icon.component';

@NgModule({
  imports: [],
  declarations: [SvgIconComponent],
  providers: [SvgIconManagerService],
  exports: [SvgIconComponent],
})
export class SvgIconModule { }
