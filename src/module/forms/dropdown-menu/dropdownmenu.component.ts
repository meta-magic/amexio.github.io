import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input,
  OnInit, Output, QueryList, Renderer2,
} from '@angular/core';
import { BaseFormValidator } from '../../base/base.validator.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { AmexioDropDownitemsComponent } from './dropdownmenu.component.items';
@Component({
  selector: 'amexio-drop-down-menu',
  templateUrl: `./dropdownmenu.component.html`,
})
export class AmexioDropDownMenuComponent extends BaseFormValidator<any> implements AfterContentInit, OnInit {
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
  @Input() height: any;
  @Output() onClick: any = new EventEmitter<any>();
  @ContentChildren(AmexioDropDownitemsComponent) dropdowns: QueryList<AmexioDropDownitemsComponent>;
  optionsCollection: AmexioDropDownitemsComponent[] = [];
  constructor(
    public element: ElementRef, public matchMediaService: DeviceQueryService,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
    this.iconalign = 'left';
    this.padding = '5px 10px';
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
    }
  }
  ngAfterContentInit() {
    this.optionsCollection = this.dropdowns.toArray();
    this.optionsCollection.forEach((node: any) => node.onClick.subscribe((eventdata: any) => {
      this.toggle = false;
    }));
  }

  showDropDownContent(event: any) {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.onBaseFocusEvent({});
    } else {
      this.onBaseBlurEvent({});
    }
    this.top = event.target.getBoundingClientRect().top + 25;
    if ((this.matchMediaService.browserWindow().innerWidth - event.clientX) < 200) {
      this.xposition = true;
    } else {
      this.xposition = false;
    }
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
}
