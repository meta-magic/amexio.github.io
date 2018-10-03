/**
 * Created by kedarkokil on 26/09/18.
 */

/*
Component Name : Amexio breadcrumb
Component Selector : <amexio-breadcrumb>
Component Description : Simple list box which allows user to select one of
more items from list based on configuration. User can provide custom template to
change look and feel.
*/
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-breadcrumb', templateUrl: './breadcrumb.component.html',
})
export class AmexioBreadcrumbComponent implements OnInit {

  /*
Properties
name : data
datatype : any
version : 5.2.1onwards
default : none
description : Local Data binding.
*/
@Input() data: any[];
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
version : 5.0 onwards
default : none
description : Key in JSON Datasource for records.
*/
  @Input('data-reader') datareader: string;

  /*
Properties
name : http-method
datatype : string
version : 5.0 onwards
default : none
description : Type of HTTP call, POST,GET etc.
*/
  @Input('http-method') httpmethod: string;

  /*
   Events
   name : onListItemClick
   datatype : any
   version : none
   default :
   description : On click event
   */
  @Output() onListItemClick: any = new EventEmitter<any>();
  /*
   Events
   name : onClick
   datatype : any
   version : none
   default :
   description : On click event
   */
  @Output() onClick: any = new EventEmitter<any>();

  label: string;

  responseData: any;

  icon: string;

  childItem: any;

  arrowKey: string;

  previousData: any;

  buttonAngleRightCss = 'button_angle-right';

  constructor(public element: ElementRef, private dataService: CommonDataService) {
  }

  ngOnInit() {
    this.arrowKey = this.buttonAngleRightCss;
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    }
  }
  // THIS METHOD   IS USED FOR ADDING CHILDREN IN OPTIONS
  getSelectedItem(data: any, parentRef: any) {
    this.childItem = data;
    parentRef.show = true;
    parentRef.expand = false;
    this.arrowKey = this.buttonAngleRightCss;
    this.onListItemClick.emit(data);
  }
  onArrowClick(item: any) {
    item.expand = !item.expand;
    if (item.expand) {
      this.arrowKey = 'button_angle-down';
    } else {
      this.arrowKey = this.buttonAngleRightCss;
    }
  }

  onbtnClick(item: any) {
    this.onClick.emit(item);
    item.show = false;
    item.expand = false;
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    // Check if key is added?
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement !== null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      let expandData: any;
      expandData = this.data;
      expandData.expand = false;
    }
  }
}
