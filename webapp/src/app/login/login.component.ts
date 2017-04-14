import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    this.errorMessage = '';
    this.loginForm.disable();

    const { username, password } = this.loginForm.value;
    this.loginService.login(username, password)
      .subscribe(result => {
        if (result.success) {
          console.log('Success', result.message);
        } else {
          this.loginForm.enable();
          this.errorMessage = result.message;
        }
      });
  }
}
