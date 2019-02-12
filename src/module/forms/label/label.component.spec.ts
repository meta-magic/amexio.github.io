import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioLabelComponent } from './label.component';

describe('amexio-label' , () => {
  let comp: AmexioLabelComponent;
  let fixture: ComponentFixture<AmexioLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioLabelComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioLabelComponent);
    comp = fixture.componentInstance;
  });

  it('check small ', () => {
    let style = "small";
    comp.ngOnInit();
    expect(comp.styleClass).toEqual(style);
  });

  it('check it null', () => {
    comp.styleClass = null;
    comp.ngOnInit();
    expect('small').toEqual(comp.styleClass);

  });
  it('check for not small label ', () => {
    let style = "large";
    comp.ngOnInit();
    expect(comp.styleClass).not.toEqual(style);
  });

  it('check enableclick true', () => {
    comp.enableclick=true;
    comp.ngOnInit();
    expect(comp.enableclick).toEqual(true);
  });


  it('click enable check ',() => {
    comp.onLabel(event);
    expect(comp.enableclick).not.toEqual('null');
  });

  it('should emit on click', () => {
    comp.onLabel(event);
    comp.onClick.subscribe((g: any)=>{
      expect(fixture.nativeElement.onLabel(event)).toEqual({fixture});
    });
    comp.onLabel(event);
  });

});

