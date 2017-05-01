import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../base/api.service';
import { ServerUser, User } from './user.model';

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

interface ServerLoginCheckResult {
  isLogin: boolean;
  message: string;
  user?: ServerUser;
}

interface UsernameCheckResult {
  available: boolean;
}

const checkUsernameDebounceTime = 300;

@Injectable()
export class UserService {
  private currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private api: APIService) {
    this.api.requestGET<ServerLoginCheckResult>('/api/restricted', undefined, true)
      .subscribe(result => this.setCurrentUser(result.user));
  }

  isLoggedIn$() {
    return this.api.requestGET<ServerLoginCheckResult>('/api/restricted', undefined, true)
      .do(result => this.setCurrentUser(result.user))
      .map(result => result.isLogin);
  }

  private setCurrentUser(serverUser: ServerUser | undefined) {
    if (serverUser) {
      this.currentUser$.next(new User(serverUser));
    } else {
      this.currentUser$.next(undefined);
    }
  }

  login(username: string, password: string): Observable<LoginResult> {
    return this.api.requestPOST<ServerLoginResult>(
      '/api/user/login',
      { username, password },
      true
    ).map(result => {
      if (result.success) {
        this.setCurrentUser(result.user);
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

  getCurrentUser$() {
    return this.currentUser$.asObservable();
  }

  getCurrentUsername$() {
    return this.currentUser$.map(user => {
      if (user) {
        return user.username;
      }
      return undefined;
    }).distinctUntilChanged();
  }

  isUsernameExist(username: string, delay = false) {
    const isExist$ = this.api.requestGET<UsernameCheckResult>(
      '/api/user/validate-username',
      { username }
    ).map(result => !result.available);

    if (delay) {
      return Observable.of({})
        .delay(checkUsernameDebounceTime)
        .mergeMap(() => isExist$);
    } else {
      return isExist$;
    }
  }
}
