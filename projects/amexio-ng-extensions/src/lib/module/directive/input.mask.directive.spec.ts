import { AmexioFormsModule } from './../standard/forms/amexio.forms.module';

import { Component, DebugElement, Renderer2,
  ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmexioInputPatternDirective } from './input.mask.directive';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'test-input-mask',
  template: `
  <amexio-text-input 
  [pattern]="'\(\d{3}\)\s\d{3}-\d{4}'"  
  [place-holder]="'(XXX) XXX-XXXX'"  
  [amexio-mask-pattern]="'(XXX) XXX-XXXX'" 
  [field-label]="'Telephone'"
  [(ngModel)]="telephone">
  </amexio-text-input>
  `
})

class TestInputPatternDirective {
 
}

fdescribe('Directive: amexio-input-mask', () => {
  let comp: TestInputPatternDirective;

  let fixture: ComponentFixture<TestInputPatternDirective>;
  let inputEl: HTMLElement;
  let inputDEl: HTMLInputElement;
  let dirIn: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioInputPatternDirective,
        TestInputPatternDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ViewContainerRef],
      imports: [AmexioFormsModule, FormsModule],
    });
    fixture = TestBed.createComponent(TestInputPatternDirective);
    comp = fixture.componentInstance;
    const directiveEl = fixture.debugElement.query(By.directive(AmexioInputPatternDirective));
    dirIn = directiveEl.injector.get(AmexioInputPatternDirective);
    inputEl = fixture.debugElement.query(By.css('amexio-text-input')).nativeElement as HTMLElement;
    inputDEl = fixture.debugElement.query(By.css('amexio-text-input')).nativeElement as HTMLInputElement;
  });

  it('defined: directive created', () => {
    expect(comp).toBeTruthy();
  });

  xit('applied : ', () => {
      inputDEl.value = '12345667891';
      inputDEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //console.log(inputEl);
      console.log(inputDEl);
      expect(inputDEl.value).toBe('(123) 456-7891');
  });

});
