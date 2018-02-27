/**
 * Created by ketangote on 26/2/2018.
 */
import {Component, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'amexio-floating-group-button', templateUrl: './floatinggroupbutton.component.html'
})
export class AmexioFloatingGroupButtonComponent implements OnInit{

  @Input('vertical-position') verticalposition : string;
  
  @Input('horizontal-position') horizontalposition : string;
  
  @Input('position-top') top : string;

  @Input('position-bottom') bottom : string;

  @Input('position-left') left : string;

  @Input('position-right') right : string;

  @Input('icon') icon : string;

  @Input('type') type : string;

  @Input('disabled') disabled : string;

  @Input('relative') relative : boolean = false;

  @Input('floating-group-position') floatinggroupposition : string; 
 
  @Input('data') data: any[];

  @Output() onClick : any = new EventEmitter<any>();

  floatinggroupxposition : string;
  floatinggroupyposition : string;
  togglefloatinggroup : boolean = false;
  datacount : number = 0;
  constructor(private elementref : ElementRef) {

  }

  ngOnInit()
  {
      debugger;

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
      debugger;
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

}
