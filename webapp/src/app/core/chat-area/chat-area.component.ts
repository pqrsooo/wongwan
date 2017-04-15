import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {
  sendMessageForm: FormGroup;
  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      message: this.fb.control('', Validators.required)
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
  }
}
