
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { ToolBarActionComponent } from './toolbaraction.component';
import { ToolbarComponent } from './toolbar.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

describe('amexio-toolbar-item', () => {
    let comp: ToolBarActionComponent;
    let fixture: ComponentFixture<ToolBarActionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolBarActionComponent, ToolbarComponent, AmexioFormIconComponent],
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

    it('onclick method variable', () => {
    expect(comp.title).toBe('');
    });
    it('onclick method variable',()=>{
expect(comp.type).toBe('');
    });

    })

});

