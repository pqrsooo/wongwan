import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CreateRoomService } from './create-room/create-room.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { JoinRoomComponent } from './join-room/join-room.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, CoreModule],
  exports: [],
  declarations: [HomeComponent, CreateRoomComponent, JoinRoomComponent],
  providers: [CreateRoomService],
})
export class HomeModule { }
