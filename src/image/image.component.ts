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
  selector: 'amexio-image',
  template: `    
    <!--Normal image-->
      <ng-container *ngIf="imagePath || (imagePath && imageClass)">
        <img [src]="imagePath" [attr.class]="cClass" >
      </ng-container>
      
      <!--this is for material design-->
      <ng-container *ngIf="imageClass && mdbClass && !imagePath">
        <i [attr.class]="imageClass">{{mdbClass}}</i>
      </ng-container>
      
      <!--this is for fontawesome-->
      <ng-container *ngIf="imageClass && (!imagePath && !mdbClass)">
        <i [attr.class]="imageClass"></i>
      </ng-container>
  
  `
})

export class ImageComponent implements OnInit {

  @Input() imagePath:string;

  @Input() imageClass:string;

  @Input() cClass:string;

  @Input() mdbClass:boolean;

  constructor() {

  }


  ngOnInit(): void {
  }

}
