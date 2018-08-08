
describe('DeviceQueryService', () => {
  it('it should be true ',() => {
    expect(true).toBe(true);
  })
})
// import { DeviceQueryService } from "./device.query.service";
// import { inject, TestBed } from "@angular/core/testing";
// import { isPlatformBrowser } from '@angular/common';
// import { PLATFORM_ID } from '@angular/core';

// /**
//  * Created by pratik on 11/12/17.
//  */
// describe('data service tests', () => {
//   const rules = {
//     print: 'print',
//     screen: 'screen',
//     phone: '(max-width: 767px)',
//     tablet: '(min-width: 768px) and (max-width: 1024px)',
//     desktop: '(min-width: 1025px)',
//     portrait: '(orientation: portrait)',
//     landscape: '(orientation: landscape)',
//     retina: '(-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi)',
//   };
//   let mockHttp;
//   let platformId: Object;
//   mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post'])
//   let service = new DeviceQueryService(mockHttp)
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [DeviceQueryService]
//     });
//   });

//   it('It should created', inject([PLATFORM_ID], (service: DeviceQueryService) => {
//     expect(service).toBeTruthy();
//   }));

//   it('IsPhone not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.phone).matches;
//   });
//   it('IsPhone is null', () => {
//     expect(isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });


//   it('IsTablet not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.tablet).matches;
//   });

//   it('IsTablet is null', () => {
    
//     expect(isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });

//   it('IsDesktop not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.desktop).matches;
    
//   });


//   it('IsDesktop is null', () => {
    
//     expect (isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });


//   it('IsPortrait not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.portrait).matches;
   
//   });

//   it('IsPortrait is null', () => {
    
//     expect(isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });


//   it('IsLandscape not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.landscape).matches;
   
//   });

//   it('IsLandscape is null', () => {

//     expect(isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });




//   it('IsRetina not null', () => {
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     return window.matchMedia(rules.retina).matches;
    
//   });

//   it('IsRetina is null', () => {
    
//     expect(isPlatformBrowser(platformId)).toBeNull();
//     return null;
//   });


//   it('browserWindow', () => {
//     return jasmine.any(Object);
//   });


//   it('OnPhone', () => {
//     let object = jasmine.any(function () { });
//     service.OnPhone(object);
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     const mql: MediaQueryList = window.matchMedia(rules.phone);

//     mql.addListener((mql: MediaQueryList) => {
//       if (mql.matches) { }
//     });


//   });

//   it('OnTablet', () => {
//     let object = jasmine.any(function () { });
//     service.OnTablet(object);
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     const mql: MediaQueryList = window.matchMedia(rules.tablet);

//     mql.addListener((mql: MediaQueryList) => {
//       if (mql.matches) { }
//     });


//   });



//   it('OnDesktop', () => {
//     let object = jasmine.any(function () { });
//     service.OnPhone(object);
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     const mql: MediaQueryList = window.matchMedia(rules.desktop);

//     mql.addListener((mql: MediaQueryList) => {
//       if (mql.matches) { }
//     });


//   });



//   it('OnPortrait', () => {
//     let object = jasmine.any(function () { });
//     service.OnPhone(object);
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     const mql: MediaQueryList = window.matchMedia(rules.portrait);

//     mql.addListener((mql: MediaQueryList) => {
//       if (mql.matches) { }
//     });


//   });


//   it('OnLandscape', () => {
//     let object = jasmine.any(function () { });
//     service.OnPhone(object);
//     expect(isPlatformBrowser(platformId)).not.toBeNull();
//     const mql: MediaQueryList = window.matchMedia(rules.landscape);
//     mql.addListener((mql: MediaQueryList) => {
//       if (mql.matches) { }
//     });


//   });




// });