/**
 * Created by pratik on 20/12/17.
 */

 /*
 Component Name : Amexio Tag Input
 Component Selector :  <amexio-tag-input>
 Component Description : Tags based multi input with typeahead facility.
*/
import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2,
  ViewChild
} from '@angular/core';
import {noop} from "rxjs/util/noop";
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-tag-input', templateUrl: './tags.input.component.html'
})

export class AmexioTagsInputComponent implements OnInit {
     /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
  /*
Properties 
name : allow-blank
datatype : string
version : 4.0 onwards
default : none 
description : sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;
   /*
Properties 
name : data
datatype : string
version : 4.0 onwards
default : none 
description : input data source
*/
  @Input() data: any;
 /*
Properties 
name : data-reader
datatype : string
version : 4.0 onwards
default : none 
description : Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;
/*
Properties 
name : http-method
datatype : string
version : 4.0 onwards
default : none 
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;
 /*
Properties 
name : http-url
datatype : string
version : 4.0 onwards
default : none 
description : REST url for fetching datasource.
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
name : input
datatype : any
version : none
default : none
description : 	On input event field.
*/ 
  @Output() input: any = new EventEmitter<any>();
  /*
Events
name : onChange
datatype : any
version : none
default : none
description : on change event
*/ 
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  /*
Events
name : focus
datatype : any
version : none
default : none
description : On field focus event
*/ 
  @Output() focus: any = new EventEmitter<any>();

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }



  onSelections: any[] = [];

  displayValue: any;

  activeindex : number =0;

  currentActive : any;

  helpInfoMsg: string;

  _errormsg: string;

  posixUp : boolean;

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  showToolTip: boolean;

  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;
  /*
Properties 
name : font-style
datatype : string
version : 4.0 onwards
default : none 
description : Set font-style to field
*/
  @Input('font-style') fontstyle: string;
  /*
Properties 
name : font-family
datatype : string
version : 4.0 onwards
default : none 
description : Set font-family to field
*/
  @Input('font-family') fontfamily: string;
  /*
Properties 
name : font-size
datatype : string
version : 4.0 onwards
default : none 
description : Set font-size to field
*/
  @Input('font-size') fontsize: string;
  /*
Properties 
name : enable-popover
datatype : string
version : 4.0 onwards
default : none 
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;
  /*
Properties 
name : key
datatype : string
version : 4.0 onwards
default : none 
description : key as input to tags
*/
  @Input() key: any;
  /*
Properties 
name : trigger-char
datatype : number
version : 4.0 onwards
default : none 
description : sets the trigger char length
*/
  @Input('trigger-char') triggerchar: number;

  @ViewChild('inp') inpHandle: any;

  @ViewChild('tagDropRef') tagDropRef: any;

  @ViewChild('dropdownitems', {read: ElementRef}) public dropdownitems: ElementRef;

  isComponentValid : boolean;

  maskloader:boolean=true;

  constructor(public dataService: CommonDataService,public element: ElementRef, public renderer: Renderer2) {

  }

  ngOnInit() {
    this.isComponentValid = this.allowblank;

    if (this.placeholder == '' || this.placeholder == null) this.placeholder = 'Choose Option';

    if (!this.triggerchar) {
      this.triggerchar = 1;
    }

    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response;
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }

  }

  navigateKey(event:any){
      
  }
  
  selectedindex : number=0;
  scrollposition : number = 30;

  onKeyUp(event: any) {
    let maxScrollHeight : number = this.tagDropRef.nativeElement.scrollHeight;
    this.filteredResult = [];
    this.showToolTip = false;
    let keyword: any = event.target.value;
    if (keyword != null && keyword != ' ' && keyword.length >= this.triggerchar) {
      let search_term = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if (item != null) {
          if (item[this.key].toLowerCase().startsWith(search_term)) {
            this.filteredResult.push(item);
          }
        }
      });
      if (this.filteredResult.length > 0) this.showToolTip = true; else {
        this.showToolTip = false;
      }
    }
    if(event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13)
      this.navigateUsingKey(event);
  }
  navigateUsingKey(event: any){
    
    if(this.selectedindex > this.filteredResult.length){
      this.selectedindex=0;
    }
    if(event.keyCode === 40 || event.keyCode === 38  && this.selectedindex < this.filteredResult.length){
      if(!this.showToolTip){
        this.showToolTip = true;
      }
      let prevselectedindex = 0;
      if(this.selectedindex === 0){
        this.selectedindex = 1;
      }else{
        prevselectedindex = this.selectedindex;
        if(event.keyCode === 40)
        {
          this.selectedindex++;
          if((this.selectedindex > 5 )){
            this.dropdownitems.nativeElement.scroll(0,this.scrollposition);
            this.scrollposition = this.scrollposition  +30; 
          }
        }
        else if(event.keyCode === 38){
          this.selectedindex--;
          console.log(this.scrollposition);
          if(this.scrollposition>=0 && this.selectedindex>1){
            this.dropdownitems.nativeElement.scroll(0,this.scrollposition);
            this.scrollposition = this.scrollposition  -30; 
          }
          if(this.selectedindex === 1){
            this.scrollposition = 30;
          }

          if(this.selectedindex <=0){
            //this.selectedindex = 1;
          }
        }  
      }

      if(this.filteredResult[this.selectedindex]){
        this.filteredResult[this.selectedindex].selected = true;
        
      }
      if(this.filteredResult[prevselectedindex]){
        this.filteredResult[prevselectedindex].selected = false;
      }      
    }

    console.log(new Date().getTime()+"--"+this.selectedindex+"--"+this.filteredResult.length);
    if(event.keyCode === 13 && this.filteredResult[this.selectedindex]){
      console.log("exist drop down");
      this.onItemSelect(this.filteredResult[this.selectedindex]);
    }
  
  }

  showAllData(activerow:number){
    let i = 0 ;
    this.viewData.forEach((item: any) => {
      if (item != null) {

        if(i === activerow){
          item.active = true;
          this.currentActive = item;
        }else{
          item.active = false;
        }
        item.activerow = activerow;
        this.filteredResult.push(item);
      }
      i++;
    });

    if (this.filteredResult.length > 0){
      this.showToolTip = true;
    }

  }


  onItemSelect(row: any) {
    this.value = row[this.valuefield];
    this.displayValue = row[this.displayfield];
    this.showToolTip = false;
   
  }

  onInput(input : any) {
      this.input.emit();
      
  }
    
  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onFocus(elem : any) {
    this.inpHandle.nativeElement.placeholder = '';
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit(this.value);
  }

  getListPosition(elementRef : any) :boolean{

    let dropdownHeight : number = 325; //must be same in dropdown.scss
    if(elementRef) {
      if(window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight){
        return true;
        //  return false;
      }
      else{
        return false;
      }
    }

  }


  setData(httpResponse: any) {
    //Check if key is added?
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
    this.maskloader=false;
  }

  setValue(value: any, ref: any) {
    this.inpHandle.nativeElement.value = '';
    this.onSelections.push(value);
    this.onChange.emit(this.onSelections);
    if(this.onSelections.length > 0) {
      this.isComponentValid = true;
    }
    this.showToolTip = false;

  }

  removePill(item: any) {
    let indexToRemove: number = null;
    this.onSelections.forEach((selectedVal, index) => {
      if (selectedVal == item) indexToRemove = index;
    });
    this.onSelections.splice(indexToRemove, 1);
    if(this.onSelections.length == 0) {
      this.isComponentValid = false;
    }
    this.onChange.emit(this.onSelections);
  }

}
