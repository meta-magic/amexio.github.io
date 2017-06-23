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
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class  TreeViewService {

    parentRef : any;
    responseData : any;

    constructor(private _http : Http){
    }

    fetchData(parentRef : any, serviceUrl : string, methodType: string){
        this.parentRef = parentRef;
        let requestJson = {};
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
        let options = new RequestOptions({headers : headers,method : methodType});
        if(methodType == "post"){
            this._http.post(serviceUrl,requestJson,options).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                  this.setData();
                }
            );
        }else if(methodType == "get"){
            this._http.get(serviceUrl,options).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                 this.setData();
                }
            );
        }
    }

    setData (){
        this.parentRef.setData(this.responseData);
    }


    fetchLazyData(parentRef : any, serviceUrl : string, methodType: string){
        this.parentRef = parentRef;
        let requestJson = {};
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'  });
        let options = new RequestOptions({headers : headers,method : methodType});
        if(methodType == "post"){
            this._http.post(serviceUrl,requestJson,options).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                    this.setLazyData();
                }
            );
        }else if(methodType == "get"){
            this._http.get(serviceUrl,options).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                    this.setLazyData();
                }
            );
        }
    }

    setLazyData (){
        this.parentRef.setLazyData(this.responseData);
    }

}
