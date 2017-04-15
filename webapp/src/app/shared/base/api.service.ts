import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http/';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

interface HTTPGetParams {
  [key: string]: string;
}

@Injectable()
export class APIService {
  constructor(private http: Http) { }

  requestGET<T>(endpointURL: string, data?: HTTPGetParams, throwError = false) {
    const path = environment.endpointURLPrefix + endpointURL;
    return this.mapResponse<T>(this.http.get(path, { params: data }), throwError);

  }

  requestPOST<T>(endpointURL: string, data?: object, throwError = false) {
    const req = this.http.post(
      environment.endpointURLPrefix + endpointURL,
      data !== undefined ? JSON.stringify(data) : '',
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    );
    return this.mapResponse<T>(req, throwError);
  }

  private mapResponse<T>(responseObservable: Observable<Response>, throwError: boolean) {
    return responseObservable.catch(err => {
      if (throwError && err instanceof Response) {
        return Observable.of(err);
      }
      throw err;
    }).map(response => response.json() as T);
  }
}
