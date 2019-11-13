import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexiodialoguePaneComponent } from './../../dialogue/dialogue.pane.component';
import { AmexioVerticalTabComponent } from './vertical.tab.component';
import { AmexioTabPillComponent } from './../tab.pill.component';
import { AmexioButtonComponent } from '../../../standard/forms/buttons/button.component';
import { CommonIconComponent } from './../../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'test-cmp',
  template: `
    <amexio-vertical-tab-view>
    <amexio-tab [enable-confirm-box]="true">
    </amexio-tab>
    </amexio-vertical-tab-view>
       `,
})
class TestTabComponent { }
describe('amexio-vertical-tab', () => {
  let comp: AmexioVerticalTabComponent;
  let fixture: ComponentFixture<TestTabComponent>;
  let tabNode: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AmexiodialoguePaneComponent,
        AmexioVerticalTabComponent,
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

// m1
it(' m1 onCloseAllTabs both true  method check', () => {
  comp.tabCollection.forEach((tabs) => {
    tabs.closable = true;
    comp.closable = true;
   });
   comp.closeAllTabs();
   comp.tabCollection.forEach((tabs) => {
    expect(tabs.closable).toEqual(true);
    expect(comp.closable).toEqual(true);
    expect(comp.tabPillClose(tabs)).toHaveBeenCalled;
   });

});

it('onCloseAllTabs tab true  method check', () => {
  comp.tabCollection.forEach((tabs) => {
    tabs.closable = true;
    comp.closable = false;
   });
   comp.closeAllTabs();
   comp.tabCollection.forEach((tabs) => {
    expect(tabs.closable).toEqual(true);
    expect(comp.closable).toEqual(false);
    expect(comp.tabPillClose(tabs)).toHaveBeenCalled;  
   });
   
});

it('onCloseAllTabs tab False  method check', () => {
  comp.tabCollection.forEach((tabs) => {
    tabs.closable = false;
    comp.closable = true;
   });
  comp.closeAllTabs()
  comp.tabCollection.forEach((tabs) => {
    expect(tabs.closable).toEqual(false);
    expect(comp.closable).toEqual(true);
    expect(comp.tabPillClose(tabs)).toHaveBeenCalled;  
   });
  
});

it('onCloseAllTabs both false method check', () => {
  comp.tabCollection.forEach((tabs) => {
    tabs.closable = false;
    comp.closable = false;
   });
  comp.closeAllTabs();
  comp.tabCollection.forEach((tabs) => {
    expect(tabs.closable).toEqual(false);
    expect(comp.closable).toEqual(false);
    expect(comp.tabPillClose(tabs)).not.toHaveBeenCalled;  
   });
});


  it('ngAfterContentInit If method', () => {
    const testarray: any[] = [];
    comp.tabCollection.forEach((element: any) => {
      element.icon = 'fa-fa save'
        testarray.push(element.icon); 
    });
  })

})

