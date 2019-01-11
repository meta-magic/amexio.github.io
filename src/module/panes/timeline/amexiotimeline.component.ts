/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { AmexiotimelineeventComponent } from './amexiotimelineevent.component';
import { AmexioTimeLineModel } from './amexiotimelinevent.model';

@Component({
  selector: 'amexio-timeline',
  templateUrl: './amexiotimeline.component.html',
})
export class AmexiotimelineComponent implements OnInit, AfterContentInit {

  @ContentChildren(AmexiotimelineeventComponent) querylist: QueryList<AmexiotimelineeventComponent>;

  @Input('content-alignment') contentalignment: string;

  alignment= 'center';

  timelineevents: AmexiotimelineeventComponent[];

  timelineModel: AmexioTimeLineModel;

  constructor(public matchMediaService: DeviceQueryService) {
    const that = this;

    this.matchMediaService.OnPhone((mediaQueryList: MediaQueryList) => {
      that.mobileOrTabletMode();
    });

    this.matchMediaService.OnTablet((mediaQueryList: MediaQueryList) => {
      that.mobileOrTabletMode();
    });

    this.matchMediaService.OnDesktop((mediaQueryList: MediaQueryList) => {
      that.desktopMode();
    });
  }
  ngOnInit() {

  }

  ngAfterContentInit() {
    this.timelineevents = this.querylist.toArray();
    this.initContentAlignment();
  }

  private initContentAlignment() {
    if (this.contentalignment) {
      this.alignment = this.contentalignment;
    }
    let hasContentAlignment = true;
    this.timelineevents.forEach((timeline: AmexiotimelineeventComponent) => {
      if (timeline.contentalignment) {
        hasContentAlignment = false;
      }
    });

    if (hasContentAlignment) {
      this.timelineevents.forEach((timeline: AmexiotimelineeventComponent, index) => {
        if (this.contentalignment) {
          timeline.contentalignment = this.contentalignment;
        } else {
          timeline.contentalignment = ((index % 2) === 0) ? 'right' : 'left';
        }
        timeline.alignment = this.alignment;
      });
    }

    this.timelineModel = new AmexioTimeLineModel(JSON.parse(JSON.stringify(this.timelineevents)), this.contentalignment, this.alignment);

  }

  private mobileOrTabletMode() {
    this.alignment = 'right';
    this.timelineevents.forEach((timeline: AmexiotimelineeventComponent, index) => {
      timeline.contentalignment = 'right';
      timeline.alignment = this.alignment;
    });
  }

  private desktopMode() {

    this.alignment = this.timelineModel.alignment;
    this.contentalignment = this.timelineModel.contentalignment;
    const hasContentAlignment = true;
    this.timelineevents.forEach((timeline: AmexiotimelineeventComponent, index) => {
      const originalTimelineEvent1: AmexiotimelineeventComponent = this.timelineModel.timelineevents[index];
      timeline.contentalignment = originalTimelineEvent1.contentalignment;
      timeline.alignment = originalTimelineEvent1.alignment;
    });
  }
}
