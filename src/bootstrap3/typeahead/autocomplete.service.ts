import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class AutoCompleteService {

  constructor(private _http : Http) {}

  fetchData(url : string,methodType : string) : Observable<any>{
    let requestJson = {};
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
    let options = new RequestOptions({headers : headers,method : methodType});
    if(methodType == "post")
      return this._http.post(url,requestJson,options);
    else
      return this._http.get(url,options);
  }
}
