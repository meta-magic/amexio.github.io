/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by anaghak07 on 6/3/18.
*/
import { Component, Input, OnInit } from '@angular/core';
import { IconLoaderService } from '../../services/icon/icon.service';

@Component({
  selector: 'amexio-box',
  templateUrl: './box.component.html',
})

export class AmexioBoxComponent implements OnInit {
  /*
  Properties
  name : border
  datatype : string
  version : 4.1 onwards
  default : none
  description : Can set border position : top / right / left / bottom / all / top-bottom / left-right
  */
  @Input('border') border: string;
  /*
  Properties
  name : border-color
  datatype : string
  version : 4.1 onwards
  default : theme's border color
  description : Can use amexio colors : red / blue / green / yellow / brown / purple
  */
  @Input('border-color') borderColor: string;
  /*
  Properties
  name : background-color
  datatype : string
  version : 4.1 onwards
  default : theme's background color
  description : Can use amexio colors : red / blue / green / yellow / brown / purple

  */
  @Input('background-color') bgColor: string;
  /*
  Properties
  name : padding
  datatype : boolean
  version : 4.1 onwards
  default : false
  description : Padding to all sides
  */
  @Input('padding') padding = false;
  /*
  Properties
  name : box-height
  datatype : string
  version : 4.1.2 onwards
  default :
  description : Height to box
  */
  @Input('box-height') height: string;
  /*
 Properties
 name : box-width
 datatype : string
 version : 4.1.2 onwards
 default :
 description : Width to box
 */
  @Input('box-width') width: string;

  /*
 Properties
 name : border-dotted
 datatype : boolean
 version : 4.1.8 onwards
 default : false
 description : Dotted border
 */
  @Input('border-dotted') borderDotted = false;

  /*
  Properties
  name : align
  datatype : string
  version : 4.1.8 onwards
  default : left
  description : Align to box "left" "right" "center"
  */
  @Input('align') align: string;
  /*
  Properties
  name : closable
  datatype : boolean
  version : 4.1.8 onwards
  default : false
  description : closable box
  */
  @Input('closable') closable = false;
  themeCss: string;
  amexioComponentId = 'amexio-box';
  constructor() { }
  close = true;
  ngOnInit() {
    if (this.borderColor == null) {
      this.borderColor = 'box-default';
    }
    if (this.borderColor != null && this.bgColor == null) {
      this.bgColor = this.borderColor;
    }
  }
  closeBox(event: any) {
    this.close = false;
    this.closable = false;
  }

  // Theme Apply
  setColorPalette(themeClass: any) {
    if (themeClass) {
      this.themeCss = themeClass;
    }
  }
}
