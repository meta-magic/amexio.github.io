/**
 * Created by pratik on 20/12/17.
 */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-tag-input',
  templateUrl: './tags.input.component.html'
})

export class AmexioTagsInputComponent implements OnInit {
  @Input()    fieldLabel: string;

  @Input()    allowBlank: string;

  @Input()    data : any;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Output()   onChange  : EventEmitter<any> = new EventEmitter<any>();


  selectedValues : any[] = [];

  displayValue : any;

  helpInfoMsg: string;

  _errorMsg : string;

  get errorMsg(): string {
    return this._errorMsg;
  }

  @Input('errorMsg')
  set errorMsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  showToolTip : boolean;

  @Input()   placeholder: string;

  @Input()   disabled: boolean;

  @Input()   iconFeedBack: boolean;

  @Input()   fontStyle: string;

  @Input()   fontFamily: string;

  @Input()   fontSize: string;

  @Input()   enablePopOver : boolean;

  responseData : any;

  previousData : any;

  viewData : any;

  filteredResult : any;

  @Input()  key: any;

  @Input()  triggerChar: number;

  @ViewChild('inp')  inpHandle : any;

  constructor(public dataService : CommonDataService){

  }

  ngOnInit() {
    if(this.placeholder == '' || this.placeholder == null)
      this.placeholder = 'Choose Option';

    if(this.httpMethod && this.httpUrl){
      this.dataService.fetchData(this.httpUrl,this.httpMethod).subscribe(
        response=>{
          this.responseData = response.json();
        },
        error=>{
        },
        ()=>{
          this.setData(this.responseData);
        }
      );

    }else if(this.data){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }


  onKeyUp(event : any){
    this.filteredResult = [];
    this.showToolTip = false;
    let keyword : any = event.target.value;
    if(keyword != null && keyword != ' ' && keyword.length >= this.triggerChar){
      let search_term  = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if(item != null){
          if(item[this.key].toLowerCase().startsWith(search_term) ){
            this.filteredResult.push( item );
          }
        }
      });
      if(this.filteredResult.length > 0)
        this.showToolTip = true;
      else{
        this.showToolTip = false;
      }
    }

  }


  onFocus(){
    this.inpHandle.nativeElement.placeholder = '';
  }


  setData(httpResponse : any){
    //Check if key is added?
    let responsedata = httpResponse;
    if(this.dataReader!= null){
      let dr = this.dataReader.split(".");
      for(let ir = 0 ; ir<dr.length; ir++){
        responsedata = responsedata[dr[ir]];
      }
    }
    else{
      responsedata = httpResponse;
    }

    this.viewData = responsedata;
  }

  setValue(value : any, ref : any){
    this.inpHandle.nativeElement.value= '';
    this.selectedValues.push(value);
    this.onChange.emit(this.selectedValues);
    this.showToolTip = false;

  }

  removePill(item : any){
    let indexToRemove : number = null;
    this.selectedValues.forEach((selectedVal,index)=>{
      if(selectedVal == item)
        indexToRemove = index;
    });
    this.selectedValues.splice(indexToRemove,1);
    this.onChange.emit(this.selectedValues);
  }



  ngDoCheck(){
    if(JSON.stringify(this.previousData) != JSON.stringify(this.data)){
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
}
