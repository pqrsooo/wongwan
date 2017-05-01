import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { APISocketService } from '../../shared/base/api-socket.service';
import { APIService } from '../../shared/base/api.service';
import { ServerIncomingMessage } from '../chat-area/internal/message.model';
import { ServerMessageAcknowledgement } from '../chat-area/internal/messages.service';
import { ChatRoomInfo, LatestMessage, ServerChatRooms } from './chat-room-info.model';

interface LeaveEvent {
  type: 'leave';
  roomID: string;
}

interface NewMessageEvent {
  type: 'newMsg';
  roomID: string;
  newMessage: LatestMessage;
}

type SidebarEvent = NewMessageEvent | LeaveEvent;

@Injectable()
export class SidebarService {
  private sidebarEvent = new Subject<SidebarEvent>();
  readonly serverRoomList$: Observable<ChatRoomInfo[]>;

  constructor(private api: APIService, private socket: APISocketService) {
    this.serverRoomList$ = this.api.requestGET<ServerChatRooms>('/api/chatroom/get-chatroom')
      .map((serverResponse) => serverResponse.chatRooms.map(chatroom => new ChatRoomInfo(chatroom)))
      .mergeMap((rooms) => (
        this.sidebarEvent
          .merge(this.getNewMessageEvent())
          .startWith(null)
          .scan((currentRooms: ChatRoomInfo[], event: SidebarEvent | null) => {
            if (event) {
              if (event.type === 'newMsg') {
                // console.log(event.newMessage);
                const targetRoomIndex = currentRooms.findIndex(room => room.roomToken === event.roomID);
                if (targetRoomIndex !== -1) {
                  const targetRoom = currentRooms[targetRoomIndex];
                  const msg = targetRoom.latestMessage;
                  const newMessage = event.newMessage;
                  if (!msg || msg.id < newMessage.id) {
                    const pushChatroom = new ChatRoomInfo({
                      roomName: targetRoom.roomName,
                      roomToken: targetRoom.roomToken,
                      latestMessage: {
                        id: newMessage.id,
                        content: newMessage.content,
                        seen: true,
                        sender: newMessage.senderFirstName,
                        ts: newMessage.time.toISOString()
                      }
                    });

                    currentRooms.splice(targetRoomIndex, 1);
                    currentRooms.unshift(pushChatroom);
                  }
                }
              } else if (event.type === 'leave') {
                const deleteRoomToken = event.roomID;
                if (deleteRoomToken !== undefined) {
                  const roomIndex = currentRooms.findIndex(r => r.roomToken === deleteRoomToken);
                  if (roomIndex !== -1) {
                    currentRooms.splice(roomIndex, 1);
                  }
                }

              }
            }
            return currentRooms;
          }, rooms)
      ))
      .publishReplay(1)
      .refCount();
  }

  private getNewMessageEvent() {
    const theirMessagesStream = this.socket.getEvent<ServerIncomingMessage>('new message')
      .map((serverMsg) => {
        return {
          type: 'newMsg',
          roomID: serverMsg.room,
          newMessage: {
            content: serverMsg.content,
            seen: true,
            senderFirstName: serverMsg.sender,
            time: moment(serverMsg.createdTime),
            id: serverMsg.messageID
          }
        };
      });

    const myMessagesStream = this.socket.getEvent<ServerMessageAcknowledgement>('new message ack')
      .map((serverMsg) => {
        return {
          type: 'newMsg',
          roomID: serverMsg.message!.room,
          newMessage: {
            content: serverMsg.message!.content,
            seen: true,
            senderFirstName: serverMsg.message!.sender,
            time: moment(serverMsg.message!.createdTime),
            id: serverMsg.message!.messageID
          }
        };
      });

    return theirMessagesStream.merge(myMessagesStream);
  }

  leaveRoom(roomToken: string) {
    this.sidebarEvent.next({ type: 'leave', roomID: roomToken });
  }
}
