
import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'amexio-accordion-tab',
  templateUrl :"./accordion.pane.html"
})

export class AmexioAccordionTabComponent  {

  @Input() header: any;

  @Input() active: boolean;

  @Output() emittedEvent = new EventEmitter();

  @Input('left-icon') leftIcon: string;

  @Input('angle-icon') angleIcon : boolean;

  @Input('disabled') disabled : boolean;

  isTransparent : boolean;

  

  constructor(){
    
  }

  emitEvent() {
    if(!this.disabled)
      this.emittedEvent.emit(this);
  }

}
