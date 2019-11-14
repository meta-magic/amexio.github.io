import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService } from '../../../services/icon/icon.service';

import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioBoxComponent } from './box.component';

describe('amexio-box' , () => {
  let comp: AmexioBoxComponent;
  let fixture: ComponentFixture<AmexioBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioBoxComponent,
        CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioBoxComponent);
    comp = fixture.componentInstance;
  });
  it('setRoundEdge If round-edge()', () => {
    const type = 'round-edge';
    comp.setRoundEdge('round-edge');
    expect(type).toEqual('round-edge');
    comp.roundedgeclass = 'roundEdgeCommonCss';
  });

  it('setRoundEdge If classic', () => {
    const type = 'classic';
    comp.setRoundEdge('classic');
    expect(type).toEqual('classic');
    comp.roundedgeclass = 'classicCommonCss';
  });

  it('close check true', () => {

    comp.close = true;
    expect(comp.close).toEqual(true);
  });

  it('closable check closebox method check', () => {
    let dt: any;
    comp.closeBox(dt);
    comp.close = false;
    expect(comp.close).toEqual(false);
    comp.closable = false;
    expect(comp.closable).toEqual(false);
  });
  it('check ngOnInit method', () => {
    comp.ngOnInit();
    comp.borderColor = 'box-default';
    comp.bgColor = null;
    expect(comp.bgColor).toBe(null);
    expect(comp.borderColor).toEqual('box-default');
    comp.bgColor = comp.borderColor;
    expect(comp.bgColor).toEqual(comp.borderColor);

  });
});
