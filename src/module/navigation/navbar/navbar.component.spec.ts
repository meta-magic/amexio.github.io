/**
 * Created by kedar on 20/08/18.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioNavBarComponent } from './navbar.component';
import { AmexioNavItemComponent } from './navitem.component';
import { AmexioNavActionComponent } from './navaction.component';
import { AmexioNavMenuComponent } from './navmenu.component';
import { AmexioNavTextFieldComponent } from './navtextfield.component';
import { stringify } from 'querystring';
import { AmexioLabelComponent } from '../../forms/label/label.component';
import{ DeviceQueryService} from '../../services/device/device.query.service';
describe('amexio-navbar', () => {

    let comp: AmexioNavBarComponent;
    let fixture: ComponentFixture<AmexioNavBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNavItemComponent, AmexioLabelComponent, AmexioNavBarComponent, AmexioNavActionComponent, AmexioNavMenuComponent, AmexioNavTextFieldComponent],
            providers: [IconLoaderService,DeviceQueryService],
        });
        fixture = TestBed.createComponent(AmexioNavBarComponent);
        comp = fixture.componentInstance;
    });


    it('check  variable', () => {
        comp.mobilemode = false;
        expect(comp.mobilemode).toEqual(false);
        comp.toggle = true;
        expect(comp.toggle).toBe(true);
        comp.mobilemode = false;
        expect(comp.mobilemode).toBe(false);
        comp.sidenav = false;
        expect(comp.sidenav).toBe(false);
    });

    // it('check ngAfterViewInit method ', () => {
    //     let data: any;

    // comp.resize(data);
    // expect(comp.handleDeviceSetting())

        
    // });

    // it('check ngAfterViewInit method ', () => {
    //     comp.ngAfterViewInit();
    //     comp.logo =null;
    
    //     expect(comp.loadNavItems()).toBe()
            
    //     });
    


});
        