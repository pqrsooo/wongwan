import { NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { TopNavigationButtonComponent } from './buttons/top-navigation-button/top-navigation-button.component';
import { DaySeparatorStaticComponent } from './day-separator-static/day-separator-static.component';
import { DaySeparatorComponent } from './day-separator/day-separator.component';
import { JoinGroupIconComponent } from './icons/join-group-icon/join-group-icon.component';
import { NewChatIconComponent } from './icons/new-chat-icon/new-chat-icon.component';
import { SendIconComponent } from './icons/send-icon/send-icon.component';
import { MessageBubbleCornerComponent } from './message-bubble/message-bubble-corner/message-bubble-corner.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { SvgIconModule } from './svg-icon/svg-icon.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BaseModule,
    UserModule,
    SvgIconModule
  ],
  declarations: [
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent,
    MessageBubbleCornerComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
    NewChatIconComponent,
    JoinGroupIconComponent,
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent,
    ProfileImgComponent,
    TopNavigationButtonComponent,
    UserModule,
    NewChatIconComponent,
    JoinGroupIconComponent,
    SvgIconModule
  ]
})
export class SharedModule { }
