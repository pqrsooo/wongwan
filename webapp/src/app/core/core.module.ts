import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';

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
