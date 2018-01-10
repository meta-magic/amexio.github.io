import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {AmexioButtonComponent} from "../buttons/button.component";

@Component({
  selector: 'amexio-btn-group',
  templateUrl : './button.group.component.html'
})
export class AmexioButtonGroupComponent implements AfterContentInit{

  @Input()    label: string;

  @ContentChildren(AmexioButtonComponent)   btns : QueryList<AmexioButtonComponent>;

  buttons : AmexioButtonComponent[] = [];

  constructor(){

  }

  ngAfterContentInit(){
    this.buttons = this.btns.toArray();
  }



}
