import { NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { DaySeparatorStaticComponent } from './day-separator-static/day-separator-static.component';
import { DaySeparatorComponent } from './day-separator/day-separator.component';
import { SendIconComponent } from './icons/send-icon/send-icon.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BaseModule,
    UserModule
  ],
  declarations: [
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent,
    UserModule
  ]
})
export class SharedModule { }
