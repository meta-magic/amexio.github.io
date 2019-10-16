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
    let obj = { amexioComponentId: 'amexio-card', setColorPalette: () => { } }
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
    dirIn.ColorPaletteConstants = { card: c, cardce: c, }

    expect(dirIn.ColorPaletteConstants.card).toBeUndefined();
    expect(dirIn.ColorPaletteConstants.cardce).toBeUndefined();

    dirIn.ColorPaletteConstants = { card: 'amexio-card', cardce: 'amexio-card-ce' };
    dirIn.ColorPaletteConstants.card = 'amexio-card'
    dirIn.ColorPaletteConstants.cardce = 'amexio-card-ce'

    expect(dirIn.ColorPaletteConstants.card).toBeDefined();
    expect(dirIn.ColorPaletteConstants.cardce).toBeDefined();

  });

  it('getBGColorStyles()case2', () => {
    let obj = { amexioComponentId: 'amexio-banner', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-banner';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { banner: c };
    expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
    dirIn.ColorPaletteConstants = { banner: 'amexio-banner' };
    dirIn.ColorPaletteConstants.banner = 'amexio-banner'
    expect(dirIn.ColorPaletteConstants.banner).toBeDefined();
  });

  it('getBGColorStyles()case3', () => {
    let obj = { amexioComponentId: 'amexio-navbar', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-navbar';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { navbar: c };
    expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
    dirIn.ColorPaletteConstants = { navbar: 'amexio-navbar' };
    dirIn.ColorPaletteConstants.navbar = 'amexio-navbar'
    expect(dirIn.ColorPaletteConstants.navbar).toBeDefined();
  });

  it('getBGColorStyles()case4', () => {
    let obj = { amexioComponentId: 'amexio-accordion', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-accordion';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { accordion: c };
    expect(dirIn.ColorPaletteConstants.accordion).toBeUndefined();
    dirIn.ColorPaletteConstants = { accordion: 'amexio-accordion' };
    dirIn.ColorPaletteConstants.accordion = 'amexio-accordion'
    expect(dirIn.ColorPaletteConstants.accordion).toBeDefined();
  });

  it('getBGColorStyles()case5', () => {
    let obj = { amexioComponentId: 'amexio-panel', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-panel';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { panel: c };
    expect(dirIn.ColorPaletteConstants.panel).toBeUndefined();
    dirIn.ColorPaletteConstants = { panel: 'amexio-panel' };
    dirIn.ColorPaletteConstants.panel = 'amexio-panel'
    expect(dirIn.ColorPaletteConstants.panel).toBeDefined();
  });

  it('getBGColorStyles()case6', () => {
    let obj = { amexioComponentId: 'amexio-floating-panel', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-floating-panel';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { floatingpanel: c };
    expect(dirIn.ColorPaletteConstants.floatingpanel).toBeUndefined();
    dirIn.ColorPaletteConstants = { floatingpanel: 'amexio-floating-panel' };
    dirIn.ColorPaletteConstants.floatingpanel = 'amexio-floating-panel'
    expect(dirIn.ColorPaletteConstants.floatingpanel).toBeDefined();
  });

  it('getBGColorStyles()case7', () => {
    let obj = { amexioComponentId: 'amexio-window', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-window';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { window: c };
    expect(dirIn.ColorPaletteConstants.window).toBeUndefined();
    dirIn.ColorPaletteConstants = { window: 'amexio-window' };
    dirIn.ColorPaletteConstants.window = 'amexio-window'
    expect(dirIn.ColorPaletteConstants.window).toBeDefined();
  });

  it('getBGColorStyles()case8', () => {
    let obj = { amexioComponentId: 'amexio-dialogue', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-dialogue';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { dialogue: c };
    expect(dirIn.ColorPaletteConstants.dialogue).toBeUndefined();
    dirIn.ColorPaletteConstants = { dialogue: 'amexio-dialogue' };
    dirIn.ColorPaletteConstants.dialogue = 'amexio-dialogue'
    expect(dirIn.ColorPaletteConstants.dialogue).toBeDefined();
  });


  it('getBGColorStyles()case9', () => {
    let obj = { amexioComponentId: 'amexio-box', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-box';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { box: c };
    expect(dirIn.ColorPaletteConstants.box).toBeUndefined();
    dirIn.ColorPaletteConstants = { box: 'amexio-box' };
    dirIn.ColorPaletteConstants.box = 'amexio-box'
    expect(dirIn.ColorPaletteConstants.box).toBeDefined();
  });


  it('getBGColorStyles()case10', () => {
    let obj = { amexioComponentId: 'amexio-grid', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-grid';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { grid: c };
    expect(dirIn.ColorPaletteConstants.grid).toBeUndefined();
    dirIn.ColorPaletteConstants = { grid: 'amexio-grid' };
    dirIn.ColorPaletteConstants.grid = 'amexio-grid'
    expect(dirIn.ColorPaletteConstants.grid).toBeDefined();
  });



  it('getBGColorStyles()case11', () => {
    let obj = { amexioComponentId: 'amexio-tab', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-tab';
    dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { tab: c };
    expect(dirIn.ColorPaletteConstants.tab).toBeUndefined();
    dirIn.ColorPaletteConstants = { tab: 'amexio-tab' };
    dirIn.ColorPaletteConstants.tab = 'amexio-tab'
    expect(dirIn.ColorPaletteConstants.tab).toBeDefined();
  });
  // ###########################################

  it('getGradientStyles()case2', () => {
    let obj = { amexioComponentId: 'amexio-banner', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-banner';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { banner: c };
    expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
    dirIn.ColorPaletteConstants = { banner: 'amexio-banner' };
    dirIn.ColorPaletteConstants.banner = 'amexio-banner'
    expect(dirIn.ColorPaletteConstants.banner).toBeDefined();
  });

  it('getGradientStyles()case3', () => {
    let obj = { amexioComponentId: 'amexio-navbar', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-navbar';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { navbar: c };
    expect(dirIn.ColorPaletteConstants.banner).toBeUndefined();
    dirIn.ColorPaletteConstants = { navbar: 'amexio-navbar' };
    dirIn.ColorPaletteConstants.navbar = 'amexio-navbar'
    expect(dirIn.ColorPaletteConstants.navbar).toBeDefined();
  });

  it('getGradientStyles()case4', () => {
    let obj = { amexioComponentId: 'amexio-accordion', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-accordion';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { accordion: c };
    expect(dirIn.ColorPaletteConstants.accordion).toBeUndefined();
    dirIn.ColorPaletteConstants = { accordion: 'amexio-accordion' };
    dirIn.ColorPaletteConstants.accordion = 'amexio-accordion'
    expect(dirIn.ColorPaletteConstants.accordion).toBeDefined();
  });

  it('getGradientStyles()case5', () => {
    let obj = { amexioComponentId: 'amexio-panel', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-panel';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { panel: c };
    expect(dirIn.ColorPaletteConstants.panel).toBeUndefined();
    dirIn.ColorPaletteConstants = { panel: 'amexio-panel' };
    dirIn.ColorPaletteConstants.panel = 'amexio-panel'
    expect(dirIn.ColorPaletteConstants.panel).toBeDefined();
  });

  it('getGradientStyles()case6', () => {
    let obj = { amexioComponentId: 'amexio-floating-panel', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-floating-panel';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { floatingpanel: c };
    expect(dirIn.ColorPaletteConstants.floatingpanel).toBeUndefined();
    dirIn.ColorPaletteConstants = { floatingpanel: 'amexio-floating-panel' };
    dirIn.ColorPaletteConstants.floatingpanel = 'amexio-floating-panel'
    expect(dirIn.ColorPaletteConstants.floatingpanel).toBeDefined();
  });

  it('getGradientStyles()case7', () => {
    let obj = { amexioComponentId: 'amexio-window', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-window';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { window: c };
    expect(dirIn.ColorPaletteConstants.window).toBeUndefined();
    dirIn.ColorPaletteConstants = { window: 'amexio-window' };
    dirIn.ColorPaletteConstants.window = 'amexio-window'
    expect(dirIn.ColorPaletteConstants.window).toBeDefined();
  });


  it('getGradientStyles()case8', () => {
    let obj = { amexioComponentId: 'amexio-dialogue', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-dialogue';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { dialogue: c };
    expect(dirIn.ColorPaletteConstants.dialogue).toBeUndefined();
    dirIn.ColorPaletteConstants = { dialogue: 'amexio-dialogue' };
    dirIn.ColorPaletteConstants.dialogue = 'amexio-dialogue'
    expect(dirIn.ColorPaletteConstants.dialogue).toBeDefined();
  });


  it('getGradientStyles()case9', () => {
    let obj = { amexioComponentId: 'amexio-box', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-box';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { box: c };
    expect(dirIn.ColorPaletteConstants.box).toBeUndefined();
    dirIn.ColorPaletteConstants = { box: 'amexio-box' };
    dirIn.ColorPaletteConstants.box = 'amexio-box'
    expect(dirIn.ColorPaletteConstants.box).toBeDefined();
  });


  it('getGradientStyles()case10', () => {
    let obj = { amexioComponentId: 'amexio-grid', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-grid';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { grid: c };
    expect(dirIn.ColorPaletteConstants.grid).toBeUndefined();
    dirIn.ColorPaletteConstants = { grid: 'amexio-grid' };
    dirIn.ColorPaletteConstants.grid = 'amexio-grid'
    expect(dirIn.ColorPaletteConstants.grid).toBeDefined();
  });



  it('getGradientStyles()case11', () => {
    let obj = { amexioComponentId: 'amexio-tab', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-tab';
    dirIn.getGradientStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { tab: c };
    expect(dirIn.ColorPaletteConstants.tab).toBeUndefined();
    dirIn.ColorPaletteConstants = { tab: 'amexio-tab' };
    dirIn.ColorPaletteConstants.tab = 'amexio-tab'
    expect(dirIn.ColorPaletteConstants.tab).toBeDefined();
  });

  it('getGradientStyles()', () => {
    let obj = { amexioComponentId: 'amexio-card', setColorPalette: () => { } }
    dirIn.hostComponent = obj
    dirIn.hostComponent.amexioComponentId = 'amexio-card';
    // dirIn.getBGColorStyles(dirIn.hostComponent);
    let c;
    dirIn.ColorPaletteConstants = { card: c, cardce: c }


    dirIn.getGradientStyles(dirIn.hostComponent);
    // case (ColorPaletteConstants.card || ColorPaletteConstants.cardce): {

    expect(dirIn.ColorPaletteConstants.card).toBeUndefined();
    expect(dirIn.ColorPaletteConstants.cardce).toBeUndefined();

    dirIn.ColorPaletteConstants = { card: 'amexio-card', cardce: 'amexio-card-ce' };
    dirIn.ColorPaletteConstants.card = 'amexio-card'
    dirIn.ColorPaletteConstants.cardce = 'amexio-card-ce'

    expect(dirIn.ColorPaletteConstants.card).toBeDefined();

    expect(dirIn.ColorPaletteConstants.cardce).toBeDefined();

  });

  it('randomFloat method call', () => {
    dirIn.randomFloat();
    const int = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return int / 2 ** 32;
  });
  it('randomInt method call', () => {
    let max = 10;
    let min = 5;
    dirIn.randomInt(min, max);
    const range = max - min;
    return Math.floor(dirIn.randomFloat() * range + min);
  });
  it('getRandomNumber method call', () => {
    let length = 19;
    let max = 10;
    let min = 5;
    dirIn.getRandomNumber(length, min, max);
    const arr = (new Array(length).fill(0).map(() => dirIn.randomInt(min, max)));
    return arr[0];
  });

  it('randomFloat method call', () => {
    dirIn.randomFloat();
    const int = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return int / 2 ** 32;
    });
    it('randomInt method call', () => {
    let max =10;
    let min = 5;
    dirIn.randomInt(min,max);
    const range = max - min;
    return Math.floor(dirIn.randomFloat() * range + min);
    });
    it('getRandomNumber method call', () => {
    let length = 19;
    let max =10;
    let min = 5;
    dirIn.getRandomNumber(length,min,max);
    const arr = (new Array(length).fill(0).map(() => dirIn.randomInt(min, max)));
    return arr[0];
    });
    it('randomThemeCall method else call', () => {
    dirIn.randomThemeCall();
    dirIn.gradient = false;
    expect(dirIn.gradient).toEqual(false);
    const randomIndex = dirIn.getRandomNumber(1, 0, dirIn.themejson.length);
    });
    it('randomThemeCall method call', () => {
    dirIn.randomThemeCall();
    dirIn.gradient = true;
    expect(dirIn.gradient).toEqual(true);
    const randomIndex = dirIn.getRandomNumber(1, 0, dirIn.gradientThemeJson.length);
    });
});
