import {
  Component, EventEmitter,ElementRef, ContentChildren,HostListener, Input, OnInit, QueryList, Output,
  AfterContentInit
} from '@angular/core';

import { AmexioDropDownitemsComponent } from './dropdownmenu.component.items'
import {DeviceQueryService} from "../../services/device/device.query.service";

@Component({
  selector: 'amexio-drop-down-menu',
  templateUrl: `./dropdownmenu.component.html`,

})

export class AmexioDropDownMenuComponent implements AfterContentInit, OnInit {

  toggle : boolean;
  xposition :boolean = false;
  top : number;


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
  @Input() data: any [];
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
  @Input('icon-align') iconalign : string;

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
   name : menu icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon on menu
   */

  @Input ('down-arrow-icon') downArrowIcon : boolean =true;

  /*
   Properties
   name : transparent
   datatype : string
   version : 4.2 onwards
   default :
   description : transparent style for menu
   */

  @Input() transparent   : boolean =false ;


  /*
   Properties
   name : height
   datatype :   any
   version : 4.2 onwards
   default :
   description : User can set the height to menu body..
   */
  @Input()  height : any;

  @Output() onClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioDropDownitemsComponent) dropdowns: QueryList<AmexioDropDownitemsComponent>;

  optionsCollection: AmexioDropDownitemsComponent[] = [];


  constructor(public element: ElementRef,public matchMediaService: DeviceQueryService ) {
    this.iconalign ="left";
  }

  ngOnInit(){
    if(this.data){
      this.data.forEach(node =>{
        if(!node.iconalign){
          if(this.iconalign)
            node.iconalign = this.iconalign;
        }
        if(!node.labelalign){
          node.labelalign = "left";
        }
      });
    }
  }

  ngAfterContentInit() {
    this.optionsCollection = this.dropdowns.toArray();
    this.optionsCollection.forEach(node => node.onClick.subscribe((eventdata:any) =>{
      this.toggle = false;
    }));
  }
  
   @HostListener('document:click', ['$event.target'])
   @HostListener('document: touchstart', ['$event.target'])
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
 


  showDropDownContent(event : any)
  {
    this.toggle= !this.toggle;
    this.top = event.target.getBoundingClientRect().top + 25;
    if((this.matchMediaService.browserWindow().innerWidth - event.clientX)<200){
      this.xposition = true;
      }else{
      this.xposition = false;
      }
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

  onDropDownMenuClick(event: any) {
    this.toggle = false;
    this.onClick.emit(event);
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


}
