/**
 * Created by ketangote on 26/2/2018.
 */

/*
 Component Name : Amexio Floating-Button group
 Component Selector :  <amexio-floating-group-button>
 Component Description : A Floating group button component with various position options (vertical/horizontal/top/bottom/left/right)
*/
 
import {Component, EventEmitter, Input, Output, OnInit, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'amexio-floating-group-button', templateUrl: './floatinggroupbutton.component.html'
})
export class AmexioFloatingGroupButtonComponent implements OnInit{

/*
Properties 
name : vertical-position
datatype : string
version : 4.1 onwards
default : none
description : Positions floating button vertically: top or bottom or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
*/ 
  @Input('vertical-position') verticalposition : string;
  /*
Properties 
name : horizontal-position
datatype : none
version : 4.1 onwards
default : none
description : Positions floating button horizontally: left or right or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
*/ 
  @Input('horizontal-position') horizontalposition : string;
  /*
Properties 
name : position-top
datatype : none
version : 4.1 onwards
default : none
description : Takes top position in percentage or pixel
*/ 
  @Input('position-top') top : string;
/*
Properties 
name : position-bottom
datatype : none
version : 4.1 onwards
default : none
description : Takes bottom position in percentage or pixel
*/ 
  @Input('position-bottom') bottom : string;
/*
Properties 
name : position-left
datatype : none
version : 4.1 onwards
default : none
description : Takes left position in percentage or pixel
*/ 
  @Input('position-left') left : string;
/*
Properties 
name : position-right
datatype : none
version : 4.1 onwards
default : none
description : Takes right position in percentage or pixel
*/ 
  @Input('position-right') right : string;
/*
Propertiee
name : icon
datatype : string
version : 4.1 onwards
default : none
description : FaIcon classname.
*/ 
  @Input('icon') icon : string;
/*
Properties 
name : type
datatype : string
version : 4.1 onwards
default : none
description : Type of button - default  / theme-color / theme-backgroundcolor / green / red / yellow
*/ 
  @Input('type') type : string;
/*
Properties 
name : disabled
datatype : string
version : 4.1 onwards
default : none
description :Enable/Disables the button
*/ 
  @Input('disabled') disabled : string;
/*
Properties 
name : relative
datatype : boolean
version : 4.1 onwards
default : none
description : Place floating buttong at relative position
*/ 
  @Input('relative') relative : boolean = false;
/*
Properties 
name : floating-group-position
datatype : string
version : 4.1 onwards
default : none
description : Positions floating button group at specified position
*/ 
  @Input('floating-group-position') floatinggroupposition : string; 
/*
Properties 
name : data
datatype : array
version : 4.1 onwards
default : none
description : local data for buttons
*/ 
  @Input('data') data: any[];
  /*
Events
name : onClick
datatype : any
version : none
default : none
description : Event is fired when button is click
*/
  @Output() onClick : any = new EventEmitter<any>();

  floatinggroupxposition : string;
  floatinggroupyposition : string;
  togglefloatinggroup : boolean = false;
  datacount : number = 0;
  constructor(private elementref : ElementRef) {

  }

  ngOnInit()
  {
      if(this.data && this.data.length>0){
        this.datacount = this.data.length;
        this.data.forEach(node =>{
          if(!node['type']){
            node['type'] = this.type;
            node['typeclass'] = "floatingbutton-"+this.type;
          }else{
            node['typeclass'] = "floatingbutton-"+node['type'];
          }
        });
      }
  }

  buttonClick(event:any){
      
      let x = event.currentTarget.getBoundingClientRect().left;//event.x;
      let y = event.currentTarget.getBoundingClientRect().top;//event.y;
      if(!this.disabled){
        if(this.floatinggroupposition  === "bottom"){
          this.floatinggroupxposition = (x) +"px";
          this.floatinggroupyposition = (y + 70) +"px";
        }

        if(this.floatinggroupposition === "top"){
          this.floatinggroupxposition = (x) +"px";
          this.floatinggroupyposition = (y - (70*this.datacount)) +"px";
        }

        this.togglefloatinggroup = !this.togglefloatinggroup ;
        this.onClick.emit({'this':this, 'event':event});
      
      }
    
  }

  onFloatingButtonClick(event : any){
    this.buttonClick(event.event);
  }

  onButtonClick(node:any,event:any){
    this.togglefloatinggroup = !this.togglefloatinggroup ;
    this.onClick.emit({'this':node,'parent':this, 'event':event});
  }

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.elementref.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }

    if (!parentFound) {
       this.togglefloatinggroup = false;
     }
  }

}
