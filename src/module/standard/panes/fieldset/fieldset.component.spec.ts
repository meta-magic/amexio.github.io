import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioStepsComponent } from '../steps/steps.component';
import { AmexioFieldSetComponent } from './fieldset.component';

describe('amexio-fieldset', () => {
    let comp: AmexioFieldSetComponent;
    let fixture: ComponentFixture<AmexioFieldSetComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserAnimationsModule],
            declarations: [AmexioFieldSetComponent, AmexioStepsComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioFieldSetComponent);
        comp = fixture.componentInstance;
        fixture.autoDetectChanges();
    });

    it('onLegendClick if isActive true and collapsible true', () => {
        comp.collapsible = true;
        comp.isActive = true;
        comp.onLegendClick();
        expect(comp.isActive).toBeFalsy();
    });

    it('onLegendClick if isActive false and collapsible true ', () => {
        comp.collapsible = true;
        comp.isActive = false;

        comp.onLegendClick();

        expect(comp.isActive).toBeTruthy();
    });
  
    it('checking ngOnInit() if expanded false', () => {
        comp.expanded = false;

        comp.ngOnInit();

        expect(comp.isActive).toBeFalsy();
    });

    it('checking ngOnInit() if expanded true', () => {
        comp.expanded = true;

        comp.ngOnInit();

        expect(comp.isActive ).toBeTruthy();

    });

    
});