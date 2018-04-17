
import {Component, OnInit, QueryList,ContentChildren} from '@angular/core';
import { AmexioButtonComponent} from "./../../forms/buttons/button.component"
import { AmexioButtonGroupComponent} from "./../../forms/buttongroup/button.group.component"
//import { AmexioButtonDropdownComponent} from "./../../forms/button-dropdown/button.dropdown"
// import { AmexioFloatingButtonComponent} from "./../../forms/floatingbutton/floatingbutton.component"
// import { AmexioFloatingGroupButtonComponent} from "./../../forms/floatinggroupbutton/floatinggroupbutton.component"
@Component({
  selector: 'amexio-form-action', template: '<ng-content></ng-content>'
})



export class AmexioFormActionComponent implements OnInit {

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[] = [];
  @ContentChildren(AmexioButtonGroupComponent) btngrp: QueryList<AmexioButtonGroupComponent>;
  //@ContentChildren(AmexioButtonDropdownComponent) btndrop: QueryList<AmexioButtonDropdownComponent>;
  
  // @ContentChildren(AmexioFloatingButtonComponent) floatinbtn: QueryList<AmexioFloatingButtonComponent>;
  // @ContentChildren(AmexioFloatingGroupButtonComponent) floatingrpbtn: QueryList<AmexioFloatingGroupButtonComponent>;
  // floatbtn : AmexioFloatingButtonComponent[] = [];
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
   
    if(this.btns.length > 0) {
      this.buttons = this.btns.toArray();
    } 
    else if(this.btngrp.length > 0)
    {
      this.buttons = this.btngrp.toArray()[0].buttons;
    } 
  //   else if (this.btndrop.length > 0)
  //   {
     
  //     this.buttons = this.btndrop.toArray()[0].dropdownItemData;
  //   } else if (this.floatinbtn.length > 0)
  //   {
     
  //     this.floatbtn = this.floatinbtn.toArray();
  //   } else if (this.floatingrpbtn.length > 0)
  //   {
     
  //  //   this.floatbtn = this.floatingrpbtn.toArray();
  //   }
  }
}
