import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() type: string;
  @Input() timestamp: string;
  @Input() waitForServerResponse: boolean | undefined;

  constructor() { }

  ngOnInit() {
  }

  isOutgoing(): boolean {
    return this.type === 'outgoing';
  }
}
