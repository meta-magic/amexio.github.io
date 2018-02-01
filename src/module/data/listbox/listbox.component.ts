/**
 * Created by ketangote on 11/22/17.
 */


import {AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-listbox', templateUrl: './listbox.component.html', styleUrls: ['./listbox.component.scss']
})
export class AmexioListBoxComponent implements OnInit, AfterViewInit {

  @Input('enable-checkbox') enablecheckbox: boolean;

  @Input() header: string;

  @Input('search-placeholder') searchplaceholder: string;

  @Input() filter: boolean;

  @Input() data: any;

  @Input('http-url') httpurl: string;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('display-field') displayfield: string;

  @Input() height: any;

  @Output() selectedRows: any = new EventEmitter<any>();

  @Output() onRowClick: any = new EventEmitter<any>();

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  viewData: any[];

  orgData: any[];

  filterText: string;

  selectAll = false;

  response: any;

  selectedData: any[];

  previousData: any;

  maskloader:boolean=true;

  constructor(public dataService: CommonDataService) {
    this.filter = false;
    this.enablecheckbox = false;
    this.selectedData = [];
    this.searchplaceholder = "Search";
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.response = response.json();
      }, error => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.maskloader=false;
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    let dr = this.datareader.split(".");
    for (let ir = 0; ir < dr.length; ir++) {
      responsedata = responsedata[dr[ir]];
    }
    this.viewData = responsedata;
    this.setSelectedFlag(this.viewData);
    this.orgData = JSON.parse(JSON.stringify(this.viewData));
  }

  setSelectedFlag(viewRows: any) {
    viewRows.forEach((row: any) => {
      if (!row.hasOwnProperty('isSelected')) {
        row['isSelected'] = false;
      }
    });
  }

  filterData() {
    const tData = JSON.parse(JSON.stringify(this.orgData));
    const nodes = this.searchTree(tData, this.filterText);
    this.viewData = nodes;
  }

  searchTree(data: any[], matchingTitle: string) {
    let disp = this.displayfield;
    let res = data.filter(function f(node) {

      if (node[disp] && node[disp].toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }
      if (node.children) {
        return (node.children = node.children.filter(f)).length;
      }
    });
    return res;
  }

  selectedCheckBox(rowData: any) {
    rowData.isSelected = !rowData.isSelected;
    this.selectedData = [];
    this.viewData.forEach((node) => {
      if (node.isSelected) {
        this.selectedData.push(node);
      }
    });

    this.selectedRows.emit(this.selectedData);
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
    this.onRowClick.emit(data);
  }

  ngAfterViewInit() {

  }

}
