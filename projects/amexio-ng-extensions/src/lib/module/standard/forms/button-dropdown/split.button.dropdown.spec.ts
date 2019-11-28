import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioFloatingButtonComponent } from '../floatingbutton/floatingbutton.component';
import { AmexioSpiltButtonDropdownComponent } from './split.button.dropdown';

fdescribe('Amexio Spilt Button Dropdown Component : ', () => {
  let comp: AmexioSpiltButtonDropdownComponent;
  let fixture: ComponentFixture<AmexioSpiltButtonDropdownComponent>;
  let btnDrpDwn: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSpiltButtonDropdownComponent, CommonIconComponent, AmexioFloatingButtonComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioSpiltButtonDropdownComponent);
    comp = fixture.componentInstance;

    btnDrpDwn = fixture.debugElement.query(By.css('.dropdown-button-content')).nativeElement as HTMLElement;
  });

  it('button-dropdown : AmexioSpiltButtonDropdownComponent defined', () => {
    expect(fixture.componentInstance).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });


  it('ngAfterContentInit : call chk',()=>{
    spyOn(comp, 'ngAfterContentInit');

    fixture.detectChanges();

    expect(comp.dropdownItemData).not.toBeNull();
    expect(comp.ngAfterContentInit).toHaveBeenCalled();
  });

  it('onClick : openContent:true', () => {
    spyOn(comp, 'onClick');
    comp.openContent = true;

    comp.onClick();
    fixture.detectChanges();

    expect(btnDrpDwn.getAttribute('style')).toEqual("display: block;");
    expect(comp.onClick).toHaveBeenCalled();
  });


  it('onClick : openContent:false', () => {
    spyOn(comp, 'onClick');
    comp.openContent = false;

    comp.onClick();
    fixture.detectChanges();
    expect(btnDrpDwn.getAttribute('style')).toEqual("display: none;");
    expect(comp.onClick).toHaveBeenCalled();
  });

  it('onClick : openContent:undefined', () => {
    spyOn(comp, 'onClick');
    expect(comp.onClick).not.toHaveBeenCalled();
  });


  it('getBackgroundColor() : type - primary', () => {
    const returnVal =  {'background-color' : '#0275d8'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);

    comp.type = 'primary';

    expect(comp.type).toEqual('primary');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();

  });

  it('getBackgroundColor() : type - theme-color', () => {
    const returnVal =  {'background-color' : '#0275d8'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);

    comp.type = 'theme-color';

    expect(comp.type).toEqual('theme-color');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();
  });

  it('getBackgroundColor() : type - success', () => {
    const returnVal =  {'background-color' : '#5cb85c'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);
    comp.type = 'success';

    expect(comp.type).toEqual('success');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();

  });

  it('getBackgroundColor() : type - green', () => {
    const returnVal =  {'background-color' : '#5cb85c'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);

    comp.type = 'green';

    expect(comp.type).toEqual('green');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();
  });


  it('getBackgroundColor() : type - danger', () => {
    const returnVal =  {'background-color' : '#d9534f'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);
    comp.type = 'danger';

    expect(comp.type).toEqual('danger');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();

  });

  it('getBackgroundColor() : type - red', () => {
    const returnVal =  {'background-color' : '#d9534f'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);

    comp.type = 'red';

    expect(comp.type).toEqual('red');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();
  });


  it('getBackgroundColor() : type - warning', () => {
    const returnVal =  {'background-color' : '#f0ad4e'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);
    comp.type = 'warning';

    expect(comp.type).toEqual('warning');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();

  });

  it('getBackgroundColor() : type - yellow', () => {
    const returnVal =  {'background-color' : '#f0ad4e'};
    spyOn(comp,'getBackgroundColor').and.returnValue(returnVal);
   
    comp.type = 'yellow';

    expect(comp.type).toEqual('yellow');

    comp.getBackgroundColor();
    fixture.detectChanges();
    expect(comp.getBackgroundColor).toHaveBeenCalled();
  });
});