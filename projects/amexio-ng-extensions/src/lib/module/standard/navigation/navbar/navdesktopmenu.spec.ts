import { not } from '@angular/compiler/src/output/output_ast';
import { ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioImageComponent } from '../../media/image/image.component';
import { AmexioNavDesktopMenuComponent } from './navdesktopmenu';

describe('Amexio NavDesktop Menu Component', () => {

  let componentDesktopMenu: AmexioNavDesktopMenuComponent;
  let fixtureDesktopMenu: ComponentFixture<AmexioNavDesktopMenuComponent>;
  let fixture: ComponentFixture<AmexioNavDesktopMenuComponent>;
  let el: ElementRef;
  let element:any;
  let navItem:any;
  let navItemHtml:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioNavDesktopMenuComponent,
        AmexioImageComponent,
        CommonIconComponent],
      providers: [IconLoaderService, DeviceQueryService],
    });
    fixtureDesktopMenu = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    componentDesktopMenu = fixtureDesktopMenu.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    el = fixtureDesktopMenu.debugElement.query(By.css('#menus'));
    // fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    // element = fixture.debugElement;
  
    // navItem = element.nativeElement.querySelector('#menus');
    // navItemHtml = fixture.debugElement.query(By.css('#menus')).nativeElement as HTMLElement;
    componentDesktopMenu.menus = el;
    componentDesktopMenu.nodes = [{
      subInnerMenus: false,
    }];

    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  xit('ngAfterViewInit() check if menus exist', () => {
    fixtureDesktopMenu.detectChanges();
    const menus: ElementRef = fixtureDesktopMenu.componentInstance.menus;

    componentDesktopMenu.ngAfterViewInit();
    jasmine.clock().tick(101);
    const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    fixture.detectChanges();
    console.log(navItemHtml);
    expect(menus).toBeDefined();
    //expect(menus.nativeElement as HTMLElement).toBeDefined();
  });

  xit('ngAfterViewInit() check if menus not defined', () => {
    fixtureDesktopMenu.detectChanges();
    const menus: ElementRef = null;

    componentDesktopMenu.ngAfterViewInit();
    jasmine.clock().tick(101);
    const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    fixture.detectChanges();
    
    expect(menus).toBeNull();
  });

  xit('ngAfterViewInit if method', () => {

    fixtureDesktopMenu.detectChanges();
    const menus: ElementRef = fixtureDesktopMenu.componentInstance.menus;
    expect(menus).toBeDefined();
    componentDesktopMenu.ngAfterViewInit();
    jasmine.clock().tick(101);
    // setTimeout(() => {
    const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    fixture.detectChanges();
    menus.nativeElement.getBoundingClientRect = () => ({
      right: 1264,
    });

    element = fixtureDesktopMenu.debugElement;
    navItem = element.nativeElement.querySelector('amexio-nav-item');
    navItemHtml = fixtureDesktopMenu.debugElement.query(By.css('amexio-nav-item')).nativeElement as HTMLElement;
   
    expect(window.innerWidth - menus.nativeElement.getBoundingClientRect().right)
      .toBeLessThan(300);
    expect(componentDesktopMenu.position).toBe('right');
    // }, 100);
  });

  xit('ngAfterViewInit() else block', () => {
    fixtureDesktopMenu.detectChanges();
    const menus: ElementRef = fixtureDesktopMenu.componentInstance.menus;
    expect(menus).toBeDefined();
    menus.nativeElement.getBoundingClientRect = () => ({
      left: 100,
      right: 200,
    });
    componentDesktopMenu.ngAfterViewInit();
    // setTimeout(() => {
    jasmine.clock().tick(101);

    const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    fixture.detectChanges();

    expect(window.innerWidth - menus.nativeElement.getBoundingClientRect().left)
      .not.toBeLessThan(300);
    expect(componentDesktopMenu.position).not.toBe('right');
    // }, 100);
  });

  it('onMouseOver()', () => {
    let event;
    const node = { submenus: 'as' };
    componentDesktopMenu.onMouseOver(event, node);

    expect(node.submenus).toBeDefined();
    expect(node.submenus.length).toBeGreaterThan(0);
    expect(node['showInnerMenus']).toBeTruthy();
  });

  it('onMouseOver() for else block', () => {
    let event;
    const node = { submenus: '' };
    const nodes = [{}];
    componentDesktopMenu.onMouseOver(event, node);
    nodes.forEach((innernode: any) => {
      expect(innernode['showInnerMenus']).toBeFalsy();
    });
  });

  it('onMouseLeave Method', () => {
    const node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }],
    };
    componentDesktopMenu.onMouseLeave(event, node);
    expect(node.submenus).not.toBe(null);
    expect(node.submenus.length).toBeGreaterThan(0);
    expect(node['showInnerMenus']).toBeFalsy();
  });

  it('onMouseLeave Method else block', () => {
    const node = {
      submenus: '',
    };
    componentDesktopMenu.onMouseLeave(event, node);
    expect(node.submenus).toBe('');
    const nodes = [{}];
    nodes.forEach((innernode: any) => {
      expect(node['showInnerMenus']).toBeFalsy();
    });
  });

  it('onMouseLeave Method else block2', () => {
    const node = {
      submenus: 'aaa',
    };
    componentDesktopMenu.onMouseLeave(event, node);
    expect(node.submenus.length).toBeGreaterThan(0);
    const nodes = [{}];
    nodes.forEach((innernode: any) => {
      expect(node['showInnerMenus']).toBeFalsy();
    });
  });

  it('onClick()', () => {
    const node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }],
    };
    componentDesktopMenu.onClick(event, node);
    componentDesktopMenu.onNavItemClick.emit({ data: node, event });
  });

  it('onInnerClick()', () => {
    let node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }],
    };
    componentDesktopMenu.onInnerClick(event);
    componentDesktopMenu.onNavItemClick.emit(event);
  });

  it('onScroll', () => {
    componentDesktopMenu.onScroll();
    const scrollBottom = componentDesktopMenu.divRef.nativeElement.scrollHeight - componentDesktopMenu.divRef.nativeElement.clientHeight;
    const marginTop = 330 - (scrollBottom - componentDesktopMenu.divRef.nativeElement.scrollTop);
    componentDesktopMenu.marginTop = '-' + marginTop + 'px';
  });

});
