/**
 * Created by ketangote on 11/22/17.
 */


 /*
 Component Name : Amexio listbox
 Component Selector : <amexio-listbox>
 Component Description : Simple list box which allows user to select one of more items from list based on configuration. User can provide custom template to change look and feel.
*/
import {AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-listbox', templateUrl: './listbox.component.html', styleUrls: ['./listbox.component.scss']
})
export class AmexioListBoxComponent implements OnInit, AfterViewInit {
private componentLoaded: boolean;
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
@Input('enable-header') enableHeader: boolean =true;

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
        this.response = response;
      }, error => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }

  updateComponent() {
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

 setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
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

    this.maskloader=false;
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
