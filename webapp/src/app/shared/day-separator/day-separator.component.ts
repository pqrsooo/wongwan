import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DaySeparatorStaticComponent } from '../day-separator-static/day-separator-static.component';

@Component({
  selector: 'app-day-separator',
  templateUrl: '../day-separator-static/day-separator-static.component.html',
  styleUrls: ['../day-separator-static/day-separator-static.component.scss']
})
export class DaySeparatorComponent extends DaySeparatorStaticComponent implements OnInit, AfterViewInit {

  @Output() notifyPosition = new EventEmitter();

  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() {
    Observable.fromEvent(window, 'resize')
      .throttleTime(150)
      .subscribe(() => {
        this.notifyPosition.emit({ title: this.title, position: this.element.nativeElement.offsetTop });
      });
  }

  ngAfterViewInit() {
    this.notifyPosition.emit({ title: this.title, position: this.element.nativeElement.offsetTop });
  }
}
