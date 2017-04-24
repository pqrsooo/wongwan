import * as moment from 'moment';

interface ServerChatRoom {
  roomToken: string;
  roomName: string;
  latestMessage: {
    sender: string;
    content: string;
    ts: string;
    seen: boolean;
  } | null;
}

export interface ServerChatRooms {
  success: true;
  chatRooms: ServerChatRoom[];
}

export class ChatRoomInfo {
  readonly roomToken: string;
  readonly roomName: string;
  readonly latestMessage?: {
    readonly content: string;
    readonly seen: boolean;
    readonly senderFirstName: string;
    readonly time: moment.Moment;
  };

  constructor(serverResponse: ServerChatRoom) {
    this.roomToken = serverResponse.roomToken;
    this.roomName = serverResponse.roomName;
    if (serverResponse.latestMessage) {
      this.latestMessage = {
        content: serverResponse.latestMessage.content,
        seen: serverResponse.latestMessage.seen,
        senderFirstName: serverResponse.latestMessage.sender,
        time: moment(serverResponse.latestMessage.ts)
      };
    }

    // this.roomToken = serverResponse.roomToken;
    // this.roomName = 'My room name';
    // this.latestMessage = {
    //   content: 'สวัสดี',
    //   seen: true,
    //   senderFirstName: 'Kasidit',
    //   time: moment()
    // };
  }
}
