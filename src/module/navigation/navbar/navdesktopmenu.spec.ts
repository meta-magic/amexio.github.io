import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioImageComponent } from '../../media/image/image.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { AmexioNavDesktopMenuComponent } from '../../navigation/navbar/navdesktopmenu';
import { ElementRef } from '@angular/core';
describe('navdesktopmenu', () => {
  let comp1: AmexioNavDesktopMenuComponent;
  let fixture1: ComponentFixture<AmexioNavDesktopMenuComponent>;
  let el: ElementRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioNavDesktopMenuComponent,
        AmexioImageComponent,
        CommonIconComponent],
      providers: [IconLoaderService, DeviceQueryService],
    });
    fixture1 = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    comp1 = fixture1.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    el = fixture1.debugElement.query(By.css('#menus'));
    comp1.menus = el;
    comp1.nodes = [{
      subInnerMenus: false
    }]
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  it('ngAfterViewInit if method', () => {

    fixture1.detectChanges();
    let menus: ElementRef = fixture1.componentInstance.menus;
    expect(menus).toBeDefined();
    comp1.ngAfterViewInit();
    jasmine.clock().tick(101);
    // setTimeout(() => {
      const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
      fixture.detectChanges();
      menus.nativeElement.getBoundingClientRect = () => ({
        right : 1264
        })
      expect(window.innerWidth - menus.nativeElement.getBoundingClientRect().right).toBeLessThan(300);
      comp1.position = 'right';
    // }, 100);
  });
  it('ngAfterViewInit else block', () => {
    fixture1.detectChanges();
    const menus: ElementRef = fixture1.componentInstance.menus;
    expect(menus).toBeDefined();
    comp1.ngAfterViewInit();
    // setTimeout(() => {
      jasmine.clock().tick(101);
      const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
      fixture.detectChanges();
      expect(window.innerWidth - menus.nativeElement.getBoundingClientRect().right).toBeGreaterThan(300);
      comp1.position = 'left';
    // }, 100);
  });
  it('onMouseOver()', () => {
    let event;
    let node = { submenus: 'as' }
    comp1.onMouseOver(event, node);
    expect(node.submenus).toBeDefined();
    expect(node.submenus.length).toBeGreaterThan(0);
    node['showInnerMenus'] = true;
  });
  it('onMouseOver() for else block', () => {
    let event;
    let node = { submenus: '' };
    let nodes = [{}];
    comp1.onMouseOver(event, node);
    nodes.forEach((innernode: any) => {
      innernode['showInnerMenus'] = false;
    })
  });
  it('onMouseLeave Method', () => {
    let node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }]
    }
    comp1.onMouseLeave(event, node);
    expect(node.submenus).not.toBe(null);
    expect(node.submenus.length).toBeGreaterThan(0);
    node['showInnerMenus'] = false;
  });
  it('onMouseLeave Method else block', () => {
    let node = {
      submenus: ''
    }
    comp1.onMouseLeave(event, node);
    expect(node.submenus).toBe('');
    let nodes = [{}];
    nodes.forEach((innernode: any) => {
      innernode['showInnerMenus'] = false;
    });
  });
  it('onMouseLeave Method else block2', () => {
    let node = {
      submenus: 'aaa'
    }
    comp1.onMouseLeave(event, node);
    expect(node.submenus.length).toBeGreaterThan(0);
    let nodes = [{}];
    nodes.forEach((innernode: any) => {
      innernode['showInnerMenus'] = false;
    });
  });

  it('onClick()', () => {
    let node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }]
    };
    comp1.onClick(event, node);
    comp1.onNavItemClick.emit({ data: node, event: event });
  });

  it('onInnerClick()', () => {
    let node = {
      submenus: [{ submenu: 's' }, { submenu: 'u' }]
    };
    comp1.onInnerClick(event);
    comp1.onNavItemClick.emit(event);
  });

});
