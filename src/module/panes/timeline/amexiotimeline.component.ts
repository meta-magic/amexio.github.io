import { AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList, ViewChild  } from '@angular/core';
import { AmexiotimelineeventComponent} from './amexiotimelineevent.component';
@Component({
  selector: 'amexio-timeline',
  templateUrl: './amexiotimeline.component.html',
})
export class AmexiotimelineComponent implements OnInit, AfterContentInit {
  /*
Events
name : onClick
datatype : none
version : none
default : none
description : Callback to invoke on activated tab event.
*/
@Output() onClickEvent: any = new EventEmitter<any>();
@ContentChildren( AmexiotimelineeventComponent ) queryTimeLine: QueryList<AmexiotimelineeventComponent>;
  timeCollection: AmexiotimelineeventComponent[];

ngOnInit() {
  }
  ngAfterContentInit() {
    this.timeCollection = this.queryTimeLine.toArray();
 }
}
