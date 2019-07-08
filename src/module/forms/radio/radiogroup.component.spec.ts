/**
 * Created by pratik on 27/11/17.
 */
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AmexioRadioGroupComponent } from './radiogroup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';
describe('amexio-radio-group-component', () => {
  let comp: AmexioRadioGroupComponent;
  let fixture: ComponentFixture<AmexioRadioGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [AmexioRadioGroupComponent],
      providers: [CommonDataService,]
    });
    fixture = TestBed.createComponent(AmexioRadioGroupComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    comp.data = [
      {
        selected: true,
        tabindex: '0'
      }
    ];
  });

  it('check for condition', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });



  it('ngOnInit method', () => {
    comp.ngOnInit();
    comp.componentId = comp.createCompId('radiogroup', comp.name);
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'radiogroup');
    if (comp.defaultSelectedValue) 
    expect(comp.defaultSelectedValue).toBeDefined();
    // {
      comp.value = comp.defaultSelectedValue;
      comp.isValid = comp.allowblank;
      comp.isComponentValid.emit(comp.allowblank);
       
    comp.httpmethod = 'get';
    comp.httpurl = 'https/rgh'
    expect(comp.httpmethod).toBeDefined();
    expect(comp.httpurl.length).toBeDefined();
    comp.amxHttp.fetchData(comp.httpurl, comp.httpmethod).subscribe((response) => {
      comp.data = comp.getResponseData(response);
    });
     comp.data = [{tabindex: 'sdc'}]
    expect(comp.data).not.toBeNull(null);
    comp.data = comp.getResponseData(comp.data);
  });

  it('check checkValidity method', () => {
    comp.checkValidity();
    comp.isValid = true;
    expect(comp.isValid).toBe(true);
  });

  //on focus()
  it('on focus()', () => {
    //comp.showToolTip=true;
    let flag = true;
    comp.onFocus();
    expect(comp.tabFocus).toEqual(flag);
  })

  // get value method check 
  it('initialize innervalue', () => {
    comp.value = 'value';
    expect(comp['innerValue']).toEqual(comp.value);
  });



  //on onBlur()
  it('on onBlur()', () => {
    //comp.showToolTip=true;w

    comp.onBlur();
    expect(comp.tabFocus).toEqual(false);
  });

  // it('set value()', () => {
  //   //comp.showToolTip=true;w
  //    let v='';
  //    comp.innerValue = 'v';
  //   comp.value(v);
  //   // if (v !== this.innerValue) {
  //     expect(v).not.toEqual(comp.innerValue);
  //     comp.innerValue = v;
  //     comp.onChangeCallback(v);  
    // }

  // onRegistertouch method check
  it('register on touched', () => {
    let fn;
    comp.registerOnTouched(fn);
    expect(comp.onTouchedCallback).toEqual(fn);
  });

  // it('writeValue()', () => {
  //   // let value = 'sdf';
  //   // comp.writeValue(value);
  //   // comp.innerValue = 'amexio'
  //   // expect(value).not.toEqual(comp.innerValue);
  //   // comp.innerValue = value;
  //   // if(!(comp.checkDefaultValidation(comp.data))) {
  //   //   console.log("caught error")
  //   // }

  // });
  it('checkDefault Validation Method ', () => {
    let length = '';
    let viewData=[{
         selected: false,
         tabindex: '0',
         radioId: '',
         value: ''
    },
    {
       tabindex: '1',
      radioId: '',
      value: ''
 }
  ]
    comp.checkDefaultValidation(viewData);

    viewData[0].tabindex= '-1';
    comp.valuefield = 'value'
    viewData[0].radioId = 'radio' + '_' + viewData[comp.valuefield] + '_' + comp.getRandomString();
    // if (opt[this.valuefield] === this.innerValue || (opt.hasOwnProperty('selected') && opt.selected)) {
     comp.innerValue = '';
      expect(viewData[0][comp.valuefield]).toEqual(comp.innerValue);
      expect(viewData[0].hasOwnProperty('selected')).toEqual(true);
      expect(viewData[0].selected).toEqual(true);
      comp.isValid = true;
      viewData[0]['selected'] = true;
        viewData[0]['tabindex'] = '0';
        comp.isComponentValid.emit(true);
        
        // for else
        comp.innerValue = 'in'
        expect(viewData[0][comp.valuefield]).not.toEqual(comp.innerValue);
        expect(viewData[1].hasOwnProperty('selected')).not.toEqual(false);
        viewData[1].selected = false
        expect(viewData[1].selected).toEqual(false);
        viewData[1].selected = false;
        const tempArray: any = [];
        // if (option.selected === false) {
          expect(viewData[1].selected).toEqual(false)
          tempArray.push('0');
          tempArray.push('1');
          // if (tempArray.length === viewData.length) {
            expect(tempArray.length).toEqual(viewData.length)
            viewData[0].tabindex = '0';
     
      });
  
    // get value method check 
    it(' validate method', () => {
      let c = new FormControl;
      comp.validate(c);
      return ((!comp.allowblank && comp.value) || comp.allowblank) ? null : {
        jsonParseError: {
          valid: true,
        },
      };  
    });
    it(' onClick Method', () => {
      let row = {
        selected: false,
        tabindex: '0'
      };
      comp.onClick(row, event)
      event.preventDefault();
      for (const r of comp.data) {
        expect(r.selected).toEqual(false);
      }
      for (const r of comp.data) {
       expect(r).toEqual(row)
       r.selected = true;
       comp.isValid = true;
       comp.value = row[comp.valuefield];

       comp.listCopy = Object.assign([], row);
       delete comp.listCopy.tabindex;
       delete comp.listCopy.radioId;
       comp.onSelection.emit(comp.listCopy);
     
        }
    });
    it('check Selected Method', () => {
      let viewData =
        [{
          selected: true, tabindex: "0"
        }]
      comp.checkSelectedFlag(viewData);
      comp.innerValue = '';
      expect(comp.innerValue).toEqual('');
      expect(viewData[0].hasOwnProperty('selected')).toEqual(true);
      expect(viewData[0].selected).toEqual(true);
      comp.value = viewData[comp.valuefield];
      viewData[0].tabindex = '0';
      return;
    });

  });
