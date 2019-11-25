import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconLoaderService } from '../../../../public-api';
import { CommonIconComponent } from '../../base/components/common.icon.component';
import { AmexioRichEditorComponent } from './rich-editable-textarea.component';

import { AmexioRowComponent } from '../../standard/layout/rows/row.component';

import { AmexioColumnComponent } from '../../standard/layout/columns/column.component';

import { AmexioTabComponent } from '../../standard/panes/tab/tab.component';
import { AmexioTabPillComponent } from '../../standard/panes/tab/tab.pill.component';
import { AmexioButtonComponent } from '../../standard/forms/buttons/button.component';
import { EditableTextComponent } from './editable-text/editable-text.component';

import { AmexioBodyComponent } from '../../standard/panes/body/pane.action.body';
import { AmexioHeaderComponent } from '../../standard/panes/header/pane.action.header';
import { AmexioCardComponent } from '../../standard/layout/card/card.component';

import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { AmexiodialoguePaneComponent } from '../../standard/panes/dialogue/dialogue.pane.component';

import { AmexioLayoutComponent } from '../../standard/layout/basiclayout/layout.component';
import { AmexioLayoutItemComponent } from '../../standard/layout/basiclayout/layoutitem.component';
describe('amexio-rich-textarea', () => {
    let comp: AmexioRichEditorComponent;
    let fixture: ComponentFixture<AmexioRichEditorComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AmexioRichEditorComponent, CommonIconComponent, AmexioTabComponent,
                AmexioTabPillComponent, EditableTextComponent, AmexioCardComponent, AmexioBodyComponent, AmexioLayoutItemComponent,
                AmexioHeaderComponent, AmexioContextMenuComponent, AmexiodialoguePaneComponent, AmexioLayoutComponent,
                AmexioRowComponent, AmexioColumnComponent, AmexioButtonComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioRichEditorComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    });

    it('Test amexion rich', () => {
        expect(comp).toBeTruthy();
    });
    // it('Test onTabSourceCode() rich', () => {
    //     comp.onTabSourceCode();
    //     comp.editableComponentRef.onHtmlCodeClick();
    // });
    it('Test emitSourceCode() method', () => {
        const data = '';
        comp.printTabSource = data;
        comp.onCodeClick.subscribe((g: any) => {
            expect(data).toEqual(g);
          });
    });
});
