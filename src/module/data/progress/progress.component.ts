/**
 * Created by pratik on 27/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-progress-bar', template: `
    <div *ngIf="showProgress" class="progress">
      <span [ngClass]="progressclass" *ngIf="infinite" style="width: 100%;">{{label != null ? label : 'Loading...'}}</span>
      <span [ngClass]="progressclass" *ngIf="!infinite" [ngStyle]="{'width.%' : currentvalue}"></span>
    </div>
  `
})

export class AmexioProgressBarComponent implements OnInit {

  @Input('show') showProgress: boolean = true;

  @Input() infinite: boolean;

  @Input() type: string;

  @Input('amexio-color') amexiocolor : string;

  @Input('current-value') currentvalue: string;

  @Input() label: any;

  @Input() height: any;

  @Input() stripped: boolean;

  @Input() multi: boolean;

  progressclass : string = "";

  constructor() {
  }

  ngOnInit() {
    
    if(this.stripped){
      this.progressclass = this.progressclass  + "stripped ";
    }
    if(this.type && !this.amexiocolor){
      this.progressclass = this.progressclass  + this.type.toLocaleLowerCase();
    }
    else if(this.amexiocolor && !this.type){
      this.progressclass = this.progressclass  + this.amexiocolor.toLocaleLowerCase();
    }
    
  }
}
