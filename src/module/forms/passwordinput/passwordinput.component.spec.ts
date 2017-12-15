import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {AmexioPasswordComponent} from "./passwordinput.component";
import {FormsModule} from "@angular/forms";


describe('amexio-text-input' , ()=> {
  let comp: AmexioPasswordComponent;
  let fixture: ComponentFixture<AmexioPasswordComponent>;
  let de: DebugElement;    // => Handle to to Components DOM instance
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioPasswordComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(AmexioPasswordComponent);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
    comp = fixture.componentInstance;


    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
  });

  //Check if correct field label is applied
    it('should display correct label',()=>{
        let labelValue = 'UserName';
        comp.fieldLabel = labelValue;     // => Set the field label
        fixture.detectChanges();        // Fire Change
        expect(el.textContent).toContain(labelValue);  // check ?
    });

    // More test cases here


});
