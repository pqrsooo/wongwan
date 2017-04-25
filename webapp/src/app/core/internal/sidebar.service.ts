import { Injectable } from '@angular/core';

import { APISocketService } from '../../shared/base/api-socket.service';
import { APIService } from '../../shared/base/api.service';
import { ChatRoomInfo, ServerChatRooms } from './chat-room-info.model';
import { ServerIncomingMessage } from '../chat-area/internal/message.model';
import { ServerMessageAcknowledgement } from '../chat-area/internal/messages.service';

@Injectable()
export class SidebarService {
  constructor(private api: APIService, private socket: APISocketService) { }

  getServerRoomList() {
    return this.api.requestGET<ServerChatRooms>('/api/chatroom/get-chatroom')
      .map((serverResponse) => {
        return serverResponse.chatRooms.map(chatroom => new ChatRoomInfo(chatroom));
      })
      .share();

    // const initialStream = this.api.requestGET<ServerChatRooms>('/api/chatroom/get-chatroom')
    //   .map((serverResponse) => {
    //     return serverResponse.chatRooms.map(chatroom => new ChatRoomInfo(chatroom));
    //   });

    // const roomStream = initialStream;

    // const ackMessagesSocketStream = this.socket.getEvent<ServerMessageAcknowledgement>('new message ack')
    //   .filter(ack => ack.success).map(ack => ack.message!);
    // const newMessageSocketStream = this.socket.getEvent<ServerIncomingMessage>('new message');
    // const messageStream = ackMessagesSocketStream.merge(newMessageSocketStream)
    //   .map((msg) => {
    //   msg.
    // })
  }
}
