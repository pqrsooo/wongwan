import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Message, OptimisticOutgoingMessage } from './internal/message.model';
import { MessagesService } from './internal/messages.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {
  roomID: string;

  sendMessageForm: FormGroup;
  messagesList: Observable<Message[]>;
  optimisticMessagesList: Observable<OptimisticOutgoingMessage[]>;
  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  public currentSeparatorTitle: string | null = null;
  public separators: any[] = [];

  constructor(private fb: FormBuilder, private messagesService: MessagesService) { }

  ngOnInit() {
    this.roomID = 'hello-world-room';
    this.sendMessageForm = this.fb.group({
      message: this.fb.control('', Validators.required)
    });
    Observable.fromEvent(this.conversationContainer.nativeElement, 'scroll')
      .debounceTime(10)
      .subscribe(() => {
        this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
      });

    this.messagesList = this.messagesService
      .getAccumulatedMessageStream(this.roomID)
      .do(() => this.checkScrollToBottom());

    this.optimisticMessagesList = this.messagesService
      .getAccumulatedOptimisticMessageStream(this.roomID);
  }

  private checkScrollToBottom() {
    // You can check whether to scroll to bottom or not here.
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    if (this.conversationContainer.nativeElement.scrollTop > 0) {
      this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
    }
  }

  scrollToBottom() {
    // Wait for DOM to update
    setTimeout(() => {
      this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
    }, 1);
  }

  sendMessage(keyEvent: KeyboardEvent) {
    if (keyEvent.shiftKey) {
      return;
    }

    keyEvent.preventDefault();
    keyEvent.stopPropagation();

    if (this.sendMessageForm.valid) {
      this.messagesService.sendMessage(this.roomID, this.sendMessageForm.value.message);
      this.sendMessageForm.setValue({ message: '' });
      this.scrollToBottom();
    }
  }

  updateSeparatorPosition($event: any) {
    this.separators = this.separators.filter(item => item.title !== $event.title);
    this.separators.push($event);
    this.separators.sort((a: any, b: any) => {
      return b.position - a.position;
    });

    if (this.conversationContainer.nativeElement.scrollTop > 0) {
      this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
    }
  }

  private getCurrentSeparatorTitle(): string | null {
    for (const separator of this.separators) {
      if ((separator.position - this.conversationContainer.nativeElement.scrollTop) < 0) {
        return separator.title;
      }
    }
    return null;
  }
}
