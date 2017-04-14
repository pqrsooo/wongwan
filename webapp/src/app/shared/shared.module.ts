import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    MessageBubbleComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessageBubbleComponent
  ]
})
export class SharedModule { }
