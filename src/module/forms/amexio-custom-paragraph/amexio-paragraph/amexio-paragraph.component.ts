import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-paragraph',
  templateUrl: './amexio-paragraph.component.html',
  styleUrls: ['./amexio-paragraph.component.scss'],
})
export class AmexioParagraphComponent implements OnInit {
  constructor() { }
  /*
 Properties
 name : type
 datatype : string
 version : 5.21 onwards
 default : label
 description : label | editabletext
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

  editContent = false;
  isEditable = false;
  textcontent: string;

  ngOnInit() {

    this.validateLabel();
  }

  validateLabel() {
    if (this.type === 'editabletextfield') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }

  onLblClick() {
    if (this.isEditable) {
      this.textcontent = this.content;
      this.editContent = true;
    }
  }

  onTxtUpdate() {
    this.content = this.textcontent;
    this.editContent = false;
  }
}
