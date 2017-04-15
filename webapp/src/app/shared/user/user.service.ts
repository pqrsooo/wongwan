import { Injectable } from '@angular/core';

import { APIService } from '../base/api.service';

interface ServerLoginCheckResult {
  isLogin: boolean;
  message: string;
  user?: {
    username: string;
    firstName: string;
    lastName: string;
  }
}

@Injectable()
export class UserService {
  constructor(private api: APIService) { }

  isLoggedIn() {
    return this.api.requestGET<ServerLoginCheckResult>('/api/restricted', undefined, true)
      .map(result => result.isLogin);
  }
}
