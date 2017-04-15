import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AutoHeightDirective } from './chat-area/auto-height.directive';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { MessagesService } from './chat-area/internal/messages.service';
import { SidebarComponent } from './sidebar/sidebar.component';

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
  ],
  providers: [
    MessagesService
  ]
})
export class CoreModule { }
