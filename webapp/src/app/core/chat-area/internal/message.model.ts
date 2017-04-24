import * as moment from 'moment';

export interface ServerIncomingMessage {
  messageID: string;
  username: string;
  content: string;
  createdTime: number;
  room: string;
  sender: string;
}

export abstract class BaseMessage {
  readonly content: string;

  public constructor(content: string) {
    this.content = content;
  }
}

export class Message extends BaseMessage {
  readonly id: string;
  readonly username: string;
  readonly sentTime: moment.Moment;
  readonly roomID: string;
  readonly senderName: string;

  public constructor(serverResponse: ServerIncomingMessage) {
    super(serverResponse.content);
    this.id = serverResponse.messageID;
    this.username = serverResponse.username;
    this.sentTime = moment(serverResponse.createdTime);
    this.roomID = serverResponse.room;
    this.senderName = serverResponse.sender;
  }
}

export class OptimisticOutgoingMessage extends BaseMessage {
  public constructor(content: string) {
    super(content);
  }
}
