/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */
/*
Component Name : Amexio tree data table
Component Selector : <amexio-tree-data-table>
Component Description :  A Simple Expandable Tree component which create Tree View based on standard datasource attached.
*/
import { DOCUMENT } from '@angular/common';

import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Inject,
  Input, OnInit, Output, QueryList,
  ViewChild,
} from '@angular/core';

import { AmexioGridColumnComponent } from '../datagrid/data.grid.column';

import { CommonDataService } from '../../services/data/common.data.service';

import { LifeCycleBaseComponent } from './../../base/lifecycle.base.component';

@Component({
  selector: 'amexio-tree-data-table',
  templateUrl: './treedatatable.component.html',

})
export class TreeDataTableComponent extends LifeCycleBaseComponent implements OnInit, AfterContentInit, AfterViewInit {

  private componentLoaded: boolean;
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
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description : REST url for fetching data.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : display-field
   datatype : string
   version : 4.0 onwards
   default : none
   description : Name of key inside response data to display on ui.
   */
  @Input('display-field') displayfield: string;

  /*
   Properties
   name : value-field
   datatype : string
   version : 4.0 onwards
   default : none
   description : Name of key inside response data.use to send to backend
   */
  @Input('value-field') valuefield: string;

  /*
   Events
   name : selectedRecord
   datatype : none
   version : none
   default : none
   description : Get selected value Object.
   */
  @Output() selectedRecord: any = new EventEmitter<any>();

  /*
   Properties
   name : height
   datatype : string
   version : 4.0 onwards
   default : none
   description : height of grid
   */
  @Input() height: any;
  @Input('child-array-key') childarraykey = '';
  /*
   Events
   name : rowSelect
   datatype : none
   version : none
   default : none
   description : It will gives you row clicked data.
   */

  @ViewChild('header', { read: ElementRef }) public gridHeader: ElementRef;
  @Output() rowSelect: any = new EventEmitter<any>();

  responseData: any;

  columns: any[] = [];

  previousValue: any;

  viewRows: any;

  mask = true;

  generatedId: any;
  yesFullScreen: boolean;
  desktopFlag: boolean;
  fullscreenMax: boolean;
  chilarrids: any = [];

