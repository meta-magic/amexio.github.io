import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Host, Input, OnInit, Optional, Self, ViewContainerRef } from '@angular/core';
import { ColorPaletteConstants } from './color-palette-constant';

@Directive({
  selector: '[amexioColorPalette]',
})

export class ColorPaletteDirective implements OnInit {

  @Input('color-palette') colorPalette: string;
  @Input('amexio-color') themeColor: string;
  @Input('gradient') gradient = false;
  hostComponent: any;
  themejson: any;
  gradientThemeJson: any;
  constructor(private _viewContainerRef: ViewContainerRef, private _httpClient: HttpClient,

  ) {

  }
  ngOnInit() {
    this.themejson = [
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
      }],
      this.gradientThemeJson = [
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
      ],

      this.hostComponent = this._viewContainerRef['_data'].componentView.component;
    if (this.colorPalette === 'classic' && !this.gradient) {
      this.hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicTheme);
    } else if (this.colorPalette === 'classic' && this.gradient) {
      this.hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicThemeGradient);
    }
    if (this.colorPalette !== 'classic' && this.colorPalette !== 'vibrant' && this.colorPalette !== 'random' && !this.gradient) {
      this.hostComponent.setColorPalette(this.colorPalette);
    } else if (this.colorPalette !== 'classic' && this.colorPalette !== 'vibrant' && this.colorPalette !== 'random' && this.gradient) {
      this.hostComponent.setColorPalette(this.colorPalette + '-Gradient');
    }

    if (this.colorPalette === 'vibrant') {
      this.vibrantThemeCall();
    }

    if (this.colorPalette === 'random') {
      this.randomThemeCall();
    }

    if ((this.hostComponent.amexioComponentId === ColorPaletteConstants.floatingpanel ||
      this.hostComponent.amexioComponentId === ColorPaletteConstants.accordion ||
      this.hostComponent.amexioComponentId === ColorPaletteConstants.panel) && this.gradient) {
      this.hostComponent.changeHeaderColor();
    }

  }

  getBGColorStyles(hostComponent: any) {
    switch (hostComponent.amexioComponentId) {
      case (ColorPaletteConstants.card): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme4);
        break;
      }
      case (ColorPaletteConstants.banner): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme4);
        break;
      }
      case (ColorPaletteConstants.navbar): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicTheme);
        break;
      }
      case (ColorPaletteConstants.accordion): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme3);
        break;
      }
      case (ColorPaletteConstants.panel): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme2);
        break;
      }
      case (ColorPaletteConstants.floatingpanel): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme2);
        break;
      }
      case (ColorPaletteConstants.window): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme6);
        break;
      }
      case (ColorPaletteConstants.dialogue): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme6);
        break;
      }
      case (ColorPaletteConstants.box): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme6);
        break;
      }
      case (ColorPaletteConstants.grid): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme5);
        break;
      }
      case (ColorPaletteConstants.tab): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioTheme3);
        break;
      }
    }
  }

  getGradientStyles(hostComponent: any) {
    switch (hostComponent.amexioComponentId) {
      case (ColorPaletteConstants.card): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient4);
        break;
      }
      case (ColorPaletteConstants.banner): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient4);
        break;
      }
      case (ColorPaletteConstants.navbar): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicThemeGradient);
        break;
      }
      case (ColorPaletteConstants.accordion): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient3);
        break;
      }
      case (ColorPaletteConstants.panel): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient2);
        break;
      }
      case (ColorPaletteConstants.floatingpanel): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient2);
        break;
      }
      case (ColorPaletteConstants.window): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient6);
        break;
      }
      case (ColorPaletteConstants.dialogue): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient6);
        break;
      }
      case (ColorPaletteConstants.box): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient6);
        break;
      }
      case (ColorPaletteConstants.grid): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient5);
        break;
      }
      case (ColorPaletteConstants.tab): {
        hostComponent.setColorPalette(ColorPaletteConstants.amexioThemeGradient3);
        break;
      }
    }
  }

  randomThemeCall() {
    if (!this.gradient) {
      const randomIndex = Math.round(Math.random() * (this.themejson.length - 1));
      this.hostComponent.setColorPalette(this.themejson[randomIndex].themeName);
    } else {
      const randomIndex = Math.round(Math.random() * (this.themejson.length - 1));
      this.hostComponent.setColorPalette(this.gradientThemeJson[randomIndex].themeName);
    }
  }

  vibrantThemeCall() {
    if (!this.gradient) {
      setTimeout(() => {
        this.getBGColorStyles(this.hostComponent);
      }, 1000);
    } else if (this.gradient) {
      setTimeout(() => {
        this.getGradientStyles(this.hostComponent);
      }, 1000);
    }
  }
}
