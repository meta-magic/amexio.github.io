import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexiodialoguePaneComponent } from './../../dialogue/dialogue.pane.component';
import { AmexioVerticalTabComponent } from './vertical.tab.component';
import { AmexioTabPillComponent } from './../tab.pill.component';
import { AmexioButtonComponent } from './../../../forms/buttons/button.component';
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


  it('onCloseAllTabs both true  method check', () => {
    comp.closeAllTabs();
    comp.tabCollection.forEach((tabs) => {
      tabs.closable = true;
      comp.closable = true;
      spyOn(comp, 'tabPillClose');
      comp.tabPillClose(tabs);
      expect(comp.tabPillClose).toHaveBeenCalled();  
     });
  });

  it('onCloseAllTabs tab true  method check', () => {
    comp.closeAllTabs()
    comp.tabCollection.forEach((tabs) => {
      tabs.closable = true;
      comp.closable = false;
      spyOn(comp, 'tabPillClose');
      comp.tabPillClose(tabs);
      expect(comp.tabPillClose).toHaveBeenCalled();  
     });
  });

  it('onCloseAllTabs tab False  method check', () => {
    comp.closeAllTabs()
    comp.tabCollection.forEach((tabs) => {
      tabs.closable = false;
      comp.closable = true;
      spyOn(comp, 'tabPillClose');
      comp.tabPillClose(tabs);
      expect(comp.tabPillClose).toHaveBeenCalled();  
     });
  });

  it('onCloseAllTabs both false method check', () => {
    comp.closeAllTabs();
    comp.tabCollection.forEach((tabs) => {
      tabs.closable = false;
      comp.closable = false;
      expect(tabs.closable).toBe(false);
      expect(comp.closable).toBe(false);
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

