/**
 * Created by pratik on 27/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-progress-bar',
  template: `
    <div *ngIf="showProgress" class="meter" [ngClass]="{'nostripes' : stripped,'success' : type == null || type?.toLocaleLowerCase() == 'success' ,'warning' : type?.toLocaleLowerCase() == 'warning','danger' : type?.toLocaleLowerCase() == 'danger'}">
        <span *ngIf="infinteMode" style="width: 100%;">{{label != null ? label : 'Loading...'}}</span>
        <span *ngIf="!infinteMode" [ngStyle]="{'width.%' : currentValue}"></span>
		</div>
  `
})

export class AmexioProgressBarComponent implements OnInit {

  @Input()    showProgress : boolean = true;

  @Input()    infinteMode : boolean;

  @Input()    type : string;

  @Input()    currentValue : string;

  @Input()    progressType : string;

  @Input()    label : any;

  @Input()    height : any;

  @Input()    stripped : boolean;

  @Input()    multi : boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
