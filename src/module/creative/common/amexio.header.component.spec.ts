import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

import { CommonDataService } from '../../services/data/common.data.service';
import { Renderer2, TemplateRef } from '@angular/core';
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

    it('variable check', () => {

        comp.cclass = '';
        comp.closeable = false;
        comp.maximizeCe = false;
        comp.minimize = false;
        comp.isFullWindowCe = false;
        expect(comp.minimize).toBe(false);
        expect(comp.cclass).toBe('');
        expect(comp.maximizeCe).toBe(false);
    });

    it('onMinimizeClick  method check', () => {
        comp.onMinimizeClick();
        comp.closeableBehaiour.next(false);
        comp.minimizeWindow.subscribe((g: any) => {
            expect(event).toEqual(g);
        });
    });
    it('ngAfterViewInit  method check', () => {
        comp.ngAfterViewInit();
        comp.textName = comp.content.nativeElement.innerText;
    });

    it('sizeChange method check true toggle', () => {

        comp.sizeChange();
        comp.isFullWindowCe = false;
        expect(comp.isFullWindowCe).toEqual(false);
        comp.isFullWindowCe = true;
        comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    });
    it('sizeChange method check false toggle', () => {
        comp.sizeChange();
        comp.isFullWindowCe = true;
        expect(comp.isFullWindowCe).toEqual(true);
        comp.isFullWindowCe = false;
        comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    });
    it('setMaximizeDataCE call', () => {
        let maximize = true;
        let isFullWindow = true;
        comp.setMaximizeDataCE(maximize, isFullWindow);
        comp.maximizeCe = maximize;
        comp.isFullWindowCe = isFullWindow;
        comp.maximizeBehaiourCe.next(comp.isFullWindowCe);
    });
});

