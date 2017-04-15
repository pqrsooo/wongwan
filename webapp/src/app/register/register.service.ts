import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/base/api.service';

interface RegisterResult {
  success: boolean;
  message: string;
}

interface RegisterDetail {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UsernameCheckResult {
  available: boolean;
}

const checkUsernameDebounceTime = 300;

@Injectable()
export class RegisterService {
  constructor(private api: APIService) { }

  register(detail: RegisterDetail): Observable<RegisterResult> {
    return this.api.requestPOST<RegisterResult>('/api/user/signup', detail, true);
  }

  isUsernameUsable(username: string) {
    return Observable.of({})
      .delay(checkUsernameDebounceTime)
      .mergeMap(() => this.api.requestGET<UsernameCheckResult>(
        '/api/user/validate-username',
        { username }
      ))
      .map(result => result.available);
  }
}
