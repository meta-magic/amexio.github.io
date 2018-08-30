
/*
Component Name : Amexio Accordion
 Component Selector : <amexio-accordion>
 Component Description : Amexio Accordion provides an easy way to organize big forms by grouping the fields in accordion tabs.
 */
import {AfterContentInit, AfterViewInit, Component, ContentChildren,
  ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild,
  ViewChildren } from '@angular/core';
import {AmexioAccordionHeaderComponent} from './accordion.header.component';
import { AmexioAccordionTabComponent } from './accordion.pane';
@Component ({selector : 'amexio-accordion', templateUrl : './accordion.component.html'})
export class AmexioAccordionComponent implements OnInit, AfterContentInit {
/*
Properties
name : expand-all
datatype : boolean
version : 4.0 onwards
default : false
description : Pane will expand or collapse based on the boolean
*/
  @Input('expand-all') expandAll: boolean;
/*
Properties
name : transparent
datatype : boolean
version : 4.0 onwards
default : false
description : Apply Transparent styles to accordion
*/
  @Input('transparent') isTransparent: boolean;
/*Properties
name : angle-icon
datatype : boolean
version : 4.0 onwards
default : false
description : Can use Angle Icons instead of default plus/minus icons
*/
  @Input('angle-icon') angleIcon: boolean;

  @ViewChild('accordionHeader', { read: ElementRef }) public accordionHeader: ElementRef;

@ContentChildren(AmexioAccordionTabComponent) queryTabs: QueryList<AmexioAccordionTabComponent>;

accordionCollections: AmexioAccordionTabComponent[];

@ContentChildren(AmexioAccordionHeaderComponent) queryheader: QueryList<AmexioAccordionHeaderComponent>;

accordionHeaderList: AmexioAccordionHeaderComponent[];
constructor() {}
ngOnInit() {}
ngAfterContentInit() {
    this.accordionCollections = this.queryTabs.toArray();
    this.accordionCollections.forEach((node) => node.emittedEvent.subscribe((eventdata: any) => this.activateAccordionPane(eventdata)));
    this.accordionCollections.forEach((node) => {
      if (this.expandAll) {
        node.active = true;
      } else if (node.active) {
        node.active = true;
      } else {
        node.active = false;
      }

      if (this.isTransparent) {
        node.isTransparent = true;
      }
      if (this.angleIcon) {
        node.angleIcon = true;
      }
      });

    }

activateAccordionPane(node: AmexioAccordionTabComponent) {
    this.accordionCollections.forEach((tab) => {
     if (tab === node) {
        tab.active = node.active ;
      } else {
       tab.active = false ;
      }});
 }}
