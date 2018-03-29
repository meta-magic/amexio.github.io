
/*
 Component Name : Amexio Button Group
 Component Selector : <amexio-btn-group>
 Component Description : Amexio Button groups are containers for related action amexio-button.

*/
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output,
  QueryList, SimpleChanges
} from '@angular/core';
import {AmexioButtonComponent} from "../buttons/button.component";

@Component({
  selector: 'amexio-btn-group',
  templateUrl: './button.group.component.html',
  styleUrls: ['./button.group.component.scss']
})
export class AmexioButtonGroupComponent implements AfterContentInit,OnChanges {

 /*
Properties 
name : size
datatype :  string
version : 4.0 onwards
default : none
description : Different Sizes of Buttons availabe : large, default, small & xsmall
*/  
  @Input() size: string;

  previousData: any;
/* for internal use*/ 
  @Input() buttonGroupLocalData: any;

  buttonGroupPreviewData: any;

  /*
Events
name : getButton
datatype :  none
version : none
default : none
description : Fire when button click
*/  
  @Output() getButton: any = new EventEmitter<any>();

  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;

  buttons: AmexioButtonComponent[] = [];

  constructor() {
  }

  ngDoCheck() {
    if (JSON.stringify(this.buttonGroupPreviewData) != JSON.stringify(this.buttonGroupLocalData)) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
      this.setButtonSizes(this.buttons);
    }
  }

  ngOnChanges(change : SimpleChanges){
    if( change.size && !change.size.isFirstChange()){
      this.updateButtonSizes(change.size);
    }
  }

  buttonGroupClick(event: any, btnObj: any) {
    if(this.buttonGroupLocalData  || this.buttonGroupLocalData.length > 0) {
      this.getButton.emit({event:event,buttonObject:btnObj});
    } else {
      btnObj.onClick.emit(event);
    }

  }

  ngAfterContentInit() {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0 ) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
    } else {
      this.buttons = this.btns.toArray();
    }
    this.setButtonSizes(this.buttons);
  }

  setButtonSizes(btnArray : any){
    if(btnArray.length > 0){
      btnArray.forEach((btn : any)=>{
       /* if(this.size!=null){
          if(btn.size == null)
            btn.size = this.size;
        }*/
       btn.size = this.size;
      });
    }
  }

  updateButtonSizes(size : any){
    this.buttons.forEach((btn : any)=>{
      btn.size = size;
    });
  }


}
