/**
 * Created by pratik on 11/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioNavItemComponent } from './navitem.component';
import { AmexioNavActionComponent } from './navaction.component';
import { AmexioNavMenuComponent } from './navmenu.component';
import { AmexioNavTextFieldComponent } from './navtextfield.component';
import { stringify } from 'querystring';

describe('amexio-paginator', () => {
    it('true is true', () => expect(true).toBe(true));

    let comp: AmexioNavItemComponent;
    let fixture: ComponentFixture<AmexioNavItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNavItemComponent, AmexioNavActionComponent, AmexioNavMenuComponent, AmexioNavTextFieldComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioNavItemComponent);
        comp = fixture.componentInstance;
    });

    
    it('check innervalue variable', () => {
        comp.mobilemode = false;
        expect(comp.mobilemode).toEqual(false);
      });
      it('check innervalue variable', () => {
        (<any>comp).innerValue = '';
        expect((<any>comp).innerValue).toEqual('');
      });

      
});
