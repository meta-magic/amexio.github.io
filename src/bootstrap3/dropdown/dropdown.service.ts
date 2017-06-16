/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import{Injectable}   from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DropDownService {
    constructor(private _http : Http){}

    fetchData(serviceUrl : string, methodType: string) : Observable<any>{
        let requestJson = {};
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
        let options = new RequestOptions({headers : headers,method : methodType});
        if(methodType == "post"){
            return this._http.post(serviceUrl,requestJson,options);
        }else if(methodType == "get"){
            return this._http.get(serviceUrl,options);
        }
    }


}