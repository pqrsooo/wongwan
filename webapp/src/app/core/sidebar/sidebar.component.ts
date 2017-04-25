import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChatRoomInfo } from '../internal/chat-room-info.model';
import { SidebarService } from '../internal/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  roomInfos$: Observable<ChatRoomInfo[]>;

  constructor(private sidebar: SidebarService) { }

  ngOnInit() {
    this.roomInfos$ = this.sidebar.getServerRoomList().share();
  }
}
