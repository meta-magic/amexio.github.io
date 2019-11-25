import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from '../services/routing/routing.service';
import { RoutedirDirective } from './router-animation.directive';
/**
 * Created by kedar on 12/09/19.
 */
// Simple test component that will not in the actual app
@Component({
    selector: 'amexio-route-animation',
    template: `
    <router-outlet amexio-route-animation [style-type]="styleType">
  `
})
class RouterTestComponent {
}

describe('Directive: amexio-route-animation', () => {
    let comp: RouterTestComponent;
    let fixture: ComponentFixture<RouterTestComponent>;
    let inputEl: DebugElement;
    let dirIn: any;
    let routerSer: RouterService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoutedirDirective, RouterTestComponent],
            providers: [RouterService, Renderer2],
            imports: [RouterTestingModule],

        });
        fixture = TestBed.createComponent(RouterTestComponent);
        comp = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(RoutedirDirective));
        expect(directiveEl).not.toBeNull();
        routerSer = TestBed.get(RouterService);
        dirIn = directiveEl.injector.get(RoutedirDirective);
        inputEl = fixture.debugElement.query(By.css('input'));
        // dirIn.themeStyle = 'round-edge';

    });

    it('variables check ', () => {
        dirIn.slideTop = 'slide-top';
        dirIn.slideBottom = 'slide-bottom';
        dirIn.slideRight = 'slide-right';
        dirIn.slideLeft = 'slide-left';
        dirIn.animationTop = 'myanislidetop';
        dirIn.animationBottom = 'myanislidebottom';
        dirIn.animationLeft = 'myanislideleft';
        dirIn.animationRight = 'myanislideright';
    });

    it('constructor call and if condition', () => {
        dirIn.animationClasses = [];
        dirIn.animationClasses.push(dirIn.animationTop);
        dirIn.animationClasses.push(dirIn.animationBottom);
        dirIn.animationClasses.push(dirIn.animationLeft);
        dirIn.animationClasses.push(dirIn.animationRight);
        dirIn.routerInstance.routerEvent.subscribe(
            (router: any) => {
                if (router) {
                    router.events.subscribe((event1: any) => {
                        dirIn.navigationMethod(event1);
                    });
                }
            },
        );
    });


    xit('constructor call and else condition', () => {
        dirIn.animationClasses = [];
        dirIn.animationClasses.push(dirIn.animationTop);
        dirIn.animationClasses.push(dirIn.animationBottom);
        dirIn.animationClasses.push(dirIn.animationLeft);
        dirIn.animationClasses.push(dirIn.animationRight);
        dirIn.routerInstance.routerEvent.subscribe(
            (router: any) => {
                // router = [];
                expect(router).toBeNull();
            },
        );
    });

    it('addBottomCss() if method', () => {
        dirIn.addBottomCss();
        if (dirIn.routeAnimation === dirIn.slideBottom) {
            dirIn.addDynamicClass(dirIn.animationBottom);
        }
    });

    it('addBottomCss() else method', () => {
        dirIn.addBottomCss();
        if (dirIn.routeAnimation != dirIn.slideBottom) {
        }
    });


    xit('addTopCss() if method', () => {
        dirIn.addTopCss();
        if (dirIn.routeAnimation === dirIn.slideTop) {
            dirIn.addDynamicClass(dirIn.animationTop);
        }
    });

    xit('addTopCss() else method', () => {
        dirIn.addTopCss();
        if (dirIn.routeAnimation != dirIn.slideTop) {
        }
    });


    it('addRightCss() if condition', () => {
        dirIn.addRightCss();
        if (dirIn.routeAnimation === dirIn.slideRight) {
            dirIn.addDynamicClass(dirIn.animationRight);
        }
    });

    it('addRightCss() else condition', () => {
        dirIn.addRightCss();
        if (dirIn.routeAnimation != dirIn.slideRight) {
        }
    });

    it('addLeftCss() if condition', () => {
        dirIn.addLeftCss();
        if (dirIn.routeAnimation === dirIn.slideLeft) {
            dirIn.addDynamicClass(dirIn.animationLeft);
        }
    });

    it('addLeftCss() else condition', () => {
        dirIn.addLeftCss();
        if (dirIn.routeAnimation != dirIn.slideLeft) {
        }
    });


    it('addDynamicClass() condition', () => {
        dirIn.addDynamicClass();
        setTimeout(() => {
            fixture = TestBed.createComponent(RouterTestComponent);
            comp = fixture.componentInstance;
            const directiveEl = fixture.debugElement.query(By.directive(RoutedirDirective));
            dirIn = directiveEl.injector.get(RoutedirDirective);
            dirIn.animationClasses.forEach((cls: any) => {
                dirIn.renderer.removeClass(dirIn.el.nativeElement.parentNode, cls);
            });
            dirIn.renderer.addClass(dirIn.el.nativeElement.parentNode, dirIn.className);
        }, 0)
    });

    it('navigationMethod() if condition slide-left ', () => {
        dirIn.routeAnimation = 'slide-left';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).toEqual('slide-left');
        dirIn.addLeftCss();
    });
    it('navigationMethod() else condition slide-left ', () => {
        dirIn.routeAnimation = 'slide-rift';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).not.toEqual('slide-left');
    });

    it('navigationMethod() if condition  slide-right', () => {
        dirIn.routeAnimation = 'slide-right';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).toEqual('slide-right');
        dirIn.addRightCss();
    });

    it('navigationMethod() else condition  slide-right', () => {
        dirIn.routeAnimation = 'slide-rigth';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).not.toEqual('slide-right');
    });

    it('navigationMethod() if condition  slide-top', () => {
        dirIn.routeAnimation = 'slide-top';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).toEqual('slide-top');
        dirIn.addTopCss();
    });
    it('navigationMethod() else condition  slide-top', () => {
        dirIn.routeAnimation = 'slide-tp';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).not.toEqual('slide-top');
    });

    xit('navigationMethod() if condition  slide-bottom', () => {
        dirIn.routeAnimation = 'slide-bottom';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).toEqual('slide-bottom');
        dirIn.addBottomCss();
    });
    it('navigationMethod() else condition  slide-bottom', () => {
        dirIn.routeAnimation = 'slide-tp';
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).not.toEqual('slide-bottom');
    });
});
