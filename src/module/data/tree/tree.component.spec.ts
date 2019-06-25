import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioTreeViewComponent } from './tree.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';
import { CommonDataService } from '../../services/data/common.data.service';
import {HttpClient,HttpHandler} from '@angular/common/http';
describe('amexio-treeview', () => {
    let comp: AmexioTreeViewComponent;
    let fixture: ComponentFixture<AmexioTreeViewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioTreeViewComponent,AmexioContextMenuComponent],
            providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioTreeViewComponent);
        comp = fixture.componentInstance;
    });
    it('true is true', () => expect(true).toBe(true));
    it('get data', () => {
        expect(comp.data).toEqual(comp._data);
    });
});


