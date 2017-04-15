import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-icon',
  templateUrl: './send-icon.component.html',
  styleUrls: ['./send-icon.component.scss']
})
export class SendIconComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit() {
  }

}
