import { animate, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { APISocketService } from '../../shared/base/api-socket.service';

interface ServerJoinRoomAcknowledgement {
  success: boolean;
}

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
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
export class JoinRoomComponent implements OnInit {
  joinRoomForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private socket: APISocketService, private router: Router) { }

  ngOnInit() {
    this.joinRoomForm = this.fb.group({
      roomToken: this.fb.control('', [Validators.required])
    });
  }

  onJoinRoom() {
    this.errorMessage = '';
    this.joinRoomForm.disable();

    const roomToken: string = this.joinRoomForm.get('roomToken').value;
    this.socket.getEvent<ServerJoinRoomAcknowledgement>('join room ack')
      .first()
      .subscribe(ack => {
        this.joinRoomForm.enable();
        if (ack.success) {
          this.router.navigate([''], { queryParams: { room: roomToken } });
        } else {
          this.errorMessage = 'Cannot join room!';
        }
      });

    this.socket.sendMessage('join room', { roomToken });
  }
}
