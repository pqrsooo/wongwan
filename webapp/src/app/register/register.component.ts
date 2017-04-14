import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private registerService: RegisterService, private fb: FormBuilder) { }

  ngOnInit() {
    const passwordMatchValidator = (g: FormGroup) => {
      if (g.get('password').value === g.get('passwordConfirm').value) {
        return null;
      }
      return { mismatch: true };
    };

    const usernameCheckValidator = (g: FormControl) => (
      this.registerService.isUsernameUsable(g.value)
        .map(isOK => {
          if (isOK) {
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
        displayName: this.fb.control('', [Validators.required])
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

    const { username, password, displayName } = this.registerForm.value;
    this.registerService.register({ username, password, displayName })
      .subscribe(result => {
        if (result.success) {
          console.log('Success', result.message);
        } else {
          this.registerForm.enable();
          this.errorMessage = result.message;
        }
      });
  }
}
