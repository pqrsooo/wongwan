import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class SvgIconManagerService {

  private iconsByUrl = new Map<string, SVGElement>();
  private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>();

  constructor(private http: Http) { }

  loadSvg(url: string): Observable<SVGElement> {
    if (this.iconsByUrl.has(url)) {
      return Observable.of(this.iconsByUrl.get(url));
    } else if (this.iconsLoadingByUrl.has(url)) {
      return this.iconsLoadingByUrl.get(url)!;
    } else {
      const o = <Observable<SVGElement>>this.http.get(url)
        .map((res: Response) => {
          const div = document.createElement('DIV');
          div.innerHTML = res.text();
          return <SVGElement>div.querySelector('svg');
        })
        .do(svg => {
          this.iconsByUrl.set(url, svg);
        })
        .finally(() => {
          this.iconsLoadingByUrl.delete(url);
        })
        .share();

      this.iconsLoadingByUrl.set(url, o);
      return o;
    }
  }

}
