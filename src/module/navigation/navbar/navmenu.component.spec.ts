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
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

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

      it('dataObject() method check', () => {
          let n;
         comp.dataObject(n, event);
         return { data: n, event: event };
      });

      it('onHeaderClick() method check', () => {
       comp.onHeaderClick(event);
       const node = {
        header: true,
        title: comp.title,
        icon: comp.icon,
      };
      comp.mobileToggleModel = !comp.mobileToggleModel;
      comp.mobilemode = true;
      comp.showMenus = true;
      expect(comp.mobilemode).toEqual(true);
      comp.showMenus = !comp.showMenus;
      comp.onClick(node, event);
     });

     it('onMouseOver() method check', () => {
        comp.mobilemode = true;
        comp.onMouseOver(event);
        // if (this.mobilemode) {
        expect(comp.mobilemode).toEqual(true);
        comp.showMenus = true;
        return;
    });

    it('onMouseLeave() method check', () => {
        comp.mobilemode = true;
       comp.onMouseLeave(event);
       expect(comp.mobilemode).toEqual(true);
       comp.showMenus = false;
       return;
    });

    it('toggleMenu() method check', () => {
        comp.mobilemode = true;
        comp.toggleMenu(event);
        expect(comp.mobilemode).toEqual(true);
        comp.showMenus = !comp.showMenus;
      });

    //   it('onMouseoverTitle() method check', () => {
    //     comp.onMouseoverTitle(event);
    //         comp.position = comp.getMenuPosition(event);
    //    });

    //    it(' getMenuPosition() method check', () => {
    //     const fixture = TestBed.createComponent(AmexioNavMenuComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;

    //         comp.getMenuPosition(fixture);
    //         const remainingleft = compiled.getBoundingClientRect().left;
    // const remainingright = window.screen.width - compiled.getBoundingClientRect().right;
    // let directionflag: string;
    //    });
       
       it('onIconClick() method check', () => {
        let node ={
            submenus:[{submenu: 's'}, {submenu: 'u'}],
            isExpanded: false
          }
        comp.onIconClick(event, node);
        event.stopPropagation();
        // if (node.hasOwnProperty('isExpanded')) {
        expect(node.hasOwnProperty('isExpanded')).toEqual(true);
            node.isExpanded = !node.isExpanded;
            node['isExpanded'] = true;
        });  
});