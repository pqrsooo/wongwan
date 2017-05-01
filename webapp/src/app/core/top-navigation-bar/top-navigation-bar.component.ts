import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.scss'],
  host: {
    '(document:click)': 'hideDropdown($event)',
  }
})
export class TopNavigationBarComponent implements OnInit {
  username$: Observable<string>;
  isLoggedIn$: Observable<boolean>;
  isDropdownVisible = false;

  constructor(private userService: UserService, private _el: ElementRef) { }

  ngOnInit() {
    this.username$ = this.userService.getCurrentUser$().map(user => {
      if (user) {
        return user.firstName;
      }
      return 'Not Logged In T_T';
    });

    this.isLoggedIn$ = this.userService.isLoggedIn();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  hideDropdown(event: any) {
    if (!this._el.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }
}
