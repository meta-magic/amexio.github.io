// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LifeCycleBaseComponent } from '../base/lifecycle.base.component';
// import { DOCUMENT } from '@angular/common';

// describe('lifecycle', () => {
//   let comp1: LifeCycleBaseComponent;
//   let fixture1: ComponentFixture<LifeCycleBaseComponent>;

//   beforeEach(() => {

//     TestBed.configureTestingModule({
//       declarations: [LifeCycleBaseComponent]
//     });
//     fixture1 = TestBed.createComponent(LifeCycleBaseComponent);
//     comp1 = fixture1.componentInstance;

//   });

//   it('setRoundEdge If round-edge()', () => {
//     let type = 'round-edge';
//     comp1.setRoundEdge('round-edge');
//     expect(type).toEqual('round-edge')
//     comp1.roundedgeclass = 'roundEdgeCommonCss';
//   });

//   it('setRoundEdge If classic', () => {
//     let type = 'classic';
//     comp1.setRoundEdge('classic');
//     expect(type).toEqual('classic')
//     comp1.roundedgeclass = 'classicCommonCss';
//   });
//   it('setFullScreen if call', () => {
//     let type = 'browser';
//     comp1.setFullScreen(type);
//     expect(type).toEqual('browser')
//     comp1.yesFullScreen = true;
//   });

//   it('setFullScreen else call', () => {
//     let type = 'classic';
//     comp1.setFullScreen(type);
//     expect(type).not.toEqual('browser');
//   });

//   it('setFullScreen elseIf call', () => {
//     let type = 'desktop';
//     comp1.setFullScreen(type);
//     expect(type).toEqual('desktop');
//     comp1.desktopFlag = true;
//   });

//   it('setFullScreen elseIf call', () => {
//     let type = 'classic';
//     comp1.setFullScreen(type);
//     expect(type).not.toEqual('desktop');
//   });

//   it('minScreenChange call', () => {
//     comp1.minScreenChange(event);
//     event.stopPropagation();
//     comp1.fullscreenMax = !comp1.fullscreenMax;
//     if (comp1.document.exitFullscreen && comp1.desktopFlag) {
//       comp1.document.exitFullscreen();
//     } else if (comp1.document.mozCancelFullScreen && comp1.desktopFlag) {
//       /* Firefox */
//       comp1.document.mozCancelFullScreen();
//     } else if (comp1.document.webkitExitFullscreen && comp1.desktopFlag) {
//       /* Chrome, Safari and Opera */
//       comp1.document.webkitExitFullscreen();
//     } else if (comp1.document.msExitFullscreen && comp1.desktopFlag) {
//       /* IE/Edge */
//       comp1.document.msExitFullscreen();
//     }
//     return comp1.fullscreenMax;
//   });




//   // it('maxScreenChange Call', () => {
//   //   comp1.maxScreenChange(event)
//   //   // comp1.elem = document.documentElement;
//   //   event.stopPropagation();
//   //   comp1.fullscreenMax = !comp1.fullscreenMax;
//   //   if (comp1.elem.requestFullscreen && comp1.desktopFlag) {
//   //     comp1.document.documentElement.requestFullscreen();
//   //   } else if (comp1.elem.mozRequestFullScreen && comp1.desktopFlag) {
//   //     /* Firefox */
//   //     comp1.document.documentElement.mozRequestFullScreen();
//   //   } else if (comp1.elem.webkitRequestFullscreen && comp1.desktopFlag) {
//   //     /* Chrome, Safari and Opera */
//   //     comp1.document.documentElement.webkitRequestFullscreen();
//   //   } else if (comp1.elem.msRequestFullscreen && comp1.desktopFlag) {
//   //     /* IE/Edge */
//   //     comp1.document.documentElement.msRequestFullscreen();
//   //   }
//   //   return comp1.fullscreenMax;
//   // })



//   it('minScreenChange call msExitFullscreen true other false', () => {
//     comp1.minScreenChange(event);
//     event.stopPropagation();
//     comp1.desktopFlag = true;
//     comp1.fullscreenMax = !comp1.fullscreenMax;
//     comp1.document.exitFullscreen = false;
//     comp1.document.mozCancelFullScreen = false;
//     comp1.document.webkitExitFullscreen = false;
//     comp1.document.msExitFullscreen = true;

//     expect(comp1.desktopFlag).toEqual(true);
//     expect(comp1.document.exitFullscreen).toEqual(false);
//     expect(comp1.document.mozCancelFullScreen).toEqual(false);
//     expect(comp1.document.webkitExitFullscreen).toEqual(false);

//     expect(comp1.document.msExitFullscreen).toEqual(true);
//     // expect(comp1.document.msExitFullscreen()).toHaveBeenCalled;
//   });

//   it('minScreenChange call webkitExitFullscreen true other false', () => {
//     comp1.minScreenChange(event);
//     event.stopPropagation();
//     comp1.desktopFlag = true;
//     comp1.fullscreenMax = !comp1.fullscreenMax;
//     comp1.document.exitFullscreen = false;
//     comp1.document.mozCancelFullScreen = false;
//     comp1.document.webkitExitFullscreen = true;
//     comp1.document.msExitFullscreen = false;

//     expect(comp1.desktopFlag).toEqual(true);
//     expect(comp1.document.exitFullscreen).toEqual(false);
//     expect(comp1.document.mozCancelFullScreen).toEqual(false);
//     expect(comp1.document.webkitExitFullscreen).toEqual(true);

