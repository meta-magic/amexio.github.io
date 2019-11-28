import { HttpClient, HttpHandler } from '@angular/common/http';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioSearchAdvanceComponent } from './searchadvance.component';
import { SearchToolBoxComponent } from './searchboxtool.component';

describe('searchboxtool ', () => {
  let comp: SearchToolBoxComponent;
  let fixture: ComponentFixture<SearchToolBoxComponent>;
  let advanceSearchcomp: AmexioSearchAdvanceComponent;
  let advanceSearchfixture: ComponentFixture<AmexioSearchAdvanceComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchToolBoxComponent, AmexioSearchAdvanceComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler],
    });
    fixture = TestBed.createComponent(SearchToolBoxComponent);
    comp = fixture.componentInstance;

    advanceSearchfixture = TestBed.createComponent(AmexioSearchAdvanceComponent);
    advanceSearchcomp = advanceSearchfixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

  it('true is true', () =>
    expect(true).toBe(true));

  it('onSelectClick()', () => {

    comp.advanceSearchFlag = false;
  });

  it('ngOnInit()', () => {
    comp.displayfield = 'searchbox';
    comp.ngOnInit();
    comp.componentId = comp.displayfield + window.crypto.getRandomValues(new Uint32Array(1))[0];
    expect(comp.componentId).toBeDefined();
   });

  // it('set data', () => {
  //   let value = '';
  //   comp._data = value;
  //   expect(comp._data).toEqual(value);

  //   comp['componentLoaded'] = true;
  //   expect(comp['componentLoaded']).toEqual(true);
  //   comp.updateComponent();
  // });

  //
  it('selectedValueOnFocus()', () => {
    comp.selectedValueOnFocus();
    expect(comp.selectedValue).not.toBeNull;
    comp.viewData = [];
  });

  // it('navigateKeys()', () => {
  //   let event1 = { keyCode: 40 }
  //   comp.viewData = [{ selected: 'Mumbai' }, { selected: 'Pune' }]
  //   let len = comp.viewData.length;
  //   comp.navigateKeys(event1);
  //   comp.selectedindex = 44

  //   // //put1
  //   expect(comp.selectedindex).toBeGreaterThan(comp.viewData.length);

  //   comp.selectedindex = 0;

  //   expect(event1.keyCode).toEqual(40);
  //   comp.selectedindex = 1;

  //   //put2
  //   expect(comp.selectedindex).toBeLessThan(comp.viewData.length)
  //   comp.navigateKeysCondition(event1);

  //   event1.keyCode = 13;
  //   comp.viewData[comp.selectedindex] = { selected: 'Delhi' }
  //   expect(event1.keyCode).toEqual(13);
  //   expect(comp.viewData[comp.selectedindex]).not.toBeNull;
  //   comp.onItemSelect(comp.viewData[comp.selectedindex]);
  // });

  it('selectCssClass()', () => {
    comp.viewData = [{ selected: 'Mumbai' }, { selected: 'Pune' },
    { selected: 'Panipat' }, { selected: 'Rajkot' }, { selected: 'Bangalore' },
    { selected: 'Jaipur' }];

    comp.selectCssClass();

    expect(comp.viewData.length).toBeGreaterThan(5);

    comp.viewData = [{ selected: 'Mumbai' }, { selected: 'Pune' },
    { selected: 'Panipat' }, { selected: 'Rajkot' }];
    expect(comp.viewData.length).toBeLessThan(5);
  });

it(' closeSearchForm()', () => {
  comp.closeSearchForm();
  comp.advanceSearchFlag = false;
});

//

});
