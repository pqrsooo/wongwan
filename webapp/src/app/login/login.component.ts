import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isAuthenticating = false;
  errorMessage: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  login() {
    this.isAuthenticating = true;
    this.errorMessage = '';
    this.loginService.login(this.username, this.password).subscribe(result => {
      if (result.success) {
        console.log('Success', result.message);
      } else {
        this.isAuthenticating = false;
        this.errorMessage = result.message;
      }
    });
  }
}
