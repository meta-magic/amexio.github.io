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

  it('setRoundEdge If round-edge()', () => {
    let type = 'round-edge';
    component.setRoundEdge('round-edge');
    expect(type).toEqual('round-edge')
    component.roundedgeclass = 'roundEdgeCommonCss';
  });

  it('setRoundEdge If classic', () => {
    let type = 'classic';
    component.setRoundEdge('classic');
    expect(type).toEqual('classic')
    component.roundedgeclass = 'classicCommonCss';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
