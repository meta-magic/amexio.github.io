import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexiodialoguePaneComponent } from './../../dialogue/dialogue.pane.component';
import { AmexioRightVerticalTabComponent } from './right.vertical.component';
import { AmexioTabPillComponent } from './../tab.pill.component';
import { AmexioButtonComponent } from './../../../forms/buttons/button.component';
import { CommonIconComponent } from './../../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'test-cmp',
  template: `
    <amexio-right-vertical-tab-view>
    <amexio-tab [enable-confirm-box]="true">
    </amexio-tab>
    </amexio-right-vertical-tab-view>
       `,
})
class TestTabComponent { }
describe('amexio-tab', () => {
  let comp: AmexioRightVerticalTabComponent;
  let fixture: ComponentFixture<TestTabComponent>;
  let tabNode: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AmexiodialoguePaneComponent,
        AmexioRightVerticalTabComponent,
        TestTabComponent,
        AmexioTabPillComponent,
        AmexioButtonComponent,
      ],
      providers: [ComponentFactoryResolver, IconLoaderService],
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AmexioTabPillComponent] } }).compileComponents();
  });
  beforeEach(() => {
    // service = TestBed.get(DeviceQueryService);
    fixture = TestBed.createComponent(TestTabComponent);
    comp = fixture.debugElement.children[0].componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    fixture.detectChanges();
    tabNode = AmexioTabPillComponent;
  });


  it('onCloseClick  method check', () => {
    comp.tabCollection.forEach((tabs) => {
      tabs.closable = true;
      comp.closable = true;
      comp.tabPillClose(tabs);
    });


  });

