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
 *
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'amexio-map-title',
    template: ` `
})
export class MapTitleComponent implements OnInit {

  @Input() title: string;

  @Input() titlePosition: string;

  @Input() titleColor:string;

  @Input() titleFontName:string;

  @Input() titleFontSize:number;

  @Input() isTitleBold:boolean;

  @Input() isTitleItalic:boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
