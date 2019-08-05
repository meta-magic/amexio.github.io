import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioWindowPaneComponent } from './window.pane.component';

describe('amexio-window', () => {
    let comp: AmexioWindowPaneComponent;
    let fixture: ComponentFixture<AmexioWindowPaneComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioWindowPaneComponent, AmexioButtonComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioWindowPaneComponent);
        comp = fixture.componentInstance;
    });

    // it('check onMinimizeClick method ', () => {
    //     comp.minimizeFlag = true;
    //     let event: any;
    //     comp.show = true;
    //     comp.onMinimizeClick(event);
    //     expect(comp.minimizeFlag).toEqual(true);
    //     expect(comp.show).toBe(true);
    //     expect(comp.minimizeBtnClick()).cll

    // });
});
