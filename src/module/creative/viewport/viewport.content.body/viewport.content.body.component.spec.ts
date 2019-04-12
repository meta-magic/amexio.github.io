import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewportContentBodyComponent } from './viewport.content.body.component';

describe('ViewportContentBodyComponent', () => {
  let component: ViewportContentBodyComponent;
  let fixture: ComponentFixture<ViewportContentBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewportContentBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewportContentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
