/**
 * Created by sagar on 6/9/17.
 */

 /*
 Component Name : Amexio Accordion
 Component Selector : <amexio-step-block>
 Component Description : Step-box component is an indicator for the steps in a workflow.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-step-block', template: `
  `
})

export class StepBlockComponent implements OnInit {

  /*
Properties 
name : active
datatype : boolean
version : 4.0 onwards
default : none
description : The current active step.
*/
  @Input() active: boolean;

    /*
Properties 
name : label
datatype : string
version : 4.0 onwards
default : none
description : Label for step.
*/
  @Input() label: string;

    /*
Properties 
name : icon
datatype : string
version : 4.0 onwards
default : none
description : Icon for step box.
*/
  @Input() icon: string;

  constructor() {
  }

  ngOnInit() {
  }
}
