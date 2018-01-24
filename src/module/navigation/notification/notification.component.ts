/**
 * Created by ketangote on 12/18/17.
 */


import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-notification', templateUrl: './notification.component.html'
})
export class AmexioNotificationComponent implements OnInit {

  @Input() closable: boolean = true;

  @Input('vertical-position') verticalposition: string;

  @Input('horizontal-position') horizontalposition: string;

  @Input('data') messageData: any[];

  @Input('auto-dismiss-msg') autodismissmsg: boolean;

  @Input('auto-dismiss-msg-interval') autodismissmsginterval: number;

  data: any[];

  positionclass: string;

  constructor(private ref: ChangeDetectorRef) {


  }


  ngOnInit() {

    if (this.autodismissmsg) {
      if (!this.autodismissmsginterval) {
        this.autodismissmsginterval = 1500;
      }
      if (this.messageData !== null) {
        setInterval(() => {
          this.messageData.shift();
          this.ref.markForCheck();
        }, this.autodismissmsginterval);
      }
    }


    if (this.verticalposition == null) {
      this.verticalposition = 'top';
    } else if (this.horizontalposition == null) {
      this.horizontalposition = 'right'
    }

    this.positionclass = "toast-" + this.verticalposition + " toast-" + this.horizontalposition;
  }


  closeNotification(msg: any) {
    const count = this.messageData.length;
    for (let i = 0; i < count; i++) {
      if (this.messageData[i] === msg) {
        this.messageData.splice(msg, 1);
      }
    }
  }

}



