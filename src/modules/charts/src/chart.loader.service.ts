/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
*/

import { Injectable } from '@angular/core';
declare var google;
@Injectable()
export class ChartLoaderService {

 constructor() { }

 loadChartScript(){
    if(!this.checkIfChartisLoaded()){
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

 }

 checkIfChartisLoaded() : boolean{
     return (typeof google !== 'undefined' && google.charts)
 }

}