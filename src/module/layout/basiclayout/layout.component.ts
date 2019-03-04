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

import { Component, HostBinding, Input,  OnInit } from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';
import { LayoutConstant } from './layout.constant';
@Component({
    selector: 'amexio-layout-columns',
    templateUrl: './layout.component.html',
    styles: [`
    :host {
        display: flex;
    }
  `],
})
export class AmexioLayoutComponent implements OnInit {

    private _orientation: string;
    private _alignment: string;
    private _padding: number;

    @Input('orientation') orientation = 'horizontal';

    @Input('responsive-mode') responsiveMode = false;

    @Input('alignment') alignment: string;

    @Input('border') border = true;

    @Input('fit') fit = true;

    @HostBinding('style.flex-direction') public orientationDirection: string;

    @HostBinding('style.justify-content') public justifyContent: string;

    @HostBinding('style.border') public borderstyle: string;

    @HostBinding('style.box-shadow') public borderboxstyle: string;

    @HostBinding('style.height') public height: string;

    constructor(private matchMediaService: DeviceQueryService) {
      const that = this;
      this.matchMediaService.OnDesktop((mediaQueryList: MediaQueryList) => {
        that.handleDeviceSettings();
      });
      this.matchMediaService.OnTablet((mediaQueryList: MediaQueryList) => {
        that.handleDeviceSettings();
      });
      this.matchMediaService.OnPhone((mediaQueryList: MediaQueryList) => {
        that.handleDeviceSettings();
      });
    }

    ngOnInit() {
        this.setLayoutDefination();
        this.handleDeviceSettings();
    }

    public setLayoutDefination() {
        this.setorientation();
        this.setAlignment();
        this.setBorder();
        this.setFit();
    }

    private setorientation() {
      this.updateOrientation(this.orientation);
    }

    // THIS FUNCTION IS USED FOR UPDATING ORIENTATION
    private updateOrientation(orientationName: string) {
      if (orientationName && orientationName.toLowerCase() === 'vertical') {
        this.orientationDirection = 'column';
      } else {
        this.orientationDirection = 'row';
      }
    }

    private setAlignment() {
        if (this.alignment && LayoutConstant[this.alignment.toLowerCase()]) {
            this.justifyContent = LayoutConstant[this.alignment.toLowerCase()];
        } else {
            this.justifyContent = 'start';
        }
    }

    private setBorder() {
        if (this.border) {
            this.borderstyle = '1px solid #ced4da';
            this.borderboxstyle = '0 2px 2px 0 rgba(0,0,0,.14)';
        }
    }

    private setFit() {
        if (this.fit) {
            this.height = '100%';
        }
    }

    // THIS FUNCTION HANDLE THE ORITENATION AS PER DEVICE
    private handleDeviceSettings() {
        if (!this.responsiveMode) {
            if (this.matchMediaService.IsPhone()) {
                this.updateOrientation('vertical');
            } else {
                this.updateOrientation(this.orientation);
            }
        }
    }
}
