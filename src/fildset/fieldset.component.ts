/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Ketan Gote on 8/10/17.
 */


import {
  Component,  Input, OnInit
} from '@angular/core';




@Component({
  selector: 'amexio-fieldset',
  template : `

    <div style="padding: 5px;">
      <fieldset  [attr.class]="fieldSetClass">
        <legend  class="scheduler-border">
          <i *ngIf="collapsible" [attr.class]="expandCollapseClass" aria-hidden="true" (click)="toogle()"></i>
          <span (click)="toogle()"> &nbsp;{{title}}</span>
        </legend>
        <div [attr.class]="fieldSetContent">
          <ng-content select="amexio-fieldset-body"></ng-content>
        </div>
      </fieldset>
    </div>
    

    
  `,

  styleUrls: ['fieldset.custom.css']

})
export class FieldSetComponent implements OnInit{


  @Input() collapsible: boolean;

  @Input() title: string;

  fieldSetClass: string;

  fieldSetContent: string;

  expandCollapseClass: string;

  expanded: boolean;



  constructor(){
    this.fieldSetClass = "scheduler-border-expanded";
    this.fieldSetContent = "contentdisplay";
    this.expandCollapseClass = "fa fa-minus-square-o"
    this.expanded = true;
  }


  ngOnInit(){

  }

  toogle(){
    this.expanded = !this.expanded;

    if(this.expanded){
      this.fieldSetClass = "scheduler-border-expanded";
      this.fieldSetContent = "contentdisplay";
      this.expandCollapseClass = "fa fa-minus-square-o"
    }
    else if(!this.expanded){
      this.fieldSetClass = "scheduler-border-collapsed";
      this.fieldSetContent = "contentnone";
      this.expandCollapseClass = "fa fa-plus-square-o"
    }

  }

}
