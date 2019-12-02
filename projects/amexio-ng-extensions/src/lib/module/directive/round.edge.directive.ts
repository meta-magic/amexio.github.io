import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
    selector: '[amexioThemeStyle]',
})
export class RoundEdgesDirective implements OnInit {

    @Input('theme-style') themeStyle = 'classic';
    hostComponent: any;

    constructor(private _viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        if (this.themeStyle === 'round-edge' || this.themeStyle === 'classic') {
            this.hostComponent = this._viewContainerRef['_data'].componentView.component;
            this.hostComponent.setRoundEdge(this.themeStyle);
        }
    }
}
