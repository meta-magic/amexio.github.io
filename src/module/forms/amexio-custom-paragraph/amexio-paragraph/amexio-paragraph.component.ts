import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-paragraph',
  templateUrl: './amexio-paragraph.component.html',
})
export class AmexioParagraphComponent implements OnInit {
  constructor() { }
  /*
 Properties
 name : type
 datatype : string
 version : 5.21 onwards
 default : label
 description : label | editabletextfield
 */
  @Input('type') type = 'label';
  /*
Properties
name : content
datatype : string
version : 5.21 onwards
default : none
description : text to display
*/
  @Input('content') content: string;
  /*
Properties
name : color
datatype : string
version : 5.21 onwards
default : none
description : text color
*/
  @Input('color') color: string;
  /*
Properties
name : new-inlie
datatype : boolean
version : 5.21 onwards
default : false
description : flag to set new line
*/
  @Input('new-line') newline = false;

  /*
Properties
name : fontsize
datatype : string
version : 5.21 onwards
default : medium
description : small | medium | large
*/
  @Input('font-size') fontsize = 'medium';

  editContent: boolean;
  isEditable: boolean;
  textcontent: string;
  componentType = '';

  /*
 Properties
 name : data
 datatype : string
 version : 5.21 onwards
 default : none
 description : local JSON data variable
 */
  _pdata: any;

  @Input('pdata')
  set pdata(value: any[]) {
    this._pdata = value;
  }
  get pdata(): any[] {
    return this._pdata;
  }
  /*
  Events
  name : pdataChange
  datatype : none
  version : 5.21 onwards
  default : none
  description : returns the updated json value
  */
  @Output() pdataChange = new EventEmitter();

  ngOnInit() {
    this.pdata.forEach((element: any) => {
      element.editContent = false;
      if (element.type === 'editabletextfield') {
        element['isEditable'] = true;
      } else {
        element['isEditable'] = false;
      }
    });
  }

  validateLabel() {
    if (this.type === 'editabletextfield') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }

  onLblClick(item: any) {
    item.textcontent = item.content;
    item.editContent = true;
  }

  onTxtUpdate(event: any, item: any) {
    if (event.target.value === '') {
      this.editContent = false;
      this.textcontent = 'Add Text';
    }
    this.pdata.forEach((element) => {
      if (element['content'] === item.content && element.index === item.index) {
        element['content'] = event.target.value;
        element.editContent = false;
      }
    });
    this.pdataChange.emit(this.pdata);
  }
}
