/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Dattaram Gawas
 *
 */
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

declare var $;
@Component({
  selector: 'amexio-btn',
  template : `
      <div>
          <button type="button" (click)="btnClick($event)"
                  [class]="btnStyleClass"
                  [attr.fieldName] = "fieldName"
                  [attr.disabled] = "disabled ? true: null"
                  data-toggle="tooltip" [attr.data-placement]="popoverPlacement" [attr.title]="tooltipMessage">
              <ng-container *ngIf="isLoading">
                <i class="fa fa-refresh fa-spin " aria-hidden="true"></i>&nbsp;
              </ng-container>
              {{label}}
              <ng-container *ngIf="icon!=null">
                <i [class]="iconStyleClass" aria-hidden="true"></i>                
              </ng-container>
          </button>
      </div>
  `,
  styles : [`
  .glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -webkit-animation: spin2 .7s infinite linear;
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}`
  ]
})
export class ButtonComponent implements OnInit , OnChanges, AfterViewInit {

  @Input()    label: string;

  @Input()    icon: string;

  @Input()    type: string;

  @Input()    onClickRoute: string;

  @Input()    tooltipMessage: string;

  @Input()    disabled: boolean;

  @Input()    isLoading: boolean;

  @Input()    size: string;

  @Input()    block: boolean;

  @Input()    fieldName: string;

  @Input()   popoverPlacement: string;

  btnStyleClass: string;

  iconStyleClass: string;

  btnSizeStyleClass: string;

  elementId: any;

  hasToolTip: boolean;


  @Output()   onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.elementId = 'button-' + Math.floor(Math.random()*90000) + 10000;
  }

  ngOnInit() {
    this.btnStyleClass = 'btn ';
    this.btnSizeStyleClass = '';
    if (this.type.toLocaleLowerCase() === 'warning') {
      this.btnStyleClass = this.btnStyleClass + 'btn-warning';
    } else if (this.type.toLocaleLowerCase() === 'primary') {
      this.btnStyleClass = this.btnStyleClass + 'btn-primary';
    } else if (this.type.toLocaleLowerCase() === 'success') {
      this.btnStyleClass = this.btnStyleClass + 'btn-success';
    } else if (this.type.toLocaleLowerCase() === 'danger') {
      this.btnStyleClass = this.btnStyleClass + 'btn-danger';
    } else if (this.type.toLocaleLowerCase() === 'link') {
      this.btnStyleClass = this.btnStyleClass + 'btn-link';
    } else {
      this.btnStyleClass = this.btnStyleClass + 'btn-secondary';
    }
    this.iconStyleClass =  this.icon;
    if (this.tooltipMessage == null) {
      this.hasToolTip = false;
    }
    if (this.size != null) {
      if (this.size === 'large') {
        this.btnStyleClass = this.btnStyleClass.concat(' btn-lg');
      } else if (this.size === 'small') {
        this.btnStyleClass = this.btnStyleClass.concat(' btn-sm');
      }
    }
    if (this.block) {
      this.btnStyleClass = this.btnStyleClass.concat(' btn-block');
    }
      if (this.popoverPlacement == null) {
          this.popoverPlacement = 'bottom';
      }

  }

  ngOnChanges(change: SimpleChanges) {
    /*console.log(change.isLoading);
      if(change.isLoading){
        this.disabled = true;
      }*/ // TODO : Fix
  }

    ngAfterViewInit() {
       // $('[data-toggle="popover"]').popover();
    }

  btnClick(event: any) {
    this.onClick.emit(event);
    if (this.onClickRoute != null) {
      // this.router.navigate([this.onClickRoute]);
    }
  }
}
