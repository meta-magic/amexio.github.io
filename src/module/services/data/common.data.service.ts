/**
 * Created by pratik on 27/11/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CommonDataService {
  filteredObject: any = [];
  constructor(private _http: HttpClient) {
  }

  fetchData(serviceUrl: string, methodType: string): Observable<any> {
    const requestJson = {};
    const headers = new HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8');
    if (methodType == 'post') {
      return this._http.post(serviceUrl, requestJson, {headers});
    }else if (methodType == 'get') {
      return this._http.get(serviceUrl, {headers});
    }
  }

  uploadFile(serviceUrl: string, methodType:string,requestData: any): Observable<any> {
    let requestJson = requestData;
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    if(methodType.toUpperCase() == 'POST'){
      return this._http.post(serviceUrl,requestJson,{headers});
    }
  }


}
