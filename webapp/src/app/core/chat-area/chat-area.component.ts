import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {
  sendMessageForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      message: this.fb.control('', Validators.required)
    });
  }
}
