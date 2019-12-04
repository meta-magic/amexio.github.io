import { Component, DebugElement, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from '../services/routing/routing.service';
import { RoutedirDirective } from './router.animation.directive';
/**
 * Created by kedar on 12/09/19.
 */
// Simple test component that will not in the actual app
@Component({
    selector: 'amexio-route-animation',
    template: `
    <div>
    <router-outlet amexio-route-animation [style-type]="styleType">
    </router-outlet>
    </div>
  `
})
class RouterTestComponent {

}

describe('Directive: amexio-route-animation', () => {
    let comp: RouterTestComponent;
    let fixture: ComponentFixture<RouterTestComponent>;

    let dirIn: any;
    let routerSer: RouterService;
    let inputEl: HTMLElement;
    let inputDEl: DebugElement;
    let renderer2: Renderer2;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoutedirDirective, RouterTestComponent],
            providers: [RouterService, Renderer2],
            imports: [RouterTestingModule],

        });
        fixture = TestBed.createComponent(RouterTestComponent);
        comp = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(RoutedirDirective));
        routerSer = TestBed.get(RouterService);
        dirIn = directiveEl.injector.get(RoutedirDirective);
        inputEl = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
        inputDEl = fixture.debugElement.query(By.css('div'));

 
        dirIn.slideTop = 'slide-top';
        dirIn.slideBottom = 'slide-bottom';
        dirIn.slideRight = 'slide-right';
        dirIn.slideLeft = 'slide-left';
        dirIn.animationTop = 'myanislidetop';
        dirIn.animationBottom = 'myanislidebottom';
        dirIn.animationLeft = 'myanislideleft';
        dirIn.animationRight = 'myanislideright';
    });

    it('should create component', () => {
        expect(comp).toBeTruthy();
    });

    it('addBottomCss() if method',() => {
        dirIn.routeAnimation = dirIn.slideBottom;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addBottomCss();
        fixture.detectChanges();
        expect(dirIn.addDynamicClass).toHaveBeenCalledWith(dirIn.animationBottom);

    });

    it('addBottomCss() else method', () => {
        spyOn(dirIn, 'addDynamicClass');
        fixture.detectChanges();
        expect(dirIn.addDynamicClass).not.toHaveBeenCalledWith(dirIn.animationBottom);
    });

    it('addTopCss() if method', () => {
        dirIn.routeAnimation = dirIn.slideTop;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addTopCss();
        fixture.detectChanges();
        expect(dirIn.addDynamicClass).toHaveBeenCalledWith(dirIn.animationTop);

    });

    it('addTopCss() else method', () => {
        dirIn.routeAnimation = dirIn.slideTo;
        spyOn(dirIn, 'addDynamicClass');
        fixture.detectChanges();
        expect(dirIn.addDynamicClass).not.toHaveBeenCalledWith(dirIn.animationTop);

    });


    it('addRightCss() if condition', () => {
        dirIn.routeAnimation = dirIn.slideRight;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addRightCss();
        fixture.detectChanges();

        expect(dirIn.addDynamicClass).toHaveBeenCalledWith(dirIn.animationRight);
    });

    it('addRightCss() else condition', () => {
        dirIn.routeAnimation = dirIn.slideRigt;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addRightCss();
        fixture.detectChanges();
        expect(dirIn.addDynamicClass).not.toHaveBeenCalledWith(dirIn.animationRight);
    });

    it('addLeftCss() if condition', () => {
        dirIn.routeAnimation = dirIn.slideLeft;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addLeftCss();
        fixture.detectChanges();

        expect(dirIn.addDynamicClass).toHaveBeenCalledWith(dirIn.animationLeft);
    });

    it('addLeftCss() else condition', () => {
        dirIn.routeAnimation = dirIn.slideLef;
        spyOn(dirIn, 'addDynamicClass');
        dirIn.addLeftCss();
        fixture.detectChanges();

        expect(dirIn.addDynamicClass).not.toHaveBeenCalledWith(dirIn.animationLeft);
    });


    it('addDynamicClass() condition', fakeAsync(() => {
        dirIn.routeAnimation = 'slide-bottom';
        dirIn.slideBottom = 'slide-bottom';
        dirIn.animationBottom = 'myanislidebottom';
        dirIn.addBottomCss();

        renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
        spyOn(renderer2, 'addClass');
        tick(500);
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            expect(renderer2.addClass).toHaveBeenCalled();
        });
    }));

    it('navigationMethod() if condition slide-left ', () => {
        dirIn.routeAnimation = 'slide-left';
        spyOn(dirIn, 'addLeftCss');

        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).toEqual('slide-left');
        expect(dirIn.addLeftCss).toHaveBeenCalled();
    });

    it('navigationMethod() else condition slide-left ', () => {
        dirIn.routeAnimation = 'slide-rift';
        spyOn(dirIn, 'addLeftCss');

        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).not.toEqual('slide-left');
        expect(dirIn.addLeftCss).not.toHaveBeenCalled();
    });

    it('navigationMethod() if condition  slide-right', () => {
        dirIn.routeAnimation = 'slide-right';
        spyOn(dirIn, 'addRightCss');

        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).toEqual('slide-right');
        expect(dirIn.addRightCss).toHaveBeenCalled();
    });

    it('navigationMethod() else condition  slide-right', () => {
        dirIn.routeAnimation = 'slide-rigth';
        spyOn(dirIn, 'addRightCss');

        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).not.toEqual('slide-right');
        expect(dirIn.addRightCss).not.toHaveBeenCalled();
    });

    it('navigationMethod() if condition  slide-top', () => {
        dirIn.routeAnimation = 'slide-top';
        spyOn(dirIn, 'addTopCss');

        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).toEqual('slide-top');
        expect(dirIn.addTopCss).toHaveBeenCalled();
    });
    it('navigationMethod() else condition  slide-top', () => {
        dirIn.routeAnimation = 'slide-tp';
        spyOn(dirIn, 'addTopCss');
        dirIn.navigationMethod();

        expect(dirIn.routeAnimation).not.toEqual('slide-top');
        expect(dirIn.addTopCss).not.toHaveBeenCalled();
    });

    it('navigationMethod() if condition  slide-bottom', () => {
        dirIn.routeAnimation = 'slide-bottom';
        spyOn(dirIn, 'addBottomCss');

        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).toEqual('slide-bottom');
        expect(dirIn.addBottomCss).toHaveBeenCalled();

    });
    it('navigationMethod() else condition  slide-bottom', () => {
        dirIn.routeAnimation = 'slide-tp';
        spyOn(dirIn, 'addBottomCss');
        dirIn.navigationMethod();
        expect(dirIn.routeAnimation).not.toEqual('slide-bottom');
        expect(dirIn.addBottomCss).not.toHaveBeenCalled();

    });
});
