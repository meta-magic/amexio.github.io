import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioTreeViewComponent } from './tree.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('amexio-treeview', () => {
    let comp: AmexioTreeViewComponent;
    let fixture: ComponentFixture<AmexioTreeViewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioTreeViewComponent, AmexioContextMenuComponent],
            providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioTreeViewComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    });
    it('true is true', () => expect(true).toBe(true));
    it('get data', () => {
        expect(comp.data).toEqual(comp._data);
    });

    //    it('set data method',() => {
    //     (<any>comp)['componentLoaded'] = true;  
    //     (<any>comp).data();

    //       expect((<any>comp)['componentLoaded'] ).toEqual(true);
    //         expect((<any>comp).updateComponent()).toHaveBeenCalled;
    //       });


    //   it('onClick() on method call', () => {
    //     let node: any;
    //     node.extend = true;
    //     comp.onClick(node);
    //     expect(node.extend).toEqual(true);
    //     node.extend = false;
    //     comp.onClick(node);
    //     expect(node.extend).toEqual(false);
    //   });


    // it('onArrowDown method', () => {

    //     let data = {
    //         "item": [{
    //             "text": "Web App",
    //             "expand": true,
    //             "children": [
    //                 {
    //                     "text": "app",
    //                     "expand": true,
    //                     "children": [
    //                         {
    //                             "leaf": true,
    //                             "text": "Application.js"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }]
    //     };
    //     let event = data;
    //     let node = data;
    //     let index = 0;
    //     comp.onArrowDown(event, data, node, index);
    //     const incrementindex = index + 1;
    //     expect(incrementindex).toBe(1);
    //     // const itemid = data[incrementindex];

    //     // node.expand = true;
    //     // expect(node.expand).toBe(true);


    // });

    it('onTreeNodeCheck() on method call', () => {

        let data = comp.data;
        comp.onTreeNodeCheck(data);
        comp.onTreeNodeChecked.subscribe((g: any) => {
            expect(comp.onTreeNodeChecked).toEqual(g);
        });
    });

});


