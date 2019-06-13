/**
 * Created by ketangote on 11/22/17.
 */

/*
Component Name : Amexio listbox
Component Selector : <amexio-listbox>
Component Description : Simple list box which allows user to select one of
more items from list based on configuration. User can provide custom template to
change look and feel.
*/
import {
  AfterViewInit, Component, ContentChild, EventEmitter,
  HostListener, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-listbox', templateUrl: './listbox.component.html',
})
export class AmexioListBoxComponent implements AfterViewInit, OnInit, OnDestroy {

  private componentLoaded: boolean;
  contextMenuStyle: any;

  /*
Properties
name : enable-checkbox
datatype : boolean
version : 4.0 onwards
default : none
description : Enables checkbox for each row, this allows user for multi selection.
*/
  @Input('enable-checkbox') enablecheckbox: boolean;

  /*
Properties
name : header
datatype : string
version : 4.0 onwards
default : none
description : Heading for ListBox.
*/
  @Input() header: string;

  /*
Properties
name : enable-header
datatype : boolean
version : 4.2.4 onwards
default : true
description : User can disabled header of listbox to false..
*/
  @Input('enable-header') enableHeader = true;

  /*
Properties
name : search-placeholder
datatype : string
version : 4.0 onwards
default : none
description : place-holder for searchbox.
*/
  @Input('search-placeholder') searchplaceholder: string;

  /*
Properties
name : filter
datatype : boolean
version : 4.0 onwards
default : none
description : Enables user to filter data based on 'display-field' configured.
*/
  @Input() filter: boolean;

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local Data binding.
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
name : http-url
datatype : string
version : 4.0 onwards
default : none
description : REST url for fetching data.
*/
  @Input('http-url') httpurl: string;

  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON Datasource for records.
*/
  @Input('data-reader') datareader: string;

  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET etc.
*/
  @Input('http-method') httpmethod: string;

  /*
Properties
name : display-field
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON for display particular column from data.
*/
  @Input('display-field') displayfield: string;

  /*
Properties
name : height
datatype : any
version : 4.0 onwards
default : none
description : height for ListBox.
*/
  @Input() height: any;

  /*
Events
name : selectedRows
datatype : none
version : none
default : none
description : It will fire only on selection of checkbox and gives you selected record data.
*/
  @Output() selectedRows: any = new EventEmitter<any>();

  /*
Events
name : onRowClick
datatype : none
version : none
default : none
description : It will gives you row clicked data.
*/
  @Output() onRowClick: any = new EventEmitter<any>();

  /*
  Properties
  name : border
  datatype : any
  version : 4.2 onwards
  default : none
  description : Border for listbox, default style is 1px solid #ced4da.
  */
  @Input() border: any;

  /*
Properties
name :  context-menu
datatype : string
version : 5.0.1 onwards
default :
description : Context Menu provides the list of menus on right click.
*/
  @Input('context-menu') contextmenu: any[];

  /*
  Events
  name : rightClick
  datatype : none
  version : 5.0.1
  default : none
  description : It will gives you row clicked data.
  */
  @Output() rightClick: any = new EventEmitter<any>();

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  viewData: any[];

  orgData: any[];

  filterText = '';

  selectAll = false;

  response: any;

  selectedData: any[];

  previousData: any;

  maskloader = true;

  ishoverselected = true;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  contextMenuFlag: boolean;

  posixUp: boolean;

  rightClickRowData: any;

  activedescendant = 'aria-activedescendant';

  listId: string;

  componentId: string;

  a: any;

  flag = false;

  prevlistindex = -1;

  listindex = -1;

  documentClickListener: any;

  globalClickListenFunc: () => void;

  tempData: any[];

  constructor(public dataService: CommonDataService, private renderer: Renderer2) {
    this.filter = false;
    this.enablecheckbox = false;
    this.selectedData = [];
    this.searchplaceholder = 'Search';
    this.flag = true;
  }

  ngOnInit() {

    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.response = response;
      }, (error) => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
    this.componentId = 'listbox' + Math.floor(Math.random() * 1000 + 999);

