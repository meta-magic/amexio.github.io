import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StackableItemComponent } from '../StackablePanel-Item/stackablePanel-item.component';
import { StackablePanelComponent } from './stackablePanel.component';

import { CommonIconComponent } from '../../../base/components/common.icon.component';

import {AmexioButtonComponent} from '../../../forms/buttons/button.component';
describe('StackablePanelComponent', () => {
  let comp: StackablePanelComponent;
  let fixture: ComponentFixture<StackablePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StackablePanelComponent , StackableItemComponent, AmexioButtonComponent, CommonIconComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackablePanelComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('check openGroup method if check', () => {
    const item = {
      opened: true,
      title: 'Second stackable-panel-item',
    };
    comp.openGroup(item);
    const groupsData = [];
    groupsData.push( comp.groups);
    groupsData.forEach((data: any) => {
      expect(data).not.toBeNull();
      item.opened = !item.opened;
    });
  });
  it('check openGroup method else check', () => {
    const item = {
      opened: true,
      title: 'Second stackable-panel-item',
    };
    comp.openGroup(item);
    comp.groups.toArray().forEach((data: any) => {
      expect(data).toBeNull();
    });
  });
});
