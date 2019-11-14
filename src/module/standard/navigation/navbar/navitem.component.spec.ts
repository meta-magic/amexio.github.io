/**
 * Created by pratik on 11/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { stringify } from 'querystring';
import { IconLoaderService } from '../../../../index';
import {DarkmodeComponent} from '../../forms/darkmode/darkmode.component';
import {AmexioSliderComponent} from '../../forms/slider/slider.component';
import {AmexioToggleComponent} from '../../forms/toggle/toggle.component';
import { AmexioNavActionComponent } from './navaction.component';
import {AmexioNavDesktopMenuComponent} from './navdesktopmenu';
import { AmexioNavItemComponent } from './navitem.component';
import { AmexioNavMenuComponent } from './navmenu.component';
import {AmexioNavMobileMenuComponent} from './navmobilemenu';
import { AmexioNavTextFieldComponent } from './navtextfield.component';

describe('amexio-nav-item', () => {
    let comp: AmexioNavItemComponent;
    let fixture: ComponentFixture<AmexioNavItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNavItemComponent, AmexioNavMobileMenuComponent, AmexioNavDesktopMenuComponent, AmexioSliderComponent, AmexioToggleComponent, DarkmodeComponent, AmexioNavActionComponent, AmexioNavMenuComponent, AmexioNavTextFieldComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioNavItemComponent);
        comp = fixture.componentInstance;
    });
    it('constructor', () => {
        comp.componentId = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]) + '_navctyt';
    });
});
