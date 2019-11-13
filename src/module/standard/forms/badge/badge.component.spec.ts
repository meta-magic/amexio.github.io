import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexioBadgeComponent } from './badge.component';

describe('amexio-badge', () => {
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
    it('on cClass Variable check', () => {
        expect(comp.cClass).toEqual('');
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

});
