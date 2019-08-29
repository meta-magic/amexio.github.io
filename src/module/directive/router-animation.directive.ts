import { ContentChild, Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { RouterService } from '../services/routing/routing.service';
@Directive({
    selector: '[amexio-route-animation]',

})
export class RoutedirDirective {

    @Input('style-type') routeAnimation: string;
    slideTop = 'slide-top';
    slideBottom = 'slide-bottom';
    slideRight = 'slide-right';
    slideLeft = 'slide-left';
    amimationTop = 'myanislidetop';
    animationBottom = 'myanislidebottom';
    animationLeft = 'myanislideleft';
    animationRight = 'myanislideright';

    constructor(private routerInstance: RouterService, private el: ElementRef, private renderer: Renderer2) {
        this.routerInstance.routerEvent.subscribe(
            (router: any) => {
                if (router) {
                    router.events.subscribe((event1: any) => {

                        this.navigationMethod(event1);
                    });
                }
            },
        );
    }

    addTopBottomCss() {
        if (this.routeAnimation === this.slideTop) {
            this.addDynamicClass(this.amimationTop);
        }

        if (this.routeAnimation === this.slideBottom) {
            this.addDynamicClass(this.animationBottom);
        }
    }

    addLeftRightCss() {
        if (this.routeAnimation === this.slideLeft) {
            this.addDynamicClass(this.animationLeft);
        }
        if (this.routeAnimation === this.slideRight) {
            this.addDynamicClass(this.animationRight);
        }
    }

    addDynamicClass(className: any) {
        this.renderer.addClass(this.el.nativeElement.parentNode, className);
    }

    navigationMethod(event1: any) {
        if (event1 instanceof NavigationStart) {
            if (this.routeAnimation === ('slide-left' || 'slide-right')) {
                this.addLeftRightCss();
            }
            if (this.routeAnimation === ('slide-top' || 'slide-bottom')) {
                this.addTopBottomCss();
            }
        }
    }
}
