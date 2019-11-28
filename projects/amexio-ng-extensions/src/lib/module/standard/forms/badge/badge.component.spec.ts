import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { AmexioBadgeComponent } from './badge.component';

describe('Amexio Badge Component :', () => {
    let comp: AmexioBadgeComponent;
    let fixture: ComponentFixture<AmexioBadgeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioBadgeComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioBadgeComponent);
        comp = fixture.componentInstance;
    });

    it('badge : AmexioBadgeComponent defined', () => {
        expect(fixture.componentInstance).toBeDefined();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('on cClass Variable check', () => {
        expect(comp.cClass).toEqual('');
    });

    it('setRoundEdge() If round-edge', () => {
        const type = 'round-edge';
        spyOn(comp, 'setRoundEdge').withArgs(type).and.callThrough();
        comp.setRoundEdge(type);

        fixture.detectChanges();

        expect(comp.setRoundEdge).toHaveBeenCalledWith(type);
        expect(type).toBe('round-edge');
        expect(comp.roundedgeclass).toEqual('roundEdgeCommonCss');
    });

    it('setRoundEdge() If classic', () => {
        const type = 'classic';

        spyOn(comp, 'setRoundEdge').withArgs(type).and.callThrough();
        comp.setRoundEdge(type);

        fixture.detectChanges();

        expect(comp.setRoundEdge).toHaveBeenCalledWith(type);
        expect(type).toEqual('classic');
        expect(comp.roundedgeclass).toEqual('classicCommonCss');

    });

    it('setRoundEdge() If null', () => {
        const type = null;

        spyOn(comp, 'setRoundEdge');

        fixture.detectChanges();

        expect(comp.setRoundEdge).not.toHaveBeenCalledWith();
        expect(type).not.toEqual('classic');
        expect(comp.roundedgeclass).not.toBe('classicCommonCss');
        expect(type).not.toEqual('round-edge');
        expect(comp.roundedgeclass).not.toBe('roundEdgeCommonCss');
    });

    it('ngOnInit : if true', () => {
        expect(comp.color).toBeUndefined();
        expect(comp.background).toBeUndefined();

        if (!comp.color && !comp.background) {
            fixture.detectChanges();
            expect(comp.cClass).toBe('amexio-badge-color');
        }
    });

    it('ngOnInit : negate', () => {
        comp.color = '#000000';
        comp.background = '#000000';
        fixture.detectChanges();
        expect(comp.cClass).not.toBe('amexio-badge-color');
    });

});
