import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AutoHeightDirective } from './chat-area/auto-height.directive';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { MessagesService } from './chat-area/internal/messages.service';
import { SidebarService } from './internal/sidebar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    ChatAreaComponent,
    AutoHeightDirective,
    TopNavigationBarComponent
  ],
  exports: [
    SidebarComponent,
    ChatAreaComponent,
    TopNavigationBarComponent
  ],
  providers: [
    MessagesService,
    SidebarService
  ]
})
export class CoreModule { }
