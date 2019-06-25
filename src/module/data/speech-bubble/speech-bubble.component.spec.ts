import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
// import { StepWizardComponent } from './stepwizard.component';
import { AmexioCardCEComponent } from '../../creative/card/amexio.cards.component';
import { AmexioCardCEHeaderComponent } from '../../creative/common/amexio.header.component';
import { AmexioImageComponent } from '../../media/image/image.component';
import { AmexioCardCEBodyComponent } from '../../creative/common/amexio.body.component';
import { AmexioCardCEActionComponent} from '../../creative/common/amexio.action.component';
import { AmexioFormActionCEComponent } from '../../creative/form/form.action.component'
import { AmexioFormCEComponent } from '../../creative/form/amexio.form.component';
import { AmexiodialoguePaneComponent } from '../../panes/dialogue/dialogue.pane.component';
import { AmexioLabelComponent} from '../../forms/label/label.component';
import {AmexioCardComponent} from '../../layout/card/card.component';
import { AmexioHeaderComponent} from '../../panes/header/pane.action.header';
import { AmexioBodyComponent} from '../../panes/body/pane.action.body';
import { AmexioFooterComponent} from '../../panes/action/pane.action.footer';
import { AmexioButtonComponent} from '../../forms/buttons/button.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';
import {DeviceQueryService} from '../../services/device/device.query.service';
import {SpeechBubbleComponent} from '../../data/speech-bubble/speech-bubble.component';
// import { CommonIconComponent} from '../../base/components/common.icon.component';
// import {  }
describe('speechbubl', () => {
   let comp1: SpeechBubbleComponent;
   let fixture1: ComponentFixture<SpeechBubbleComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioFormActionCEComponent, SpeechBubbleComponent, 
        AmexioButtonComponent, AmexioFooterComponent , AmexioHeaderComponent,  
        AmexioBodyComponent, AmexioCardComponent,AmexioLabelComponent, 
        AmexioContextMenuComponent, AmexiodialoguePaneComponent, 
        AmexioFormCEComponent, AmexioCardCEBodyComponent, 
        AmexioCardCEActionComponent, AmexioImageComponent, AmexioCardCEComponent, 
        AmexioCardCEHeaderComponent, CommonIconComponent],
      providers: [IconLoaderService, DeviceQueryService],
    });
    fixture1 = TestBed.createComponent(SpeechBubbleComponent);
    comp1 = fixture1.componentInstance;
  });
 
  it('ngOnInit()', () => {
    comp1.ngOnInit();
  // comp1.todaydate = new Date(comp1.enabletime);
  comp1.todaydate = new Date();

  });

  it('onarrowClick()', () => {
    let event;
    comp1.onarrowClick(event);
    comp1.arrowpress = true;
    expect(comp1.arrowpress).toBe(true);
       comp1.arrowpress = false;
     comp1.arrowpress = !comp1.arrowpress;
    comp1.dropdownstyle = { visibility: 'visible' };
    comp1.onBaseFocusEvent({});  });

  
    it('onBubbleNodeClick()', () => {
      let item;
      comp1.onBubbleNodeClick(item);
      comp1.onClick.emit(item);
      comp1.dropdownstyle = { visibility: 'hidden' };
     });  
 
});
