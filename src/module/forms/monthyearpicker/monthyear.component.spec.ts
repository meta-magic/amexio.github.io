import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontYearPickerComponent } from './monthyear.component';

describe('MontYearPickerComponent', () => {
  let component: MontYearPickerComponent;
  let fixture: ComponentFixture<MontYearPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontYearPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
