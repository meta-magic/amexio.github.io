// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { IconLoaderService } from '../../../../index';
// import { AmexiodialoguePaneComponent } from './../../dialogue/dialogue.pane.component';
// import { AmexioRightVerticalTabComponent } from './right.vertical.component';
// import { AmexioTabPillComponent } from './../tab.pill.component';
// import { AmexioButtonComponent } from './../../../forms/buttons/button.component';
// import { CommonIconComponent } from './../../../base/components/common.icon.component';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
// import { detectChanges } from '@angular/core/src/render3/instructions';

// @Component({
//   selector: 'test-cmp',
//   template: `
//     <amexio-right-vertical-tab-view>
//     <amexio-tab [enable-confirm-box]="true">
//     </amexio-tab>
//     </amexio-right-vertical-tab-view>
//        `,
// })
// class TestTabComponent { }
// describe('amexio-right-vertical-tab', () => {
//   let comp: AmexioRightVerticalTabComponent;
//   let fixture: ComponentFixture<TestTabComponent>;
//   let tabNode: any;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [
//         AmexiodialoguePaneComponent,
//         AmexioRightVerticalTabComponent,
//         TestTabComponent,
//         AmexioTabPillComponent,
//         AmexioButtonComponent,
//       ],
//       providers: [ComponentFactoryResolver, IconLoaderService],
//     }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AmexioTabPillComponent] } }).compileComponents();
//   });
//   beforeEach(() => {
//     // service = TestBed.get(DeviceQueryService);
//     fixture = TestBed.createComponent(TestTabComponent);
//     comp = fixture.debugElement.children[0].componentInstance;
//     event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
//     fixture.detectChanges();
//     tabNode = AmexioTabPillComponent;
//   });

//   it(' m1 onCloseAllTabs both true  method check', () => {
//     comp.tabCollection.forEach((tabs) => {
//       tabs.closable = true;
//       comp.closable = true;
//     });
//     comp.closeAllTabs();
//     comp.tabCollection.forEach((tabs) => {
//       expect(tabs.closable).toEqual(true);
//       expect(comp.closable).toEqual(true);
//       expect(comp.tabPillClose(tabs)).toHaveBeenCalled;
//     });

//   });

//   it('onCloseAllTabs tab true  method check', () => {
//     comp.tabCollection.forEach((tabs) => {
//       tabs.closable = true;
//       comp.closable = false;
//     });
//     comp.closeAllTabs();
//     comp.tabCollection.forEach((tabs) => {
//       expect(tabs.closable).toEqual(true);
//       expect(comp.closable).toEqual(false);
//       expect(comp.tabPillClose(tabs)).toHaveBeenCalled;
//     });

//   });

//   it('onCloseAllTabs tab False  method check', () => {
//     comp.tabCollection.forEach((tabs) => {
//       tabs.closable = false;
//       comp.closable = true;
//     });
//     comp.closeAllTabs()
//     comp.tabCollection.forEach((tabs) => {
//       expect(tabs.closable).toEqual(false);
//       expect(comp.closable).toEqual(true);
//       expect(comp.tabPillClose(tabs)).toHaveBeenCalled;
//     });

//   });

//   it('onCloseAllTabs both false method check', () => {
//     comp.tabCollection.forEach((tabs) => {
//       tabs.closable = false;
//       comp.closable = false;
//     });
//     comp.closeAllTabs();
//     comp.tabCollection.forEach((tabs) => {
//       expect(tabs.closable).toEqual(false);
//       expect(comp.closable).toEqual(false);
//       expect(comp.tabPillClose(tabs)).not.toHaveBeenCalled;
//     });
//   });

//   it('OnVerticalTab Click both false If method', () => {
//     let tab = {
//       active: true,
//       closable: false,
//       disabled: false,
//       icon: "fa fa-building",
//       tabId: 30314,
//       header: false,
//       tabPillClass: "activecolortab",
//       title: "Work"
//     }

//     comp.onVerticalTabClick(tab);
//     tab.disabled = false;
//     tab.header = false;
//     for (let i of comp.tabCollection) {
//       // tab = i;
//       expect(i['active']).toBeFalsy();
//       expect(i['tabPillClass']).toEqual('');
//       expect(comp.asignTabPillClass).toHaveBeenCalled;
//       comp.onClick.emit(tab);

//     }
//   })

//   it('OnVerticalTab Click Both False method', () => {
//     let tab = {
//       active: true,
//       closable: false,
//       disabled: false,
//       icon: "fa fa-building",
//       tabId: 30314,
//       header: false,
//       tabPillClass: "activecolortab",
//       title: "Work"
//     }

//     comp.onVerticalTabClick(tab);
//     tab.disabled = true;
//     tab.header = true;
//     expect(tab.header).toBeTruthy();
//     expect(tab.disabled).toBeTruthy();
//   })

//   it('OnVerticalTab Click one False one true method', () => {
//     let tab = {
//       active: true,
//       closable: false,
//       disabled: false,
//       icon: "fa fa-building",
//       tabId: 30314,
//       header: true,
//       tabPillClass: "activecolortab",
//       title: "Work"
//     }

//     comp.onVerticalTabClick(tab);
//     tab.disabled = false;
//     tab.header = true;
//     expect(tab.header).toBeTruthy();
//     expect(tab.disabled).toBeFalsy();
//   })

//   it('OnVerticalTab Click one true one false method', () => {
//     let tab = {
//       active: true,
//       closable: false,
//       disabled: true,
//       icon: "fa fa-building",
//       tabId: 30314,
//       header: false,
//       tabPillClass: "activecolortab",
//       title: "Work"
//     }

//     comp.onVerticalTabClick(tab);
//     tab.disabled = true;
//     tab.header = false;
//     expect(tab.header).toBeFalsy();
//     expect(tab.disabled).toBeTruthy();
//   })
// })
