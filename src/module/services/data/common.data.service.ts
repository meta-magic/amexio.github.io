/**
* Created by pratik on 27/11/17.
*/
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CommonDataService {
filteredObject: any = [];
constructor(private _http: Http) {
}

fetchData(serviceUrl: string, methodType: string): Observable<any> {
const requestJson = {};
const headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
const options = new RequestOptions({headers : headers, method : methodType});
if (methodType == 'post') {
return this._http.post(serviceUrl, requestJson, options);
}else if (methodType == 'get') {
return this._http.get(serviceUrl, options);
}
}

uploadFile(serviceUrl: string, methodType:string,requestData: any): Observable<any> {
let requestJson = requestData;
let headers = new Headers({ "Access-Control-Allow-Origin":"*"});
let options = new RequestOptions({headers : headers,method : methodType});
if(methodType.toUpperCase() == 'POST'){
return this._http.post(serviceUrl,requestJson,options);
}
}


}
