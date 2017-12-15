/**
 * Created by ketangote on 11/21/17.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";


@Component({
  selector: 'amexio-checkbox-group',
  templateUrl : './checkbox.group.component.html',
  styleUrls : ['./checkbox.group.component.scss']
})
export class AmexioCheckBoxGroupComponent{
  @Input() enableBoxStyle = false;

  @Input() fieldLabel : string;

  @Input() fieldName : string;

  @Input() dataReader : string;

  @Input() httpMethod : string;

  @Input() httpUrl : string;

  @Input() displayField : string;

  @Input() valueField : string;

  @Input()  searchBox : boolean;

  @Input()  data : any;

  @Input()    column: string;

  @Output() selectedValue : any = new EventEmitter<any>();

  calculatedColSize : any;

  elementId : string;

  responseData : any[];

  viewData : any[];

  textValue : string;

  selectedCheckBox : any[];

  previousValue : any;

  constructor(private amxHttp: CommonDataService) {
    this.selectedCheckBox = [];
  }

  ngOnInit() {
    if (this.httpMethod && this.httpUrl) {
      this.amxHttp.fetchData(this.httpUrl, this.httpMethod).subscribe(
        response => {
          this.responseData = response.json();
        },
        error => {
        },
        () => {
          this.setData(this.responseData);
        }
      );
    }else if (this. data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this. data);
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousValue) != JSON.stringify(this.data)) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any){
    this.responseData = this.getResponseData(httpResponse);
    this.viewData = this.getResponseData(httpResponse);
    let viewDataWithIdArray: any[] = [];
    this.viewData.forEach(
      (viewDataObject : any) => {
        viewDataObject.id = 'checkbox' + Math.floor(Math.random() * 90000) + 10000;
        viewDataWithIdArray.push(viewDataObject);
      }
    );
    this.viewData = [];
    this.viewData = viewDataWithIdArray;
  }


  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    let dr = this.dataReader.split('.');
    for (let ir = 0 ; ir < dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    return responsedata;
  }

  filterData(event: any) {
    if (this.textValue.length > 0){
      this.viewData = [];
      for (let vd = 0 ; vd < this.responseData.length; vd++){
        let displayData = this.responseData[vd][this.displayField];
        if (displayData.toLowerCase().startsWith(this.textValue)){
          this.viewData.push(this.responseData[vd]);
        }
      }
    }else{
      this.viewData = this.responseData;
    }

  }

  setSelectedCheckBox(rowData: any, event: any){

    rowData[this.valueField] = !rowData[this.valueField];

    if (rowData[this.valueField]){
      this.selectedCheckBox.push(rowData);
    } else {
      let indexOf = this.selectedCheckBox.indexOf(rowData);
      delete this.selectedCheckBox[indexOf];
    }

    this.emitSelectedRows();
  }

  emitSelectedRows(){
    let sRows = [];
    let cloneSelectedChecks = JSON.parse(JSON.stringify(this.selectedCheckBox));
    for (let sr = 0; sr < cloneSelectedChecks.length; sr++) {
      if (cloneSelectedChecks[sr]) {
        //remove id from selected value
        delete cloneSelectedChecks[sr].id;
        sRows.push(cloneSelectedChecks[sr]);
      }
    }
    this.selectedValue.emit(sRows);
  }


}
