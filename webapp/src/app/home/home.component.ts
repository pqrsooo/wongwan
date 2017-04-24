import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chatRoomID$: Observable<string | undefined>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.chatRoomID$ = this.route.queryParams.map(queryParams => queryParams.room);
  }
}
