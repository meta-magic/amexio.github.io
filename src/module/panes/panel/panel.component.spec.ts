import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {Renderer2} from '@angular/core';
import { IconLoaderService } from '../../../index';
import { AmexioPanelComponent } from './panel.component';
import {CommonIconComponent} from '../../base/components/common.icon.component';
import { AmexioStepsComponent } from '../steps/steps.component';
import {ToolbaroneComponent} from '../../forms/toolbar/toolbarone.component';
import {AmexioLabelComponent} from '../../forms/label/label.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';
import {ToolbarComponent} from '../../forms/toolbar/toolbar.component';
describe('amexio-panels', () => {
    let comp: AmexioPanelComponent;
    let fixture: ComponentFixture<AmexioPanelComponent>;
    let renderer2: Renderer2;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioPanelComponent, AmexioContextMenuComponent, ToolbarComponent, AmexioLabelComponent, CommonIconComponent, ToolbaroneComponent, AmexioStepsComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioPanelComponent);
        comp = fixture.componentInstance;
    });
it ('constructor', () => {
})
    it('checking css', () => {

        (<any>comp).faFaIconUPCss = 'fa fa-caret-up';
        (<any>comp).faFaIconDownCss = 'fa fa-caret-down';

        expect((<any>comp).faFaIconUPCss).toEqual('fa fa-caret-up');
        expect((<any>comp).faFaIconDownCss).toEqual('fa fa-caret-down');

    });
    it('checking ngOnInit method', () => {
        comp.ngOnInit();
        comp.header = false;
        expect(comp.header).toEqual(false);
        comp.expanded = true;
        expect(comp.expanded).toEqual(true);

        comp.header = true;
        comp.height = 20;
        comp.ngOnInit();
        expect(comp.height).toEqual(20); 

    });

    it('constructor  super call ()', () => {
        expect(comp.ngOnInit).toBeTruthy();
      });

});

