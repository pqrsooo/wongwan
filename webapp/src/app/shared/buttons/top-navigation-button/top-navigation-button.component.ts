import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navigation-button',
  templateUrl: './top-navigation-button.component.html',
  styleUrls: ['./top-navigation-button.component.scss']
})
export class TopNavigationButtonComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
