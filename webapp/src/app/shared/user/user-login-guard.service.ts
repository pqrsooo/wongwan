import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    return this.userService.isLoggedIn().do(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login'], { skipLocationChange: true });
      }
    });
  }
}
