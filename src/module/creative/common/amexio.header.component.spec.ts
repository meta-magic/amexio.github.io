import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

import { CommonDataService } from '../../services/data/common.data.service';
import { Renderer2 } from '@angular/core';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioCardCEHeaderComponent } from './amexio.header.component';
import { BehaviorSubject } from 'rxjs';
describe('amexio-header-ce', () => {
    let comp: AmexioCardCEHeaderComponent;
    let fixture: ComponentFixture<AmexioCardCEHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CommonIconComponent, AmexioCardCEHeaderComponent],
            providers: [IconLoaderService, CommonDataService, Renderer2],
        });
        fixture = TestBed.createComponent(AmexioCardCEHeaderComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        comp.closeableBehaiour = new BehaviorSubject(false);

    });

    // it('variable check', () => {

    //     comp.cclass = '';
    //     comp.closeable = false;
    //     comp.maximizeCe = false;
    //     comp.minimize = false;
    //     comp.isFullWindowCe = false;
    //     expect(comp.minimize).toBe(false);
    //     expect(comp.cclass).toBe('');
    //     expect(comp.maximizeCe).toBe(false);
    // });

    // it('onMinimizeClick  method check', () => {
    //     comp.onMinimizeClick();
    //     comp.closeableBehaiour.next(false);
    //     comp.minimizeWindow.subscribe((g: any) => {
    //         expect(event).toEqual(this, g);
    //     });
    // });


    // it('onCloseClick() method check', () => {
    //     comp.onCloseClick();
    //     comp.closeableBehaiour.next(false);
    //     comp.closeDataEmit.subscribe((g: any) => {
    //         expect(event).toEqual(this, g);
    //     });
    // });

    // it('sizeChange method check true toggle', () => {

    //     comp.sizeChange();
    //     comp.isFullWindowCe = false;
    //     expect(comp.isFullWindowCe).toEqual(false);
    //     comp.isFullWindowCe = true;
    //     comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    // });
    // it('sizeChange method check false toggle', () => {
    //     comp.sizeChange();
    //     comp.isFullWindowCe = true;
    //     expect(comp.isFullWindowCe).toEqual(true);
    //     comp.isFullWindowCe = false;
    //     comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    // });
    // it('setMaximizeDataCE call', () => {
    //     const maximize = true;
    //     const isFullWindow = true;
    //     comp.setMaximizeDataCE(maximize, isFullWindow);
    //     comp.maximizeCe = maximize;
    //     comp.isFullWindowCe = isFullWindow;
    //     comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    // });

    // it('ngAfterViewInit  method check 1st if', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = 'kedar';
    //     comp.minimizeIcon = 'fa fa-home';
    //     expect(comp.textName).toEqual('kedar');
    //     expect(comp.minimizeIcon).toEqual('fa fa-home');
    //     return comp.textName;
    // });
    // it('ngAfterViewInit  method check 1st els', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = '';
    //     comp.minimizeIcon = '';
    //     expect(comp.textName).toEqual('');
    //     expect(comp.minimizeIcon).toEqual('');
    // });
    // it('ngAfterViewInit  method check 2nd if', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = 'kedar';
    //     comp.minimizeIcon = 'fa fa-home';
    //     expect(comp.textName).toEqual('kedar');
    //     expect(comp.minimizeIcon).toEqual('fa fa-home');
    //     comp.ngAfterViewInit();
    //     comp.textName = 'kedar';
    //     comp.minimizeIcon = '';
    //     expect(comp.textName).toEqual('kedar');
    //     expect(comp.minimizeIcon).toEqual('');
    //     return comp.textName;
    // });
    // it('ngAfterViewInit  method check 2nd else', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = 'kedar';
    //     comp.minimizeIcon = 'fa fa-home';
    //     expect(comp.textName).toEqual('kedar');
    //     expect(comp.minimizeIcon).toEqual('fa fa-home');
    //     comp.textName = '';
    //     comp.minimizeIcon = 'fa fa-home'
    //     expect(comp.textName).toEqual('');
    //     expect(comp.minimizeIcon).toEqual('fa fa-home');
    //     return comp.minimizeIcon;
    // });
    // it('ngAfterViewInit  method check !this.minimizeIcon && !this.textName', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = '';
    //     comp.minimizeIcon = ''
    //     expect(comp.textName).toEqual('');
    //     expect(comp.minimizeIcon).toEqual('');
    //     return comp.minimizeIcon = 'fa fa-file';
    // });
    // it('ngAfterViewInit  method check this.minimizeIcon && this.textName', () => {
    //     comp.textName = comp.content.nativeElement.innerText;
    //     comp.ngAfterViewInit();
    //     comp.textName = 'kedar';
    //     comp.minimizeIcon = 'fa fa-home';
    //     expect(comp.textName).toEqual('kedar');
    //     expect(comp.minimizeIcon).toEqual('fa fa-home');
    //     return comp.textName = 'kedar';
    // });
    //   it('sizeChange if call', () => {
    //     comp.fullScreenFlag = true; 
    //     comp.sizeChange();
    //     comp.isFullWindowCe = !comp.isFullWindowCe;
    //     comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    //     comp.maximizeWindow.emit(comp,  comp.isFullWindowCe);
    //     expect(comp.fullScreenFlag).toEqual(true);
    //     //   comp.fullscreenMax = !comp.fullscreenMax;
    //     //   comp.maximizeBehaiourCe.next(comp.fullscreenMax);
    //     //   comp.maximizeWindow.emit(this, comp.fullscreenMax);
    // });

    // it('sizeChange else call', () => {
    //     comp.fullScreenFlag = false; 
    //     comp.sizeChange();
    //     comp.isFullWindowCe = !comp.isFullWindowCe;
    //     comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    //     comp.maximizeWindow.emit(this,  comp.isFullWindowCe);
    //     expect(comp.fullScreenFlag).toEqual(false);
    // });

    // it('maxScreenChange1  method check', () => {
    //     let event  = {
    //     }
    //     comp.maxScreenChange1(event);
    //     comp.maximizeWindow1.subscribe((g: any) => {
    //         expect(event).toEqual({ tempEvent: event, tempThis: this }, g);
    //     });
    // });
    // it('minScreenChange1  method check', () => {
    //     let event  = {
    //     }
    //     comp.minScreenChange1(event);
    //     comp.minimizeWindow1.subscribe((g: any) => {
    //         expect(event).toEqual({ tempEvent: event, tempThis: this }, g);
    //     });
    // });
});

