import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('conversationContainer') conversationContainer: ElementRef;

  public currentSeparatorTitle: string = null;
  public separators: any[] = [];

  constructor() { }

  ngOnInit() {
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

  updateSeparatorPosition($event) {
    this.separators = this.separators.filter(item => item.title != $event.title);
    this.separators.push($event);
    this.separators.sort((a: any, b: any) => {
      return b.position - a.position;
    });

    if (this.conversationContainer.nativeElement.scrollTop > 0) {
      this.currentSeparatorTitle = this.getCurrentSeparatorTitle();
    }
  }

  private getCurrentSeparatorTitle(): string {
    for (let separator of this.separators) {
      if ((separator.position - this.conversationContainer.nativeElement.scrollTop) < 0) {
        return separator.title;
      }
    }
    return null;
  }
}
