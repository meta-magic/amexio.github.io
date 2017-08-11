/**
 * Created by dattaram on 10/8/17.
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
 styleUrls: ['notification.custom.css']
})

export class NotifyComponent implements OnInit {

  @Input()messageData: any;

  icon: string;

  msgStylClass: string;

  constructor(private ref: ChangeDetectorRef) {

    if ( this.messageData !== null ) {
      setInterval(() => {
        this.messageData.shift();
        this.ref.markForCheck();
      }, 1500);
    }

  }

  ngOnInit() {
   this.changeStyle();
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
