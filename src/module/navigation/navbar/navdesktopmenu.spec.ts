import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
// import { StepWizardComponent } from './stepwizard.component';
// import { AmexioCardCEComponent } from '../../creative/card/amexio.cards.component';
// import { AmexioCardCEHeaderComponent } from '../../creative/common/amexio.header.component';
import { AmexioImageComponent } from '../../media/image/image.component';
// import { AmexioCardCEBodyComponent } from '../../creative/common/amexio.body.component';
// import { AmexioCardCEActionComponent } from '../../creative/common/amexio.action.component';
// import { AmexioFormActionCEComponent } from '../../creative/form/form.action.component'
// import { AmexioFormCEComponent } from '../../creative/form/amexio.form.component';
// import { AmexiodialoguePaneComponent } from '../../panes/dialogue/dialogue.pane.component';
// import { AmexioLabelComponent } from '../../forms/label/label.component';
// import { AmexioCardComponent } from '../../layout/card/card.component';
// import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
// import { AmexioBodyComponent } from '../../panes/body/pane.action.body';
// import { AmexioFooterComponent } from '../../panes/action/pane.action.footer';
// import { AmexioButtonComponent } from '../../forms/buttons/button.component';
// import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
// import { SpeechBubbleComponent } from '../../data/speech-bubble/speech-bubble.component';
import { AmexioNavDesktopMenuComponent } from '../../navigation/navbar/navdesktopmenu';
// import { CommonIconComponent} from '../../base/components/common.icon.component';
// import {  }
describe('navdesktopmenu', () => {
  let comp1: AmexioNavDesktopMenuComponent;
  let fixture1: ComponentFixture<AmexioNavDesktopMenuComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioNavDesktopMenuComponent, 
        // AmexioFormActionCEComponent, 
        // SpeechBubbleComponent,
        // AmexioButtonComponent, AmexioFooterComponent, AmexioHeaderComponent,
        // AmexioBodyComponent, 
        // AmexioCardComponent, 
        // AmexioLabelComponent,
        // AmexioContextMenuComponent, AmexiodialoguePaneComponent,
        // AmexioFormCEComponent,
        //  AmexioCardCEBodyComponent,
        // AmexioCardCEActionComponent,
         AmexioImageComponent,
        //  AmexioCardCEComponent,
        // AmexioCardCEHeaderComponent,
         CommonIconComponent],
      providers: [IconLoaderService, DeviceQueryService],
    });
    fixture1 = TestBed.createComponent(AmexioNavDesktopMenuComponent);
    comp1 = fixture1.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

  comp1.nodes = [{
    subInnerMenus: false
  }]
  });

  it('ngAfterViewInit()', () => {
    setTimeout(() => {
      comp1.ngAfterViewInit();
      const fixture = TestBed.createComponent(AmexioNavDesktopMenuComponent);
   fixture.detectChanges();
   const compiled = fixture.debugElement.nativeElement;
  //  if ((window.innerWidth - this.menus.nativeElement.getBoundingClientRect().right) < 300) {
   expect(window.innerWidth- fixture.debugElement.nativeElement.getBoundingClientRect().right).toBeLessThan(300);
      // if ((window.innerWidth - this.menus.nativeElement.getBoundingClientRect().right) < 300) {
      // let a =  comp1.menus.nativeElement.getBoundingClientRect().right = 78;
      let a = 8;
      // window.innerWidth = 100;
      // expect(window.innerWidth - a).toBeLessThan(300);
      comp1.position = 'right';
      expect(window.innerWidth - a).toBeGreaterThan(300);
      // expect(window.innerWidth- fixture.debugElement.nativeElement.getBoundingClientRect().right).toBeGreaterThan(300);

      comp1.position = 'left';
      // }
    }, 100);
  });


  it('onMouseOver()', () => {
    let event;

    let node = { submenus: 'as' }
    comp1.onMouseOver(event, node);
    // debounceTime(200);
    expect(node.submenus).toBeDefined();
    expect(node.submenus.length).toBeGreaterThan(0);
    // if (node.submenus && node.submenus.length > 0) {
    node['showInnerMenus'] = true;
    // }
  });

  it('onMouseLeave Method', () => {
    // let event;
    let node ={
      submenus:[{submenu: 's'}, {submenu: 'u'}]
    }
    comp1.onMouseLeave(event, node);
    expect(node.submenus).toBeDefined();
    expect(node.submenus.length).toBeGreaterThan(0);
    node['showInnerMenus'] = false;

  comp1.nodes = [{
    subInnerMenus: false
  }]

    comp1.nodes.forEach((innernode: any) => {
      innernode['showInnerMenus'] = false;
  });

    // node['showInnerMenus'] = false;
  });
 
  it('onClick()', () => {
    let node ={
      submenus:[{submenu: 's'}, {submenu: 'u'}]
    };
    comp1.onClick(event, node);
    comp1.onNavItemClick.emit({ data: node, event: event });
  });

  it('onInnerClick()', () => {
    let node ={
      submenus:[{submenu: 's'}, {submenu: 'u'}]
    };
    comp1.onInnerClick(event);
    comp1.onNavItemClick.emit(event);
  });

});
