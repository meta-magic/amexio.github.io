import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustinputdateComponent } from './custinputdate.component';

describe('CustinputdateComponent', () => {
  let component: CustinputdateComponent;
  let fixture: ComponentFixture<CustinputdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustinputdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustinputdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
