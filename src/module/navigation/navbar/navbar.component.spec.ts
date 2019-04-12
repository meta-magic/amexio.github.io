// /**
//  * Created by kedar on 20/08/18.
//  */
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { IconLoaderService } from '../../../index';
// import { AmexioNavBarComponent } from './navbar.component';
// import { AmexioNavItemComponent } from './navitem.component';
// import { AmexioNavActionComponent } from './navaction.component';
// import { AmexioNavMenuComponent } from './navmenu.component';
// import { AmexioNavTextFieldComponent } from './navtextfield.component';
// import { stringify } from 'querystring';
// import { AmexioLabelComponent } from '../../forms/label/label.component';
// import { DeviceQueryService } from '../../services/device/device.query.service';
// import { AmexioMediaModule } from './../../media/amexio.media.module';
// describe('amexio-navbar', () => {

//     let comp: AmexioNavBarComponent;
//     let fixture: ComponentFixture<AmexioNavBarComponent>;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule , AmexioMediaModule],
//             declarations: [AmexioNavItemComponent, AmexioLabelComponent, AmexioNavBarComponent, AmexioNavActionComponent, AmexioNavMenuComponent, AmexioNavTextFieldComponent],
//             providers: [IconLoaderService, DeviceQueryService],
//         });
//         fixture = TestBed.createComponent(AmexioNavBarComponent);
//         comp = fixture.componentInstance;
//     });


//     it('check  variable', () => {
//         comp.mobilemode = false;
//         expect(comp.mobilemode).toEqual(false);
//         comp.toggle = true;
//         expect(comp.toggle).toBe(true);
//         comp.mobilemode = false;
//         expect(comp.mobilemode).toBe(false);
//         comp.sidenav = false;
//         expect(comp.sidenav).toBe(false);
//     });


//     it('check toggleDrawerPanel method ', () => {
//         // let data: any;
//         // comp.toggleDrawerPanel(data);
//         // comp.toggle = true;
//         // expect(comp.toggle).toBe(true);


//     });

//     // it('check sideNavbar method ', () => {
//     //     comp.sideNavbar();
//     //     let tablet = comp.matchMediaService.IsTablet();
//     //     let phon = comp.matchMediaService.IsPhone();
//     //     phon = false;
//     //     tablet = false;
//     //     expect(comp.matchMediaService.IsPhone()).toBe(phon);
//     //     expect(comp.matchMediaService.IsTablet()).toBe(tablet);


//     // });

//     // // it('check ngAfterViewInit method ', () => {
//     // //     comp.ngAfterViewInit();
//     // //     comp.logo = null;

//     // // });

//     // it('check handleNavItems method ', () => {
//     //     let arr = [{
//     //         'text': 'Amexio Canvas',
//     //         'link': 'google.com'
//     //     }];

//     //     comp.navitems = arr;

//     //     comp.handleNavItems();

//     // });



// });
