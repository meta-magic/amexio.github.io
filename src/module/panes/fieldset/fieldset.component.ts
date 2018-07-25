/**
 * Created by pratik on 12/12/17.
 */

 /*
 Component Name : Amexio Accordion
 Component Selector : <amexio-accordion>
 Component Description : Amexio Accordion provides an easy way to organize big forms
 by grouping the fields in accordion tabs.

*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-fieldset',
  templateUrl: './fieldset.component.html',
})

export class AmexioFieldSetComponent implements OnInit {

   /*
Properties
name : collapsible
datatype : boolean
version : 4.0 onwards
default : true
description : Set value true for collapsible fieldset.
*/
  @Input() collapsible: boolean;

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title for fieldset.
*/
  @Input() title: string;

  isActive: boolean;

  constructor() {
  }

  ngOnInit() {
    if (!this.collapsible) {
      this.isActive = true;
    }
  }

  onLegendClick() {
    if (this.collapsible) {
      this.isActive = !this.isActive;
    }
  }

}
