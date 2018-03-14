/**
 * Created by ketangote on 26/2/2018.
 */
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-floating-button', templateUrl: './floatingbutton.component.html'
})
export class AmexioFloatingButtonComponent implements OnInit{

  @Input('vertical-position') verticalposition : string;
  
  @Input('horizontal-position') horizontalposition : string;
  
  @Input('position-top') top : string;

  @Input('position-bottom') bottom : string;

  @Input('position-left') left : string;

  @Input('position-right') right : string;

  @Input('label') label: string;

  @Input('block') block: string = "circle";

  @Input('icon') icon : string;

  @Input('type') type : string;

  @Input('disabled') disabled : string;

  @Input('relative') relative : boolean = false;

  @Output() onClick : any = new EventEmitter<any>();

  positionclass : string;

  absoluteposition : boolean = false;

  constructor() {

  }

  ngOnInit()
  {
  
      if(this.top || this.bottom || this.right || this.left){
        this.absoluteposition = true;
      }  

      this.positionclass = ""

      if(this.relative){
        this.positionclass = " floatingbutton-relative "
      }else{
        this.positionclass = " floatingbutton-fixed "
      }

      if(!this.absoluteposition && !this.relative){
        if (this.verticalposition == null) {
            this.verticalposition = 'top';
          } else if (this.horizontalposition == null) {
            this.horizontalposition = 'right'
          }
          this.positionclass = this.positionclass+ " floatingbutton-" + this.verticalposition + " floatingbutton-" + this.horizontalposition+" floatingbutton-default";
      }  
      if(this.block === "circle"){
          this.positionclass = this.positionclass +" floatingbutton-circle";
          this.label="";
      }else if(this.block === "square")
      {
        this.positionclass = this.positionclass + " floatingbutton-square";
      }

      if(this.type === "primary" || this.type === "theme-color"){
        if(this.disabled)
            this.positionclass = this.positionclass  + " floatingbutton-primary-disabled"
        else
            this.positionclass = this.positionclass + " floatingbutton-primary";
      }
      else if(this.type === "success" || this.type === "green"){
        if(this.disabled)
            this.positionclass = this.positionclass  + " floatingbutton-success-disabled"
        else
            this.positionclass = this.positionclass + " floatingbutton-success";
      }else if(this.type === "danger" || this.type === "red"){
        if(this.disabled)
            this.positionclass = this.positionclass  + " floatingbutton-danger-disabled"
        else
            this.positionclass = this.positionclass + " floatingbutton-danger";
      }else if(this.type === "warning" || this.type === "yellow"){
        if(this.disabled)
            this.positionclass = this.positionclass  + " floatingbutton-warning-disabled"
        else
            this.positionclass = this.positionclass + " floatingbutton-warning";
      }else{
        if(this.disabled)
            this.positionclass = this.positionclass  + " floatingbutton-default-disabled"
        else
            this.positionclass = this.positionclass + " floatingbutton-default";
      }
      
  }

  buttonClick(event:any){
      if(!this.disabled){
        this.onClick.emit({'this':this, 'event':event});
      }
    
  }
}
