import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';

import { AmexioLabelComponent } from './label.component';

describe('AmexioLabelComponent : ', () => {
  let comp: AmexioLabelComponent;
  let fixture: ComponentFixture<AmexioLabelComponent>;
  let element;
  let label;
  let labelHtml;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioLabelComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioLabelComponent);
    comp = fixture.componentInstance;

    element = fixture.debugElement;
    label = element.nativeElement.querySelector('label');
    labelHtml = fixture.debugElement.query(By.css('label')).nativeElement as HTMLElement;
  });

  it('label : AmexioLabelComponent defined', () => {
    expect(fixture.componentInstance).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('check styleClass if small ', () => {
    const style = 'small';
    fixture.detectChanges();
    expect(comp.styleClass).toEqual(style);
  });

  it('check styleClass if null', () => {
    comp.styleClass = null;
    fixture.detectChanges();
    expect('small').toEqual(comp.styleClass);

  });

  it('check styleClass if not small ', () => {
    const style = 'large';
    fixture.detectChanges();
    expect(comp.styleClass).not.toEqual(style);
  });

  it('check enableclick true', () => {
    comp.enableclick = true;
    fixture.detectChanges();
    expect(comp.enableclick).toEqual(true);

  });

  it('check enableclick false', () => {
    comp.enableclick = false;
    fixture.detectChanges();
    expect(comp.enableclick).toEqual(false);
    expect(comp.enableclick).not.toEqual(true);
  });

  it('should emit on click', () => {
    spyOn(comp.onClick, 'emit');
    comp.enableclick = true;

    if (comp.enableclick) {
      label.click();
      expect(comp.onClick.emit).toHaveBeenCalled();
    }
  });

  it('should not emit onClick', () => {
    spyOn(comp.onClick, 'emit');
    comp.enableclick = null;

    expect(comp.onClick.emit).not.toHaveBeenCalled();

  });
});

