import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { AutoHeightDirective } from './chat-area/auto-height.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    ChatAreaComponent,
    AutoHeightDirective
  ],
  exports: [
    SidebarComponent,
    ChatAreaComponent
  ]
})
export class CoreModule { }
