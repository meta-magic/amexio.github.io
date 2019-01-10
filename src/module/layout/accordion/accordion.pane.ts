/*
 Component Name : Amexio Accordion
 Component Selector : <amexio-accordion-tab>
 Component Description : Amexio Accordion provides an easy way to organize big forms by grouping the fields in accordion tabs.
*/
import { animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-accordion-tab',
  templateUrl: './accordion.pane.html',
  animations: [
    trigger('accordionState', [
      state('hidden', style({
        display: 'none',
        height: '0px',
      })),
      state('visible', style({
        display: 'block',
        height: '*',
      })),
      transition('*=>hidden',  animate('0ms')),
      transition('*=>visible',  animate('200ms')),
    ]),
  ],
})

export class AmexioAccordionTabComponent {

  /*
  Properties
  name : header
  datatype : any
  version : 4.0 onwards
  default :
  description : User can bind title for accordion tab.*/
  @Input() header: any;
  /*
  Properties
  name : active
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : user can Set true for specific accordian open as default
  */
  @Input() active: boolean;
  /*
  Events
  name : emittedEvent
  datatype :none
  version : none
  default : none
  description : Fires the on accordion pane click event.
  */
  @Output() emittedEvent = new EventEmitter();
  /*
  Properties
  name : left-icon
  datatype : string
  version : 4.0 onwards
  default :
  description : places the icon on left
  */
  @Input('left-icon') leftIcon: string;
  /*
  Properties
  name : angle-icon
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Can use Angle Icons instead of default plus/minus icons
  */
  @Input('angle-icon') angleIcon: boolean;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : 	Disabled specific panes
  */
  @Input('disabled') disabled: boolean;
  isTransparent: boolean;
  currentstate: string;

  constructor() {
    this.currentstate = 'hidden';
  }
  emitEvent() {
    if (!this.disabled) {
      this.active = !this.active;
      this.emittedEvent.emit(this);
    }

    if (this.active) {
      this.currentstate = 'visible';
    } else {
      this.currentstate = 'hidden';
    }

  }
}
