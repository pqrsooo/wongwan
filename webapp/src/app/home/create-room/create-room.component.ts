import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../shared/user/user.service';
import { CreateRoomService } from './create-room.service';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit, OnDestroy {
  errorMessage = '';
  createRoomForm: FormGroup;
  usernames: FormArray;

  private currentUsername: Subscription;
  private formDisables = {
    // False means user is logged in.
    userLogin: false,
    // False means the form is not submitting the request to server.
    submitting: false
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private createRoomService: CreateRoomService,
    private router: Router
  ) { }

  ngOnInit() {
    const checkUsernameUnique = (e: FormArray) => {
      const usernames = e.controls.map(control => control.value as string)
        .filter(username => username !== '');

      for (let i = 0; i < usernames.length; i++) {
        if (usernames.indexOf(usernames[i]) !== i) {
          return { duplicate: true };
        }
      }

      return null;
    };
    this.usernames = this.fb.array([this.createUsernameControl()], checkUsernameUnique);

    const validRoomName = (e: FormControl) => {
      const username = (e.value as string).trim();
      if (username === '') {
        return { blankName: true };
      };
      return null;
    };
    this.createRoomForm = this.fb.group({
      roomName: this.fb.control('', [Validators.required, validRoomName]),
      usernames: this.usernames
    });

    this.updateFormDisability();
    this.currentUsername = this.userService.getCurrentUser$().subscribe(user => {
      this.formDisables.userLogin = user ? false : true;
      this.updateFormDisability();
    });
  }

  private updateFormDisability() {
    const disable = this.formDisables.submitting || this.formDisables.userLogin;
    if (disable) {
      this.createRoomForm.disable();
    } else {
      this.createRoomForm.enable();
    }
  }

  ngOnDestroy() {
    this.currentUsername.unsubscribe();
  }

  private checkUsername(usernameControl: AbstractControl) {
    const username: string = usernameControl.value.trim();
    if (username === '') {
      return Observable.of(null);
    }
    return this.userService.getCurrentUsername$().first().mergeMap(currentUsername => {
      if (currentUsername === undefined || currentUsername === username) {
        return Observable.of({ invalid: true });
      }
      return this.userService.isUsernameExist(username, true).map(isExist => {
        if (isExist) {
          return null;
        }
        return {
          invalid: true
        };
      });
    });
  }

  private createUsernameControl() {
    return this.fb.control('', [], [c => this.checkUsername(c)]);
  }

  addUsername() {
    this.usernames.push(this.createUsernameControl());
  }

  removeUsername(index: number) {
    this.usernames.removeAt(index);
  }

  createRoom() {
    const roomName = (this.createRoomForm.get('roomName').value as string).trim();
    const usernames = this.usernames.controls.map(control => control.value as string)
      .filter(username => username !== '');

    this.errorMessage = '';
    this.formDisables.submitting = true;
    this.updateFormDisability();

    this.createRoomService.createRoom(roomName, usernames).subscribe(result => {
      this.formDisables.submitting = false;
      this.updateFormDisability();

      if (result.success) {
        this.router.navigate(['room', result.roomToken]);
      } else {
        this.errorMessage = result.message;
      }
    });
  }
}
