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
    Properties
  name : display-key
  datatype : string
  version : 5.2.0 onwards
  default : text
  description : Name of key inside response data to display on ui.
  */
  @Input('display-key') displaykey: string;

  /*
 Properties
 name : childarray-key
 datatype : string
 version : 5.2.0 onwards
 default : children
 description : Name of key for child array name inside response data to display on ui.
 */
  @Input('childarray-key') childarraykey: string;

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
    this.displaykey = 'text';
    this.childarraykey = 'children';
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
    } else if (this.data) {
      this.setData(this.data);
    }

  }
  // ICON ADDED WHEN THE ICON IS NOT GIVEN

  iconAddedMethod(nodeArray: any) {
    console.log('.....dddd', nodeArray);
    if (nodeArray && nodeArray.length > 0) {
      nodeArray.forEach((node: any) => {
        if (node[this.childarraykey]) {
          node[this.childarraykey].forEach((element: any) => {
            this.childIconCheckMethod(element);
          });
        }
      });
    }
  }

  childIconCheckMethod(element: any) {
    if (element.hasOwnProperty([this.childarraykey])) {
      element[this.childarraykey].forEach((childIcon: any) => {
        if (childIcon.icon == null || childIcon.icon === '') {
          childIcon.icon = 'fa fa-file-o';
        }
      });
      if (element.icon == null || element.icon === '') {
        element.icon = 'fa fa-folder-o';
      }
      this.iconAddedMethod(element);
    }
  }
  // THIS METHOD   IS USED FOR ADDING CHILDREN IN OPTIONS
  getSelectedItem(event: any) {
    const arrayOnly = [event.data];
    this.childItem = arrayOnly;
    event.parentRef.show = true;
    event.parentRef.expand = false;
    this.arrowKey = this.buttonAngleRightCss;
    this.onListItemClick.emit(event.data);
  }

  getEventEmitClick(event: any) {
    this.onListItemClick.emit(event);
  }

  onArrowClick(item: any) {
    item.expand = !item.expand;
    if (item.expand) {
      this.arrowKey = 'button_angle-down';
    } else {
      this.arrowKey = this.buttonAngleRightCss;
    }
  }

  onButtonClick(event: any) {
    event.show = false;
    event.expand = false;
    this.onClick.emit(event);
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    // Check if key is added?
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.iconAddedMethod(this.data);
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
      this.data.forEach((dataObject: any) => {
        if (dataObject) {
          expandData = dataObject;
        }
        if (expandData && expandData.expand != null) {
          expandData.expand = false;
        }
      });
    }
  }
}
