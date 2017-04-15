import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class APISocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

  getEvent<T>(eventName: string) {
    return new Observable<T>((subscriber) => {
      const listener = (data: T) => {
        subscriber.next(data);
      };

      this.socket.on(eventName, listener);

      return () => {
        this.socket.off(eventName, listener);
      };
    });
  }

  sendMessage<T>(eventName: string, data: T) {
    this.socket.emit(eventName, data);
  }
}
