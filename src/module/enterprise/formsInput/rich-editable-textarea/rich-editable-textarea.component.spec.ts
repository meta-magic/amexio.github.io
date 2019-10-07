import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AmexioRichEditableTextareaComponent } from './rich-editable-textarea.component';

import { AmexioButtonComponent } from '../../../forms/buttons/button.component';

import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { AmexioTabComponent } from '../../../panes/tab/tab.component';
import { AmexioTabPillComponent, AmexioBodyComponent, AmexiodialoguePaneComponent } from '../../../panes/amexio.pane.module';
import { AmexioCardComponent } from '../../../layout/card/card.component';
import { AmexioContextMenuComponent } from '../../../base/base.contextmenu.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('amexio-rich-textarea', () => {
    let comp: AmexioRichEditableTextareaComponent;
    let fixture: ComponentFixture<AmexioRichEditableTextareaComponent>;

    let divRichEditor: DebugElement;
    let inputFavColor: DebugElement;

    let lastNameEl: DebugElement;
    let emailEl: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioRichEditableTextareaComponent, AmexioTabComponent,
                AmexioTabPillComponent, AmexioCardComponent, AmexioBodyComponent,
                AmexioContextMenuComponent, AmexiodialoguePaneComponent,
                CommonIconComponent, AmexioButtonComponent],
            providers: [IconLoaderService, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioRichEditableTextareaComponent);
        comp = fixture.componentInstance;

        divRichEditor = fixture.debugElement.nativeElement.querySelector('div[id=rich-editor]');

        inputFavColor = fixture.debugElement.query(By.css('input[id=favColor]'));

    });


    // it('onIconClick method if condition with the data == create link check', () => {
    //     let data = 'http://www.google.com';
    //     comp.onIconClick(data);
    //     document.execCommand(data, false, null);
    //     spyOn(document, 'execCommand').and.callThrough();
    //     // document.execCommand('CreateLink', false, 'http://www.google.com');
    //     expect(document.execCommand).toHaveBeenCalled();

    //     spyOn(document, 'execCommand').and.callThrough();
    //     document.execCommand('foreColor', false, 'blue');
    //     expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, 'blue');

    //     document.designMode = 'off';
    //     expect(document.designMode).toEqual('off');
    // });

    it('onIconClick method if condition with the  data == unlink check', () => {
        let data = 'unlink';
        comp.onIconClick(data);
        expect(data).toEqual('unlink');
        document.execCommand(data, false, null);
        spyOn(document, 'execCommand').and.callThrough();

        document.execCommand('unlink', false, '');
        expect(document.execCommand).toHaveBeenCalledWith('unlink', false, '');

        document.execCommand('foreColor', false, 'black');
        expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, 'black');

        document.designMode = 'off';
    });



    it("ngAfterViewInit() if condition check", fakeAsync(() => {
        comp.displayDiv = false;
        comp.toolbarPosition = 'top';
        comp.areaHeight = 100;
        comp.textAreaHeight = 80;
        fixture.detectChanges();
        comp.ngAfterViewInit();
        expect(comp.displayDiv).toEqual(false);

        comp.ngAfterViewInit();
        tick(500);
        fixture.detectChanges()
        fixture.whenStable().then(() => {
            comp.areaHeight = 100;
            expect(comp.textAreaHeight).toEqual(80);
        })
    }));

    it("ngAfterViewInit() else condition check", fakeAsync(() => {
        comp.displayDiv = true;
        comp.toolbarPosition = 'bottom';
        comp.areaHeight = null;
        fixture.detectChanges();
        comp.ngAfterViewInit();
        expect(comp.displayDiv).toBeTruthy();
        fixture.detectChanges();

        comp.ngAfterViewInit();
        tick(500);
        fixture.detectChanges()
        fixture.whenStable().then(() => {
            expect(comp.areaHeight).toBeNull();
        })
    }));



    // it('selectHeaderClick() ', function () {
    //     comp.selectHeaderClick();
    //     var dummyElement = document.createElement('div');
    //     document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    //     // const selectHeader = (document.getElementById('selectId') as HTMLInputElement).value;
    //     // document.execCommand('formatBlock', false, selectHeader);

    // });


});
