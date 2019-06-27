import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioNavMenuComponent } from '../../navigation/navbar/navmenu.component';
import {AmexioNavDesktopMenuComponent} from '../../navigation/navbar/navdesktopmenu';
import {AmexioNavMobileMenuComponent} from '../../navigation/navbar/navmobilemenu';
describe('navmenu', () => {
    let comp: AmexioNavMenuComponent;
    let fixture: ComponentFixture<AmexioNavMenuComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AmexioNavMenuComponent, AmexioNavDesktopMenuComponent, AmexioNavMobileMenuComponent],
            providers: [],
        });
        fixture = TestBed.createComponent(AmexioNavMenuComponent);
        comp = fixture.componentInstance;
    });

    it('check variable in navmenu', () => {
        expect(comp.issubmenu).toEqual(false);
        expect(comp.position).toEqual('right');
        expect(comp.ishovered).toEqual(true);

    })

    it('setMobileMode() method check', () => {
        let mobileMode = false;
        let flag = false;
        comp.setMobileMode(flag);
        expect(comp.mobilemode).toBe(flag);
       
      });
});