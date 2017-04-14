import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface LoginResult {
  success: boolean;
  message: string;
}

@Injectable()
export class LoginService {
  login(username: string, password: string): Observable<LoginResult> {
    if (username === '') {
      return Observable.of({
        success: false,
        message: 'Please enter username.'
      });
    }
    if (password === '') {
      return Observable.of({
        success: false,
        message: 'Please enter password.'
      });
    }

    console.log(username, password);

    return Observable.of({
      success: false,
      message: 'Incorrect username/password combination'
    }).delay(1000);
  }
}