/**
 * Created by pratik on 27/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-progress-bar', template: `
    <div *ngIf="showProgress" class="progress"
         [ngClass]="{'nostripes' : stripped,'success' : type == null || type?.toLocaleLowerCase() == 'success' ,'warning' : type?.toLocaleLowerCase() == 'warning','danger' : type?.toLocaleLowerCase() == 'danger'}">
      <span *ngIf="infinite" style="width: 100%;">{{label != null ? label : 'Loading...'}}</span>
      <span *ngIf="!infinite" [ngStyle]="{'width.%' : currentvalue}"></span>
    </div>
  `
})

export class AmexioProgressBarComponent implements OnInit {

  @Input('show') showProgress: boolean = true;

  @Input() infinite: boolean;

  @Input() type: string;

  @Input('current-value') currentvalue: string;

  @Input() label: any;

  @Input() height: any;

  @Input() stripped: boolean;

  @Input() multi: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
