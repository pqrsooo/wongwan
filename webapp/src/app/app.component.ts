import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router/';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routerLoading = true;
  isOverflowHidden$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.routerLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.routerLoading = false;
      }
    });

    this.isOverflowHidden$ = this.route.url.map(urls => {
      console.log(urls);
      return false;
    });
  }
}
