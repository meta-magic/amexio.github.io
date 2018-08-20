import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioTabComponent } from './tab.component';
import { AmexioIconPaneComponent } from '../icon/icon.component';
import {AmexioTabPillComponent} from './tab.pill.component';

describe('amexio-tab', () => {
    let comp: AmexioTabComponent;
    let fixture: ComponentFixture<AmexioTabComponent>;
    let comData: AmexioTabPillComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [AmexioTabComponent, AmexioIconPaneComponent],
                providers: [IconLoaderService],
            });
            fixture = TestBed.createComponent(AmexioTabComponent);
            comp = fixture.componentInstance;
        });

    it('check showprev variable ', () => {

        comp.showprev = false;
        expect(comp.showprev).toEqual(false);
    });

    it('check showprev variable ', () => {
        comp.shownext = false;
            expect(comp.shownext).toEqual(false);
    });



});
