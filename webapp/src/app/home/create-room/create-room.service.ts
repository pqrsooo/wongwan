import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { APIService } from '../../shared/base/api.service';

interface ServerCreateRoomSuccessResult {
  success: true;
  message: string;
  roomToken: string;
}

interface ServerCreateRoomErrorResult {
  success: false;
  message: string;
}

type ServerCreateRoomResult = ServerCreateRoomSuccessResult | ServerCreateRoomErrorResult;

@Injectable()
export class CreateRoomService {
  constructor(private api: APIService) { }

  createRoom(roomName: string, joinUsers: string[]) {
    return this.api.requestPOST<ServerCreateRoomResult>(
      '/api/chatroom/create-room',
      {
        joinUsers,
        roomName
      },
      true
    );
  }
}
