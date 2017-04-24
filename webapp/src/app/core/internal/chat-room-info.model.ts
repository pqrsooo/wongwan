import * as moment from 'moment';

interface ServerChatRoom {
  roomToken: string;
  roomName: string;
  latestMessage: {
    content: string;
    seen: boolean;
    senderFirstName: string;
    time: number;
  };
}

export interface ServerChatRooms {
  success: true;
  chatRooms: ServerChatRoom[];
}

export class ChatRoomInfo {
  readonly roomToken: string;
  readonly roomName: string;
  readonly latestMessage: {
    readonly content: string;
    readonly seen: boolean;
    readonly senderFirstName: string;
    readonly time: moment.Moment;
  };

  constructor(serverResponse: ServerChatRoom) {
    this.roomToken = serverResponse.roomToken;
    this.roomName = serverResponse.roomName;
    this.latestMessage = {
      content: serverResponse.latestMessage.content,
      seen: serverResponse.latestMessage.seen,
      senderFirstName: serverResponse.latestMessage.senderFirstName,
      time: moment(serverResponse.latestMessage.time)
    };

    this.roomToken = serverResponse.roomToken;
    this.roomName = 'My room name';
    this.latestMessage = {
      content: 'สวัสดี',
      seen: true,
      senderFirstName: 'Kasidit',
      time: moment()
    };
  }
}
