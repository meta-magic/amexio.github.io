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
        dirIn.themejson = [
            {
              themeName: 'amexio-primary-darker-color',
            },
            {
              themeName: 'amexio-theme-color1',
            },
            {
              themeName: 'amexio-theme-color2',
            },
            {
              themeName: 'amexio-theme-color3',
            },
            {
              themeName: 'amexio-theme-color4',
            },
            {
              themeName: 'amexio-theme-color5',
            },
            {
              themeName: 'amexio-theme-color6',
            }];
          dirIn.gradientThemeJson = [
            {
              themeName: 'amexio-primary-darker-color-Gradient',
            },
            {
              themeName: 'amexio-theme-color1-Gradient',
            },
            {
              themeName: 'amexio-theme-color2-Gradient',
            },
            {
              themeName: 'amexio-theme-color3-Gradient',
            },
            {
              themeName: 'amexio-theme-color4-Gradient',
            },
            {
              themeName: 'amexio-theme-color5-Gradient',
            },
            {
              themeName: 'amexio-theme-color6-Gradient',
            },
          ];
      

    });
    it('should create component', () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const p: HTMLElement = debugEl.querySelector('p');
    });


    it('vibrantThemeCall method', () => {

        dirIn.gradient = true;
        dirIn.vibrantThemeCall();
        expect(dirIn.gradient).toEqual(true);
        setTimeout(() => {
            dirIn.getBGColorStyles(dirIn.hostComponent);
        }, 1000);

        dirIn.gradient = false;
        dirIn.vibrantThemeCall();
        expect(dirIn.gradient).toEqual(false);
        setTimeout(() => {
            dirIn.getGradientStyles(dirIn.hostComponent);
        }, 1000);
    });

   
});
