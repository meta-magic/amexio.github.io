/**
 * Created by sagar on 6/9/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-step-block',
  template: `  
  `
})

export class StepBlockComponent implements OnInit {

  @Input() active:boolean;

  @Input() label:string;

  @Input() icon:string;

  constructor() {
  }

  ngOnInit() {
  }
}
