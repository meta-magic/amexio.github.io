import { AmexioSearchAdvanceComponent } from '../advancesearch/searchadvance.component';
import {  AfterContentInit, AfterViewInit, Component, ContentChildren,
  ContentChild, Directive, ElementRef, EventEmitter,
  HostListener, Input, OnInit, Output, QueryList,
  ViewChild, ViewChildren } from '@angular/core';
import {CommonDataService} from '../../services/data/common.data.service';
@Component({
  selector: 'amexio-searchbox',
  templateUrl: './searchboxtool.component.html',
})
export class SearchboxtoolComponent implements OnInit , AfterContentInit {
/*
Properties
name : data
datatype : any
version : 4.2 onwards
default : none
description : Local data for dropdown.
*/
@Input() data: any;
/*
Properties
name : data-reader
datatype : string
version : 4.2 onwards
default : none
description : Key in JSON datasource for records
*/
@Input('data-reader') datareader: any;
/*
Properties
name : http-url
datatype : string
version : 4.2 onwards
default : none
description : REST url for fetching datasource.
*/
@Input('http-url') httpurl: string;
/*
Properties
name : place-holder
datatype : string
version : 4.2 onwards
default : none
description : Show place-holder inside dropdown component
*/
@Input('place-holder') placeholder: string;
/*
Properties
name : display-field
datatype : string
version : 4.2 onwards
default : none
description : Sets key inside response data to display.
*/
@Input('display-field') displayfield: string;
/*
Properties
name : http-method
datatype : string
version : 4.2 onwards
default : none
description : Type of HTTP call, POST,GET.
*/
@Input('http-method') httpmethod: string;
/*
Properties
name : title
datatype : string
version : 4.2 onwards
default : none
description : sets title to advance search form
*/
@Input() title = 'Advance Search';
/*
Properties
name : value-field
datatype : string
version : 4.2 onwards
default : none
description : Name of key inside response data.use to send to backend
*/
@Input('value-field') valuefield: string;
/*
Properties
name : width
datatype : number
version : 4.2 onwards
default : none
description : Sets width to auto recommendation list.
*/
@Input() width = 500;
/*
Events
name : keyup
description : Fires when keyup event occurs
*/
@Output() keyup: any = new EventEmitter<any>();
/*
Events
name : onSearchItemClick
description : Fires when search item is selected
*/
@Output() onSearchItemClick: any = new EventEmitter<any>();
/*
Events
name : onSearchClick
description : Fires when search button is clicked
*/
@Output() onSearchClick: any = new EventEmitter<any>();
@ContentChild(AmexioSearchAdvanceComponent) advanceSearchRef: AmexioSearchAdvanceComponent;
@ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;
@ViewChild('inp', { read: ElementRef }) public inp: ElementRef;
  value: string;
  responseData: any;
  viewData: any;
  textValue: any;
  localData: any;
  caretFlag = false;
  searchFlag = false;
  searchTextBox = false;
  displayValue: any;
  isComponentValid: boolean;
  selectedValue: any = '';
  advanceSearchFlag = false;
  labelValue: string;
  previousData: any;
  selectedindex = 0;
  scrollposition = 30;
  enableAdvanceSearch = false;
  advanceButtonLabel: string;
 enableAdvnSearch: boolean;
  constructor(private element: ElementRef, private dataService: CommonDataService) {
  }

