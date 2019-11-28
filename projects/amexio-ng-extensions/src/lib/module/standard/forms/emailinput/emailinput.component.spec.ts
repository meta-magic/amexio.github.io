import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';

import { AmexioEmailInputComponent } from './emailinput.component';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { IconLoaderService } from '../../../services/icon/icon.service';

describe('amexio-email-input', () => {
  let comp: AmexioEmailInputComponent;
  let fixture: ComponentFixture<AmexioEmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioEmailInputComponent,
        CommonIconComponent,
        AmexioInputHelperComponent],

      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioEmailInputComponent);
    comp = fixture.componentInstance;

    comp._pattern = '/\S+@\S+\.\S+/';
    comp.name = 'EmailID';
    comp.fieldlabel = 'email';

    fixture.detectChanges();
  });


  it('email : AmexioEmailInputComponent defined', () => {
    expect(fixture.componentInstance).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('ngOnInit() : generateName & createCompId', () => {

    spyOn(comp, 'generateName');
    spyOn(comp, 'createCompId');

    comp.generateName(comp.name, comp.fieldlabel, 'emailinput');
    comp.createCompId('emailinput', comp.name);

    expect(comp.name).toEqual('EmailID');
    expect(comp.fieldlabel).toEqual('email');
    expect(comp.generateName).toHaveBeenCalledWith(comp.name, comp.fieldlabel, 'emailinput');
    expect(comp.createCompId).toHaveBeenCalledWith('emailinput', comp.name);

    expect(comp.componentId).toEqual('emailinput_EmailID');
  });

  it('setPattern() : ', () => {
    comp.value = '/\S+@\S+\.\S+/';
    comp.regEx = new RegExp('/\S+@\S+\.\S+/');

    expect(comp.pattern).toEqual(comp.value);
    expect(comp.regEx).toBeDefined();
    expect(comp.regEx).toEqual(new RegExp(comp.value));
  });

  it('validate() :', () => {
    spyOn(comp, 'isEmailFieldValid');

    comp.isEmailFieldValid();

    expect(comp.isEmailFieldValid).toHaveBeenCalled();
  });
});