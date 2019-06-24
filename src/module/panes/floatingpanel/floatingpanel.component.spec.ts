import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFloatingPanelComponent } from './floatingpanel.component';
import { AmexioFormsModule } from '../../forms/amexio.forms.module';

describe('amexio-floating-panel', () => {
    let comp: AmexioFloatingPanelComponent;
    let fixture: ComponentFixture<AmexioFloatingPanelComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioFormsModule],
            declarations: [AmexioFloatingPanelComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

        it('true is true', () => expect(true).toBe(true));
    });

    // check variables 
    it('check variables ', () => {
        let flag = false;
        // expect(comp.showfloatingButton).toEqual(flag);
        // expect(comp.showSimpleButton).toEqual(flag);
        // expect(comp.gradientFlag).toEqual(flag);
        // expect(comp.opacitiy).toEqual(flag);

        expect(comp.btnStyle).toEqual({});
        expect(comp.style).toEqual({});

        expect(comp.pos1).toEqual(0);
        expect(comp.pos2).toEqual(0);
        expect(comp.pos3).toEqual(0);
        expect(comp.pos4).toEqual(0);

    });

});
