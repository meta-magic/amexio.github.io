// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { IconLoaderService } from '../../../../public-api';
// import { AmexiodialoguePaneComponent } from './../dialogue/dialogue.pane.component';
// import { BaseTabComponent } from './base.tab.component';
// import { AmexioTabPillComponent } from './tab.pill.component';
// import { AmexioButtonComponent } from './../../forms/buttons/button.component';
// import { CommonIconComponent } from './../../base/components/common.icon.component';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

// @Component({
//     selector: 'test-cmp',
//     template: `
//     <amexio-tab-view>
//     <amexio-tab>
//     </amexio-tab>
//     </amexio-tab-view>
//        `,
// })
// class TestTabComponent { }
// describe('amexio-base-tab', () => {
//     let comp: BaseTabComponent;
//     let fixture: ComponentFixture<TestTabComponent>;
//     let tabNode: any;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             schemas: [NO_ERRORS_SCHEMA],
//             declarations: [
//                 AmexiodialoguePaneComponent,
//                 BaseTabComponent,
//                 TestTabComponent,
//                 AmexioTabPillComponent,
//                 AmexioButtonComponent,
//             ],
//             providers: [ComponentFactoryResolver, IconLoaderService],
//         }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AmexioTabPillComponent] } }).compileComponents();
//     });
//     beforeEach(() => {
//         // service = TestBed.get(DeviceQueryService);
//         fixture = TestBed.createComponent(TestTabComponent);
//         comp = fixture.debugElement.children[0].componentInstance;
//         event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
//         fixture.detectChanges();
//         tabNode = AmexioTabPillComponent;
//     });

//     // it('tabPillClose method if condition', () => {
//     //     comp.tabCollection.forEach((tabs: any) => {
//     //         if (tabs.closable === true || this.closable === true) {
//     //           comp.tabPillClose(tabs);
//     //           const newTab: AmexioTabPillComponent[] = [];
//     //           let index = 0;
//     //           let tabHighlightIndex = 0;
//     //           this.tabCollection.forEach((tab: any, i: number) => {
//     //               tab.active = false;
//     //            console.log("****************", tab.tabId);
//     //           });
//     //         }
//     //       });

//     // });
// });
