import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APISocketService } from './api-socket.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [],
  providers: [APISocketService],
})
export class BaseModule { }
