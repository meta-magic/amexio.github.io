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
  @Input()    fieldlabel: string;

  @Input()    allowblank: string;

  @Input()    data : any;

  @Input()    datareader : string;

  @Input()    httpmethod : string;

  @Input()    httpurl : string;

  @Input()    displayfield : string;

  @Input()    valuefield : string;

  @Output()   onChange  : EventEmitter<any> = new EventEmitter<any>();


  selectedValues : any[] = [];

  displayValue : any;

  helpInfoMsg: string;

  _errormsg : string;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('errormsg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  showToolTip : boolean;

  @Input()   placeholder: string;

  @Input()   disabled: boolean;

  @Input()   iconfeedback: boolean;

  @Input()   fontstyle: string;

  @Input()   fontfamily: string;

  @Input()   fontsize: string;

  @Input()   enablepopover : boolean;

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

    if(!this.triggerChar){
      this.triggerChar = 1;
    }

    if(this.httpmethod && this.httpurl){
      this.dataService.fetchData(this.httpurl,this.httpmethod).subscribe(
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
    if(this.datareader!= null){
      let dr = this.datareader.split(".");
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
