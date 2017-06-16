/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import { Component, EventEmitter, HostListener, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {FormInputBase} from "../baseclass/form.base.class";

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingInputComponent),
  multi: true
};

export const BASE_IMPL_RATING_INPUT : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => RatingInputComponent)
};

@Component({
  selector: 'amexio-rating-input',
  template : `
      <span (mouseleave)="reset()" (keydown)="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <ng-template ngFor let-r [ngForOf]="range" let-index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ngClass]="index < value ? r.stateOn : r.stateOff" [title]="r.title" ></i>
      </ng-template>
  </span>

      <ng-container *ngIf="percentageLabel">
<span class="label"
      [ngClass]="{'label-warning': percent<30, 'label-info': percent>=30 && percent<70, 'label-success': percent>=70}"
      [ngStyle]="{display: (overStar && !isReadonly) ? 'inline' : 'none'}">{{percent}}%</span>
      </ng-container>
  `,
  providers: [RATING_CONTROL_VALUE_ACCESSOR,BASE_IMPL_RATING_INPUT]
})
export class RatingInputComponent extends FormInputBase implements OnInit {

  public overStar:number;

  public percent:number;

  @Input() public max: number = 5;

  @Input() public stateOn: string;

  @Input() public stateOff: string;

  @Input() public readonly: boolean;

  @Input() public percentageLabel: boolean;

  @Input() public titles: string[];

  @Input() public ratingStates: {stateOn: string, stateOff: string}[];

  constructor(){
    super();
  }

  public onChange: any = Function.prototype;

  public onTouched: any = Function.prototype;

  public range: any[];
  public value: number;
  protected preValue: number;

  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar():void {
    this.overStar = void 0;
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: any): void {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    let sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }

  public ngOnInit(): void {
    this.max = typeof this.max !== 'undefined' ? this.max : 5;
    this.readonly = this.readonly === true;
    this.stateOn = typeof this.stateOn !== 'undefined'
      ? this.stateOn
      : 'glyphicon-star';
    this.stateOff = typeof this.stateOff !== 'undefined'
      ? this.stateOff
      : 'glyphicon-star-empty';
    this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0
      ? this.titles
      : ['one', 'two', 'three', 'four', 'five'];
    this.range = this.buildTemplateObjects(this.ratingStates, this.max);
  }

  // model -> view
  public writeValue(value: number): void {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      return;
    }

    this.preValue = value;
    this.value = value;
  }

  public enter(value: number): void {
    if (!this.readonly) {
      this.value = value;
      this.hoveringOver(value);
    }
  }

  public reset(): void {
    this.value = this.preValue;
    this.resetStar();
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public rate(value: number): void {
    if (!this.readonly && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  protected buildTemplateObjects(ratingStates: any[], max: number): any[] {
    ratingStates = ratingStates || [];
    let count = ratingStates.length || max;
    let result: any[] = [];
    for (let i = 0; i < count; i++) {
      result.push(Object.assign({
        index: i,
        stateOn: this.stateOn,
        stateOff: this.stateOff,
        title: this.titles[i] || i + 1
      }, ratingStates[i] || {}));
    }
    return result;
  }

  isValidInput(){
    return true; //for now
  }
}
