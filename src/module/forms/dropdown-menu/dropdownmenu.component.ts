import {
  AfterContentInit,  AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
  HostListener, Input, OnInit, Output, QueryList,
} from '@angular/core';
import {ViewChildren} from '@angular/core';
import { AmexioDropDownitemsComponent } from './dropdownmenu.component.items';

import { DeviceQueryService } from '../../services/device/device.query.service';
@Component({
  selector: 'amexio-drop-down-menu',
  templateUrl: `./dropdownmenu.component.html`,
})
export class AmexioDropDownMenuComponent implements AfterContentInit, OnInit {
  toggle: boolean;
  xposition = false;
  top: number;
  /* for internal use*/
  @Input() dropDownMenuLocalData: any;
  /*
   Properties
   name : data
   datatype : string
   version : 4.0 onwards
   default :
   description : data what you want to add in list
   */
  @Input() data: any[];
  /*
   Properties
   name : title
   datatype : string
   version : 4.0 onwards
   default :
   description : title on Dropdown
   */
  @Input() title: string;
  /*
   Properties
   name : icon
   datatype : string
   version : 4.0 onwards
   default :
   description : icon on DropDown Menu
   */
  @Input() icon: string;

  /*
   Properties
   name : flag
   datatype : string
   version : 4.0 onwards
   default : right
   description : flag for icon position right/left
   */
  @Input('icon-align') iconalign: string;
  /*
   Properties
   name : padding
   datatype : string
   version : 4.2 onwards
   default :
   description : padding for hover button
   */
  @Input() padding: string;
  /*
   Properties
   name : menu icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon on menu
   */
  @Input('down-arrow-icon') downArrowIcon = true;
  /*
   Properties
   name : transparent
   datatype : string
   version : 4.2 onwards
   default :
   description : transparent style for menu
   */
  @Input() transparent = false;
  /*
   Properties
   name : height
   datatype :   any
   version : 4.2 onwards
   default :
   description : User can set the height to menu body..
   */
  componentId: any;
  dropdownmenuindex = -1;
  prevdropdownmenuindex = -1;

  @Input() height: any;
  @Output() onClick: any = new EventEmitter<any>();
  @ContentChildren(AmexioDropDownitemsComponent) dropdowns: QueryList<AmexioDropDownitemsComponent>;
  optionsCollection: AmexioDropDownitemsComponent[] = [];
  constructor(public element: ElementRef, public matchMediaService: DeviceQueryService) {
    this.iconalign = 'left';
    this.padding = '5px 10px';
    this.componentId = 'dropdownmenu' + Math.floor(Math.random() * 1000 + 999);
  }
  ngOnInit() {
    if (this.data) {
      this.data.forEach((node: any) => {
        if (!node.iconalign && this.iconalign) {
          node.iconalign = this.iconalign;
        }
        if (!node.labelalign) {
          node.labelalign = 'left';
        }
      });
      this.generateIndex(this.data);
    }
  }
  ngAfterContentInit() {
    this.optionsCollection = this.dropdowns.toArray();
    this.optionsCollection.forEach((node: any) => node.onClick.subscribe((eventdata: any) => {
      this.toggle = false;
    }));
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
      this.toggle = false;
    }
  }
  showDropDownContent(event: any) {
    if (this.dropdownmenuindex > -1) {
      this.data[this.dropdownmenuindex]['selected'] = false;
     }
    this.toggle = !this.toggle;
    this.top = event.target.getBoundingClientRect().top + 25;
    if ((this.matchMediaService.browserWindow().innerWidth - event.clientX) < 200) {
      this.xposition = true;
    } else {
      this.xposition = false;
    }
    const inputid = document.getElementById(this.componentId);
    inputid.setAttribute('aria-activedescendant', 'dropdownitem');
    this.dropdownmenuindex = -1;
    this.prevdropdownmenuindex = -1;
  }
  getIconPosition(childposition: any, parentIconPosition: string): boolean {
    if (childposition.hasOwnProperty('iconalign') && childposition.iconalign !== '') {
      if (childposition.iconalign === 'right') {
        return true;
      } else {
        return false;
      }
    } else {
      if (parentIconPosition === 'right') {
        return true;
      } else {
        return false;
      }
    }
  }
  onDropDownMenuClick(event: any) {
    this.toggle = false;
    this.onClick.emit(event);
  }
  getLabelPosition(childPosition: any, parentLabelPosition: string): boolean {
    if (childPosition.hasOwnProperty('labelalign') && childPosition.labelalign !== '') {
      if (childPosition.labelalign === 'right') {
        return true;
      } else {
        return false;
      }
    } else {
      if (parentLabelPosition === 'right') {
        return true;
      } else {
        return false;
      }
    }
  }
// Aria Logic Starts
generateIndex(data: any) {
  data.forEach((element: any, index: number) => {
    element['index'] = this.componentId + 'dropdownmenuitem' + index;
    element['selected'] = false;
  });
}
  navigateOptions(item: any) {
    if (item.keyCode === 38) {
      this.upArrowKeyNavigation(item);
    } else if (item.keyCode === 40) {
      this.downArrowKeyNavigation(item);
    } else if (item.keyCode === 13 && this.dropdownmenuindex > -1) {
        const emitdata = this.createEmitObject(this.data[this.dropdownmenuindex]);
        const e = {
          event: item,
          this: emitdata,
        };
        this.onClick.emit(e);
    }
  }
  upArrowKeyNavigation(event: any) {
    if (this.prevdropdownmenuindex > -1) {
      this.data[this.prevdropdownmenuindex]['selected'] = false;
    }
    this.prevdropdownmenuindex--;
    if (this.prevdropdownmenuindex === -1) {
      this.prevdropdownmenuindex = this.data.length - 1;
      this.dropdownmenuindex = -1;
    }
    this.setAriaActiveDescendant(this.prevdropdownmenuindex);
    if (this.prevdropdownmenuindex === 0) {
      this.dropdownmenuindex = 0;
    }
  }
  downArrowKeyNavigation(event: any) {
    if (this.prevdropdownmenuindex > -1) {
      this.data[this.prevdropdownmenuindex]['selected'] = false;

    }
    this.dropdownmenuindex++;
    this.prevdropdownmenuindex = this.dropdownmenuindex;
    if (this.dropdownmenuindex >= this.data.length) {
      this.dropdownmenuindex = 0;
      this.prevdropdownmenuindex = 0;
    }
    this.setAriaActiveDescendant(this.dropdownmenuindex);
  }
createEmitObject(object: any): any {
  const obj = {};
  if (object['icon']) {
     obj['icon'] = object['icon'];
  }
  if (object['label']) {
    obj['label'] = object['label'];
  }
  if (object['labelalign']) {
    obj['labelalign'] = object['labelalign'];
  }
  if (object['iconalign']) {
    obj['iconalign'] = object['iconalign'];
  }
  if (object['separator']) {
    obj['separator'] = object['separator'];
  }
  return obj;
}

setAriaActiveDescendant(rowindex: any) {
  this.data[rowindex]['selected'] = true;
  const inputid =  document.getElementById(this.componentId);
  inputid.setAttribute('aria-activedescendant', this.data[rowindex]['index']);
}
}
