import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[amexioFullScreen]',
})
export class AmexioFullScreenDirective implements OnInit {

    hostComponent: any;
    @Input('full-screen-type') fullScreenType = 'browser';

    constructor(private _viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
            this.hostComponent = this._viewContainerRef['_data'].componentView.component;
            this.hostComponent.setFullScreen(this.fullScreenType);
        }
}
