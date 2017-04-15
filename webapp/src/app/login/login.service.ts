import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { APIService } from '../shared/base/api.service';

interface LoginResult {
  success: boolean;
  message: string;
}

@Injectable()
export class LoginService {
  // constructor(private api: APIService) { }

  login(username: string, password: string): Observable<LoginResult> {
    console.log(username, password);

    // return this.api.requestGET

    if (username === password) {
      return Observable.of({
        success: true,
        message: 'Success'
      }).delay(1500);
    } else {
      return Observable.of({
        success: false,
        message: 'Incorrect username/password combination'
      }).delay(1000);
    }
  }
}
