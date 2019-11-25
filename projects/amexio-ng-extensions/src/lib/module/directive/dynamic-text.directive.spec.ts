import { Component, DebugElement, element, Renderer2, ViewContainerRef } from '@angular/core';
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
class DynamicTextTestComponent {
    placeholdervalue = {greeting: "Hi"};
}

describe('Directive: amexio-dynamic-text', () => {
    let comp: DynamicTextDirective;

    let fixture: ComponentFixture<DynamicTextDirective>;
    let inputEl: DebugElement;
    let dirIn: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicTextDirective, DynamicTextTestComponent],
            providers: [Renderer2, ViewContainerRef],
            imports: [],

        });
        fixture = TestBed.createComponent(DynamicTextTestComponent);
        comp = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(DynamicTextDirective));
        expect(directiveEl).not.toBeNull();
        dirIn = directiveEl.injector.get(DynamicTextDirective);
        inputEl = fixture.debugElement.query(By.css('input'));
        // dirIn.themeStyle = 'round-edge';

    });

    it('ngAfterContentChecked()', () => {
     dirIn.jsonData = {greeting: "Hi"}
     let element = {nodeType: 3, textContent: 'greeting'};
     dirIn.ngAfterContentChecked();

       expect(dirIn.ngAfterContentChecked()).toHaveBeenCalled;
    });

    it('iterateHTMLDOM() positive condition', () => {
        dirIn.jsonData = {greeting: "Hi"}
        let element = {nodeType: 3, textContent: 'greeting', hasChildNodes: () => {
            return true
        }};
        let str = element.textContent;
        const strarr = element.textContent.split(' ');

        dirIn.iterateHTMLDOM(element);

        expect(element.nodeType).toEqual(3);
        for(let [key, value] of Object.entries(dirIn.jsonData)) {
                  strarr.forEach((strelement: any) => {
                    if (key === strelement) {
                        str = str.replace(key, value as string);
                        expect(key).toEqual(strelement);
                    }
                });
            }
       });

    it('iterateHTMLDOM() negative condition1', () => {
        dirIn.jsonData = {greeting: "Hi"}
        let element = {nodeType: 5, childNodes: [],textContent: 'greeting', hasChildNodes: () => {
            return true
        }};
        dirIn.iterateHTMLDOM(element);
           // const hostelement = this.viewContainerRef.element.nativeElement;
          // this.iterateHTMLDOM(hostelement);


          //  if (element.nodeType === 3) {
            expect(element.hasChildNodes()).toHaveBeenCalled
        expect(element.hasChildNodes()).toEqual(true);
        expect(element.nodeType).not.toEqual(3);

    });


    //    it('iterateHTMLDOM() negative condition1.2', () => {
    //     dirIn.jsonData = {greeting: "Hi"}
    //     let element = {nodeType: 5, textContent: 'greeting', hasChildNodes: () => {
    //         return false
    //     }};
    //     dirIn.iterateHTMLDOM(element);
    //        // const hostelement = this.viewContainerRef.element.nativeElement;
    //       // this.iterateHTMLDOM(hostelement);


    //       //  if (element.nodeType === 3) {
    //         expect(element.hasChildNodes()).toHaveBeenCalled
    //         expect(element.hasChildNodes()).toEqual(false);
 
    //         }
    //    });
});
