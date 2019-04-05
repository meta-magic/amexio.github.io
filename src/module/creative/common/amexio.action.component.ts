/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by sagar on 4/02/2019.
*/
import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AmexioButtonGroupComponent } from '../../forms/buttongroup/button.group.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { AmexioFormActionCEComponent } from '../form/form.action.component';
@Component({
  selector: 'amexio-action-ce',
  templateUrl: './amexio.action.component.html',
})
export class AmexioCardCEActionComponent implements AfterViewInit, OnInit {

  @Input('align') align = '';

  @Input('bg-image') bgimage: string;

  @Input('color') color: string;

  @Input('background') background: string;

  @Input('height') height: string;

  @Input('border-top') bordertop: boolean;

  @Input('direction') direction = 'row';

  cclass = '';

  formFlag = false;

  showError = false;

  errorMsgArray: any[];

  isFormValid: boolean;

  showDialogue: boolean;

  form: NgForm;

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;

  buttons: AmexioButtonComponent[] = [];

  @ContentChildren(AmexioButtonGroupComponent) btngrp: QueryList<AmexioButtonGroupComponent>;

  @ViewChild(AmexioFormActionCEComponent) formAction: AmexioFormActionCEComponent;

  constructor(public formBuilder: FormBuilder) {
    this.isFormValid = false;
    this.showDialogue = false;
    this.errorMsgArray = [];

  }

  ngOnInit() {
    if (this.bordertop) {
      this.cclass = 'card-action-border';
    }
  }

  ngAfterViewInit() {

    if (this.btns.length > 0) {
      this.buttons = this.btns.toArray();
    } else if (this.btngrp.length > 0) {
      this.buttons = this.btngrp.toArray()[0].buttons;
    }

  }

  checkFormValidation(data: any) {
    if (this.formAction && data && this.formFlag) {
      this.form = data;
      this.formAction.getValidationForm(this.form, this.formFlag);
    }

  }

}
