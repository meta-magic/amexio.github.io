import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './dialogue.pane.component';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-steps', () => {
    let comp: AmexiodialoguePaneComponent;
    let fixture: ComponentFixture<AmexiodialoguePaneComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexiodialoguePaneComponent, AmexioButtonComponent, CommonIconComponent],
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


    it('getDefaultStyle method check ', () => {
        comp.getDefaultStyle();
        comp.materialDesign = true;
        expect(comp.materialDesign).toEqual(true);
        comp.materialDesign = false;
        comp.getDefaultStyle();
        expect(comp.materialDesign).toEqual(false);

    });

    it('ngOnInit method check ', () => {
        comp.ngOnInit();
        comp.showdialogue = true;
        expect(comp.showdialogue).toEqual(true);
        comp.footeralign = null;
        comp.ngOnInit();
        expect(comp.footeralign).toEqual('right');
        comp.contentalign = null;
        comp.contentalign = '';
        comp.ngOnInit();
        expect(comp.contentalign).toEqual('center');
        comp.type = null;
        comp.ngOnInit();
        expect(comp.type).toEqual('confirm');

    });


});

