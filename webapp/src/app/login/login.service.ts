import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/base/api.service';

interface LoginResult {
  success: boolean;
  message: string;
}

interface ServerLoginResultSuccess {
  success: true;
  user: {
    username: string;
    firstName: string;
    lastName: string;
  };
}

interface ServerLoginResultFail {
  success: false;
  message: string;
}

type ServerLoginResult = ServerLoginResultSuccess | ServerLoginResultFail;

@Injectable()
export class LoginService {
  constructor(private api: APIService) { }

  login(username: string, password: string): Observable<LoginResult> {
    return this.api.requestPOST<ServerLoginResult>(
      '/api/user/login',
      { username, password },
      true
    ).map(result => {
      if (result.success) {
        return {
          success: true,
          message: 'success'
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    });
  }
}
