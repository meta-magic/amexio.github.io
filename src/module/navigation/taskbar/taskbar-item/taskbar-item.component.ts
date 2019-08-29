import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-task-bar-item',
  templateUrl: './taskbar-item.component.html',
  styleUrls: ['./taskbar-item.component.css'],
})
export class AmexioTaskbarItemComponent implements OnInit {

  @Input('title') title: string;

  @Input('width') widthOfItem = 100;

  @Input('height') heightOfItem = 200;

  @Input('relative') relativePosition = false;

  displayFlag = false;

  left: any;
  top: any;

  constructor() { }

  ngOnInit() {
  }

  taskbarItemClick() {
    this.displayFlag = !this.displayFlag;
  }
}
