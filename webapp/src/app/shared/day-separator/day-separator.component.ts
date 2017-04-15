import { Component, OnInit, AfterViewInit, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { DaySeparatorStaticComponent } from '../day-separator-static/day-separator-static.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

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
