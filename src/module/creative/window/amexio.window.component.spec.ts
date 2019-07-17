import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2, Renderer, TemplateRef } from '@angular/core';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioWindowCEComponent } from './amexio.window.component';
describe('amexio-window-ce', () => {
    let comp: AmexioWindowCEComponent;
    let fixture: ComponentFixture<AmexioWindowCEComponent>;
    let checkD: any;
    let data: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CommonIconComponent, AmexioWindowCEComponent],
            providers: [IconLoaderService, CommonDataService, Renderer2, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioWindowCEComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        let renderer = Renderer2;


    });


    it('variable check', () => {
        comp.x = 0;
        comp.y = 0;
        comp.px = 0;
        comp.py = 0;
        comp.minArea = 20000;
        comp.draggingWindow = false;
        expect(comp.x).toEqual(0);
        expect(comp.y).toEqual(0);
        expect(comp.px).toEqual(0);
        expect(comp.py).toEqual(0);
        expect(comp.minArea).toEqual(20000);
        expect(comp.draggingWindow).toEqual(false);




    });

});

