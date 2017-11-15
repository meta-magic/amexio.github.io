/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-multi-bar',
 template: `
   
 `
})

export class ProgressMultiComponent implements OnInit {
 @Input()   value : number;

 @Input()   type : string;

 @Input()    minValue : string;

 @Input()    maxValue  : string;

 cClass : string = 'progress-bar';

 constructor() { }

 ngOnInit() {

 }
}
