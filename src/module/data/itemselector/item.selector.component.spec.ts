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


describe('amexio-item-selector', () => {

    let comp: AmexioItemSelectorComponent;
    let fixture: ComponentFixture<AmexioItemSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioItemSelectorComponent, CommonIconComponent, AmexioRowComponent, AmexioBodyComponent, AmexioHeaderComponent, AmexioCardComponent, AmexioColumnComponent],
            providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler,],
        });
        fixture = TestBed.createComponent(AmexioItemSelectorComponent);
        comp = fixture.componentInstance;
    });

    // it(' variable check ', () => {

    //     (<any>comp).mask = true;
    //     expect((<any>comp).mask).toEqual(true);

    //     comp.leftactive = true;
    //     expect(comp.leftactive).toEqual(true);

    //     comp.rightactive = true;
    //     expect(comp.rightactive).toEqual(true);

    //     (<any>comp).selectedData = [];
    //     expect((<any>comp).selectedData).toEqual([]);
    // });


    // it('check dataEmitter method for availableRecord', () => {
    //     comp.dataEmitter();
    //     comp.availableRecords.subscribe((g: any) => {
    //         expect(comp.availableData).toEqual(g);
    //     });
    // });

    // it('check dataEmitter method for selectedRecords', () => {
    //     comp.dataEmitter();
    //     comp.selectedRecords.subscribe((g: any) => {
    //         expect(comp.selectedData).toEqual(g);
    //     });
    // });

    // it('get data method', () => {
    //     comp.data;
    //     expect(comp.data).toBe(comp._data);
    // });


    // it('get data method', () => {
    //     comp.data;
    //     let value: any[];
    //     expect(value).toBe(comp._data);
    //     (<any>comp).componentLoaded = true;
    //     expect((<any>comp).componentLoaded).toEqual(true);
    // });
});

