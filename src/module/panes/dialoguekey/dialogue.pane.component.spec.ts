import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexiodialogueKeyPaneComponent } from './dialogue.pane.component';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioFooterComponent } from '../action/pane.action.footer';
import {CommonIconComponent} from '../../base/components/common.icon.component';
import {AmexioButtonComponent} from '../../forms/buttons/button.component'
describe('AmexiodialoguePaneComponent', () => {
  let comp1: AmexiodialogueKeyPaneComponent;
  let fixture1: ComponentFixture<AmexiodialogueKeyPaneComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexiodialogueKeyPaneComponent,CommonIconComponent,AmexioButtonComponent],
      providers: [    ],

    });
    fixture1 = TestBed.createComponent(AmexiodialogueKeyPaneComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});

