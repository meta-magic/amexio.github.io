import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmexioNavDesktopMenuComponent } from '../../navigation/navbar/navdesktopmenu';
import { AmexioNavMenuComponent } from '../../navigation/navbar/navmenu.component';
import { AmexioNavMobileMenuComponent } from '../../navigation/navbar/navmobilemenu';
describe('navmenu', () => {
  let comp: AmexioNavMenuComponent;
  let fixture: ComponentFixture<AmexioNavMenuComponent>;
  let el: ElementRef;
  let timerCallback: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AmexioNavMenuComponent, AmexioNavDesktopMenuComponent, AmexioNavMobileMenuComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(AmexioNavMenuComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('#navmenu'));
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

  it('ngAfterViewInit if condition', () => {

    comp.ngAfterViewInit();
    setTimeout(() => {
      fixture.detectChanges();
      el.nativeElement.getBoundingClientRect = () => ({
        right : 1275
        })
      expect((window.innerWidth - el.nativeElement.getBoundingClientRect().right)).not.toBeGreaterThan(150);
      comp.position = 'right';
      fixture.detectChanges();
    }, 100);

  });

  it('ngAfterViewInit else condition', () => {
    el = fixture.debugElement.query(By.css('#navmenu'));
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    comp.ngAfterViewInit();
    setTimeout(() => {
      expect(timerCallback).toHaveBeenCalled();
      expect((window.innerWidth - el.nativeElement.getBoundingClientRect().right)).toBeGreaterThan(150);
      comp.position = 'left';
      fixture.detectChanges();
    }, 100);
  });


  it('check variable in navmenu', () => {
    expect(comp.issubmenu).toEqual(false);
    expect(comp.position).toEqual('right');
    expect(comp.ishovered).toEqual(true);

  });

  it('setMobileMode() method check', () => {
    const mobileMode = false;
    const flag = false;
    comp.setMobileMode(flag);
    expect(comp.mobilemode).toBe(flag);

  });

  it('dataObject() method check', () => {
    let n;
    comp.dataObject(n, event);
    return { data: n, event };
  });

  it('onHeaderClick() method  if check', () => {
    comp.onHeaderClick(event);
    const node = {
      header: true,
      title: comp.title,
      icon: comp.icon,
    };
    comp.mobileToggleModel = !comp.mobileToggleModel;
    comp.mobilemode = true;
    comp.showMenus = false;
    comp.onHeaderClick(event);
    expect(comp.mobilemode).toEqual(true);
    comp.showMenus = !comp.showMenus;;
    comp.onClick(node, event);
  });

  it('onHeaderClick() method  else check', () => {
    comp.onHeaderClick(event);
    const node = {
      header: true,
      title: comp.title,
      icon: comp.icon,
    };
    comp.mobileToggleModel = !comp.mobileToggleModel;
    comp.mobilemode = false;
    comp.showMenus = true;
    comp.onHeaderClick(event);
    expect(comp.mobilemode).toEqual(false);
    comp.onClick(node, event);
  });





  it('onMouseOver() method if check', () => {
    comp.mobilemode = true;
    comp.showMenus = true;
    comp.onMouseOver(event);
    expect(comp.mobilemode).toEqual(true);
    expect(comp.showMenus).toEqual(true);
  });


  it('onMouseOver() method else check', () => {
    comp.mobilemode = false;
    comp.showMenus = true;
    comp.onMouseOver(event);
    expect(comp.mobilemode).toEqual(false);
    expect(comp.showMenus).toEqual(true);
  });

  it('onMouseLeave() method if check', () => {
    comp.mobilemode = true;
    comp.showMenus = false;
    comp.onMouseLeave(event);
    expect(comp.mobilemode).toEqual(true);
    expect(comp.showMenus).toEqual(false);
  });

  it('onMouseLeave() method else check', () => {
    comp.mobilemode = false;
    comp.showMenus = false;
    comp.onMouseLeave(event);
    expect(comp.mobilemode).toEqual(false);
    expect(comp.showMenus).toEqual(false);
  });

  it('toggleMenu() method if check', () => {
    comp.mobilemode = true;
    comp.showMenus = false;
    comp.toggleMenu(event);
    expect(comp.mobilemode).toEqual(true);
    comp.showMenus = true;
  });

  it('toggleMenu() method else check', () => {
    comp.mobilemode = false;
    comp.toggleMenu(event);
    expect(comp.mobilemode).toEqual(false);
  });



  it('navItem click method', () => {
    const event1 = {
      event,
    };
    comp.navItemClick(event1);
    event1.event.stopPropagation();
    comp.onNavItemClick.emit(event);
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

  it('onIconClick() method if condition check', () => {
    let node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }],
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