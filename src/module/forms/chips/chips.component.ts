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
*/

import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { AmexioChipComponent } from '../chip/chip.component';

@Component({
  selector: 'amexio-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class AmexioChipsComponent implements AfterContentInit {

  @ContentChildren(AmexioChipComponent) queryChips: QueryList<AmexioChipComponent>;
  chipCollection: AmexioChipComponent[];
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
    name : displayfield
    datatype : none
    version : none
    default : none
    description : It will display the key of the json passed.
    */
   @Input('display-field') displayfield: any;
  /*
    Events
    name : selectedRowData
    datatype : none
    version : none
    default : none
    description : It will fire only on selection of checkbox and gives you selected record data.
    */
  @Output() selectedchipsData: any = new EventEmitter<any>();

  @Output() closeClick: any = new EventEmitter<any>();
  componentId: any;
  chipindex = -1;
  prevchipindex = -1;
  chiplabel: any;
  documentClickListener: any;
  obj: any = {};
  constructor(public renderer: Renderer2) {
    this.componentId = 'chips' + Math.floor(Math.random() * 1000 + 999);
  }

  ngAfterContentInit() {
    this.chipCollection = this.queryChips.toArray();
    if (this.chipCollection.length > 0) {
      this.data = this.chipCollection;
    }
    this.generateIndex();
    this.listenChipOutClick();
  }

  listenChipOutClick() {
    this.documentClickListener = this.renderer
      .listen('document', 'click', (event: any) => {
        if (this.data.length > 0) {
          this.data.forEach((element: any, index: number) => {
            if (this.data[index]['selected'] === true) {
              this.data[index]['selected'] = false;
              this.chipindex = -1;
              this.prevchipindex = -1;
            }
          });
        }
      });
  }
  onCloseChipsClick(item: any) {
    if (this.chipindex > -1) {
      this.data[this.chipindex]['selected'] = false;
    }
    if (this.data.length > 0) {
      this.data.forEach((element: any, index: number) => {
        if (element.label === item.label) {
          this.data.splice(index, 1);
        }
      });
      this.emitCloseData(item);
    }
  }

  emitCloseData(item: any) {

    const cloneNode = JSON.parse(JSON.stringify(item));
    delete cloneNode['index'];
    if (this.chipCollection.length > 0) {
      this.obj['icon'] = item.icon;
      this.obj['label'] = item.label;
      this.obj['badge'] = item.badge;
      this.obj['closable'] = item.closable;
      this.obj['color'] = item.color;
      this.closeClick.emit(this.obj);
    } else {
      this.closeClick.emit(cloneNode);
    }

  }
  closeFocusedChip(item: any, chipdata: any) {
    let closeindex: number;
    let emitdata: any;
    this.obj = {};
    if (this.data.length > 0) {
      chipdata.forEach((element: any, index: number) => {
        if (chipdata[index]['selected'] === true) {
          emitdata = element;
          this.chiplabel = chipdata[index]['label'] + 'closed';
          this.data.splice(index, 1);
          closeindex = index;
        }
      });
      this.obj['icon'] = emitdata.icon;
      this.obj['label'] = emitdata.label;
      this.obj['badge'] = emitdata.badge;
      this.obj['closable'] = emitdata.closable;
      this.obj['color'] = emitdata.color;

      this.closeChip(closeindex);
      this.emitSelectedLabel(chipdata);
    }
  }

  emitSelectedLabel(item: any) {
    const cloneNode = JSON.parse(JSON.stringify(item));
    delete cloneNode['index'];
    if (this.chipCollection.length > 0) {
      this.obj['icon'] = item.icon;
      this.obj['label'] = item.label;
      this.obj['badge'] = item.badge;
      this.obj['closable'] = item.closable;
      this.obj['color'] = item.color;
      this.selectedchipsData.emit(this.obj);
    } else {
      this.selectedchipsData.emit(cloneNode);
    }
  }
  generateIndex() {
    this.data.forEach((element, index) => {
      element['index'] = this.componentId + 'chip' + index;
      element['selected'] = false;
    });
  }
  onchipsKeyup(event: any) {
    if (this.data.length > 0) {
      this.navigateChips(event);
    }
  }
  navigateChips(event: any) {
    if (event.keyCode === 37) {
      this.leftArrowKeyNavigation(event);
    } else if (event.keyCode === 39) {
      this.rightArrowKeyNavigation(event);
    }
  }

  leftArrowKeyNavigation(event: any) {
    if (this.prevchipindex > -1) {
      this.data[this.prevchipindex]['selected'] = false;
    }
    this.prevchipindex--;
    if (this.prevchipindex === -1) {
      this.prevchipindex = this.data.length - 1;
      this.chipindex = -1;
    }
    this.setAriaActiveDescendant(this.prevchipindex);
    if (this.prevchipindex === 0) {
      this.chipindex = 0;
    }
  }

  rightArrowKeyNavigation(event: any) {
    if (this.prevchipindex > -1) {
      this.data[this.prevchipindex]['selected'] = false;
    }

    this.chipindex++;
    this.prevchipindex = this.chipindex;
    if (this.chipindex >= this.data.length) {
      this.chipindex = 0;
      this.prevchipindex = 0;
    }
    this.setAriaActiveDescendant(this.chipindex);
  }

  setAriaActiveDescendant(rowindex: any) {
    this.data[rowindex]['selected'] = true;
    const inputid = document.getElementById(this.componentId);
    inputid.setAttribute('aria-activedescendant', this.data[rowindex]['index']);

  }

  focusToLastChip(event: any) {
    if (this.prevchipindex > -1) {
      this.data[this.prevchipindex]['selected'] = false;
    }
    this.prevchipindex = this.data.length - 1;
    this.chipindex = -1;
    this.setAriaActiveDescendant(this.prevchipindex);
  }

  focusToFirstChip(event: any) {
    if (this.prevchipindex > -1) {
      this.data[this.prevchipindex]['selected'] = false;
    }
    this.chipindex = 0;
    this.prevchipindex = 0;
    this.setAriaActiveDescendant(this.chipindex);
  }
  closeChip(closeindex: any) {
    if (closeindex !== 0) {
      this.chipindex = closeindex - 1;
      this.prevchipindex = closeindex - 1;
      this.setAriaActiveDescendant(closeindex - 1);
    } else {
      this.chipindex = closeindex;
      this.prevchipindex = closeindex;
      this.setAriaActiveDescendant(closeindex);
    }
  }
}
