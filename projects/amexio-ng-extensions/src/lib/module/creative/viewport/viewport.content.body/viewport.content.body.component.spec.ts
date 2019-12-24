import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ViewportContentBodyComponent } from './viewport.content.body.component';

describe('Viewport Content Body Component', () => {
  let component: ViewportContentBodyComponent;
  let fixture: ComponentFixture<ViewportContentBodyComponent>;

  beforeEach(fakeAsync(() => {
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

  it('setRoundEdge(): If round-edge', () => {
    const type = 'round-edge';
    component.setRoundEdge(type);
    fixture.detectChanges();
    expect(component.roundedgeclass).toBe('roundEdgeCommonCss');
  });

  it('setRoundEdge If classic', () => {
    const type = 'classic';
    component.setRoundEdge(type);
    fixture.detectChanges();
    expect(component.roundedgeclass).toBe('classicCommonCss');
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
