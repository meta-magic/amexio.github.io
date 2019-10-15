import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioAccordionTabComponent } from './accordion.pane';

describe('amexio-accordion-pane', () => {
    let comp: AmexioAccordionTabComponent;
    let fixture: ComponentFixture<AmexioAccordionTabComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserAnimationsModule],
            declarations: [AmexioAccordionTabComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioAccordionTabComponent);
        comp = fixture.componentInstance;
        fixture.autoDetectChanges();
    });


    it('checking ngOnInit()', () => {
        comp.componentId = '' + Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);
    });

});