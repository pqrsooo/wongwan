import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    ChatAreaComponent
  ],
  exports: [
    CommonModule,
    SidebarComponent,
    ChatAreaComponent
  ]
})
export class CoreModule { }
