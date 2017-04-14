import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { APIService } from '../base/api.service';

let isLoggedIn = false;

@Injectable()
export class UserService {
  // constructor(private api: APIService) { }

  isLoggedIn() {
    // return this.api.requestGET('/user');
    const result = Observable.of(isLoggedIn).delay(1000);
    isLoggedIn = true;
    return result;
  }
}
