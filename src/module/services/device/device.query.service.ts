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

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class DeviceQueryService {
  constructor( @Inject(PLATFORM_ID) private platformId: any) {

  }

  rules = {
    print: 'print',
    screen: 'screen',
    phone: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)',
    retina: '(-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi)',
  };

  Check = function(mq: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (!mq) {
        return;
      }
      return window.matchMedia(mq).matches;
    } else {
      return;
    }
  };

  /**********************************************
   METHODS FOR CHECKING TYPE
   **********************************************/
  IsPhone() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.phone).matches;
    } else {
      return null;
    }
  }

  IsTablet = function() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.tablet).matches;
    } else {
      return null;
    }
  };

  IsDesktop = function() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.desktop).matches;
    } else {
      return null;
    }
  };

  IsPortrait = function() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.portrait).matches;
    } else {
      return null;
    }
  };

  IsLandscape = function() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.landscape).matches;
    } else {
      return null;
    }
  };

  IsRetina = function() {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.retina).matches;
    } else {
      return null;
    }
  };

  browserWindow = () => {
    return window;
  }

  /**********************************************
   EVENT LISTENERS BY TYPE
   **********************************************/
  OnPhone(callBack: any) {
    if (typeof callBack === 'function' && isPlatformBrowser(this.platformId)) {
        const mql: MediaQueryList = window.matchMedia(this.rules.phone);
        this.mqlMethod(callBack, mql);
    }
  }

  OnTablet(callBack: any) {
    if (typeof callBack === 'function' && isPlatformBrowser(this.platformId)) {
        const mql: MediaQueryList = window.matchMedia(this.rules.tablet);
        this.mqlMethod(callBack, mql);
    }
  }

  OnDesktop(callBack: any) {
    if (typeof callBack === 'function' && isPlatformBrowser(this.platformId)) {
        const mql: MediaQueryList = window.matchMedia(this.rules.desktop);
        this.mqlMethod(callBack, mql);
    }
  }

  OnPortrait(callBack: any) {
    if (typeof callBack === 'function' && isPlatformBrowser(this.platformId)) {
        const mql: MediaQueryList = window.matchMedia(this.rules.portrait);
        this.mqlMethod(callBack, mql);
    }
  }

  OnLandscape(callBack: any) {
    if (typeof callBack === 'function' && isPlatformBrowser(this.platformId)) {
        const mql: MediaQueryList = window.matchMedia(this.rules.landscape);
        this.mqlMethod(callBack, mql);
    }
  }

  mqlMethod(callBack: any, mql: any) {
    mql.addListener((mql1: MediaQueryList) => {
      if (mql1.matches) {
        callBack(mql);
      }
    });
  }
}
