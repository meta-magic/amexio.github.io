
import { AmexioButtonComponent } from './../buttons/button.component';
import { ToolBarActionComponent } from './toolbaraction.component';
import { ToolbarComponent } from './toolbar.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-toolbar-item', () => {
    let comp: ToolBarActionComponent;
    let fixture: ComponentFixture<ToolBarActionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolBarActionComponent, ToolbarComponent,CommonIconComponent],
            providers: [IconLoaderService]
        });
        fixture = TestBed.createComponent(ToolBarActionComponent);
        comp = fixture.componentInstance;
    });
    it('initial check', () => {
        expect(true).toBe(true);
    });

    it('check for actionComponent', () => {
        expect(comp.actionComponent).toBe('');
    });

    it('should emit ', (check) => {

        const node = {
            title: 't',
            type: 'a',
          };
          let event= { data: node, event: Event };
          comp.onClick({event:Event});
            comp.navLinkClick.subscribe((g: any) => {
                expect(g.node).toEqual('event');
            });
            check();
        });
});



