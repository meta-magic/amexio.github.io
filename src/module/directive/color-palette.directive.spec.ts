import { ColorPaletteDirective } from './color-palette.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ViewContainerRef, Component, DebugElement, ElementRef } from '@angular/core';
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

    it('getBGColorStyles()case1', () => {
      let obj = {amexioComponentId: 'amexio-card', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-card';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
      // navbar = 'amexio-navbar';
      // static  accordion = 'amexio-accordion';
      // static  panel = 'amexio-panel';
      // static  window = 'amexio-window';
      // static  dialogue = 'amexio-dialogue';
      // static  grid = 'amexio-grid';
      // static  box = 'amexio-box';
      // static  tab = 'amexio-tab';
      // static banner = 'amexio-banner';
      // static floatingpanel = 'amexio-floating-panel';
      dirIn.ColorPaletteConstants = {card:  c, cardce: c, }

      expect(dirIn.ColorPaletteConstants.card).toBeUndefined();
      expect(dirIn.ColorPaletteConstants.cardce).toBeUndefined();

      dirIn.ColorPaletteConstants = {card: 'amexio-card', cardce: 'amexio-card-ce'};
        dirIn.ColorPaletteConstants.card = 'amexio-card'
        dirIn.ColorPaletteConstants.cardce = 'amexio-card-ce'

        expect(dirIn.ColorPaletteConstants.card).toBeDefined();
        expect(dirIn.ColorPaletteConstants.cardce).toBeDefined(); 

    });

    it('getBGColorStyles()case2', () => {
      let obj = {amexioComponentId: 'amexio-banner', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-banner';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {banner:  c };
      expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
      dirIn.ColorPaletteConstants = {banner: 'amexio-banner' };
        dirIn.ColorPaletteConstants.banner = 'amexio-banner'
        expect(dirIn.ColorPaletteConstants.banner).toBeDefined();
    });

    it('getBGColorStyles()case3', () => {
      let obj = {amexioComponentId: 'amexio-navbar', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-navbar';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {navbar:  c };
      expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
      dirIn.ColorPaletteConstants = {navbar: 'amexio-navbar' };
        dirIn.ColorPaletteConstants.navbar = 'amexio-navbar'
        expect(dirIn.ColorPaletteConstants.navbar).toBeDefined();
    });

    it('getBGColorStyles()case4', () => {
      let obj = {amexioComponentId: 'amexio-accordion', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-accordion';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {accordion:  c };
      expect(dirIn.ColorPaletteConstants.accordion).toBeUndefined();
      dirIn.ColorPaletteConstants = {accordion: 'amexio-accordion' };
        dirIn.ColorPaletteConstants.accordion = 'amexio-accordion'
        expect(dirIn.ColorPaletteConstants.accordion ).toBeDefined();
    });

    it('getBGColorStyles()case5', () => {
      let obj = {amexioComponentId: 'amexio-panel', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-panel';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {panel:  c };
      expect(dirIn.ColorPaletteConstants.panel).toBeUndefined();
      dirIn.ColorPaletteConstants = {panel: 'amexio-panel' };
        dirIn.ColorPaletteConstants.panel = 'amexio-panel'
        expect(dirIn.ColorPaletteConstants.panel).toBeDefined();
    });

    it('getBGColorStyles()case6', () => {
      let obj = {amexioComponentId: 'amexio-floating-panel', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-floating-panel';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {floatingpanel:  c };
      expect(dirIn.ColorPaletteConstants.floatingpanel).toBeUndefined();
      dirIn.ColorPaletteConstants = {floatingpanel: 'amexio-floating-panel' };
        dirIn.ColorPaletteConstants.floatingpanel = 'amexio-floating-panel'
        expect(dirIn.ColorPaletteConstants.floatingpanel).toBeDefined();
    });

    it('getBGColorStyles()case7', () => {
      let obj = {amexioComponentId: 'amexio-window', setColorPalette: ()=>{}}
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-window';
      dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
       dirIn.ColorPaletteConstants = {window:  c };
      expect(dirIn.ColorPaletteConstants.window).toBeUndefined();
      dirIn.ColorPaletteConstants = {window: 'amexio-window' };
        dirIn.ColorPaletteConstants.window = 'amexio-window'
        expect(dirIn.ColorPaletteConstants.window).toBeDefined();
    });
// ###########################################

it('getGradientStyles()case2', () => {
  let obj = {amexioComponentId: 'amexio-banner', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-banner';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {banner:  c };
  expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
  dirIn.ColorPaletteConstants = {banner: 'amexio-banner' };
    dirIn.ColorPaletteConstants.banner = 'amexio-banner'
    expect(dirIn.ColorPaletteConstants.banner).toBeDefined();
});

it('getGradientStyles()case3', () => {
  let obj = {amexioComponentId: 'amexio-navbar', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-navbar';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {navbar:  c };
  expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
  dirIn.ColorPaletteConstants = {navbar: 'amexio-navbar' };
    dirIn.ColorPaletteConstants.navbar = 'amexio-navbar'
    expect(dirIn.ColorPaletteConstants.navbar).toBeDefined();
});

it('getGradientStyles()case4', () => {
  let obj = {amexioComponentId: 'amexio-accordion', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-accordion';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {accordion:  c };
  expect(dirIn.ColorPaletteConstants.accordion).toBeUndefined();
  dirIn.ColorPaletteConstants = {accordion: 'amexio-accordion' };
    dirIn.ColorPaletteConstants.accordion = 'amexio-accordion'
    expect(dirIn.ColorPaletteConstants.accordion ).toBeDefined();
});

it('getGradientStyles()case5', () => {
  let obj = {amexioComponentId: 'amexio-panel', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-panel';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {panel:  c };
  expect(dirIn.ColorPaletteConstants.panel).toBeUndefined();
  dirIn.ColorPaletteConstants = {panel: 'amexio-panel' };
    dirIn.ColorPaletteConstants.panel = 'amexio-panel'
    expect(dirIn.ColorPaletteConstants.panel).toBeDefined();
});

it('getGradientStyles()case6', () => {
  let obj = {amexioComponentId: 'amexio-floating-panel', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-floating-panel';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {floatingpanel:  c };
  expect(dirIn.ColorPaletteConstants.floatingpanel).toBeUndefined();
  dirIn.ColorPaletteConstants = {floatingpanel: 'amexio-floating-panel' };
    dirIn.ColorPaletteConstants.floatingpanel = 'amexio-floating-panel'
    expect(dirIn.ColorPaletteConstants.floatingpanel).toBeDefined();
});

it('getGradientStyles()case7', () => {
  let obj = {amexioComponentId: 'amexio-window', setColorPalette: ()=>{}}
  dirIn.hostComponent = obj
  dirIn.hostComponent.amexioComponentId = 'amexio-window';
  dirIn.getGradientStyles(dirIn.hostComponent);
  let c;
   dirIn.ColorPaletteConstants = {window:  c };
  expect(dirIn.ColorPaletteConstants.window).toBeUndefined();
  dirIn.ColorPaletteConstants = {window: 'amexio-window' };
    dirIn.ColorPaletteConstants.window = 'amexio-window'
    expect(dirIn.ColorPaletteConstants.window).toBeDefined();
});




it('getGradientStyles()', () => {
      let obj = {amexioComponentId: 'amexio-card', setColorPalette: ()=>{}} 
      dirIn.hostComponent = obj
      dirIn.hostComponent.amexioComponentId = 'amexio-card';
      // dirIn.getBGColorStyles(dirIn.hostComponent);
      let c;
      dirIn.ColorPaletteConstants = {card:  c, cardce: c}
 

      dirIn.getGradientStyles(dirIn.hostComponent);
      // case (ColorPaletteConstants.card || ColorPaletteConstants.cardce): {

      expect(dirIn.ColorPaletteConstants.card).toBeUndefined();
      expect(dirIn.ColorPaletteConstants.cardce).toBeUndefined();

      dirIn.ColorPaletteConstants = {card: 'amexio-card', cardce: 'amexio-card-ce'};
        dirIn.ColorPaletteConstants.card = 'amexio-card'
        dirIn.ColorPaletteConstants.cardce = 'amexio-card-ce'

        expect(dirIn.ColorPaletteConstants.card).toBeDefined(); 

        expect(dirIn.ColorPaletteConstants.cardce).toBeDefined(); 
    
    });

   
});
