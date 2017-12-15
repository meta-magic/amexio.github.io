/**
 * Created by pratik on 12/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-fieldset',
  templateUrl : './fieldset.component.html',
  styleUrls : ['./fieldset.component.scss']
})

export class AmexioFieldSetComponent implements OnInit {

  @Input()  collapsible : boolean;

  @Input()  title : string;

  isActive : boolean;

  constructor() { }

  ngOnInit() {
    if(!this.collapsible )
      this.isActive = true;
  }

  onLegendClick(){
    if(this.collapsible)
      this.isActive = !this.isActive;
  }

}
