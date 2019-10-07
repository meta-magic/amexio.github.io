import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('amexio-rich-textarea', () => {
    let comp: AmexioRichEditableTextareaComponent;
    let fixture: ComponentFixture<AmexioRichEditableTextareaComponent>;
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
    });


    it('onIconClick method if condition with the data == create link check', () => {
        let data = 'http://www.google.com';
        comp.onIconClick(data);
        expect(data).toEqual('http://www.google.com');
        document.execCommand(data, false, null);

        spyOn(document, 'execCommand').and.callThrough();
        document.execCommand('foreColor', false, 'blue');
        expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, 'blue');

        document.execCommand('CreateLink', false, 'http://www.google.com');
        expect(document.execCommand).toHaveBeenCalledWith('CreateLink', false, 'http://www.google.com');

        document.designMode = 'off';
        expect(document.designMode).toEqual('off');
    });

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


    // it('variables check', () => {
    //     comp.displayDiv  = true;
    //     comp.areaHeight = 100;
    //     comp.areaWidth = 100;
    // });

    // it('onColorBtnClick()  method() check', () => {
    //     comp.onColorBtnClick();


    // });
});
