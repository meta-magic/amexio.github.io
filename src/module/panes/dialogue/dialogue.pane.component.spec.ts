import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CommonIconComponent} from '../../base/components/common.icon.component';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import {AmexioButtonComponent} from '../../standard/forms/buttons/button.component'
import { AmexioFooterComponent } from '../action/pane.action.footer';
import { AmexiodialoguePaneComponent } from './dialogue.pane.component';
describe('AmexiodialoguePaneComponent', () => {
  let comp1: AmexiodialoguePaneComponent;
  let fixture1: ComponentFixture<AmexiodialoguePaneComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexiodialoguePaneComponent, CommonIconComponent, AmexioButtonComponent],
      providers: [    ],

    });
    fixture1 = TestBed.createComponent(AmexiodialoguePaneComponent);
    comp1 = fixture1.componentInstance;
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});

