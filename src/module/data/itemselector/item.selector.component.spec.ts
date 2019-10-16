/**
 * Created by kedar on 20/08/18.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';

import { AmexioItemSelectorComponent } from './item.selector.component';
import { AmexioColumnComponent } from '../../layout/columns/column.component';
import { AmexioRowComponent } from '../../layout/rows/row.component';

import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
import { AmexioCardComponent } from '../../layout/card/card.component';
import { AmexioBodyComponent } from '../../panes/body/pane.action.body';
import { stringify } from 'querystring';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';

describe('amexio-item-selector', () => {

    let comp: AmexioItemSelectorComponent;
    let fixture: ComponentFixture<AmexioItemSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioItemSelectorComponent,AmexioContextMenuComponent, CommonIconComponent, AmexioRowComponent, AmexioBodyComponent, AmexioHeaderComponent, AmexioCardComponent, AmexioColumnComponent],
            providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler,],
        });
        fixture = TestBed.createComponent(AmexioItemSelectorComponent);
        comp = fixture.componentInstance;
    });




    it('generate index methos call', () => {
        let getAvailableData = [
            {
                "countryName": "Myanmar",
                "countryCode1": "MM",
            },
            {
                "countryName": "U.S. Virgin Island",
                "countryCode1": "VI",

            },
            {
                "countryName": "Latvia",
                "countryCode1": "LV",

            }]
        comp.generateIndex(getAvailableData);
        expect(getAvailableData).toBeDefined();
        getAvailableData.forEach((element: any, index: any) => {
            element['id'] = 'itemselector' + window.crypto.getRandomValues(new Uint32Array(1))[0];
        });
    });
});
 
