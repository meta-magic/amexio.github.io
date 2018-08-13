import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { ToolbarComponent } from './toolbar.component';
import { AmexioFormIconComponent } from '../../forms/icon/icon.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

describe('amexio-toolbar', () => {
    let comp: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolbarComponent, AmexioFormIconComponent, AmexioButtonComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(ToolbarComponent);
        comp = fixture.componentInstance;
    });

    it('getToolbarPosition check position', () => {
        comp.toolbarposition = 'top';
        comp.getToolbarPosition();
        expect(comp.toolbarposition).toEqual('top');
        comp.toolbarposition = 'right';
        comp.getToolbarPosition();
        expect(comp.toolbarposition).toEqual('right');
        comp.toolbarposition = 'bottom';
        comp.getToolbarPosition();
        expect(comp.toolbarposition).toEqual('bottom');
    });



    it('getToolbaritemposition method check ', () => {
        let position: any;
        comp.getToolbaritemposition(position);
        position = 'right';
        expect(position).toEqual('right');
        comp.getToolbaritemposition(position);
        position = 'left';
        expect(position).toEqual('left');
        comp.getToolbaritemposition(position);
        position = 'center';
        expect(position).toEqual('center');


    });

    // it('getSeperatotClass',() => {
    //     let toolnode: any;
    //     let position: any;

    //     comp.getSeperatotClass(toolnode);
    //     comp.seperator = true;

    //     expect(comp.seperator).toEqual(true);

    // });

});
