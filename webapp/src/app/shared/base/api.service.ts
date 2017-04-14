import { Injectable } from '@angular/core';
import { Http } from '@angular/http/';

import { environment } from '../../../environments/environment';

interface HTTPGetParams {
  [key: string]: string;
}

@Injectable()
export class APIService {
  constructor(private http: Http) { }

  requestGET<T>(endpointURL: string, data?: HTTPGetParams) {
    return this.http.get(
      environment.endpointURLPrefix + endpointURL,
      { params: data }
    ).map(response => response.json() as T);
  }

  requestPOST<T>(endpointURL: string, data?: object) {
    return this.http.post(
      environment.endpointURLPrefix + endpointURL,
      data !== undefined ? JSON.stringify(data) : ''
    ).map(response => response.json() as T);
  }
}
