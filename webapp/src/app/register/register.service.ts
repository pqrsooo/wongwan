import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface RegisterResult {
  success: boolean;
  message: string;
}

interface RegisterDetail {
  username: string;
  password: string;
  displayName: string;
}

@Injectable()
export class RegisterService {
  register(detail: RegisterDetail): Observable<RegisterResult> {
    console.log(detail);

    return Observable.of({
      success: false,
      message: 'The system is not opened for registration yet. :)'
    }).delay(1000);
  }

  isUsernameUsable(username: string) {
    console.log('Start');
    return Observable.of(username !== 'futurizing').delay(500);
  }
}
