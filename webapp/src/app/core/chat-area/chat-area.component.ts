import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../../shared/user/user.model';
import { UserService } from '../../shared/user/user.service';
import { SidebarService } from '../internal/sidebar.service';
import { Message, OptimisticOutgoingMessage } from './internal/message.model';
import { MessagesService } from './internal/messages.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() roomID: string;
  roomID$ = new BehaviorSubject<string | undefined>(undefined);
  roomName$: Observable<string | undefined>;
  sendMessageForm: FormGroup;
  messagesList: Observable<Message[]>;
  optimisticMessagesList: Observable<OptimisticOutgoingMessage[]>;
  currentUser$: Observable<User>;
  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  public currentSeparatorTitle: string | null = null;
  public separators: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private sidebarService: SidebarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      message: this.fb.control('', Validators.required)
    });
    Observable.fromEvent(this.conversationContainer.nativeElement, 'scroll')
      .debounceTime(10)
      .subscribe(() => {
        this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
      });

    this.currentUser$ = this.userService.getCurrentUser$();

    this.roomName$ = Observable.combineLatest(
      this.sidebarService.getServerRoomList(),
      this.roomID$,
      (roomList, roomID) => {
        const room = roomList.find(r => r.roomToken === roomID);
        if (room) {
          return room.roomName;
        } else {
          return undefined;
        }
      }
    );
    this.roomID$.next(this.roomID);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('roomID' in changes) {
      this.roomID$.next(changes.roomID.currentValue);
    }

    this.messagesList = this.messagesService
      .getAccumulatedMessageStream(this.roomID)
      .do(() => this.checkScrollToBottom());

    this.optimisticMessagesList = this.messagesService
      .getAccumulatedOptimisticMessageStream(this.roomID);
  }

  private checkScrollToBottom() {
    // You can check whether to scroll to bottom or not here.
    // THIS IS FOR DEMO!!!
    this.scrollToBottom();
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
