import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-separator-static',
  templateUrl: './day-separator-static.component.html',
  styleUrls: ['./day-separator-static.component.scss']
})
export class DaySeparatorStaticComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() { }

}
