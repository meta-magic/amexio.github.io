import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {AmexioButtonComponent} from "../buttons/button.component";

@Component({
  selector: 'amexio-btn-group',
  templateUrl: './button.group.component.html',
  styleUrls: ['./button.group.component.scss']
})
export class AmexioButtonGroupComponent implements AfterContentInit {

  @Input() size: string;

  previousData: any;

  @Input() buttonGroupLocalData: any;

  buttonGroupPreviewData: any;


  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;

  buttons: AmexioButtonComponent[] = [];

  constructor() {
  }

  ngDoCheck() {
    if (JSON.stringify(this.buttonGroupPreviewData) != JSON.stringify(this.buttonGroupLocalData)) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
    }
  }

 buttonClick(event: any, btnObj: any) {
    btnObj.onClick.emit(event);
  }

  ngAfterContentInit() {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0 ) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
    } else {
      this.buttons = this.btns.toArray();
    }

  }


}
