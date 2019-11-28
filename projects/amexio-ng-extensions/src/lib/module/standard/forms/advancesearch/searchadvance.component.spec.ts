import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioSearchAdvanceComponent } from './searchadvance.component';
import { FileDetector } from 'selenium-webdriver/remote';
fdescribe('Amexio Search Advance Component ', () => {
  let comp: AmexioSearchAdvanceComponent;
  let fixture: ComponentFixture<AmexioSearchAdvanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSearchAdvanceComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioSearchAdvanceComponent);
    comp = fixture.componentInstance;
    comp.advanceSearchFlag = false;

  });

  it('defined : AmexioSearchAdvanceComponent defined', () => {
    expect(fixture.componentInstance).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('closeSearchForm() : if called', () => {
    spyOn(comp, 'closeSearchForm');

    comp.closeSearchForm();
    fixture.detectChanges();

    expect(comp.closeSearchForm).toHaveBeenCalled();
    expect(comp.advanceSearchFlag).toEqual(false);
  });

  it('closeSearchForm() : if not called', () => {
    spyOn(comp, 'closeSearchForm').and.callThrough();

    expect(comp.closeSearchForm).not.toHaveBeenCalled();
  });

});

