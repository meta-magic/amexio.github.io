/**
 * Created by pratik on 14/12/17.
 */
import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {AmexioAccordionTabComponent} from "./accordion.pane";
import {AccordionService} from "./accordion.service";

@Component({
  selector: 'amexio-accordion', template: `
    <ng-content></ng-content>
  `
})

export class AmexioAccordionComponent {
  @Input('expand-all') expandAll : boolean;

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
    if(this.expandAll != null && this.expandAll)
      this.expandAllPanes();
  }

  togglePanes(id : any){
    if(id.parent == this.rootId){
      if(!this.expandAll){
        this.panes.forEach((pane : AmexioAccordionTabComponent)=>{
          if(id.id != pane.paneId){
            pane.active= false;
            pane.content.nativeElement.style.maxHeight = null;
          }

        });
      }
    }
  }

  expandAllPanes(){
    this.panes.forEach( (pane : AmexioAccordionTabComponent)=>{
      pane.active = true;
      pane.content.nativeElement.style.maxHeight = pane.content.nativeElement.scrollHeight + 'px';
    })
  }
}
