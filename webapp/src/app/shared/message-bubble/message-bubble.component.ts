import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent implements OnChanges {
  @Input() name: string | undefined;
  @Input() isOutgoing?: boolean;
  @Input() isBeforeSeparator?: boolean;
  @Input() timestamp: string;
  @Input() waitForServerResponse: boolean | undefined;
  @HostBinding('class.-incoming') incomingClass?: boolean;
  @HostBinding('class.-outgoing') outgoingClass?: boolean;
  @HostBinding('class.-before-separator') beforeSeparatorClass?: boolean;

  ngOnChanges() {
    this.incomingClass = !this.isOutgoing;
    this.outgoingClass = this.isOutgoing;
    this.beforeSeparatorClass = this.isBeforeSeparator;
  }
}
