import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-task-bar-item',
  templateUrl: './taskbar-item.component.html',
})
export class AmexioTaskbarItemComponent implements OnInit {

  @Input('title') title: string;

  @Input('width') widthOfItem = 100;

  @Input('height') heightOfItem = 200;

  @Input('relative') relativePosition = false;

  @Input('close') close = false;

  @Input('taskbar-Icon') taskbarIcon: any;

  displayFlag = false;

  closeIcon: any;
  left: any;
  top: any;
  iconClose = false;

  @ViewChild('taskbarItemId', /* TODO: add static flag */ { static: true}) public taskbarItemId: ElementRef;

  @Output('onCloseEvent') onCloseEvent = new EventEmitter<any>();

  constructor() {
    this.displayFlag = true;
  }

  ngOnInit() {
  }
  taskbarItemClick() {
    this.displayFlag = !this.displayFlag;
  }

  iconClick(event: any) {
    if (this.close) {
      this.iconClose = true;
      this.displayFlag = false;
      if (event) {
        this.taskbarItemId.nativeElement.parentNode.remove();
      }
    }
    this.onCloseEvent.emit(this.taskbarItemId);
  }
}
