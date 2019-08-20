import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeCycleBaseComponent } from '../base/lifecycle.base.component';
describe('lifecycle', () => {
  let comp1: LifeCycleBaseComponent;
  let fixture1: ComponentFixture<LifeCycleBaseComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeCycleBaseComponent]
    });
    fixture1 = TestBed.createComponent(LifeCycleBaseComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('setRoundEdge If round-edge()', () => {
    let type = 'round-edge';
    comp1.setRoundEdge('round-edge');
    expect(type).toEqual('round-edge')
    comp1.roundedgeclass = 'roundEdgeCommonCss';
  });

  it('setRoundEdge If classic', () => {
    let type = 'classic';
    comp1.setRoundEdge('classic');
    expect(type).toEqual('classic')
    comp1.roundedgeclass = 'classicCommonCss';
  });

});
