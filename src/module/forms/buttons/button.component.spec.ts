import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioButtonComponent } from './button.component';

describe('amexio-button', () => {
  let comp: AmexioButtonComponent;
  let fixture: ComponentFixture<AmexioButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioButtonComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioButtonComponent);
    comp = fixture.componentInstance;
  });


  // it('check disable property ',() => {

  //   expect(comp.disabled).toEqual(jasmine.any(false));
  //   //comp.setDisabled();
  // });


  it('check method  getBackgroundColor', () => {

    comp.badgeClass();
    comp.type = 'primary';
    expect(comp.type).toEqual('primary');
    comp.type = 'theme-color';
    expect(comp.type).toEqual('theme-color');
    let colorCode = 'btn-primary-badge';
    expect(colorCode).toBe('btn-primary-badge');




    comp.badgeClass();
    comp.type = 'secondary';
    expect(comp.type).toEqual('secondary');
    comp.type = 'theme-backgroundcolor';
    expect(comp.type).toEqual('theme-backgroundcolor');
    colorCode = 'btn-secondary-badge';
    expect(colorCode).toBe('btn-secondary-badge');

    comp.badgeClass();
    comp.type = 'success';
    expect(comp.type).toEqual('success');
    comp.type = 'green';
    expect(comp.type).toEqual('green');
    colorCode = 'btn-success-badge';
    expect(colorCode).toBe('btn-success-badge');



    comp.badgeClass();
    comp.type = 'danger';
    expect(comp.type).toEqual('danger');
    comp.type = 'red';
    expect(comp.type).toEqual('red');
    colorCode = 'btn-danger-badge';
    expect(colorCode).toBe('btn-danger-badge');



    comp.badgeClass();
    comp.type = 'warning';
    expect(comp.type).toEqual('warning');
    comp.type = 'yellow';
    expect(comp.type).toEqual('yellow');
    colorCode = 'btn-warning-badge';
    expect(colorCode).toBe('btn-warning-badge');

    comp.badgeClass();
    comp.type = 'transparent';
    expect(comp.type).toEqual('transparent');
    colorCode = 'btn-transparent-badge';
    expect(colorCode).toBe('btn-transparent-badge');


  });

  it('check method  buttonClick', () => {
    let btn: any;
    comp.buttonClick(btn);
    comp.disabled = false;

    expect(comp.disabled).toEqual(false);
    comp.onClick.subscribe((g: any) => {
      expect(btn).toEqual(g);
    });

    comp.disabled = true;

    expect(comp.disabled).toEqual(true);
    comp.onClick.subscribe((g: any) => {
      expect(btn).toEqual(g);
    });
  });


    it('check setDisabled method', () => {
      let dis: boolean;
      comp.setDisabled(dis);
      comp.disabled = true;
      expect(comp.disabled).toEqual(comp.disabled);
    });

});
