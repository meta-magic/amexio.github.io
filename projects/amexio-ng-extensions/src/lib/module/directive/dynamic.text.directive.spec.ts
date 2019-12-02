import { trigger } from '@angular/animations';
import { AmexioPaneModule } from '../standard/panes/amexio.pane.module';
import { Component, DebugElement, Renderer2,
  ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicTextDirective } from './dynamic.text.directive';
/**
* Created by Manisha on 15/10/19.
*/
// Simple test component that will not in the actual app
@Component({
  selector: 'amexio-dynamic-text',
  template: `
  <amexio-label amexio-dynamic-text [placeholder]="placeholderData">
    Dear customer,
    Warm Regards,
    regardsBy
  </amexio-label>
  `
})

class TestDynamicTextComponent {
  placeholderData: any;
  constructor() {
    this.placeholderData = {
      regardsBy: 'HDFC Manager',
    };
  }
}

describe('Directive: amexio-dynamic-text', () => {
  let comp: TestDynamicTextComponent;

  let fixture: ComponentFixture<TestDynamicTextComponent>;
  let inputEl: HTMLElement;
  let inputDEl: DebugElement;
  let dirIn: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicTextDirective,
        TestDynamicTextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [Renderer2, ViewContainerRef],
      imports: [AmexioPaneModule],
    });
    fixture = TestBed.createComponent(TestDynamicTextComponent);
    comp = fixture.componentInstance;
    const directiveEl = fixture.debugElement.query(By.directive(DynamicTextDirective));
    dirIn = directiveEl.injector.get(DynamicTextDirective);
    inputEl = fixture.debugElement.query(By.css('amexio-label')).nativeElement as HTMLElement;
    inputDEl = fixture.debugElement.query(By.css('amexio-label'));
  });

  it('defined: directive created', () => {
    expect(comp).toBeTruthy();
  });

  it('applied : ', () => {
    fixture.detectChanges();
    //console.log(inputDEl.nativeElement.innerText);
    expect(inputDEl.nativeElement.innerText).toContain('HDFC Manager');
  });

});
