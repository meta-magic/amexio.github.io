import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
// tslint:disable-next-line:ordered-imports
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioFloatingGroupButtonComponent } from './floatinggroupbutton.component';
import { AmexioFloatingButtonComponent } from '../floatingbutton/floatingbutton.component'
describe('amexio-floating-group-button', () => {
  let comp: AmexioFloatingGroupButtonComponent;
  let fixture: ComponentFixture<AmexioFloatingGroupButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioFloatingGroupButtonComponent, CommonIconComponent, AmexioFloatingButtonComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioFloatingGroupButtonComponent);
    comp = fixture.componentInstance;
  });


  it('check variable togglefloatinggroup', () => {
    comp.togglefloatinggroup = false;
    expect(comp.togglefloatinggroup).toEqual(false);

    comp.datacount = 0;
    expect(comp.datacount).toEqual(0);
  });

  it('check onButtonClick', () => {
    let node: any;
    let click1: any;

    comp.onButtonClick(node, click1);
    comp.togglefloatinggroup = false;
    expect(comp.togglefloatinggroup).toEqual(false);
    expect(comp.togglefloatinggroup).not.toBe(true);

    let dat1 = { this: node, parent: this, event: click1 };

    comp.onClick.subscribe((g: any) => {
      expect(dat1).toEqual(g);
    });
  });

  // it('method testing onFloatingButtonClick', () => {

  //   let floatingbtn: any;

  //   comp.onFloatingButtonClick(floatingbtn);
  //  // comp.onButtonClick(node,floatingbtn);

  // });




});
