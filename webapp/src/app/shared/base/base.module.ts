import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APISocketService } from './api-socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [],
  providers: [APISocketService],
})
export class BaseModule { }
