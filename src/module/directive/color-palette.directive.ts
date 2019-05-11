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
  constructor(private _viewContainerRef: ViewContainerRef,
  ) {

  }
  ngOnInit() {

    this.hostComponent = this._viewContainerRef['_data'].componentView.component;
    if (this.colorPalette === 'classic' && !this.gradient) {
      this.hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicTheme);
    } else if (this.colorPalette === 'classic' && this.gradient) {
      this.hostComponent.setColorPalette(ColorPaletteConstants.amexioClassicThemeGradient);
    }
    if (this.colorPalette === 'random' && !this.gradient && this.hostComponent.amexioComponentId !== ColorPaletteConstants.navbar) {
      this.hostComponent.setColorPalette(this.themeColor);
    } else if (this.colorPalette === 'random' && this.gradient && this.hostComponent.amexioComponentId !== ColorPaletteConstants.navbar) {
      this.hostComponent.setColorPalette(this.themeColor + '-Gradient');
    }

    if (this.colorPalette === 'vibrant' && !this.gradient) {
      this.getBGColorStyles(this.hostComponent);
    } else if (this.colorPalette === 'vibrant' && this.gradient) {
      this.getGradientStyles(this.hostComponent);
    }

  }

  getBGColorStyles(hostComponent: any) {
    switch (hostComponent.amexioComponentId) {
      case (ColorPaletteConstants.card): {
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
}
