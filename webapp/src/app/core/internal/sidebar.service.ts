import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { APISocketService } from '../../shared/base/api-socket.service';
import { APIService } from '../../shared/base/api.service';
import { ChatRoomInfo, ServerChatRooms } from './chat-room-info.model';

@Injectable()
export class SidebarService {
  private leaveRoomSubject = new Subject<string>();
  readonly serverRoomList$: Observable<ChatRoomInfo[]>;

  constructor(private api: APIService, private socket: APISocketService) {
    this.serverRoomList$ = this.api.requestGET<ServerChatRooms>('/api/chatroom/get-chatroom')
      .map((serverResponse) => serverResponse.chatRooms.map(chatroom => new ChatRoomInfo(chatroom)))
      .mergeMap((rooms) => (
        this.leaveRoomSubject
          .startWith(undefined)
          .scan((currentRooms: ChatRoomInfo[], deleteRoomToken) => {
            if (deleteRoomToken !== undefined) {
              const roomIndex = currentRooms.findIndex(r => r.roomToken === deleteRoomToken);
              if (roomIndex !== -1) {
                currentRooms.splice(roomIndex, 1);
              }
            }
            return currentRooms;
          }, rooms)
      ))
      .do(a => console.log(a))
      .publishReplay(1)
      .refCount();
  }

  leaveRoom(roomToken: string) {
    this.leaveRoomSubject.next(roomToken);
  }
}