  @ContentChildren(AmexioGridColumnComponent) columnRef: QueryList<AmexioGridColumnComponent>;
  constructor(public treeDataTableService: CommonDataService, @Inject(DOCUMENT) public document: any) {
    super(document);
    if (this.childarraykey.length < 1) {
      this.childarraykey = 'children';
    }
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.httpmethod && this.httpurl) {
      this.treeDataTableService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  ngAfterViewInit() {
    this.onResize();
    this.componentLoaded = true;
  }
  ngAfterContentInit() {
    this.createConfig();
  }
  createConfig() {
    const columnRefArray = this.columnRef.toArray();
    for (const cr of columnRefArray) {
      const columnConfig = cr;
      let columnData: any;
      if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate != null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          headerTemplate: columnConfig.headerTemplate,
          width: columnConfig.width,
          bodyTemplate: columnConfig.bodyTemplate,
        };
      } else if (columnConfig.headerTemplate != null && columnConfig.bodyTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          headerTemplate: columnConfig.headerTemplate,
        };
      } else if (columnConfig.bodyTemplate != null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          datatype: columnConfig.datatype,
          width: columnConfig.width,
          bodyTemplate: columnConfig.bodyTemplate,
        };
      } else if (columnConfig.bodyTemplate == null && columnConfig.headerTemplate == null) {
        columnData = {
          text: columnConfig.text,
          dataindex: columnConfig.dataindex,
          hidden: columnConfig.hidden,
          width: columnConfig.width,
          datatype: columnConfig.datatype,
        };
      }
      this.columns.push(columnData);
    }
  }
  updateComponent() {
    if (this.data) {
      this.viewRows = this.getResponseData(this.data);
    }
  }

  setData(httpResponse: any) {
    if (httpResponse) {
      let treedata = this.getResponseData(httpResponse);
      // set pid
      treedata = this.setPid(treedata);
      this.viewRows = JSON.parse(JSON.stringify(treedata));
      treedata.forEach((row: any, index: any) => {
        treedata[index].level = 1;
        if (row.hasOwnProperty('expanded')) {
          if (row.expanded) {
            this.chkChildrenExpand(row, index, row.hasOwnProperty('pid') ? row.pid : null);
          }
        }
      });
      this.viewRows = treedata;
      this.mask = false;
    } else {
      this.viewRows = [];
    }
    this.generateIndex(this.viewRows, 1, window.crypto.getRandomValues(new Uint32Array(1))[0]);
  }

  setPid(treedata: any) {
    treedata.forEach((parentnode: any) => {
      parentnode['pid'] = Math.random();

      if (parentnode.hasOwnProperty(this.childarraykey)) {
        if (parentnode[this.childarraykey].length > 0) {
          this.generatePids(parentnode);
        }
      }
    });
    return treedata;
  }
  generatePids(node: any) {
    node[this.childarraykey].forEach((childele: any) => {
      childele['pid'] = Math.random();
      if (childele.hasOwnProperty(this.childarraykey)) {
        if (childele[this.childarraykey].length > 0) {
          this.generatePids(childele);
        }

      }
    });
  }

  chkChildrenExpand(row: any, index: number, ppid: any) {
    if (row.hasOwnProperty(this.childarraykey)) {
      if (row[this.childarraykey].length > 0) {
        for (let i = 0; i < row[this.childarraykey].length; i++) {
          const node = row[this.childarraykey][i];

          this.processMagicIndex(row, node);
          const magicindex: any = this.getMagicIndex(ppid);

          this.viewRows.splice(magicindex + i + 1, 0, node);

          if (node.hasOwnProperty('expanded')) {
            if (node.expanded) {
              this.chkChildrenExpand(node, index + i, node.pid);
              ppid = node.pid;
            }
          }
        }
      }
    }
  }

  processMagicIndex(row: any, node: any) {
    if (!row.level) {
      row.level = 1;
    }
    node.level = (row.level + 1);

  }
  getMagicIndex(ppid: any) {
    let magicindex;
    this.viewRows.forEach((vele: any, mindex: any) => {
      if (vele.hasOwnProperty('pid')) {
        if (vele.pid === ppid) {
          magicindex = mindex;
        }
      }
    });
    return magicindex;
  }
  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
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
  removeAll() {
    this.viewRows.forEach((node: any) => {
      node.expanded = false;
      this.removeRows(node);
    });
  }
  expandAll() {
    this.viewRows.forEach((node: any, index: number) => {
      node.expanded = true;
      this.addRows(node, index);
    });
  }
  toogle(row: any, index: number) {

    if (row.expanded) {
      row.expanded = false;
      this.chilarrids = [];
      this.removeRows1(row);
      if (this.chilarrids.length > 0) {
        this.rmRows();
      }
    } else {
      row.expanded = true;
      this.addRows(row, index);
    }
  }
  removeRows1(row: any) {

    if (row.hasOwnProperty(this.childarraykey)) {
      if (row[this.childarraykey].length > 0) {
        row[this.childarraykey].forEach((echild: any) => {
          this.chilarrids.push(echild.pid);
          if (echild.hasOwnProperty(this.childarraykey)) {
            if (echild[this.childarraykey].length > 0) {
              echild[this.childarraykey].forEach((innerchild: any) => {
                this.chilarrids.push(innerchild.pid);
                this.removeRows1(innerchild);

              });
            }
          }
        });
      }
    }
    // if child exist  thn create pid arrays
  }

  rmRows() {
    this.chilarrids.forEach((rid: any) => {
      let ismatch = false;
      let rind;
      this.viewRows.forEach((rele: any, rindex: any) => {
        if (rele.pid === rid) {
          ismatch = true;
          rind = rindex;
        }
      });

      if (ismatch) {
        this.viewRows.splice(rind, 1);
      }
    });
  }
  addRows(row: any, index: number) {
    if (row.hasOwnProperty(this.childarraykey)) {
      for (let i = 0; i < row[this.childarraykey].length; i++) {
        const node = row[this.childarraykey][i];
        if (!row.level) {
          row.level = 1;
        }
        if (node.hasOwnProperty(this.childarraykey)) {
          node.expanded = false;
        }
        node.level = (row.level + 1);
        this.viewRows.splice(index + (i + 1), 0, node);
      }
    }
  }
  removeRows(node: any) {
    if (node.hasOwnProperty(this.childarraykey)) {
      for (const nc of node[this.childarraykey]) {
        if (this.viewRows) {
          this.setRemovedRows(nc);
        }
      }
    }
  }
  setRemovedRows(nc: any) {
    for (const vr of this.viewRows) {
      if (vr === nc) {
        if (nc.hasOwnProperty(this.childarraykey)) {
          this.removeRows(nc);
        }
        this.viewRows.splice(this.viewRows.indexOf(nc), 1);
      }
    }
  }
  setSelectedRow(rowData: any, event: any) {
    this.selectedRecord.emit(rowData);
    this.rowSelect.emit(rowData);
  }
  onResize() {
    if (this.height) {
      let h = (window.innerHeight / 100) * this.height;
      if (this.gridHeader && this.gridHeader.nativeElement && this.gridHeader.nativeElement.offsetHeight) {
        h = h - this.gridHeader.nativeElement.offsetHeight;
      }
      if (this.height === 100) {
        h = h - 40;
      }
      this.height = h;
    }
  }

  // Tab Navigation

  generateIndex(data: any, parentId: number, rannumber: any) {
    data.forEach((element: any, index: number) => {
      element['refId'] = '' + rannumber + '-';
      if (element.hasOwnProperty(this.childarraykey)) {
        let idstr;

        let id1: any = Math.random().toPrecision(8);
        id1 = id1 * 100000000;
        let id2: any = Math.random().toPrecision(4);
        id2 = id2 * 10000;
        idstr = id1 + '-' + id2;
        if (!element.hasOwnProperty('id')) {
          element['id'] = idstr;
        }

        this.generateIndex(element[this.childarraykey], element.id.split('-')[1], rannumber);
      }
    });
  }

  splitID(id: any) {
    return id.split('-');
  }

  arrowUp(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const unitId = currentId.slice(0, -1);
    if (unitId > 1 && document.getElementById(randomNo + '-' + (parseInt(currentId, 10) - 10).toString())) {
      document.getElementById(randomNo + '-' + (parseInt(currentId, 10) - 10).toString()).focus();
    }
  }

  arrowDown(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const firstId = parseInt(currentId.slice(0, -1), 10);
    if ((firstId < this.viewRows.length || (firstId <= this.viewRows.length - 1))
      && document.getElementById(randomNo + '-' + (parseInt(currentId, 10) + 10).toString())) {
      document.getElementById(randomNo + '-' + (parseInt(currentId, 10) + 10).toString()).focus();
    }
  }

  arrowRight(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const unitId = parseInt(currentId, 10) % 10;
    const firstId = currentId.slice(0, -1);
    this.findNextColumn(unitId, firstId, randomNo);
  }

  findNextColumn(index: any, firstId: any, randomNo: any) {
    if (index < this.columns.length) {
      if (this.columns.length >= 1 && this.columns.includes(index + 1)) {
        index = index + 1;
        this.findNextColumn(index, firstId, randomNo);
      } else {
        const generatedId = firstId + '' + (index + 1);
        document.getElementById(randomNo + '-' + (parseInt(generatedId, 10)).toString()).focus();
      }
    }
  }

  arrowLeft(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const unitId = parseInt(currentId, 10) % 10;
    const firstId = currentId.slice(0, -1);
    this.findPreviousColumn(unitId, firstId, randomNo);
  }

  findPreviousColumn(index: any, firstId: any, randomNo: any) {
    if (index > 1) {
      if (this.columns.length >= 1 && this.columns.includes(index - 1)) {
        index = index - 1;
        this.findPreviousColumn(index, firstId, randomNo);
      } else {
        const generatedId = firstId + '' + (index - 1);
        document.getElementById(randomNo + '-' + (parseInt(generatedId, 10)).toString()).focus();
      }
    }
  }

  // HOME
  keyHome(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const unitId = parseInt(currentId, 10) % 10;
    this.findHomeColumn(unitId, currentId.slice(0, -1), 1, randomNo);
  }

  // HOME: TO FIND FIRST COLUMN
  findHomeColumn(unitId: any, firstId: any, newFirstId: any, randomNo: any) {
    if (this.columns.length >= 1 && this.columns.includes(newFirstId)) {
      this.findHomeColumn(unitId, firstId, newFirstId + 1, randomNo);
    } else {
      const generatedId = firstId + '' + newFirstId;
      document.getElementById(randomNo + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }

  // END
  keyEnd(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const currentId = spiltID[1];
    const unitId = parseInt(currentId, 10) % 10;
    const firstId = currentId.slice(0, -1);
    const newLastId = this.columns.length;
    this.findHomeColumn(unitId, firstId, newLastId, randomNo);
  }

  keyControlHome(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    this.findControlHomeColumn(1, 1, randomNo);
  }

  findControlHomeColumn(unitId: any, firstId: any, randomNo: any) {
    if (this.columns.length >= 1 && this.columns.includes(unitId)) {
      this.findControlHomeColumn(unitId + 1, firstId, randomNo);
    } else {
      const generatedId = firstId + '' + unitId;
      document.getElementById(randomNo + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }

  keyControlEnd(ref: any) {
    const id = ref.id;
    const spiltID = this.splitID(id);
    const randomNo = spiltID[0];
    const unitId = this.columns.length;
    const firstId = this.viewRows.length;
    this.findControlEndColumn(unitId, firstId, randomNo);

  }

  findControlEndColumn(unitId: any, firstId: any, randomNo: any) {
    if (this.columns.length >= 1 && this.columns.includes(unitId)) {
      this.findControlHomeColumn(unitId - 1, firstId, randomNo);
    } else {
      const generatedId = firstId + '' + unitId;
      document.getElementById(randomNo + '-' + (parseInt(generatedId, 10)).toString()).focus();
    }
  }
}
