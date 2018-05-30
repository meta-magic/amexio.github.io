

 /*
 Component Name : Amexio ToolBar
 Component Selector : <amexio-toolbar-action>
 Component Description : 
*/
import {Component, Input, OnInit, Output, EventEmitter,ContentChildren,QueryList} from '@angular/core';
import { AmexioDropDownComponent } from '../dropdown/dropdown.component';
import { AmexioButtonComponent} from '../buttons/button.component';
import {AmexioLabelComponent} from '../label/label.component';
@Component({
  selector: 'amexio-toolbar-action', 
  template: 
  `
   <ng-content></ng-content>
  `
})
export class ToolBarActionComponent implements OnInit {
    @ContentChildren(AmexioDropDownComponent, { descendants: true }) queryDropDown: QueryList<AmexioDropDownComponent>;
    dropdown: AmexioDropDownComponent[];

    @ContentChildren(AmexioButtonComponent, { descendants: true }) queryButton: QueryList<AmexioButtonComponent>;
    button: AmexioButtonComponent[];
    
    @ContentChildren(AmexioLabelComponent, { descendants: true }) queryLabel: QueryList<AmexioLabelComponent>;
    label: AmexioLabelComponent[];
  


  /*
Properties 
name : type
datatype : string
version : 4.0 onwards
default : none
description : Indicate the type of menu-items (link / button / textfield /menu )
*/ 
  @Input() type : string;

  /*
Properties 
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title for link, button and menu header
*/
  @Input() title : string;
/*
Events 
name : navLinkClick
datatype : any
version : none
default : none
description : Fire when nav item is clicked, This event is fired when nav item type is defined as 'link/button/menu'

*/
  @Output() navLinkClick: any = new EventEmitter<any>();
  actionComponent: any;
  constructor() {
    this.actionComponent = "";
  }

  ngOnInit() {
  }

  onClick(event:any){
      let node = {
        'title': this.title,
        'type' : this.type,
        
      };
      this.navLinkClick.emit({'data':node,'event':event});

  }
  checkActionComponent(){
    this.dropdown = this.queryDropDown.toArray();
    if (this.dropdown.length > 0) {
      this.actionComponent = 'dropdown';
      this.dropdown[0].fieldlabel = "";
    }


    this.button = this.queryButton.toArray();
    if (this.button.length > 0) {
      this.actionComponent = 'button';
    }

  }  

}
