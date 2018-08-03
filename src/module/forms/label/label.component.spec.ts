import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioLabelComponent } from './label.component';

describe('amexio-label' , () => {
  let comp: AmexioLabelComponent;
  let fixture: ComponentFixture<AmexioLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioLabelComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioLabelComponent);
    comp = fixture.componentInstance;
  });

  it('check small ', () => {
    let style = "small";
    comp.ngOnInit();
    expect(comp.styleClass).toEqual(style);
  })
  it('check it null', () => {
    comp.ngOnInit();
    let n = 'null';
    expect(comp.styleClass).not.toBeNull(n);

  });

  it('click enable check ',() => {
    comp.onLabel(event);
    expect(comp.enableclick).not.toEqual('null');
  })

  it('should emit on click', () => {
    comp.onLabel(event);
    comp.onClick.subscribe((g: any)=>{
      expect(fixture.nativeElement.onLabel(event)).toEqual({fixture});
    });
    comp.onLabel(event);
  }));

});

