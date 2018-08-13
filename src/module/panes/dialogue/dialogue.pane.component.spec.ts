import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './dialogue.pane.component';
import { AmexioIconPaneComponent} from '../icon/icon.component';
import { AmexioFormIconComponent} from '../../forms/icon/icon.component';

import { AmexioButtonComponent} from '../../forms/buttons/button.component';

import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

describe('amexio-steps', () => {
    let comp: AmexiodialoguePaneComponent;
    let fixture: ComponentFixture<AmexiodialoguePaneComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexiodialoguePaneComponent,AmexioIconPaneComponent,AmexioFormIconComponent,AmexioButtonComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexiodialoguePaneComponent);
        comp = fixture.componentInstance;
    });

    it('check onPrevious method ', () => {
        let v: any;
        comp.getStatus(v);
        comp.actionStatus.subscribe((g: any) => {
          expect(v).toEqual(g);
        });
      });

      it('check getStyle method ', () => {
        comp.materialDesign = true;
        comp.getStyle();
          expect(comp.materialDesign).toEqual(true);
          comp.materialDesign = false;
          comp.getStyle();
          expect(comp.materialDesign).toEqual(false);
      });

      it('onCloseClick method check', () => {
        comp.closable = true;
        comp.onCloseClick();
         expect(comp.closable).toEqual(true);
        // expect(comp.showChange).toEqual(false);
        // expect(comp.show).toEqual(false);
        comp.showChange.subscribe((g: any) => {
            expect(false).toEqual(g);
        });
        comp.close.subscribe((g: any) => {
            expect(false).toEqual(g);
        });
      });


      it('getDefaultStyle method check ',() => {

        comp.getDefaultStyle();
        comp.materialDesign = true;
        expect(comp.materialDesign).toEqual(true);
        comp.materialDesign = false;
        comp.getDefaultStyle();
        expect(comp.materialDesign).toEqual(false);
        
      })

});
    
