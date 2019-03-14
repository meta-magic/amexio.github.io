/**
 * Created by pratik on 27/12/17.
 */
/*
Component Name : Amexio item selector
Component Selector : <amexio-item-selector>
Component Description : ItemSelector is a specialized MultiSelect
field that renders as a pair of MultiSelect field, one with available options
and the other with selected options. A set of buttons in between allows items to be
moved between the fields and reordered within the selection.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-item-selector', templateUrl: './item.selector.component.html',
})

export class AmexioItemSelectorComponent implements OnInit {

  private componentLoaded: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description :  Local data for item selectors.
   */

  _data: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
    if (this.componentLoaded) {
      this.updateComponent();
    }
  }
  get data(): any[] {
    return this._data;
  }

  /*
   Properties
   name : height
   datatype : any
   version : 4.0 onwards
   default : none
   description :  Height of item selector
   */
  @Input() height: any;

  mask = true;

  /*
   Properties
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default : none
   description :  Key in JSON Datasource for records.
   */
  @Input('data-reader') datareader: string;

  /*
   Properties
   name : http-method
   datatype : string
   version : 4.0 onwards
   default : none
   description :  Type of HTTP call, POST,GET.
   */
  @Input('http-method') httpmethod: string;

  /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description :  REST url for fetching datasource.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : display-field
   datatype : string
   version : 4.0 onwards
   default : none
   description :  Name of key inside response data to display on ui.
   */
  @Input('display-field') displayfield: string;

  /*
   Properties
   name : value-field
   datatype : string
   version : 4.0 onwards
   default : none
   description :  Name of key inside response data.use to send to backend
   */
  @Input('value-field') valuefield: string;

  /*
   Properties
   name : enable-drag
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : nodes can be dragged
   */
  @Input('enable-drag') enabledrag: boolean;

  /*
   Properties
   name : enable-drop
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : any node can be dropped in the selector structure
   */
  @Input('enable-drop') enabledrop = false;

  /*
   Properties
   name : across-itemselector
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : Dragging and dropping is possible across list.
   */
  @Input('across-itemselector') acrossitemselector = false;
  /*
   Events
   name : availableRecords
   datatype : none
   version : none
   default : none
   description :  Get available values objects.
   */
  @Output() availableRecords: any = new EventEmitter<any>();

  /*
   Events
   name : selectedRecords
   datatype : none
   version : none
   default : none
   description :  Get selected value Object.
   */
  @Output() selectedRecords: any = new EventEmitter<any>();

  @Output() onDrag: any = new EventEmitter<any>();  // Emits at drag
  @Output() dragover: any = new EventEmitter<any>();   // Emits at drag over
  @Input() dragData: any;

  @Input() parentRef: any;

  availableData: any[];

  selectedData: any[] = [];

  switchingObject: any;

  objectIndex: any;

  leftactive = true;

  rightactive = true;

  response: any;

  previousValue: any;

  check: any;

  isNode: boolean;

  constructor(public itemSelectorService: CommonDataService) {
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.itemSelectorService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.response = response;
      }, (error) => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }

  updateComponent() {
    if (JSON.stringify(this.previousValue) !== JSON.stringify(this.data)) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
      responsedata.forEach((option: any, index: any) => {
        if (!option['isSelected']) {
          option['isSelected'] = false;
        }
      });
    } else {
      responsedata = httpResponse;
    }

    this.availableData = responsedata;
    this.generateIndex(this.availableData);
    this.mask = false;
  }

  generateIndex(getAvailableData: any) {
    if (getAvailableData) {
      getAvailableData.forEach((element: any, index: any) => {
        element['id'] = 'itemselector' + Math.floor(Math.random() * 10000 + 99999);
      });
    }
  }

  itemClick(data: any, index: any, left: boolean, right: boolean) {
    this.leftactive = left;
    this.rightactive = right;
    this.switchingObject = data;
    this.objectIndex = index;
    for (const ir of this.availableData) {
      if ((ir)[this.valuefield] === data[this.valuefield]) {
        ir['isSelected'] = true;
      } else {
        ir['isSelected'] = false;
      }
    }

    if (right) {
      for (const ir of this.selectedData) {
        if ((ir)[this.valuefield] === data[this.valuefield]) {
          ir['selectedClick'] = true;
        } else {
          ir['selectedClick'] = false;
        }
      }
    }
  }
  dataFormLeftToRightMove(dragData: any) {
    this.itemClick(dragData.data, dragData.index, true, false);
    let currentNode: any;
    if (this.availableData && this.availableData.length !== 1) {
      this.availableData.forEach((element: any, index: any) => {
        if (element.id && dragData.data.id) {
          if (element.id === dragData.data.id) {
            currentNode = index - 1;
          }
          if (index === 0) {
            currentNode = index + 1;
          }
        }
      });
      const focusId = (this.availableData[currentNode]);
      document.getElementById(focusId['id']).focus();
    }
    this.rightSwitch();
  }

  enterFocus(focus: any) {
    this.itemClick(focus.data, focus.index, false, true);
  }

  shiftFocusMethod(dragData: any) {
    let currentIndex: any;
    if (this.selectedData && this.selectedData.length > 0) {
      this.selectedData.forEach((element: any, index: any) => {
        if (element.id === dragData.data.id) {
          currentIndex = index - 1;
        }
        if (index === 0) {
          currentIndex = index + 1;
        }
      });
    }
    const focusId = (this.selectedData[currentIndex]);
    document.getElementById(focusId['id']).focus();
  }
  downArrowPress(event: any, index: any) {
    if (this.availableData[index] === 0) {
      this.focusDetectionOnAvailableData(event, index);
    } else {
      const nextitem = this.availableData[index + 1];
      document.getElementById(nextitem['id']).focus();
    }
  }
  upArrowPress(event: any, index: any) {
    if (this.availableData[index] === 0) {
      this.focusDetectionOnAvailableData(event, index);
    } else {
      const nextitem = this.availableData[index - 1];
      document.getElementById(nextitem['id']).focus();
    }
  }
  downSwitchOnTab(event: any, index: any) {
    if (this.selectedData[index] === 0) {
      this.focusDetectionOnSelected(event, index);
    } else {
      const nextitem = this.selectedData[index + 1];
      document.getElementById(nextitem['id']).focus();
    }
  }
  upSwitchOnTab(event: any, index: any) {
    if (this.selectedData[index] === 0) {
      this.focusDetectionOnSelected(event, index);
    } else {
      const nextitem = this.selectedData[index - 1];
      document.getElementById(nextitem['id']).focus();
    }
  }
  focusDetectionOnAvailableData(event: any, index: any) {
    const nextitem = this.availableData[0];
    document.getElementById(nextitem['id']).focus();
  }

  focusDetectionOnSelected(event: any, index: any) {
    const nextitem = this.selectedData[0];
    document.getElementById(nextitem['id']).focus();
  }

  rightSwitch() {
    this.selectedData.forEach((element) => {
      this.dragDropValidation(element);
    });
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected') && this.switchingObject['isSelected']) {
      this.selectedData.push(this.switchingObject);
      this.selectedData[0]['selectedClick'] = true;

      this.switchingObject['isSelected'] = true;
      this.availableData.forEach((option, index) => {
        if (option['isSelected']) {
          this.availableData.splice(index, 1);
          option['selectedClick'] = false;
        }
      });

      this.switchingObject = null;
      this.dataEmitter();
    }
  }

  dragDropValidation(element: any) {
    if (this.switchingObject === element) {
      this.switchingObject.isSelected = false;
    }
  }

  leftSwitch() {
    this.setLeftSwitch();
  }

  // Method called in left switch if flag is false
  private setLeftSwitch() {
    const flag = false;
    this.availableData.forEach((element) => {
      this.dragDropValidation(element);
    });
    if (!flag && this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected') && this.switchingObject['isSelected']) {
      this.availableData.push(this.switchingObject);
      this.switchingObject['isSelected'] = false;
      this.selectedData.forEach((option, index) => {
        if (!option['isSelected']) {
          this.selectedData.splice(index, 1);
        }
      });
      this.switchingObject = null;
      this.dataEmitter();
    }
  }

  upSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected') && this.switchingObject['isSelected']) {
      this.selectedData.forEach((opt: any, i: any) => {
        this.getIndexObject(opt, i);
      });
      if (this.objectIndex !== 0) {
        const index = this.selectedData[this.objectIndex];
        this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
        this.selectedData[this.objectIndex - 1] = index;
        this.dataEmitter();
      }
    }
  }

  downSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected') && this.switchingObject['isSelected']) {
      this.selectedData.forEach((opt: any, i: any) => {
        this.getIndexObject(opt, i);
      });
      if (this.selectedData.length - 1 !== this.objectIndex) {
        const index = this.selectedData[this.objectIndex];
        this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
        this.selectedData[this.objectIndex + 1] = index;
        this.dataEmitter();
      }
    }
  }

  moveTop() {
    const tempArray: any = [];
    if (this.switchingObject != null && this.switchingObject['isSelected']) {
      this.selectedData.forEach((opt: any, i: any) => {
        this.getIndexObject(opt, i);
      });
      if (this.selectedData.length > 1) {
        tempArray[0] = this.selectedData[this.objectIndex];
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData.forEach((option) => {
          tempArray.push(option);
        });
        this.selectedData = tempArray;
        this.dataEmitter();
      }
    }
  }

  moveBottom() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      this.selectedData.forEach((opt: any, i: any) => {
        this.getIndexObject(opt, i);
      });
      if (this.switchingObject['isSelected'] && this.selectedData.length > 1) {
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData[this.selectedData.length] = this.switchingObject;
      }
    }
    this.dataEmitter();
  }

  dataEmitter() {
    this.availableRecords.emit(this.availableData);
    this.selectedRecords.emit(this.selectedData);
  }

  getIndexObject(opt: any, i: any) {
    if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
      this.objectIndex = i;
    }
  }
  // Method to drag parent with node
  onDragStartLeft(dragData: any) {
    if (!this.acrossitemselector) {
      this.itemClick(dragData.data, dragData.index, true, false);
    } else {
      dragData.event.dataTransfer.setData('itemnodedata', JSON.stringify(dragData.data));
      this.onDrag.emit(dragData);
    }
  }

  onDragStartRight(dragData: any) {
    if (!this.acrossitemselector) {
      this.itemClick(dragData.data, dragData.index, false, true);
    } else {
      dragData.event.dataTransfer.setData('itemnodedata', JSON.stringify(dragData.data));
      this.onDrag.emit(dragData);
    }
  }

  allowDrop(dragOverData: any) {
    dragOverData.event.preventDefault();
  }

  dropRight(event: any) {
    if (this.enabledrop) {
      this.rightSwitch();
    }
  }

  dropLeft(event: any) {
    if (this.enabledrop) {
      this.leftSwitch();
    }
  }
}
