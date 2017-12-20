/**
 * Created by ketangote on 12/18/17.
 */



import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-notification',
  template: `
    <div class="toastbar" [ngClass]="positionclass">
      <div class="toast" *ngFor="let msg of messageData">
        <span>{{msg}}</span>
        <span class="float-right" (click)="close(msg)"><i *ngIf="closable" class="fa fa-times" aria-hidden="true"></i></span>
      </div>
    </div>
  `
})
export class AmexioNotificationComponent implements  OnInit{

  @Input() closable : boolean = true;

  @Input() verticalposition: string;

  @Input() horizontalposition: string;

  @Input() messageData: any[];

  data : any[];

  positionclass:string;

  constructor(private ref : ChangeDetectorRef){
   if ( this.messageData !== null ) {
      setInterval(() => {
        this.messageData.shift();
        this.ref.markForCheck();
      }, 1500);
    }

  }


  ngOnInit(){

    if(this.verticalposition == null){
      this.verticalposition = 'top';
    }
    else if(this.horizontalposition == null){
      this.horizontalposition = 'right'
    }

    this.positionclass="toast-"+this.verticalposition+" toast-"+this.horizontalposition;
    // this.data = JSON.parse(JSON.stringify(this.messageData));
  }


  close(msg:any){
    const count = this.data.length;
    for(let i=0; i<count; i++){
      if(this.data[i] === msg){
        this.data.splice(msg,1);
      }
    }
  }


}



