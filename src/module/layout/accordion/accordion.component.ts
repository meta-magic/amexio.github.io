/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {AccordionService} from "./accordion.service";
import {AmexioAccordionTabComponent} from "./accordion.pane";

@Component({
  selector: 'amexio-accordion', template: `
    <ng-content></ng-content>
  `
})

export class AmexioAccordionComponent {

  @Input('expand-all') expandAll : boolean;

  @Input('transparent') isTransparent : boolean;

  @Input('angle-icon') angleIcon : boolean;

  @ContentChildren(AmexioAccordionTabComponent)  panes : QueryList<AmexioAccordionTabComponent>;

  rootId : number;

  constructor(private acc : AccordionService){
    this.rootId = Math.floor(Math.random() * 90000) + 10000;
    this.acc.getEvents().subscribe(
      event=>{
        this.togglePanes(event);
      }
    );
  }

  ngAfterContentInit(){
    this.setParent();
    if(this.expandAll != null && this.expandAll)
      this.expandAllPanes();
  }

  setParent(){
    this.panes.toArray().forEach((pane : any)=>{
      pane.isTransparent = this.isTransparent;
      this.angleIcon ? pane.angleIcon = this.angleIcon : pane.angleIcon = pane.angleIcon;
      pane.parentId = this.rootId;
    });
  }

  togglePanes(id : any){
    if(id.parent == this.rootId){
      if(!this.expandAll){
        this.panes.forEach((pane : AmexioAccordionTabComponent)=>{
          if(!pane.disabled){
            if(id.id != pane.paneId){
              pane.active= false;
              pane.content.nativeElement.style.maxHeight = null;
            }
          }
        });
      }
    }
  }

  expandAllPanes(){
    this.panes.forEach( (pane : AmexioAccordionTabComponent)=>{
      if(!pane.disabled){
        pane.active = true;
        pane.content.nativeElement.style.maxHeight = pane.content.nativeElement.scrollHeight + 'px';
      }
    })
  }
}
