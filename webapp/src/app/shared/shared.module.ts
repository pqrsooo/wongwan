import { NgModule } from '@angular/core';

import { BaseModule } from './base/base.module';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    MessageBubbleComponent
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent
  ]
})
export class SharedModule { }
