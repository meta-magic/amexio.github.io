import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackableItemComponent } from './stackablepanel-item.component';

describe('StackableItemComponent', () => {
  let component: StackableItemComponent;
  let fixture: ComponentFixture<StackableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StackableItemComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
