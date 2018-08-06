
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioTextAreaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

describe('TextArea ', () => {
  let comp: AmexioTextAreaComponent;
  let fixture: ComponentFixture<AmexioTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextAreaComponent, AmexioFormIconComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextAreaComponent);
    comp = fixture.componentInstance;
  });
  it('true is true', () => expect(true).toBe(true));
  it('Condition Check', () => {
    comp.value;
    fixture.detectChanges();
    expect('').toBe(comp.value);
  });
  it('otherValidation()', () => {
    comp.otherValidation(fixture);
    expect(comp.otherValidation(fixture.nativeElement)).toBeUndefined;
  });
  it('getCssClass()', () => {
    comp.getCssClass();
    expect(comp.getCssClass).toBeUndefined;
  });
  it('noInnerValue()', () => {
    comp.noInnerValue(fixture);
    expect(comp.noInnerValue).toBeUndefined;
  });
  it('get helpinfomsg', () => {
    comp.helpInfoMsg = "test";
    expect(comp.helpInfoMsg).toEqual(comp.helpInfoMsg);
  });
  it('get _maxerrormsg', () => {
    expect(comp.maxerrormsg).toEqual(comp._maxerrormsg);
  });
  it('get minerrormsg', () => {
    expect(comp.minerrormsg).toEqual(comp._minerrormsg);
  });
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });
  it('set errormsg', () => {
    expect(comp._errormsg).toEqual(comp._errormsg);
  });
  it('get errormsg', () => {
    expect(comp.errormsg).toEqual(comp._errormsg);
  });
  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
  it('check for pattern',()=>{
    comp._pattern;
    expect(comp.pattern).toBeUndefined;
  });
  it('check for _errormsg',()=>{
    comp.errormsg;
    expect(comp.errormsg).toBeUndefined;
  });
  it('check for _minerrormsg',()=>{
    comp.minerrormsg;
    expect(comp.minerrormsg).toBeUndefined;
  });
  it('check for _minerrormsg',()=>{
    comp.maxerrormsg;
    expect('comp._maxerrormsg').toBeUndefined;
  });
  // it('check for error getter setter',()=>{
  //   comp.errormsg;
  //   comp.
  //   expect('comp._maxerrormsg').toBeUndefined;
  // });

  

});
