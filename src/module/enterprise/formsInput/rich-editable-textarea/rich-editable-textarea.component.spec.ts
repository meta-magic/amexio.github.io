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
    let data: any;
    let obj: any;
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
        data = [
            {
                title: 'bold',
                icon: 'fa fa-bold',
                event: 'bold',
            },
            {
                title: 'italic',
                icon: 'fa fa-italic',
                event: 'italic',
            },
            {
                title: 'strikethrough',
                icon: 'fa fa-strikethrough',
                event: 'strikethrough',
            },
            {
                title: 'underline',
                icon: 'fa fa-underline',
                event: 'underline',
            },
            {
                title: 'insert Unordered List',
                icon: 'fa fa-list-ul',
                event: 'insertUnorderedList',
            },
            {
                title: 'insert Ordered List',
                icon: 'fa fa-list-ol',
                event: 'insertOrderedList',
            },
            {
                title: 'Create Link',
                icon: 'fa fa-link',
                event: 'CreateLink',
            },
            {
                title: 'unlink',
                icon: 'fa fa-unlink',
                event: 'unlink',
            },
        ];
        obj = {
            title: 'unlink',
            icon: 'fa fa-link',
            event: 'unlink',
        },
            {
                title: 'CreateLink',
                icon: 'fa fa-link',
                event: 'CreateLink',
            }
    });


    it('onIconClick method if condition with the  data == unlink check', () => {
        comp.onIconClick(data);
        document.execCommand(obj.title, false, null);
        obj.title = 'unlink';
        spyOn(document, 'execCommand').and.callThrough();
        document.execCommand('foreColor', false, 'black');
        expect(document.execCommand).toHaveBeenCalledWith('foreColor', false, 'black');

        // expect(document.execCommand('unlink')).toBe('');

    });
    it('onIconClick method if condition with the data == create link check', () => {
        comp.onIconClick(data);
        document.execCommand(obj.title, false, null);
        obj.title = 'CreateLink';
        expect(document.execCommand('CreateLink', false, 'http://www.google.com')).toBeFalsy();
        expect(document.execCommand('ForeColor', false, 'blue')).toBeFalsy();
        expect(document.designMode).toEqual('off');
    });

    // it('onHtmlCodeClick() method check', () => {

    //   // comp.onHtmlCodeClick(); 
    //   // comp.printContents = document.getElementById('rich-editor').innerHTML;
    //   // comp.onCodeClick.emit(comp.printContents);
    // });
});
