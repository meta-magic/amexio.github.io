import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioTreeViewComponent } from './tree.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2, Renderer } from '@angular/core';

describe('amexio-treeview', () => {
    let comp: AmexioTreeViewComponent;
    let fixture: ComponentFixture<AmexioTreeViewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioTreeViewComponent, AmexioContextMenuComponent],
            providers: [IconLoaderService, CommonDataService, Renderer2, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioTreeViewComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        let renderer = Renderer2;

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
    it('rightClickDataEmit() on method call', () => {

        let data = comp.data;
        comp.rightClickDataEmit(data);
        comp.rightClick.subscribe((g: any) => {
            expect(comp.rightClick).toEqual(g);
        });
    });

    // it('addListner() on method call', () => {

    //     let value = true;

    //     comp.globalClickListenFunc = comp.renderer.listen('document', 'click', (e: any) => {
    //         this.resetFlag();
    //         if (!this.flag) {
    //             this.removeListner();
    //         }
    //     });

    //     comp.addListner();
    //     expect(comp.globalClickListenFunc).toBe(value);
    //     expect(comp.globalClickListenFunc()).toHaveBeenCalled;
    // });

    // it('loadContextMenu() on method call', () => {

    //     let rightClickData = {
    //         "data": [
    //             {
    //                 "leaf": true,
    //                 "text": "Application.js",
    //                 "elementId": "1036-1111",
    //                 "isSelected": true,
    //                 "active": false
    //             }
    //         ],
    //         "event": [
    //             {
    //                 "isTrusted": true,
    //                 "screenX": 458,
    //                 "screenY": 511,
    //                 "clientX": 391,
    //                 "clientY": 412
    //             }
    //         ]
    //     };

    //     rightClickData['event'];
    //     rightClickData['event']['clientX'] = 391;
    //     rightClickData['event']['clientY'] = 412;
    //     rightClickData['data']['isSelected'] = true;

    //     comp.loadContextMenu(rightClickData);
    //     // expect(comp.mouseLocation.left).toBe(391);
    //     // expect(comp.mouseLocation.top).toBe(412);
    //     expect(comp.setSelectedFlag()).toHaveBeenCalled;
    //     expect(rightClickData['data']['isSelected']).toEqual(true);
    // });



    // it('removeListner() on method call', () => {

    //     comp.removeListner();
    //     // expect(comp.globalClickListenFunc).toBe(value);
    //     expect(comp.globalClickListenFunc()).toHaveBeenCalled;
    // });


    it('ngOnDestroy() on method call', () => {

        comp.destroyExpandAll = true;
        comp.ngOnDestroy();
        expect(comp.destroyExpandAll).toBe(true);
        clearTimeout(comp.destroyExpandAll)
    });

    it('getContextMenu() on method call', () => {


        comp.flag = true;
        comp.cloneContextMenuData = [{ "text": "Add New", "icon": "fa fa-plus", "disabled": true }, { "text": "Edit", "icon": "", "seperator": true }
            , { "text": "Send data in email", "icon": "" }];
        comp.contextmenu = comp.cloneContextMenuData;
        comp.getContextMenu();

        expect(comp.contextmenu).toBe(comp.cloneContextMenuData);
        expect(comp.contextmenu.length).toBeGreaterThan(0);
        expect(comp.flag).toBe(true);
        expect(comp.addListner()).toHaveBeenCalled;
    });

    it('resetFlag() on method call', () => {
        comp.flag = true;
        comp.resetFlag();
        comp.flag = false;
        comp.resetFlag();
        expect(comp.flag).toBe(false);
        expect(comp.setSelectedFlag()).toHaveBeenCalled;
    });



    it('emitCheckedData() on method call', () => {
        let checkD = {
            "checked":true,
            "data": [
                {
                    "text": "Web App",
                    "expand": true,
                    
                    "children": [
                        {
                            "text": "app",
                            "expand": true
                        }
                    ]
                }
            ]
        }
        
        checkD.checked = false;
        comp.emitCheckedData(checkD);
        expect(checkD.checked).toEqual(true)
        expect(comp.setSelectedFlag()).toHaveBeenCalled;

        checkD.checked = true;
        comp.emitCheckedData(checkD);
        // expect(checkD.data)
    });


});


