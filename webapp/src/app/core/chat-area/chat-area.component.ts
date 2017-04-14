import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APISocketService } from '../../shared/base/api-socket.service';

interface Message {
  username: string;
  message: string;
}

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {
  chatMessages: Observable<Message[]>;
  messageInput: string;

  constructor(private socket: APISocketService) { }

  ngOnInit() {
    const messageListener = this.socket.getEvent<Message>('new message');
    this.chatMessages = messageListener.map(msg => {
      return [msg];
    }).scan((acc, newMsg) => {
      return [...acc, ...newMsg];
    });
  }

  sendMessage() {
    if (this.messageInput === '') {
      return;
    }
    this.socket.sendMessage('new message', this.messageInput);
    this.messageInput = '';
  }
}
