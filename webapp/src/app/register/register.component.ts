import { animate, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user/user.service';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const passwordMatchValidator = (g: FormGroup) => {
      if (g.get('password').value === g.get('passwordConfirm').value) {
        return null;
      }
      return { mismatch: true };
    };

    const usernameCheckValidator = (g: FormControl) => (
      this.userService.isUsernameExist(g.value)
        .map(isExist => {
          if (!isExist) {
            return null;
          } else {
            return { usernameDuplicate: true };
          }
        })
    );

    this.registerForm = this.fb.group(
      {
        username: this.fb.control('', [Validators.required], usernameCheckValidator),
        password: this.fb.control('', [Validators.required]),
        passwordConfirm: this.fb.control('', [Validators.required]),
        firstName: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required])
      },
      { validator: passwordMatchValidator }
    );
  }

  register() {
    if (!this.registerForm.valid) {
      // TODO: Write better form validation error message
      this.errorMessage = 'Invalid information provided';
      return;
    }

    this.errorMessage = '';
    this.registerForm.disable();

    const { username, password, firstName, lastName } = this.registerForm.value;
    this.registerService.register({ username, password, firstName, lastName })
      .subscribe(result => {
        if (result.success) {
          this.router.navigate(['/']);
        } else {
          this.registerForm.enable();
          this.errorMessage = result.message;
        }
      });
  }
}
