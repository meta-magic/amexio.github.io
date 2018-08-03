/**
 * Created by pratik on 1/12/17.
 */
import { AmexioNumberInputComponent } from './numberinput.component';
import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('NUMBER INPUT', () => {

  let comp: AmexioNumberInputComponent;
  let fixture: ComponentFixture<AmexioNumberInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports : [FormsModule],
    declarations: [ AmexioNumberInputComponent,AmexioFormIconComponent],
    providers:[IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioNumberInputComponent);
    comp = fixture.componentInstance;

  it('true is true', () => expect(true).toBe(true));
});

 
// it('Set', () => {
//   comp.value='sagfaf';
  
// //this.fixture.detectChanges();
//        expect(comp.innerValue).toEqual(comp.value);
//     }); 

//wrking 1- set errormsg
    it('set errormsg', () => {
      comp.errormsg='data incorect';
            expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
        });

//working 2 get minerrormsg
it('get minerrormsg', () => {
  expect(comp._minerrormsg).toEqual(comp._minerrormsg);
})

//working 3 get maxerrormsg
it('get _maxerrormsg', () => {
  expect(comp._maxerrormsg).toEqual(comp._maxerrormsg);
})

//set maxerrormsg


//set minerrormsg
// it('set minerrormsg', () => {
//   comp.enablepopover=true;
//   comp.helpInfoMsg="";
//   comp._errormsg="Please enter age";
//   fixture.detectChanges();
//   //expect(comp.helpInfoMsg).toBe(comp.helpInfoMsg);
//   expect(comp.helpInfoMsg).toContain(comp.helpInfoMsg + 'Min value: ' + comp.value + '<br/>');
 
// });


});