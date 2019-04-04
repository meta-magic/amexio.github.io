import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkmoodComponent } from './darkmood.component';

describe('DarkmoodComponent', () => {
  let component: DarkmoodComponent;
  let fixture: ComponentFixture<DarkmoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkmoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkmoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
