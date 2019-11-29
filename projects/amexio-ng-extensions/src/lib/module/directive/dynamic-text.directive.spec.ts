import { Component, DebugElement, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicTextDirective } from './dynamic-text.directive';
 /**
 * Created by Manisha on 15/10/19.
 */
// Simple test component that will not in the actual app
@Component({
    selector: 'amexio-route-animation',
    template: `
      <div amexio-dynamic-text [placeholder]="placeholdervalue">greeting </div>
  `
})

class TestDynamicTextComponent {
    placeholdervalue = {greeting: "Hi"};
}

fdescribe('Directive: amexio-dynamic-text', () => {
    let comp: DynamicTextDirective;

    let fixture: ComponentFixture<DynamicTextDirective>;
    let inputEl: DebugElement;
    let dirIn: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicTextDirective, TestDynamicTextComponent],
            providers: [Renderer2, ViewContainerRef],
            imports: [],
        });
        // fixture = TestBed.createComponent(TestDynamicTextComponent);
        // comp = fixture.componentInstance;
        // const directiveEl = fixture.debugElement.query(By.directive(DynamicTextDirective));
        // expect(directiveEl).not.toBeNull();
        // dirIn = directiveEl.injector.get(DynamicTextDirective);
        // inputEl = fixture.debugElement.query(By.css('input'));


    });

});
