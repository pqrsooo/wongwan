import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.scss']
})
export class TopNavigationBarComponent implements OnInit {
  username$: Observable<string>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username$ = this.userService.getCurrentUser$().map(user => {
      if (user) {
        return user.firstName;
      }
      return 'Not Logged In T_T';
    });
  }
}
