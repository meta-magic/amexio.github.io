import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewport.Content.BodyComponent } from './viewport.content.body.component';

describe('Viewport.Content.BodyComponent', () => {
  let component: Viewport.Content.BodyComponent;
  let fixture: ComponentFixture<Viewport.Content.BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viewport.Content.BodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewport.Content.BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
