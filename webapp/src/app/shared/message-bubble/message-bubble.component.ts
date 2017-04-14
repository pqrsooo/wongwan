import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent implements OnInit {
  @Input() name: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

  isOutgoing(): boolean {
    return this.type === 'outgoing';
  }
}
