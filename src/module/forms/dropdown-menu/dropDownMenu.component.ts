import {
  Component, EventEmitter, ContentChildren, HostListener, Input, OnInit, QueryList, Output,
  AfterContentInit,
  ElementRef
} from '@angular/core';

import { AmexioDropDownitemsComponent } from './dropDownMenu.component.items'
import {DeviceQueryService} from "../../services/device/device.query.service";



@Component({
  selector: 'amexio-drop-down-menu',
  templateUrl: `./dropDownMenu.component.html`
})

export class AmexioDropDownMenuComponent implements AfterContentInit {

  toggle : boolean;
  xposition :boolean = false;



  /* for internal use*/
  @Input() dropDownMenuLocalData: any;

  /*
   Properties
   name : data
   datatype : string
   version : 4.2 onwards
   default :
   description : data what you want to add in list
   */
  @Input() data: any;
  /*
   Properties
   name : title
   datatype : string
   version : 4.2 onwards
   default :
   description : title on Dropdown
   */
  @Input() title: string;
  /*
   Properties
   name : icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon on DropDown Menu
   */
  @Input() icon: string;

  /*
   Properties
   name : iconposition
   datatype : string
   version : 4.2 onwards
   default : right
   description : iconposition for  icon postion right/left
   */
  @Input('icon-position') iconposition : string;

  /*
   Properties
   name : padding
   datatype : string
   version : 4.2 onwards
   default :
   description : padding for hover button
   */
  @Input()  padding : string;


  /*
   Properties
   name : down-arrow-icon
   datatype : boolean
   version : 4.2 onwards
   default :true
   description : down-arrow-icon for menu
   */
  @Input('down-arrow-icon') downArrowIcon : boolean=true;

  /*
   Properties
   name : transparent
   datatype : string
   version : 4.2 onwards
   default :
   description : transparent style for menu
   */

  @Input () transparent :boolean =false;

  /*
   Properties
   name : height
   datatype :   any
   version : 4.2 onwards
   default :
   description : User can set the height to menu body..
   */
  @Input()  height : any;



  /*
   Events
   name : onClick
   datatype : any
   version :none
   default :
   description : On record select event.this event is only for normal dropdown.

   */
  @Output() onClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioDropDownitemsComponent) dropdowns: QueryList<AmexioDropDownitemsComponent>;
  itemsCollection: AmexioDropDownitemsComponent[] = [];

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
      this.toggle = false;
    }
  }
  ngAfterContentInit() {
    if (!this.data) {
      this.data = [];
      this.itemsCollection = this.dropdowns.toArray();
      this.itemsCollection.forEach((obj) => {
        this.data.push(obj);
      })
    }

  }

  constructor( public matchMediaService: DeviceQueryService , public element: ElementRef) {
    this.iconposition ="left";
  }

  top : number;
  showDropDownContent(event : any)
  {
    this.toggle= !this.toggle;
    this.top = event.target.getBoundingClientRect().top + 25;
  }

  onDropDownMenuClick(event: any) {
    this.onClick.emit(event);
  }

  getIconPosition(childposition:any,parentIconPosition: string): boolean {
    if(childposition.hasOwnProperty('iconalign') && childposition.iconalign != ''){
      if(childposition.iconalign == 'right'){
        return true;
      } else return false;
    } else {
      if(parentIconPosition == 'right'){
        return true;
      } else return false;
    }
  }

  getLabelPosition(childPosition:any, parentLabelPosition :string):boolean{

    if(childPosition.hasOwnProperty('labelalign') && childPosition .labelalign !='')
    {
      if(childPosition.labelalign =='right'){
        return true;
      }else return false;
    }else {
      if(parentLabelPosition =='right'){
        return true;
      }else return false;
    }
  }


  onMouseOver(event:any){
    if((this.matchMediaService.browserWindow().innerWidth - event.clientX)<200){
      this.xposition = true;
    }else{
      this.xposition = false;
    }

  }


}
