import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { APISocketService } from '../../../shared/base/api-socket.service';
import { Message, OptimisticOutgoingMessage, ServerIncomingMessage } from './message.model';
// import { APIService } from '../../../shared/base/api.service';

interface AccumulatedMessageOptions {
  maxMessagesNumber: number;
}

const defaultOptions: AccumulatedMessageOptions = {
  maxMessagesNumber: 30
};

interface OutgoingMessageInfo {
  roomID: string;
  content: string;
}

interface ServerMessageAcknowledgement {
  success: boolean;
  message?: ServerIncomingMessage;
}

@Injectable()
export class MessagesService {
  private outgoingMessagesQueue: OutgoingMessageInfo[] = [];
  private isWaitingForAcknowledgement = false;
  private outgoingMessagesQueueChangeEvent = new Subject();
  private outgoingMessageAcknowledgeEvent = new Subject<Message>();

  constructor(private socket: APISocketService) {
    this.setUpAcknowledgementHandler();
  }

  private setUpAcknowledgementHandler() {
    this.socket.getEvent<ServerMessageAcknowledgement>('new message ack')
      .subscribe(result => {
        if (result.success) {
          this.outgoingMessagesQueue.shift()!;
          this.outgoingMessagesQueueChangeEvent.next();
          this.isWaitingForAcknowledgement = false;
          this.outgoingMessageAcknowledgeEvent.next(new Message(result.message!));
          this.flushOutgoingMessageQueue();
        } else {
          console.error('Acknowledgement fail', result);
        }
      });
  }

  sendMessage(roomID: string, content: string) {
    console.log(`Message "${content}" sent to room "${roomID}"`);
    // this.socket.sendMessage('new message', content);
    this.outgoingMessagesQueue.push({ roomID, content });
    this.outgoingMessagesQueueChangeEvent.next();
    this.flushOutgoingMessageQueue();
  }

  flushOutgoingMessageQueue() {
    if (this.isWaitingForAcknowledgement || this.outgoingMessagesQueue.length === 0) {
      return;
    }
    this.isWaitingForAcknowledgement = true;
    const message = this.outgoingMessagesQueue[0];
    console.log(`Sending message "${message.content}" to room "${message.roomID}"`);
    this.socket.sendMessage('new message', message.content);
  }

  getMessageStream(roomID: string) {
    console.log('getMessageStream', roomID);
    return this.socket.getEvent<ServerIncomingMessage>('new message')
      .map((serverMsg) => new Message(serverMsg))
      .merge(this.outgoingMessageAcknowledgeEvent);
  }

  getAccumulatedMessageStream(roomID: string, msgOptions?: Partial<AccumulatedMessageOptions>) {
    console.log('getAccumulatedStream', roomID);
    const options: AccumulatedMessageOptions = {
      ...defaultOptions,
      ...msgOptions
    };
    return this.getMessageStream(roomID)
      .scan((messages: Message[], newMessage: Message) => {
        const newMessages = this.binaryInsertMessages(messages, newMessage);
        if (newMessages.length <= options.maxMessagesNumber) {
          return newMessages;
        } else {
          return newMessages.slice(newMessages.length - options.maxMessagesNumber);
        }
      }, []);
  }

  getAccumulatedOptimisticMessageStream(roomID: string) {
    return this.outgoingMessagesQueueChangeEvent
      .startWith({})
      .map(() => this.outgoingMessagesQueue
        .filter(msg => msg.roomID === roomID)
        .map(msg => new OptimisticOutgoingMessage(msg.content))
      );
  }

  private binaryInsertMessages(sortedMessages: Message[], newMessage: Message) {
    let startPos = 0;
    let endPos = sortedMessages.length;
    while (startPos < endPos) {
      const middlePos = Math.floor((startPos + endPos) / 2);
      const middleMessage = sortedMessages[middlePos];
      if (middleMessage.id < newMessage.id) {
        startPos = middlePos + 1;
      } else {
        endPos = middlePos;
      }
    }

    const resultMessages = [...sortedMessages];
    resultMessages.splice(startPos, 0, newMessage);

    return resultMessages;
  }
}
