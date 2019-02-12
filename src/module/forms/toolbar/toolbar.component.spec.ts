import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { ToolbarComponent } from './toolbar.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-toolbar', () => {
    let comp: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToolbarComponent, AmexioButtonComponent,CommonIconComponent],
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


        position = 'right';
        comp.getToolbaritemposition(position);
        expect(position).toEqual('right');

        position = 'left';
        comp.getToolbaritemposition(position);
        expect(position).toEqual('left');

        position = 'center';
        comp.getToolbaritemposition(position);
        expect(position).toEqual('center');

        position = '';
        comp.getToolbaritemposition(position);
        expect(position).toEqual('');


    });


    // it('onToolClick check method',() => {
    //     let tool: any;
    //     let position: any;
    //     comp.onToolClick(tool);
    //     comp.seperator = true;
    //     expect(position).toBe('right');
    //     expect(comp.seperator).toEqual(true);

    // });


});
