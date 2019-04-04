import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkmodeComponent } from './darkmode.component';

describe('DarkmodeComponent', () => {
  let component: DarkmodeComponent;
  let fixture: ComponentFixture<DarkmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
