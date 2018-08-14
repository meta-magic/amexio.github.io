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

describe('amexio-nav-item', () => {
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


    it('check checkValidity method', () => {
        let ev: any;
        comp.navItemClick(ev);
        comp.onNavItemClick.subscribe((g: any) => {
            expect(ev).toEqual(g);
        });
    });

    it('check setMobileMode method', () => {
        let flag: boolean;
        comp.setMobileMode(flag);
        comp.mobilemode = true;
        expect(comp.mobilemode).toEqual(true);
    });

    it('check ngOnInit method', () => {
        comp.ngOnInit();
        comp.type = 'link';
        comp.isAction = true;
        expect(comp.type).toEqual('link');
        expect(comp.isAction).toEqual(true);

        comp.type = 'textfield';
        comp.isTextField = true;
        comp.ngOnInit();
        expect(comp.type).toEqual('textfield');


        comp.type = 'menu';
        comp.isMenu = true;
        comp.ngOnInit();
        expect(comp.type).toEqual('menu');


        comp.type = 'menucontainer';
        comp.isMenuContainer = true;
        comp.ngOnInit();
        expect(comp.type).toEqual('menucontainer');




        
    });



});