//     expect(comp1.document.msExitFullscreen).toEqual(false);
//     // expect(comp1.document.webkitExitFullscreen()).toHaveBeenCalled;
//   });

//   it('minScreenChange call mozCancelFullScreen true other false', () => {
//     comp1.minScreenChange(event);
//     event.stopPropagation();
//     comp1.desktopFlag = true;
//     comp1.fullscreenMax = !comp1.fullscreenMax;
//     comp1.document.exitFullscreen = false;
//     comp1.document.mozCancelFullScreen = true;
//     comp1.document.webkitExitFullscreen = false;
//     comp1.document.msExitFullscreen = false;

//     expect(comp1.desktopFlag).toEqual(true);
//     expect(comp1.document.exitFullscreen).toEqual(false);
//     expect(comp1.document.mozCancelFullScreen).toEqual(true);
//     expect(comp1.document.webkitExitFullscreen).toEqual(false);

//     expect(comp1.document.msExitFullscreen).toEqual(false);
//     // expect(comp1.document.mozCancelFullScreen()).toHaveBeenCalled;
//   });
//   it('minScreenChange call mozCancelFullScreen true other false', () => {

//     comp1.minScreenChange(event);
//     event.stopPropagation();
//     comp1.desktopFlag = true;
//     comp1.fullscreenMax = !comp1.fullscreenMax;
//     comp1.document.exitFullscreen = true;
//     comp1.document.mozCancelFullScreen = false;
//     comp1.document.webkitExitFullscreen = false;
//     comp1.document.msExitFullscreen = false;

//     expect(comp1.desktopFlag).toEqual(true);
//     expect(comp1.document.exitFullscreen).toEqual(true);
//     expect(comp1.document.mozCancelFullScreen).toEqual(false);
//     expect(comp1.document.webkitExitFullscreen).toEqual(false);

//     expect(comp1.document.msExitFullscreen).toEqual(false);
//     // comp1.document.msExitFullscreen();
//   });



//   it('exitHandler Call if for amexio-card-ce ', () => {
//     comp1.exitHandler();
//     comp1.fullscreenMax = false;
//     expect(comp1.document.webkitIsFullScreen).toEqual(false);
//     comp1.fullscreenMax = false;
//     fixture1.detectChanges();
//     comp1.instance = {
//       amexioComponentId: "amexio-card-ce",
//       footeralign: "right",
//       headerinst: {
//         dirty: false,
//         first: undefined,
//         last: undefined,
//         length: 0,
//         fullscreenMaxCard: false,
//       },
//       fullscreenMax: false
//     }

//     expect(comp1.instance).toBeDefined();
//     expect(comp1.instance.amexioComponentId).toEqual('amexio-card-ce');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-window');
//     comp1.instance.maximizeflagchanged = false;
//     expect(comp1.instance.headerinst).toBeDefined();
//     comp1.instance.headerinst.fullscreenMaxCard = true
//   }); 
//   it('exitHandler Call if for amexio-card ', () => {
//     comp1.exitHandler();
//     comp1.fullscreenMax = false;
//     expect(comp1.document.webkitIsFullScreen).toEqual(false);
//     comp1.fullscreenMax = false;
//     comp1.instance = {
//       amexioComponentId: "amexio-card",
//       footeralign: "right",
//       headerinst: {
//         dirty: false,
//         first: undefined,
//         last: undefined,
//         length: 0,
//         fullscreenMaxCard: false,
//       },
//       fullscreenMax: false
//     }

//     expect(comp1.instance).toBeDefined();
//     expect(comp1.instance.amexioComponentId).toEqual('amexio-card');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card-ce');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-window');
   
//     comp1.instance.maximizeflagchanged = false;
//     expect(comp1.instance.headerinst).toBeDefined();
//     comp1.instance.headerinst.fullscreenMaxCard = true;
//   });


//   it('exitHandler Call if for amexio-window', () => {
//     comp1.exitHandler();
//     comp1.fullscreenMax = false;
//     expect(comp1.document.webkitIsFullScreen).toEqual(false);
//     comp1.fullscreenMax = false;
//     comp1.instance = {
//       amexioComponentId: "amexio-window",
//       footeralign: "right",
//       headerinst: {
//         dirty: false,
//         first: undefined,
//         last: undefined,
//         fullscreenMaxCard: false,
//         length: 0
//       },
//       fullscreenMax: false
//     }

//     expect(comp1.instance).toBeDefined();
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card-ce');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card');
//     expect(comp1.instance.amexioComponentId).toEqual('amexio-window');
//     comp1.instance.maximizeflagchanged = false;
//     expect(comp1.instance.headerinst).toBeDefined();
//     comp1.instance.headerinst.fullscreenMaxCard = true
//   });

//   it('exitHandler Call else  ', () => {
//     comp1.exitHandler();
//     comp1.fullscreenMax = false;
//     expect(comp1.document.webkitIsFullScreen).toEqual(false);
//     comp1.fullscreenMax = false;
//     comp1.instance = {
//       amexioComponentId: "amexio",
//       footeralign: "right",
//       fullscreenMax: false
//     }
//     expect(comp1.instance).toBeDefined();
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card-ce');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-card');
//     expect(comp1.instance.amexioComponentId).not.toEqual('amexio-window');
//     expect(comp1.instance.headerinst).toBeUndefined();
   
//   });

// });


