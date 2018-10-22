import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component ({
  selector: 'amexio-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class AmexioChipsComponent implements OnInit {
  /*
 Properties
 name : data
 datatype :
 version : 5.3onwards
 default :
 description : The Data is set of json value like icon,label and closable.
 */
@Input('data') data: any[];
 /*
   Events
   name : selectedRowData
   datatype : none
   version : none
   default : none
   description : It will fire only on selection of checkbox and gives you selected record data.
   */
  @Output('onLabelClick') onLabelClick: any = new EventEmitter<any>();

  @Output('onCloseClick') onCloseClick: any = new EventEmitter<any>();

  ngOnInit() {
  }

  onCloseClickMethod(item: any) {
    this.data.forEach((element: any, index: number) => {
      if (element === item) {
        this.data.splice( index, 1 );
      }
    });
    this.onCloseClick.emit(item);
  }
  constructor() {
  }

  onLabelClickMethod(item: any) {
    this.onLabelClick.emit(item);
  }
}
