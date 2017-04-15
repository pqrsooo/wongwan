import { NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BaseModule,
    UserModule
  ],
  declarations: [
    MessageBubbleComponent
  ],
  exports: [
    BaseModule,
    UserModule,
    MessageBubbleComponent
  ]
})
export class SharedModule { }
