import { ContentChild, Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

import { NavigationEnd, NavigationStart, Router } from '@angular/router';

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
    animationTop = 'myanislidetop';
    animationBottom = 'myanislidebottom';
    animationLeft = 'myanislideleft';
    animationRight = 'myanislideright';
    animationClasses: any[];

    constructor(private routerInstance: RouterService, private el: ElementRef, private renderer: Renderer2) {
        this.animationClasses = [];
        this.animationClasses.push(this.animationTop);
        this.animationClasses.push(this.animationBottom);
        this.animationClasses.push(this.animationLeft);
        this.animationClasses.push(this.animationRight);

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

    addBottomCss() {
        if (this.routeAnimation === this.slideBottom) {
            this.addDynamicClass(this.animationBottom);
        }
    }

    addTopCss() {
        if (this.routeAnimation === this.slideTop) {
            this.addDynamicClass(this.animationTop);
        }
    }

    addRightCss() {

        if (this.routeAnimation === this.slideRight) {
            this.addDynamicClass(this.animationRight);
        }
    }

    addLeftCss() {
        if (this.routeAnimation === this.slideLeft) {
            this.addDynamicClass(this.animationLeft);
        }
    }

    addDynamicClass(className: any) {
        setTimeout(() => {
            this.animationClasses.forEach((cls: any) => {
                this.renderer.removeClass(this.el.nativeElement.parentNode, cls);
            });
            this.renderer.addClass(this.el.nativeElement.parentNode, className);
        }, 0);
    }

    navigationMethod(event1: any) {
        if (this.routeAnimation === 'slide-left') {
            this.addLeftCss();
        }
        if (this.routeAnimation === 'slide-right') {
            this.addRightCss();
        }
        if (this.routeAnimation === 'slide-top') {
            this.addTopCss();
        }
        if (this.routeAnimation === 'slide-bottom') {
            this.addBottomCss();
        }
    }
}
