import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-bubble-corner',
  templateUrl: './message-bubble-corner.component.html',
  styleUrls: ['./message-bubble-corner.component.scss']
})
export class MessageBubbleCornerComponent implements OnInit {
  @Input() width: number;

  private height: number;
  private ratio: number = 19 / 24;

  constructor() {
  }

  ngOnInit() {
    this.height = this.width * this.ratio;
  }

}
