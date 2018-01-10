/**
 * Created by pratik on 8/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-tab',
  templateUrl : './tab.pill.component.html'
})
export class AmexioTabPill implements OnInit {

  @Input()  title: string;

  @Input()  active = false;

  @Input()  icon: string;

  tabId : number;

  constructor() {
    this.tabId = Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
}