  ngAfterContentInit() {
    this.advanceSearchRef.formwidth = this.width;
    this.enableAdvnSearch = this.advanceSearchRef.advanceSearchFlag;
    this.enableAdvanceSearch = true;
    if (this.advanceSearchRef) {
        this.enableAdvanceSearch = true;
      if (this.advanceSearchRef.title) {
          this.advanceButtonLabel = this.advanceSearchRef.title;
       } else if (!this.advanceSearchRef.title || this.advanceSearchRef.title === '') {
          this.advanceButtonLabel = 'Advance Search';
    }
  }
 }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl , this.httpmethod).subscribe(response => {
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
  ngDoCheck() {
    if (JSON.stringify(this.previousData) !== JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement !== null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.searchFlag = false;
    }
  }
  onSelectClick() {
     this.advanceSearchFlag = false;
  }
  onInputClick(event: any) {
    this.searchFlag = true;
    let keyword: any = event.target.value;
    this.viewData = [];
    if (keyword !== null && keyword !== ' ') {
      let search_term = keyword.toLowerCase();
      this.localData.forEach((item: any) => {
        if (item !== null) {
          if (item[this.displayfield].toLowerCase().startsWith(search_term)) {
            this.viewData.push(item);
          }
        }
      });
      this.keyup.emit(event);
     }
 // logic for arrow keys and enter key press
 // 40=down-arrow and 38=up-arrow and 13=enter
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      // if key pressed is up down or enter then process accordingly
      // call function for process
      this.navigateKeys(event);
    }
    if (!this.selectedValue || this.selectedValue === '') {
      this.viewData = [];
    }
  }
  onFocus() {
       if (this.selectedValue.length > 0) {
         let keyword = this.selectedValue;
         this.viewData = [];
      if (keyword !== null && keyword !== ' ') {
        let search_term = keyword.toLowerCase();
        this.localData.forEach((item: any) => {
          if (item !== null) {
            // if word exist in start
            if (item[this.displayfield].toLowerCase().startsWith(search_term)) {
              this.viewData.push(item);
            }
          }
        });
        this.searchFlag = true;
        this.keyup.emit(event);
       }
        if (!this.selectedValue || this.selectedValue === '') {
        this.viewData = [];
      }
      }
    }
  navigateKeys(event: any) {
     if (this.selectedindex > this.viewData.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 ||
      event.keyCode === 38
      && this.selectedindex < this.viewData.length) {
      let prevselectedindex = 0;
      if (this.selectedindex === 0) {
        this.selectedindex = 1;
      } else {
        prevselectedindex = this.selectedindex;
        if (event.keyCode === 40) {
          this.selectedindex++;
          if ((this.selectedindex > 5)) {
            this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
            this.scrollposition = this.scrollposition + 30;
          }
        } else if (event.keyCode === 38) {
          this.selectedindex--;
          if (this.scrollposition >= 0 && this.selectedindex > 1) {
            this.dropdownitems.nativeElement.scroll(1, this.scrollposition);
            this.scrollposition = this.scrollposition - 30;
          }
          if (this.selectedindex === 1) {
            this.scrollposition = 30;
          }
          if (this.selectedindex <= 0) {
          } else {}
        }
      }
      if (this.viewData[this.selectedindex]) {
        this.viewData[this.selectedindex].selected = true;
      }
      if (this.viewData[prevselectedindex]) {
        this.viewData[prevselectedindex].selected = false;
      }
    }

    if (event.keyCode === 13 && this.viewData [this.selectedindex]) {
      this.onItemSelect(this.viewData[this.selectedindex]);
    }
  }

  onSearchButtonClick(event: any) {
  this.onSearchClick.emit(event);
  }
  selectCssClass(): string {
    if (this.viewData.length > 5) {
      return 'dropdown-list scroll';
    } else {
      return 'dropdown-list';
    }
  }
  onItemSelect(item: any) {
    this.value = item[this.valuefield];
    this.selectedValue = item [this.displayfield];
    this.searchFlag = false;
    this.onSearchItemClick.emit(item);
  }
  advanceSearch() {
    this.advanceSearchRef.advanceSearchFlag = true;
    this.advanceSearchFlag = true;
    this.searchFlag = false;
  }
  closeSearchForm() {
    this.advanceSearchFlag = false;
  }
  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader !== null) {
      let dr = this.datareader.split('.');
      if (dr !== null) {
        for (let ir = 0; ir < dr.length; ir++) {
          responsedata = responsedata[dr[ir]];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    return responsedata;
  }
  setData(httpResponse: any) {
     let responsedata = httpResponse;
        // Check if key is added?
    if (this.datareader !== null) {
       let dr = this.datareader.split('.');
       for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
       }
    } else {
      responsedata = httpResponse;
    }
    this.viewData = responsedata;
    this.localData = JSON.parse(JSON.stringify(this.viewData));
   }
}
