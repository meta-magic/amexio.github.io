import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class DeviceQueryService
{
  constructor(@Inject(PLATFORM_ID) private platformId: Object)
  {

  }

  rules =
    {
      print: "print",
      screen: "screen",
      phone: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)',
      portrait: '(orientation: portrait)',
      landscape: '(orientation: landscape)',
      retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
    };

  Check = function (mq : any)
  {
    if (isPlatformBrowser(this.platformId)) {
      if (!mq)
      {
        return;
      }

      return window.matchMedia(mq).matches;
    }
    else
      return

  };

  /**********************************************
   METHODS FOR CHECKING TYPE
   **********************************************/
  IsPhone()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.phone).matches;
    }
    else
      return null;

  };

  IsTablet = function ()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.tablet).matches;
    }
    else
      return null;

  };

  IsDesktop = function ()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.desktop).matches;
    }
    else
      return null;

  };

  IsPortrait = function ()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.portrait).matches;
    }
    else
      return null;

  };

  IsLandscape = function ()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.landscape).matches;
    }
    else
      return null;
  };

  IsRetina = function ()
  {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia(this.rules.retina).matches;
    }
    else
      return null;

  };


  /**********************************************
   EVENT LISTENERS BY TYPE
   **********************************************/
  OnPhone(callBack : any)
  {
    if (typeof callBack === 'function')
    {
      if (isPlatformBrowser(this.platformId)) {
        var mql: MediaQueryList = window.matchMedia(this.rules.phone);

        mql.addListener((mql: MediaQueryList) =>
        {
          if (mql.matches)
          {
            callBack(mql);
          }
        });
      }
    }
  };

  OnTablet(callBack : any)
  {
    if (typeof callBack === 'function')
    {
      if (isPlatformBrowser(this.platformId)) {
        var mql: MediaQueryList = window.matchMedia(this.rules.tablet);

        mql.addListener((mql: MediaQueryList) =>
        {
          if (mql.matches)
          {
            callBack(mql);
          }
        });
      }
    }
  };

  OnDesktop(callBack : any)
  {
    if (typeof callBack === 'function')
    {
      if (isPlatformBrowser(this.platformId)) {
        var mql: MediaQueryList = window.matchMedia(this.rules.desktop);

        mql.addListener((mql: MediaQueryList) =>
        {
          if (mql.matches)
          {
            callBack(mql);
          }
        });
      }
    }
  };

  OnPortrait(callBack : any)
  {
    if (typeof callBack === 'function')
    {
      if (isPlatformBrowser(this.platformId)) {
        var mql: MediaQueryList = window.matchMedia(this.rules.portrait);

        mql.addListener((mql: MediaQueryList) =>
        {
          if (mql.matches)
          {
            callBack(mql);
          }
        });
      }

    }
  };

  OnLandscape(callBack : any)
  {
    if (typeof callBack === 'function')
    {
      if (isPlatformBrowser(this.platformId)) {
        var mql: MediaQueryList = window.matchMedia(this.rules.landscape);

        mql.addListener((mql: MediaQueryList) =>
        {
          if (mql.matches)
          {
            callBack(mql);
          }
        });
      }
    }
  };
}
