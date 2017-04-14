import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
  }
}
