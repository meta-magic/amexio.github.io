/**
 * Created by pratik on 11/12/17.
 */

 /*
 Component Name : Amexio tree filter
 Component Selector : <amexio-tree-filter-view>
 Component Description : A Expandable Tree Component for Angular, having
 Filtering functionality.
*/
import {HttpClient} from '@angular/common/http';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output,
  TemplateRef} from '@angular/core';

import {CommonDataService} from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-tree-filter-view', template: `
    <div>
      <div>
        <div class="inputgroup">
          <input  tabindex="1" type="text" class="input-control text-input-width" aria-label="Filter Tree Search" [(ngModel)]="filterText"
                 placeholder="Search" (keyup)="filterData()">
          <!--<i class="fa fa-filter" aria-hidden="true" (click)="showToolTip = !showToolTip"></i>-->
          <span tabindex="1" (keyup.enter)="showToolTip = !showToolTip" attr.aria-expanded="showToolTip" class="datatable-filter-icon">
          <amexio-c-icon key="tree_filter" (click)="showToolTip = !showToolTip"></amexio-c-icon>
          </span>
          <!--  <div class="input-group-btn">-->
          <!-- <button type="button"
          class="btn" data-toggle="dropdown"
          (click)="showToolTip = !showToolTip"
          aria-haspopup="true" aria-expanded="false">
           </button>-->
          <span *ngIf="showToolTip" class="dropdown">
              <ul class="dropdown-list">
                <li tabindex="1" id={{opt.index}} role="option" class="list-items"
                *ngFor="let opt of filterOptionData let rowindex = index"
                 (click)="filterOption(opt)"
                  (keyup.enter)="filterOption(opt)"
                   (keyup.arrowup)="onArrowFilterUp(filterOptionData,opt,rowindex)"
                   (keyup.arrowdown)="onArrowFilterDown(filterOptionData,opt,rowindex)">
                 {{opt.key}}&nbsp;
                 <!--<i [class]="opt.checkedStatus" aria-hidden="true"></i>-->
                  <amexio-c-icon key="opt.checkedStatus"></amexio-c-icon>
                </li>
              </ul>
            </span>
          <!-- </div>-->
        </div>
        <ng-container *ngIf="isDataFound">
          <amexio-treeview
            [data]="treeData"
            [filter-tree-flag]="true"
            [enable-checkbox]="enablecheckbox"
            (onTreeNodeChecked)="onCheckSelect($event)"
            (nodeClick)="onRowSelect($event)" [templates]="templates">
          </amexio-treeview>
        </ng-container>
        <ng-container *ngIf="!isDataFound">
          <p>No Data Found.</p>
        </ng-container>

      </div>
    </div>


  `,
})
export class AmexioFilterTreeComponent implements OnInit, AfterViewInit {
private componentLoaded: boolean;
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
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET etc.
*/
  @Input('http-method') httpmethod: string;

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
name : enable-checkbox
datatype : false
version : 4.0 onwards
default : false
description : Enables checkbox for each row, this allows user for multi selection.
*/
  @Input('enable-checkbox') enablecheckbox = false;

  /*
Events
name : nodeClick
datatype : none
version : none
default : none
description : It will gives you clicked node data.
*/
  @Output() nodeClick: any = new EventEmitter<any>();

  /*
Events
name : onTreeNodeChecked
datatype : none
version : none
default : none
description : It will gives whole tree data with checked flag status.
*/
  @Output() onTreeNodeChecked: any = new EventEmitter<any>();

/*
Properties
name : trigger-char
datatype : number
version : 4.0 onwards
default : none
description : it will search for text relevant to entered character
*/
  @Input('trigger-char') triggerchar: number;

  @Input('child-array-key') childarraykey: string;
  treeData: any;

  orgTreeData: any;

  filterText: string;

  filterIndex: number;

  templates: any;

  isDataFound = true;

  onClickSearch = false;

  filterOptionData: any;

  previousValue: any;

  showToolTip: boolean;

  mask = true;

  @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

  constructor(private _http: HttpClient, private cdf: ChangeDetectorRef, private  treeViewFilterService: CommonDataService) {
    this.filterIndex = 3;
    this.triggerchar = 1;
    this.childarraykey = 'children';
    this.filterOptionData = [{
      key: 'Is Equal To', value: 1 , type: 'string', checkedStatus: '',
    }, {
      key: 'Is Not Equal To', value: 2 , type: 'string', checkedStatus: '',
    }, {
      key: 'Start With', value: 3 , type: 'string', checkedStatus: 'fa fa-check',
    }, {
      key: 'Ends With', value: 4 , type: 'string', checkedStatus: '',
    }, {
      key: 'Contains', value: 5 , type: 'string', checkedStatus: '',
    }];
    this.generatefilterOptionDataIndex(this.filterOptionData);
  }

  ngOnInit() {
    if (this.parentTmp != null) {
      this.templates = {treeNodeTemplate: this.parentTmp};
    } else if (this.templates != null) {
      this.parentTmp = this.templates.treeNodeTemplate;
     }
  }

  ngAfterViewInit() {
    if (this.parentTmp != null) {
      this.templates = {treeNodeTemplate: this.parentTmp};
    } else if (this.templates != null) {
      this.parentTmp = this.templates.treeNodeTemplate;
     }

    if (this.httpmethod && this.httpurl) {
      this.callService();
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

  filterData() {
    this.showToolTip = false;
    if (this.filterText && this.filterText.length >= this.triggerchar) {
      const tData = JSON.parse(JSON.stringify(this.orgTreeData));
      const treeNodes = this.searchTree(tData, this.filterText);
      this.treeData = treeNodes;
      if (this.treeData && this.treeData.length === 0) {
        this.isDataFound = false;
      } else {
        this.isDataFound = true;
      }
    } else if (this.onClickSearch) {
      const tData = JSON.parse(JSON.stringify(this.orgTreeData));
      const treeNodes = this.searchTree(tData, this.filterText);
      this.treeData = treeNodes;
      this.onClickSearch = false;
      if (this.treeData && this.treeData.length === 0) {
        this.isDataFound = true;
      } else {
        this.isDataFound = false;
      }
    } else {
      this.isDataFound = true;
      this.treeData = this.orgTreeData;
    }
    if (this.treeData) {
      this.generatefilterIndex(this.treeData , 1, Math.floor(Math.random() * 1000 + 999 + 1));
    }

  }
   searchTree(data: any[], matchingTitle: string) {
    const fi = this.filterIndex;
    if (matchingTitle) {
      return this.filterActualData (data, fi, matchingTitle);
    }
  }

  filterActualData(data: any[], fi: number, matchingTitle: string): any {
    return data.filter(function f(node) {
      if ( (fi === 5 && node.text.toLowerCase().includes(matchingTitle.toLowerCase())) ||
      (fi === 3 && node.text.toLowerCase().startsWith(matchingTitle.toLowerCase())) ||
      (fi === 1 && node.text.toLowerCase() === matchingTitle.toLowerCase()) ||
      (fi === 2 && node.text.toLowerCase() !== matchingTitle.toLowerCase()) ||
      (fi === 4 && node.text.toLowerCase().endsWith(matchingTitle.toLowerCase()))) {
      return true;
      }
      if (node.children) {return (node.children = node.children.filter(f)).length; }
    });
  }
  filterOption(data: any) {
    this.onClickSearch = true;
    this.filterIndex = data.value;
    this.filterOptionData.forEach((opt: any) => {
      if (opt.value !== data.value) {
        opt.checkedStatus = '';
      } else {
        opt.checkedStatus = 'fa fa-check';
      }
    });
    this.filterData();
    this.showToolTip = false;
  }

  renderServiceData() {
    this.setData(this.data);
  }

  setData(httpResponse: any) {
    const tdata = this.getData(httpResponse);
    if (tdata) {
      this.orgTreeData = JSON.parse(JSON.stringify(tdata));
      this.treeData = tdata;
      this.generatefilterIndex(this.treeData , 1, Math.floor(Math.random() * 1000 + 999 + 1));
    }
    this.mask = false;
  }

  getData(httpResponse: any) {
    let responsedata: any = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    return responsedata;
  }

  callService() {
    this.treeViewFilterService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
      this.data = response;
    }, () => {
      this.renderServiceData();
    });
  }

  onRowSelect(data: any) {
    this.nodeClick.emit(data);
  }

  onCheckSelect(data: any) {
    this.onTreeNodeChecked.emit(data);
  }

  generatefilterIndex(data: any, parentId: number, rannumber: any) {
    data.forEach((element: any, index: number) => {
        element['index'] = '' + rannumber + '-' + parentId + (index + 1);
        if (element[this.childarraykey]) {
            this.generatefilterIndex(element[this.childarraykey], element.index.split('-')[1], rannumber);
        }
    });
}
generatefilterOptionDataIndex(filteroptions: any) {
  filteroptions.forEach((element: any, index: number) => {
       element['index'] = Math.floor(Math.random() * 1000 + 999 + 1) + '-' + index;
    });
}
onArrowFilterUp(data: any, opt: any, rowindex: number) {
   if (rowindex > 0) {
        const nextindex = rowindex - 1;
        const focusdata = data[nextindex];
        if (document.getElementById(focusdata.index)) {
          document.getElementById(focusdata.index).focus();
        }
   }
}
  onArrowFilterDown(data: any, opt: any, rowindex: number) {
    if (rowindex < data.length - 1) {
      const nextindex = rowindex + 1;
      const focusdata = data[nextindex];
      if (document.getElementById(focusdata.index)) {
        document.getElementById(focusdata.index).focus();
      }
    }
  }
}
