
import {Component, ContentChildren, Input, QueryList, AfterViewInit, OnInit, DebugElement, AfterContentInit} from '@angular/core';
import { AmexioAccordionTabComponent } from './accordion.pane';

@Component({
  selector: 'amexio-accordion', templateUrl :'./accordion.component.html'
})

export class AmexioAccordionComponent implements OnInit, AfterContentInit {

  @Input('expand-all') expandAll : boolean;
  
  @Input('transparent') isTransparent : boolean;

  @Input('angle-icon') angleIcon : boolean;

  @ContentChildren(AmexioAccordionTabComponent) queryTabs: QueryList<AmexioAccordionTabComponent>;

  accordionCollections: AmexioAccordionTabComponent[];

  constructor(){
  }

  ngOnInit(){

  }

  ngAfterContentInit(){
    this.accordionCollections = this.queryTabs.toArray();
    this.accordionCollections.forEach(node => node.emittedEvent.subscribe((eventdata:any) => this.activateAccordionPane(eventdata)));

    this.accordionCollections.forEach(node => {
      if(this.expandAll)
        node.active = true;
      else if(node.active)
        node.active = true;
      else
        node.active = false;

      if(this.isTransparent)
        node.isTransparent = true;     
        
      if(this.angleIcon)
        node.angleIcon = true;  
 
    });
    
  }

activateAccordionPane(node: AmexioAccordionTabComponent){
    this.accordionCollections.forEach(tab => {
     if (tab == node) {
        tab.active = node.active ;
      }else{
       tab.active = false;
      }
    });
 }  


 

}
