import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioParagraphComponent } from './amexio-paragraph.component';

describe('AmexioParagraphComponent', () => {
  let component: AmexioParagraphComponent;
  let fixture: ComponentFixture<AmexioParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmexioParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmexioParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
