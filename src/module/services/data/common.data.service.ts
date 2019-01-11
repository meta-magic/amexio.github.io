
/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by pratik on 21/12/17
*/
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';

@Injectable()
export class CommonDataService {
  filteredObject: any = [];
  constructor(private _http: HttpClient) {
  }

  fetchData(serviceUrl: string, methodType: string): Observable<any> {
    const requestJson = {};
    const headers = new HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8');
    if (methodType === 'post') {
      return this._http.post(serviceUrl, requestJson, {headers});
    }else if (methodType === 'get') {
      return this._http.get(serviceUrl, {headers});
    }
  }

  uploadFile(serviceUrl: string, methodType: string, requestData: any): Observable<any> {
    const requestJson = requestData;
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    if (methodType.toUpperCase() === 'POST') {
      return this._http.post(serviceUrl, requestJson, {headers});
    }
  }
}
