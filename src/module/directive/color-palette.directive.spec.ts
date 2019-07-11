import { ColorPaletteDirective } from './color-palette.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ViewContainerRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Simple test component that will not in the actual app
@Component({
    selector: 'testColor',
    template: `
  <input type="text" amexioColorPalette>
  `
})
class colorTestComponent {
}

describe('Directive: Color', () => {
    let comp: colorTestComponent;
    let fixture: ComponentFixture<colorTestComponent>;
    let inputEl: DebugElement;
    let dirIn: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ColorPaletteDirective, colorTestComponent],
            providers: [HttpClient, HttpHandler, ViewContainerRef],

        });
        fixture = TestBed.createComponent(colorTestComponent);
        comp = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(ColorPaletteDirective));
        expect(directiveEl).not.toBeNull();

        dirIn = directiveEl.injector.get(ColorPaletteDirective);
        inputEl = fixture.debugElement.query(By.css('input'));
        dirIn.gradient = true;

    });
    it('should create component', () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const p: HTMLElement = debugEl.querySelector('p');
    });


    it('vibrantThemeCall method', () => {

        dirIn.gradient = true;
        dirIn.vibrantThemeCall();
        setTimeout(() => {
            dirIn.getBGColorStyles(dirIn.hostComponent);
        }, 1000);

        dirIn.gradient = false;
        dirIn.vibrantThemeCall();
        setTimeout(() => {
            dirIn.getGradientStyles(dirIn.hostComponent);
        }, 1000);
    });

});
