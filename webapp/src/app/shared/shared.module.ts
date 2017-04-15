import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { BaseModule } from './base/base.module';
import { DaySeparatorComponent } from './day-separator/day-separator.component';
import { SendIconComponent } from './icons/send-icon/send-icon.component';
import { DaySeparatorStaticComponent } from './day-separator-static/day-separator-static.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent,
  ],
  exports: [
    BaseModule,
    MessageBubbleComponent,
    DaySeparatorStaticComponent,
    DaySeparatorComponent,
    SendIconComponent
  ]
})
export class SharedModule { }
