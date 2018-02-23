import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {AmexioButtonComponent} from "../buttons/button.component";

@Component({
  selector: 'amexio-btn-group',
  templateUrl: './button.group.component.html',
  styleUrls: ['./button.group.component.scss']
})
export class AmexioButtonGroupComponent implements AfterContentInit {

  @Input() size: string;

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;

  buttons: AmexioButtonComponent[] = [];

  constructor() {

  }
  
 buttonClick(event: any, btnObj: any) {
    btnObj.onClick.emit(event);
  }
  
  ngAfterContentInit() {
    this.buttons = this.btns.toArray();
  }


}
