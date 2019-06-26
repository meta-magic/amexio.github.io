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
import { AmexioCardCEActionComponent } from '../../creative/common/amexio.action.component';
import { AmexioFormActionCEComponent } from '../../creative/form/form.action.component'
import { AmexioFormCEComponent } from '../../creative/form/amexio.form.component';
import { AmexiodialoguePaneComponent } from '../../panes/dialogue/dialogue.pane.component';
import { AmexioLabelComponent } from '../../forms/label/label.component';
import { AmexioCardComponent } from '../../layout/card/card.component';
import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
import { AmexioBodyComponent } from '../../panes/body/pane.action.body';
import { AmexioFooterComponent } from '../../panes/action/pane.action.footer';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { SpeechBubbleComponent } from '../../data/speech-bubble/speech-bubble.component';
import { AmexioNavMobileMenuComponent } from '../../navigation/navbar/navmobilemenu';
// import { CommonIconComponent} from '../../base/components/common.icon.component';
// import {  }
describe('navmobilemenu', () => {
    let comp1: AmexioNavMobileMenuComponent;
    let fixture1: ComponentFixture<AmexioNavMobileMenuComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNavMobileMenuComponent, AmexioFormActionCEComponent, SpeechBubbleComponent,
                AmexioButtonComponent, AmexioFooterComponent, AmexioHeaderComponent,
                AmexioBodyComponent, AmexioCardComponent, AmexioLabelComponent,
                AmexioContextMenuComponent, AmexiodialoguePaneComponent,
                AmexioFormCEComponent, AmexioCardCEBodyComponent,
                AmexioCardCEActionComponent, AmexioImageComponent, AmexioCardCEComponent,
                AmexioCardCEHeaderComponent, CommonIconComponent],
            providers: [IconLoaderService, DeviceQueryService],
        });
        fixture1 = TestBed.createComponent(AmexioNavMobileMenuComponent);
        comp1 = fixture1.componentInstance;
    });
    it('toggleMenu method', () => {
        let event: any;
        let showInnerMenus: '';
        let node=[{showInnerMenus:true}];
        comp1.toggleMenu(event, node);
        node[0]['showInnerMenus'] = !node[0]['showInnerMenus'];
    });
});
