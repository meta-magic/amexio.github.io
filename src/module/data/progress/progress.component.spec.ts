import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioProgressBarComponent } from './progress.component';
import { AmexioRatingComponent } from './../../forms/rating/rating.component';

import { toUnicode } from 'punycode';

describe('amexio-progress-bar', () => {
    let comp: AmexioProgressBarComponent;
    let fixture: ComponentFixture<AmexioProgressBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioProgressBarComponent, AmexioRatingComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioProgressBarComponent);
        comp = fixture.componentInstance;
    });

    it('check strippedCss css check',() => {
        (<any>comp).strippedCss = 'stripped ';
        expect((<any>comp).strippedCss).toBe('stripped ');
    });


    it('check progressclass is null ',() => {
        (<any>comp).progressclass = '';
        expect((<any>comp).progressclass).toBe('');
    });

    it('ngoninit method', () => {
        comp.ngOnInit();
        comp.height = '30px';
        expect(comp.height).toEqual('30px');

        comp.stripped = true;
        comp.ngOnInit();
        expect(comp.stripped).toEqual(true);

        comp.amexiocolor = 'red';
        comp.type = 'small';
        expect(comp.amexiocolor).not.toBeNull;
        expect(comp.type).not.toBeNull;

});
});

    
