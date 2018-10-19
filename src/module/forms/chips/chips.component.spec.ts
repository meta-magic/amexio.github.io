import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioChipsComponent } from './chips.component';

describe('ChipsComponent', () => {
  let component: AmexioChipsComponent;
  let fixture: ComponentFixture<AmexioChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmexioChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmexioChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
