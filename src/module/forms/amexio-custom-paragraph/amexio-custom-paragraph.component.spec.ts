import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioCustomParagraphComponent } from './amexio-custom-paragraph.component';

describe('AmexioCustomParagraphComponent', () => {
  let component: AmexioCustomParagraphComponent;
  let fixture: ComponentFixture<AmexioCustomParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmexioCustomParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmexioCustomParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
