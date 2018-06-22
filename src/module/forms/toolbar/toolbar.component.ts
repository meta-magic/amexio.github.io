import { Component, OnInit, Input,ContentChildren,QueryList,Output,EventEmitter,ElementRef,ViewChild,} from '@angular/core';
import{ToolbaroneComponent } from './toolbarone.component';
import {ToolBarActionComponent} from './toolbaraction.component';

@Component({
  selector: 'amexio-toolbar',
  templateUrl: `./toolbar.component.html`,
})
export class ToolbarComponent implements OnInit {

 
/*
Properties
name :seperator
datatype :boolean
version : 4.2onwards
default : 
description : This will seperate the toolbar.
*/
@Input("seperator") seperator:boolean;
/*
Properties
name :toolbarposition
datatype :string
version : 4.0 onwards
default : 
description : This will allign the toolbar.
*/
@Input("toolbar-position") toolbarposition: string;
/*
Events
name : onClick
datatype : none
version : none
default : none
description : Callback to invoke on activated tab event.
*/
@Output() onClick: any = new EventEmitter<any>();
@Input() tabLocalData: any;
tabPreviewData: any;

  constructor() { 
   // this.justifycontent= "";
    this.toolbarposition="top";
    this.seperator=false;
   
    
  }

  @ContentChildren(ToolbaroneComponent) queryTool: QueryList<ToolbaroneComponent>;
  toolCollection: ToolbaroneComponent[];

  ngOnInit() {
  
  }
   
  
  ngAfterContentInit() {
     // this.toolCollection=this.queryTo;
      this.toolCollection = this.queryTool.toArray();
      for (let i = 0; i < this.toolCollection.length; i++) {
        this.toolCollection[i]['position'] =this.getToolbaritemposition(this.toolCollection[i]['position']);
      }
      // this.toolCollection.forEach((object)=>{
      //   if(object){
      //     let aa=object.getToolbaritemposition();
      //     console.log('COMPOENNT'+aa);
      //   }
      // });
  
  }
  getToolbaritemposition(position:any):any{
  
    if(position== 'right'){
      return 'main-right';  
    }
    if(position == 'left'){
      return 'main-left';  
    }
    if(position == 'center'){
      return 'main-center';  
    }
    if(position == ''){
      return 'main-center';  
    }
  }
  onToolClick(tool: any) {
    if (!tool.disabled) {
      for (let i = 0; i < this.toolCollection.length; i++) {
        if (this.toolCollection[i] === tool) {
          this.toolCollection[i]['active'] = true;
          this.onClick.emit(tool);
        } else {
          this.toolCollection[i]['active'] = false;
        }
        // this.toolCollection[i]['position'] =this.getToolbaritemposition(this.toolCollection[i]['position']);
      }
    }
  }

  // THIS METHOD IS  FOR APPLIED SPERATOR CLASS
  getSeperatotClass(toolnode:any):any{
  let cssName:string=' ';
    if(this.seperator){
      cssName='seperator-line ';
    }
    cssName=cssName +toolnode.position;
    return cssName;
  }

  getToolbarPosition(){
    if(this.toolbarposition=='top'){
      return '';
    }
    if(this.toolbarposition=='right'){
      return '';
    }
    if(this.toolbarposition=='bottom'){
      return '';
    }
  }


}
