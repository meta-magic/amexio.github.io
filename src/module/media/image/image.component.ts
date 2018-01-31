/**
 * Created by pratik on 18/12/17.
 */
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
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'amexio-image', templateUrl: './image.component.html'
})

export class AmexioImageComponent implements OnInit {

  @Input() tooltip: string;

  @Input() title: string;

  @Input() path: string;

  @Input('icon-class') iconclass: string;

  @Input('c-class') cclass: string;

  @Input() mdb: string;

  @Input() width:string;

  @Input() height:string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onImageClick(event: any) {
    this.onClick.emit(event);
  }

  ngOnInit(): void {
    if(!(this.width || this.height)){
      this.cclass=this.cclass+" img-fluid";
    }
  }

}
