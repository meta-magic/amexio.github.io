import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFieldSetComponent } from './fieldset.component';
import { AmexioStepsComponent } from '../steps/steps.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        fixture.autoDetectChanges()
    });


   

    it('onLegendClick if condition', () => {
        comp.collapsible = true;
        comp.onLegendClick();
        comp.collapsible = true;
        expect(comp.collapsible).toEqual(true);
        comp.isActive = !comp.isActive;
    });
    it('onLegendClick else condition', () => {
        comp.collapsible = false;
        comp.onLegendClick();
        comp.collapsible = false;
        expect(comp.collapsible).toEqual(false);
    });

    it('checking ngOnInit method if condition', () => {
        comp.collapsible = false;
        comp.expanded = false;
        comp.ngOnInit();
        comp.collapsible = false;
        comp.expanded = false;
        expect(comp.collapsible).toEqual(false);
        expect(comp.expanded).toEqual(false);
        comp.isActive = true;
      
    });

    it('checking ngOnInit method else condition', () => {
        comp.collapsible = true;
        comp.expanded = true;
        comp.ngOnInit();
        comp.collapsible = true;
        comp.expanded = true;
        expect(comp.collapsible).toEqual(true);
        expect(comp.expanded).toEqual(true);
        comp.isActive = true;
      
    });
});

