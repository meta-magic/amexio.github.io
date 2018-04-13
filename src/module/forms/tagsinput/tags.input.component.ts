/**
 * Created by pratik on 20/12/17.
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
  @Input('field-label') fieldlabel: string;

  @Input('allow-blank') allowblank: string;

  @Input() data: any;

  @Input('has-label') haslabel: boolean = true;
  
  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

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

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('enable-popover') enablepopover: boolean;

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;

  @Input() key: any;

  @Input('trigger-char') triggerchar: number;

  @ViewChild('inp') inpHandle: any;

  @ViewChild('tagDropRef') tagDropRef: any;

  @ViewChild('dropdownitems', {read: ElementRef}) public dropdownitems: ElementRef;


  maskloader:boolean=true;

  constructor(public dataService: CommonDataService,public element: ElementRef, public renderer: Renderer2) {

  }

  ngOnInit() {
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
    debugger;
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
    this.showToolTip = false;

  }

  removePill(item: any) {
    let indexToRemove: number = null;
    this.onSelections.forEach((selectedVal, index) => {
      if (selectedVal == item) indexToRemove = index;
    });
    this.onSelections.splice(indexToRemove, 1);
    this.onChange.emit(this.onSelections);
  }

}
