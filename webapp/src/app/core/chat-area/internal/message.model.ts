import * as moment from 'moment';

export interface ServerIncomingMessage {
  id: string;
  username: string;
  content: string;
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

  public constructor(serverResponse: ServerIncomingMessage) {
    super(serverResponse.content);
    this.id = serverResponse.id;
    this.sentTime = moment();
  }
}

export class OptimisticOutgoingMessage extends BaseMessage {
  public constructor(content: string) {
    super(content);
  }
}
