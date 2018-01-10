/**
 * Created by pratik on 8/1/18.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
 selector: 'amexio-column',
 templateUrl: 'column.component.html',
  host: {
    '[class]': 'colclass'
  }
})

export class AmexioColumnComponent implements OnInit {


  size_ : string;

  colclass : string;

  constructor()
  {

  }

  @Input()
  set size(value: any) {
    this.size_ = value;
    this.colclass = "flex-col flex-col-"+value;
  }

  get size() {
    return this.size_;
  }

  ngOnInit(){

  }


}
