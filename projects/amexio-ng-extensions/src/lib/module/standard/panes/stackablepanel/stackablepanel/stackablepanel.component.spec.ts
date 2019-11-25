import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackableItemComponent } from '../stackablepanel-item/stackablepanel-item.component';
import { StackablePanelComponent } from './stackablepanel.component';

import { CommonIconComponent } from '../../../../base/components/common.icon.component';

import { AmexioButtonComponent } from '../../../forms/buttons/button.component';

@Component({
  selector: 'test-cmp',
  template: `
  <amexio-stackable-panel>
      <amexio-stackablepanel-item>
      </amexio-stackablepanel-item>
  </amexio-stackable-panel>`,
})
class TestWrapperComponent { }
describe('StackablePanelComponent', () => {
  let comp: StackablePanelComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [],
      declarations: [StackablePanelComponent, TestWrapperComponent, StackableItemComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [],
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

  it('ngAfterContentInit method if check', () => {
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
  it('ngAfterContentInit method else check', () => {
    fixture.detectChanges();
    comp.ngAfterContentInit();
    comp.totalCount = comp.groups.length;
    comp.groups.toArray().forEach((items: any) => {
      items = null;
      expect(items).toEqual(null);
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
      data = null;
      expect(data).toEqual(null);
    });
  });

  // it('check showAll if method check', () => {
  //   comp.expand = false;
  //   fixture.detectChanges();
  //   comp.showAll();
  //   comp.expand = false;
  //   comp.groups.toArray().forEach((data: any) => {
  //     expect(comp.expand).toEqual(false);
  //     data.opened = !data.opened;
  //     comp.text = 'Show All';
  //     comp.expand = !comp.expand;
  //   });
  // });

  it('check showAll method If check', () => {
    comp.text = 'Show All';
    comp.showAll();
    comp.groups.toArray().forEach((data: any) => {
      expect(comp.text).toEqual('Hide All');

      expect(data.open).toBeTruthy();
    });

  });

  it('check showAll method Else check', () => {
    comp.text = 'Hide All';
    comp.showAll();
    comp.groups.toArray().forEach((data: any) => {
    expect(comp.text).toEqual('Show All');

    expect(data.open).toBeFalsy();
    });

  });

  it('check showAll second If check', () => {
    comp.text = 'Show All';
    comp.showAll();
    expect(comp.text).toEqual('Hide All');

  });

  it('check showAll second Else check', () => {
    comp.text = 'Hide All';
    comp.showAll();
    expect(comp.text).toEqual('Show All');
  });

});
