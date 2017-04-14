import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    ChatAreaComponent
  ],
  exports: [
    SidebarComponent,
    ChatAreaComponent
  ]
})
export class CoreModule { }
