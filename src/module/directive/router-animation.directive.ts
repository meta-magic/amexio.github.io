import { ContentChild, Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { RouterService } from '../services/routing/routing.service';
@Directive({
    selector: '[amexio-route-animation]',

})
export class RoutedirDirective {

    @Input('style-type') routeAnimation: string;

    constructor(private routerInstance: RouterService, private el: ElementRef, private renderer: Renderer2) {
        this.routerInstance.routerEvent.subscribe(
            (router: any) => {
                if (router) {
                    router.events.subscribe((event1: any) => {
                        if (this.routeAnimation === 'slide-left') {
                            this.addDynamicClass('myanislideleft');
                        }
                        if (this.routeAnimation === 'slide-right') {
                            this.addDynamicClass('myanislideright');
                        }

                        if (this.routeAnimation === ('slide-top' || 'slide-bottom')) {
                            this.addTopBottomCss();
                        }
                    });
                }
            },
        );
    }

    addTopBottomCss() {
        if (this.routeAnimation === 'slide-top') {
            this.addDynamicClass('myanislidetop');
        }

        if (this.routeAnimation === 'slide-bottom') {
            this.addDynamicClass('myanislidebottom');
        }
    }

    addDynamicClass(className: any) {
        this.renderer.addClass(this.el.nativeElement.parentNode, className);
    }
}
