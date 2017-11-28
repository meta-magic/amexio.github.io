/**
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Created by Dattaram Gawas.
 */
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-notification',
  template: `
   <div class="list-group" [ngClass]="msgStylClass"  *ngIf="messageData!=null" (window:resize)="onResize($event)">
     <ng-container *ngFor="let data of messageData let msgIndex=index" >
     <a [ngStyle]="setMsgBackground(data)" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
           <h6 class="amexio-message-color"><i class="fa fa-lg " [ngClass]="icon" aria-hidden="true"></i>
             {{data.msg}}</h6>
          <i class="fa fa-times" aria-hidden="true" (click)="closePopup(msgIndex)"></i>
        </div>
     </a>
     </ng-container>
   </div>
  
  `,
 styles : [`
     .amexio-messenger-desktop {
         position: absolute;
         top: 8%;
         left: 70%;
         right: 1%;
         text-align: center;
         overflow: hidden;
         cursor: pointer;
     }
     .amexio-messenger-mobile {
         position: absolute;
         z-index: 101;
         top: 2%;
         left: 20%;
         right: 1%;
         text-align: center;
         overflow: hidden;
         cursor: pointer;
     }
     .amexio-message-color {
         color: white;

     }

 `]
})

export class NotifyComponent implements OnInit {

  @Input()messageData: any;

  @Input() timeOut: number;

  icon: string;

  msgStylClass: string;

  constructor(private ref: ChangeDetectorRef) {


  }

  ngOnInit() {
   this.changeStyle();
    if (this.timeOut === null ) {
      this.timeOut = 7000;
    }
    if ( this.messageData !== null ) {
      setInterval(() => {
        this.messageData.shift();
        this.ref.markForCheck();
      }, this.timeOut);
    }
  }

  closePopup(index: number) {
    this.messageData.splice(index, 1);
  }

  setMsgBackground(data: any) {
    if (data.type === 'success') {
      this.icon = 'fa-check-circle';
      return {'background-color': '#33cc33'};
    }else if (data.type === 'danger') {
      this.icon = 'fa-times-circle';
      return {'background-color': 'red'};
    }else if (data.type === 'info') {
      this.icon = 'fa-info-circle';
      return {'background-color': '#3399ff'};
    }else if (data.type === 'warn') {
      this.icon = 'fa-exclamation-circle';
      return {'background-color': '#ff9900'};
    }
  }

  onResize(event: any) {
  this.changeStyle();
  }
  changeStyle() {
      if (window.innerWidth > 768) {
        this.msgStylClass = 'amexio-messenger-desktop';
      }else {
        this.msgStylClass = 'amexio-messenger-mobile';
      }
    }

}
