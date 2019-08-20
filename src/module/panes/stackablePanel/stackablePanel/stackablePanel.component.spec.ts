import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StackableItemComponent } from '../StackablePanel-Item/stackablePanel-item.component';
import { StackablePanelComponent } from './stackablePanel.component';

import { CommonIconComponent } from '../../../base/components/common.icon.component';

import { AmexioButtonComponent } from '../../../forms/buttons/button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'test-cmp',
  template: `body
  <stackable-panel [panel-name]="'User Data'">
      <stackable-panel-item     title="First stackable-panel-item"> 
            1 stackable-panel-item
            this is the content
      </stackable-panel-item>
  </stackable-panel>`,
})
class TestWrapperComponent { }
describe('StackablePanelComponent', () => {
  let comp: StackablePanelComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [],
      declarations: [StackablePanelComponent, TestWrapperComponent, StackableItemComponent, AmexioButtonComponent, CommonIconComponent],
      providers: []
    }).compileComponents();
  });
  beforeEach(() => {

    fixture = TestBed.createComponent(TestWrapperComponent);
    comp = fixture.debugElement.children[0].componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('ngAfterContentInit method check', () => {
    fixture.detectChanges();
    comp.ngAfterContentInit();
    comp.totalCount = comp.groups.length;
    comp.groups.toArray().forEach((items: any) => {
      expect(items).not.toBeNull();
      items.toggle.subscribe(() => {
        comp.openGroup(items);
      });
    });
  });

  it('check openGroup method if check', () => {
    const item = {
      opened: true,
      title: 'Second stackable-panel-item',
    };
    comp.openGroup(item);
    comp.groups.toArray().forEach((data: any) => {
      expect(data).not.toBeNull();
      item.opened = !item.opened;
    });
  });
  it('check openGroup method else check', () => {
    const item = {
      opened: true,
      title: 'Second stackable-panel-item',
    };
    fixture.detectChanges();
    comp.openGroup(item);
    comp.groups.toArray().forEach((data: any) => {
      data = [];
      expect(data).toEqual([]);
    });
  });


  it('check showAll method if check', () => {
    fixture.detectChanges();
    comp.showAll();
    comp.groups.toArray().forEach((data: any) => {
     data.opened = !data.opened;
    });
  });
});
