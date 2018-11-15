// /**
//  * Created by pratik on 1/12/17.
//  */
// import { AmexioTypeAheadComponent } from './typeahead.component';
// import { AmexioFormIconComponent } from '../icon/icon.component';
// import { FormsModule } from '@angular/forms';
// import { IconLoaderService, CommonDataService } from '../../../index';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// describe('TypeAhead', () => {

//   let comp: AmexioTypeAheadComponent;
//   let fixture: ComponentFixture<AmexioTypeAheadComponent>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [AmexioTypeAheadComponent, AmexioFormIconComponent],
//       providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler]
//     });
//     fixture = TestBed.createComponent(AmexioTypeAheadComponent);
//     comp = fixture.componentInstance;

//     it('true is true', () => expect(true).toBe(true));
//   });


//   // it('initialize innervalue', () => {
//   //   comp.value='sagfaf'; 
//   //        expect(comp['innerValue']).toEqual(comp.value);
//   //     }); 


//   // it('get innervalue', () => {
//   //   comp.value='sagfaf';

//   // //this.fixture.detectChanges();
//   //        expect(comp.value()).toEqual(comp['innerValue']);
//   //     }); 

//   //wrking 1- set errormsg
//   it('set errormsg', () => {
//     comp.errormsg = 'data incorect';
//     expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
//   });

//   it('get errormsg', () => {
//     expect(comp.errormsg).toEqual(comp._errormsg);
//   });
//   it('check for isValid', () => {
//     comp.isValid = true;
//     expect(comp.isValid).toEqual(true);
//   });
//   it('check for isComponentValid', () => {
//     comp.isComponentValid.subscribe((g: any) => {
//       expect(comp.allowblank).toEqual(g);
//     });
//   });
//   it('get errormsg', () => {
//     //  comp.errormsg='data incorect';
//     expect(comp.errormsg).toEqual(comp._errormsg);
//   });
//   it('check onblur()', () => {
//     comp.onblur();
//     comp.onBlur.subscribe((g: any) => {
//       expect(comp.value).toEqual(g);
//     });
//   });
//   // it('set data',() => {
//   // comp.data(fixture);
//   //   expect(comp.data()).toContain(comp._data);
//   // });
//       it('register on change', () => {
//         let fn: any;
//         comp.registerOnChange(fn);
//         expect(comp['onChangeCallback']).toEqual(fn);
//       });


//       it('variable posixUp', () => {
//         comp.posixUp = false;
//       })

//       it('register on touched', () => {
//         let fn: any;
//         comp.registerOnTouched(fn);
//         expect(comp['onTouchedCallback']).toEqual(fn);
//       });
//       // it('check onFocus ', () => {
//       //   let focus = comp.onFocus(jasmine.any(fixture));

//       //   // comp.showToolTip = true;
//       //   // comp.posixUp = comp.focus;
//       //   comp.focus.subscribe((g: any) => {
//       //     expect(comp.value).toEqual(g);
//       //   });
//       // });
//         it('initialize innervalue', () => {
//           comp.value = 'sagfaf';
//           expect(comp['innerValue']).toEqual(comp.value);
//         });


       
//         it('get helpinfomsg', () => {
//           comp.helpInfoMsg = "test";
//           expect(comp.helpInfoMsg).toEqual(comp.helpInfoMsg);
//         });
//       });
  
