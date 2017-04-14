import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { BaseModule } from './base/base.module';

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
