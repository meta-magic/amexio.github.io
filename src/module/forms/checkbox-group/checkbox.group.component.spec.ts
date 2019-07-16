/**
 * Created by kedar 26/6/2019.
 */

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';
import { AmexioCheckBoxComponent } from '../checkbox/checkbox.component';
import { CheckboxComponent } from './checkbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('amexio-checkbox-group', () => {
  let comp: AmexioCheckBoxGroupComponent;
  let fixture: ComponentFixture<AmexioCheckBoxGroupComponent>;
  let DataService: CommonDataService;
  let httpMock: HttpTestingController;
  let formParameter: FormControl;

  let responsedata: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [AmexioCheckBoxGroupComponent, CheckboxComponent],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioCheckBoxGroupComponent);
    comp = fixture.componentInstance;
    DataService = TestBed.get(CommonDataService);
    httpMock = TestBed.get(HttpTestingController);
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
    comp.required = false;
  });

  //check variables 
  it('check variables ', () => {

    let i = [];
    expect(comp.selectedCheckBox).toBeUndefined();
  });


  // it('checking ngOnInit() method', () => {

  //   let value = comp.value;
  //   let resp: any;


  //   comp.ngOnInit();
  //   comp.componentId = comp.createCompId('checkboxgroup', comp.name);

  //   comp.data =
  //     {
  //       "codeData": [
  //         {
  //           'id': 1,
  //           'name': 'kedar'
  //         }
  //       ]
  //     }

  //   comp.datareader = "codeData";

  //   expect(comp.datareader).toBe('codeData');
  //   //   expect(comp.data).toBe({
  //   //     "codeData": [
  //   //       {
  //   //       'id':1,
  //   //       'name':'kedar'
  //   //     }
  //   //   ]
  //   // });
  // });

  it('emitData if condition', () => {
    comp.data = [{
      "language": "Angular 2",
      "checked": true
    }];
    comp.emitData();
    comp.SelectedCheckBox = [];
    comp.data.forEach((node: any) => {
      expect(node.checked).toEqual(true);
      comp.SelectedCheckBox.push(node);
    });
    comp.onSelection.emit(comp.SelectedCheckBox);
  });

  it('emitData else condition', () => {
    comp.SelectedCheckBox = [];
    comp.data = [{
      "language": "Angular 2",
      "checked": false
    }];
    comp.emitData();
    comp.data.forEach((node: any) => {
      expect(node.checked).toEqual(false);
    });
    comp.onSelection.emit(comp.SelectedCheckBox);
  });

  it('contains', () => {
    comp.displayfield = "language";
    let value = {
      "language": "Angular 2",
      "checked": false
    }
    comp['_model'] = [{
      "language": "Angular 2",
      "checked": false
    }];
    comp.contains(value);
    expect(comp['_model'] instanceof Array).toEqual(true);
    comp['_model'].forEach((obj: any) => {
      expect(obj[comp.displayfield]).toEqual(value[comp.displayfield]);
      return true;
    });
  });

  it('contains if-else-if condition', () => {
    comp.displayfield = "language";
    let value = {
      "language": "Angular 2",
      "checked": false
    }
    comp['_model'] = [{
      "language": "Angular",
      "checked": false
    }];
    comp.contains(value);
    expect(comp['_model'] instanceof Array).toEqual(true);
    comp['_model'].forEach((obj: any) => {
      expect(obj[comp.displayfield]).not.toEqual(value[comp.displayfield]);
    });
    comp['_model'] = {};
    expect(comp['_model'] instanceof Array).toEqual(false);

  });
  it('contains else condition', () => {
    comp.displayfield = "language";
    let value = {
      "language": "Angular 2",
      "checked": false
    }
    comp['_model'] = {};
    comp.contains(value);
    expect(comp['_model'] instanceof Array).toEqual(false);
    return false;
  });



  // inject(
  //   [HttpTestingController, DataService],
  //   (httpMock: HttpTestingController, DataService: CommonDataService) => {
  //     const mockUsers = [
  //       { name: 'Bob', website: 'www.yessss.com' },
  //       { name: 'Juliette', website: 'nope.com' }
  //     ];

  //     DataService.fetchData((comp.httpurl, comp.httpmethod).subscribe((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Response:
  //           expect(event.body).toEqual(mockUsers);
  //       }
  //     });
  //     const mockReq = httpMock.expectOne(DataService.url);

  //     expect(mockReq.cancelled).toBeFalsy();
  //     expect(mockReq.request.responseType).toEqual('json');
  //     mockReq.flush(mockUsers);

  //     httpMock.verify();
  //   });

  it('getResponseData() if condition', () => {
    let httpResponse = {
      "data": [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]
    }
    comp.datareader = "data";
    comp.getResponseData(httpResponse);
    responsedata = httpResponse;

    // if (this.datareader != null) {
    expect(comp.datareader).not.toBeNull();
    const dr = comp.datareader.split('.');
    for (const ir of dr) {
      responsedata = responsedata[ir];
    };
    comp.datareader = '';
    expect(comp.datareader).not.toBeNull();
    responsedata = httpResponse;
  });

  it('getResponseData() else condition', () => {
    let httpResponse =
      [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]

    comp.datareader = '';
    expect(comp.datareader).not.toBeNull();
    responsedata = httpResponse;
  });

  it('ngOnInit() else', () => {
    comp.ngOnInit();

    expect(comp.httpmethod).not.toBeDefined();
    expect(comp.httpurl).not.toBeDefined();

    expect(comp.httpmethod).toBeUndefined();
    expect(comp.httpurl).toBeUndefined();

    // expect(comp.httpmethod).not.toBeNull();
    // expect(comp.httpurl).not.toBeNull();  
  });


  it('ngOnInit() second elseif else', () => {
    comp.ngOnInit();
    // } else if (this.data && this.datareader) {
    expect(comp.data).not.toBeDefined();
    expect(comp.datareader).not.toBeDefined();

  });



  it('ngOnInit()', () => {
    comp.ngOnInit();
    comp.componentId = comp.createCompId('checkboxgroup', comp.name);
    let reponseData: any;
    comp.httpmethod = "get";
    comp.httpurl = "sample.json"
    expect(comp.httpmethod).toBeDefined();
    expect(comp.httpurl).toBeDefined();
    expect(comp.httpmethod).not.toBeNull();
    expect(comp.httpurl).not.toBeNull();
    comp['httpService'].fetchData(comp.httpurl, comp.httpmethod).subscribe((response) => {
      reponseData = response;
    }, (error) => {
    }, () => {
      comp.data = comp.getResponseData(reponseData);
    });
  });



  it('ngOnInit() second elseif', () => {
    comp.data = {
      "data": [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]
    }
    comp.datareader = "data";
    comp.ngOnInit();
    //  expect(comp.data).toBeDefined();
    //  expect(comp.datareader).toBeDefined();
    comp.data = comp.getResponseData(comp.data);

  });

  //check validate 
  it('check validate if condition', () => {
    comp['_model'] = [{
      "language": "Angular 2",
      "checked": false
    }];
    comp.required = true;
    comp.validate(formParameter);
    expect(comp.required).toBe(true);
    expect(comp['_model']).not.toBeNull();
    expect(comp['_model'].length).toBeGreaterThan(0);

    return {
      jsonParseError: {
        valid: true,
      },
    };
  });

  //
  it('check validate else condition', () => {
    comp['_model'] = [{
      "language": "Angular 2",
      "checked": false
    }];
    comp.required = false;
    comp.validate(formParameter);
    expect(comp.required).toBe(false);
    expect(comp['_model']).not.toBeNull();
    expect(comp['_model'].length).toBeGreaterThan(0);
    expect(comp.required).toBe(false);
    return null;
  });

  it('check validate else2 condition', () => {
    comp['_model'] = null;
    comp.required = true;
    comp.validate(formParameter);
    expect(comp.required).toBe(true);
    expect(comp['_model']).toBeNull();
    comp['_model'] = [];
    expect(comp['_model'].length).not.toBeGreaterThan(0);
    expect(comp.required).toBe(true);
    return {
      jsonParseError: {
        valid: true,
      },
    };
  });
});
