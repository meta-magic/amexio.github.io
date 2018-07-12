 /*
 Component Name : Amexio Form Action
 Component Selector : <amexio-form-action>
 Component Description : Amexio Form actions contains the action items within form

*/
import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import { AmexioButtonGroupComponent} from './../../forms/buttongroup/button.group.component';
import { AmexioButtonComponent} from './../../forms/buttons/button.component';

@Component({
  selector: 'amexio-form-action', template: '<ng-content></ng-content>',
})

export class AmexioFormActionComponent implements OnInit, AfterViewInit {
 /*
Properties
name : padding
datatype : string
version : 4.2 onwards
default : left
description : padding for Action.
*/
@Input() padding: string;

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[] = [];
  @ContentChildren(AmexioButtonGroupComponent) btngrp: QueryList<AmexioButtonGroupComponent>;
  // @ContentChildren(AmexioButtonDropdownComponent) btndrop: QueryList<AmexioButtonDropdownComponent>;
  // @ContentChildren(AmexioFloatingButtonComponent) floatinbtn: QueryList<AmexioFloatingButtonComponent>;
  // @ContentChildren(AmexioFloatingGroupButtonComponent) floatingrpbtn: QueryList<AmexioFloatingGroupButtonComponent>;
  // floatbtn : AmexioFloatingButtonComponent[] = [];
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    if (this.btns.length > 0) {
      this.buttons = this.btns.toArray();
    } else if (this.btngrp.length > 0) {
      this.buttons = this.btngrp.toArray()[0].buttons;
    }
  }
}
