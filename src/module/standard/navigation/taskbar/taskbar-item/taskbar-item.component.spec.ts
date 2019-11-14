import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AmexioTaskbarItemComponent } from './taskbar-item.component';

import { CommonIconComponent } from '../../../../base/components/common.icon.component';
import { AmexioPanelComponent } from '../../../panes/panel/panel.component';

import { AmexioButtonComponent } from '../../../forms/buttons/button.component';

import { ColorPaletteDirective } from '../../../../directive/color-palette.directive';
import { AmexioLabelComponent } from '../../../forms/label/label.component';

import { ToolbarComponent } from '../../../forms/toolbar/toolbar.component';
import { ToolbaroneComponent } from '../../../forms/toolbar/toolbarone.component';

import { AmexioContextMenuComponent } from '../../../../base/base.contextmenu.component';
import { AmexioPanelHeaderComponent } from '../../../panes/panel/panel.header.component';
import { AmexioImageComponent } from '../../../media/image/image.component';

describe('TaskbarItemComponent', () => {
    let comp: AmexioTaskbarItemComponent;
    let fixture: ComponentFixture<AmexioTaskbarItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CommonIconComponent, AmexioButtonComponent,
                AmexioLabelComponent, ToolbarComponent, ToolbaroneComponent,
                AmexioContextMenuComponent, AmexioImageComponent,
                AmexioPanelHeaderComponent,
                AmexioTaskbarItemComponent, ColorPaletteDirective, AmexioPanelComponent],
            providers: [],

        });
        fixture = TestBed.createComponent(AmexioTaskbarItemComponent);
        comp = fixture.componentInstance;
    });

    it('should check taskbarItemClick()', () => {
        expect(comp).toBeTruthy();
        comp.displayFlag = false;
        comp.taskbarItemClick();
        expect(comp.displayFlag).toEqual(true);
    });

    it('should check iconClick() if condition', () => {
        expect(comp).toBeTruthy();
        const event = {};
        comp.close = true;
        comp.iconClick(event);
        comp.close = true;
        expect(comp.close).toEqual(true);
        comp.iconClose = true;
        comp.displayFlag = false;
        expect(event).toBeDefined();
        comp.taskbarItemId.nativeElement.parentNode.remove();

        comp.onCloseEvent.subscribe((g: any) => {
            expect(comp.taskbarItemId).toEqual(g);
        });
    });
    it('should check iconClick() if with else condition', () => {
        let event;
        comp.close = true;
        comp.iconClick(event);
        comp.close = true;
        expect(comp.close).toEqual(true);
        comp.iconClose = true;
        comp.displayFlag = false;
        expect(event).not.toBeDefined();
        comp.onCloseEvent.subscribe((g: any) => {
            expect(comp.taskbarItemId).toEqual(g);
        });
    });
    it('should check iconClick() else condition', () => {
        let event;
        comp.close = false;
        comp.iconClick(event);
        comp.close = false;
        expect(comp.close).toEqual(false);
        comp.onCloseEvent.subscribe((g: any) => {
            expect(comp.taskbarItemId).toEqual(g);
        });
    });
});
