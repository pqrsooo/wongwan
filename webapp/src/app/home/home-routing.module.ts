import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './create-room/create-room.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-room', component: CreateRoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
