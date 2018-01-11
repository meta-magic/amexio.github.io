/**
 * Created by ketangote on 11/22/17.
 */


import {AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector : 'amexio-listbox',
  templateUrl : './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class AmexioListBoxComponent implements OnInit, AfterViewInit{

  @Input() enableCheckBox : boolean;

  @Input() header : string;

  @Input() searchPlaceHolder: string;

  @Input() filter : boolean;

  @Input() data: any;

  @Input() httpUrl: string;

  @Input() dataReader: string;

  @Input() httpMethod: string;

  @Input() displayField: string;

  @Output() selectedRows: any = new EventEmitter<any>();

  @Output() rowClick: any = new EventEmitter<any>();

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  viewData: any[];

  orgData: any[];

  filterText: string;

  response: any;

  selectedData: any[];

  previousData: any;


  constructor(public dataService : CommonDataService) {
    this.filter = false;
    this.enableCheckBox = false;
    this.selectedData = [];
    this.searchPlaceHolder = "Search";
  }

  ngOnInit() {
    if (this.httpMethod && this.httpUrl) {
      this.dataService.fetchData(this.httpUrl, this.httpMethod).subscribe(response => {
        this.response = response.json();
      }, error => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data ) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  ngDoCheck(){
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse : any){
    let responsedata = httpResponse;
    let dr = this.dataReader.split(".");
    for(let ir = 0 ; ir<dr.length; ir++){
      responsedata = responsedata[dr[ir]];
    }
    this.viewData = responsedata;
    this.orgData = JSON.parse(JSON.stringify(this.viewData));
  }

  filterData(){
    const tData = JSON.parse(JSON.stringify(this.orgData));
    const nodes = this.searchTree(tData, this.filterText);
    this.viewData = nodes;
  }

  searchTree(data: any[], matchingTitle: string) {
    let disp = this.displayField;
    let res = data.filter(function f(node) {

      if (node[disp].toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }
      if (node.children) {
        return (node.children = node.children.filter(f)).length;
      }
    });
    return res;
  }

  selectedCheckBox(event:any,rowno: number,data:any){
    if(event.currentTarget.checked){
      this.selectedData.push(data);
    }
    else{
      var indexOf = this.selectedData.indexOf(data);
      delete this.selectedData[indexOf];
    }

    const sdata = [];

    for(var i=0;i<this.selectedData.length;i++){

      if(this.selectedData[i]){
        sdata.push(this.selectedData[i]);
      }
    }

    this.selectedRows.emit(sdata);
  }

  onClick(data:any){
    this.rowClick.emit(data);
  }

  ngAfterViewInit(){

  }

}
