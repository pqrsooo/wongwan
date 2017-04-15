import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {
  sendMessageForm: FormGroup;
  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  public currentSeparatorTitle: string | null = null;
  public separators: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      message: this.fb.control('', Validators.required)
    });
    Observable.fromEvent(this.conversationContainer.nativeElement, 'scroll')
      .debounceTime(10)
      .subscribe(() => {
        this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
      });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    if (this.conversationContainer.nativeElement.scrollTop > 0) {
      this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
    }
  }

  scrollToBottom() {
    this.conversationContainer.nativeElement.scrollTop = this.conversationContainer.nativeElement.scrollHeight;
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
