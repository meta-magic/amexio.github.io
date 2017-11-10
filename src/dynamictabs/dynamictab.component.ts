/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas, Sagar Jadhav
 *
 */

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
declare var $;
@Component({
 selector: 'amexio-dynamic-tab',
 template: `
   <ul class="nav nav-tabs">
     <li class="nav-item" *ngFor="let item of data">
       <a class="nav-link" (click)="onClick(item)" [attr.id]="item.route">{{item.title}} &nbsp;&nbsp; <a class="amexio-tabpane-closeicon-position" (click)="closeTab(item)">&times;</a></a>
     </li>
   </ul>
   
   <div class="tab-contents">
     <router-outlet></router-outlet>  
   </div>
   
   
 `,
  styles : [`.amexio-tabpane-closeicon-position{
    vertical-align: top;
    cursor: pointer;
  }`]
})

export class DynamicTabComponent implements AfterViewInit {

 @Input() data : any;

 constructor(private router : Router) {

 }

 ngAfterViewInit(){
   this.setFirstActive();
 }

 onClick(item : any){
   this.data.forEach((dataItem)=>{
     document.getElementById(dataItem.route).classList.remove('active');
   });
   document.getElementById(item.route).classList.add('active');
   this.router.navigate([item.route]);
 }

 setFirstActive(){
  document.getElementById(this.data[0].route).classList.add('active');
   this.router.navigate([this.data[0].route]);
 }

  closeTab(item){
   let i;
   this.data.forEach((dt,index)=>{
     if(item == dt){
       i = index;
       document.getElementById(dt.route).classList.remove('active');
     }
   });
   this.data.splice(i,1);
   if(i != 0){
     let j = i-1;
     document.getElementById(this.data[j].route).classList.add('active');
     this.router.navigate([this.data[j].route]);
   }
  }
}