    this.listenListboxOutClick();
  }

  listenListboxOutClick() {
    this.documentClickListener = this.renderer
      .listen('document', 'click', (event: any) => {
        if (this.viewData && this.viewData.length > 0) {
          this.viewData.forEach((element: any, index: number) => {
            if (this.prevlistindex !== -1 && this.viewData[this.prevlistindex].hasOwnProperty('ishoverselected')
              && this.viewData[this.prevlistindex]['ishoverselected'] === true) {
              this.viewData[this.prevlistindex]['ishoverselected'] = false;
              this.prevlistindex = -1;
              this.listindex = -1;
            }
          });
        }
      });
  }

  onArrowdown() {
    if (this.prevlistindex > -1) {
      this.viewData[this.prevlistindex]['ishoverselected'] = false;
    }
    this.listindex++;
    this.prevlistindex = this.listindex;
    if (this.listindex >= this.viewData.length) {
      this.listindex = 0;
      this.prevlistindex = 0;
    }
    this.viewData[this.listindex]['ishoverselected'] = true;
    if (this.viewData[this.listindex]['ishoverselected']) {
      const divid = document.getElementById(this.componentId);
      divid.setAttribute(this.activedescendant, this.viewData[this.listindex].index);
    }
  }
  onArrowUp() {
    if (this.prevlistindex > -1) {
      this.viewData[this.prevlistindex]['ishoverselected'] = false;
    }
    this.prevlistindex--;
    if (this.prevlistindex === -1) {
      this.prevlistindex = this.viewData.length - 1;
      this.listindex = -1;
    }
    this.viewData[this.prevlistindex]['ishoverselected'] = true;
    if (this.viewData[this.prevlistindex]['ishoverselected']) {
      const divid = document.getElementById(this.componentId);
      divid.setAttribute(this.activedescendant, this.viewData[this.prevlistindex].index);
    }
    if (this.prevlistindex === 0) {
      this.listindex = 0;
    }
  }

  onEnterPress() {
    this.viewData.forEach((element, index) => {
      if (element.ishoverselected === true) {
        if (element.isSelected === true) {
          element.isSelected = false;
        } else {
          element.isSelected = true;
        }
      }
    });
  }

  updateComponent() {
    if (JSON.stringify(this.previousData) !== JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.viewData = responsedata;
    this.setSelectedFlag(this.viewData);
    this.onSelectClick(this.viewData);
    this.orgData = JSON.parse(JSON.stringify(this.viewData));
  }
  onSelectClick(viewRows: any) {
    this.viewData.forEach((elem: any) => {
      elem['onClickFlag'] = false;
    });

  }

  setSelectedFlag(viewRows: any) {
    viewRows.forEach((row: any, index: number) => {
      if (!row.hasOwnProperty('isSelected')) {
        row['isSelected'] = false;
      }
      row['index'] = 'listbox' + Math.floor(Math.random() * 1000 + 999) + index;
    });
    this.maskloader = false;
  }

  filterData() {
    const tData = JSON.parse(JSON.stringify(this.orgData));
    const nodes = this.searchTree(tData, this.filterText);
    this.viewData = nodes;
  }

  searchTree(data: any[], matchingTitle: string) {
    const disp = this.displayfield;
    return data.filter(function f(node) {
      if (node[disp] && node[disp].toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }
      if (node.children) {
        return (node.children = node.children.filter(f)).length;
      }
    });
    // return res;
  }

  selectedCheckBox(rowData: any) {
    rowData.isSelected = !rowData.isSelected;
    this.selectedData = [];
    this.viewData.forEach((node) => {
      if (node.isSelected) {
        this.selectedData.push(node);
      }
    });
    const tempData = JSON.parse(JSON.stringify(rowData));
    delete tempData['index'];
    delete tempData['onClickFlag'];
    delete tempData['isSelected'];
    this.selectedRows.emit(tempData);
  }
  selectAllRecord() {
    this.selectedData = [];
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.viewData.forEach((node) => {
        node.isSelected = true;
      });
      this.selectedData = this.viewData;
    } else {
      this.viewData.forEach((node) => {
        node.isSelected = false;
      });
    }

    this.selectedRows.emit(this.selectedData);
  }

  onClick(data: any) {

    if (!this.enablecheckbox) {
      this.viewData.forEach((elem: any) => {
        elem.onClickFlag = false;
      });
      this.viewData.forEach((ele: any) => {
        if (ele.index === data.index) {
          ele.onClickFlag = true;
        }
      });
    }
    const tempData = JSON.parse(JSON.stringify(data));
    delete tempData['index'];
    delete tempData['onClickFlag'];
    delete tempData['isSelected'];
    this.onRowClick.emit(tempData);
  }

  ngAfterViewInit() {

  }

  loadContextMenu(event: any, row: any, id: any) {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.tempSelectedFlag(this.viewData);
      this.mouseLocation.left = event.clientX;
      this.mouseLocation.top = event.clientY;
      row.isSelected = true;
      this.getContextMenu();
      this.posixUp = this.getListPosition(id);
      event.preventDefault();
      event.stopPropagation();
      this.rightClickRowData = row;
    }
  }
  // getcontextmenu
  getContextMenu() {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.contextMenuFlag = true;
      this.addListner();
    }
  }

  tempSelectedFlag(rows: any) {
    rows.forEach((row: any) => {
      if (row.isSelected) {
        row.isSelected = false;
      }
    });
  }

  getListPosition(elementRef: any) {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }

  rightClickDataEmit(Data: any) {
    this.rightClick.emit(Data);
  }

  addListner() {
    this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
      this.contextMenuFlag = false;
      if (!this.contextMenuFlag) {
        this.removeListner();
      }
    });
  }

  removeListner() {
    if (this.globalClickListenFunc) {
      this.globalClickListenFunc();
    }
  }

  ngOnDestroy(): void {
    this.removeListner();
  }

}
