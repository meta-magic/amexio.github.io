import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
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
    })
});
