import { animate, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('350ms ease-in', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('350 ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

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
    this.userService.login(username, password)
      .subscribe(result => {
        this.loginForm.enable();
        if (result.success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = result.message;
        }
      });
  }
}
