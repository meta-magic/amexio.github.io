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

  it('setRoundEdge()', () => {
    comp1.setRoundEdge();
    comp1.roundedgeclass = 'roundEdgeCommonCss';
  });

});
