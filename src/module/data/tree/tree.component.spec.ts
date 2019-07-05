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

    let checkD: any;

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
        checkD = {
            "checked": true,
            "key": 'kedar',
            "data": [
                {
                    "text": "Web App",
                    "expand": true,

                    "children": [
                        {
                            "text": "app",
                            "expand": true,
                            "children": [
                                {
                                    "leaf": true,
                                    "text": "Application.js"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    });
    it('  Tree true is true', () => expect(true).toBe(true));
    it('Tree get data', () => {
        expect(comp.data).toEqual(comp._data);
    });


    it('Tree onTreeNodeCheck() on method call', () => {

        let data = comp.data;
        comp.onTreeNodeCheck(data);
        comp.onTreeNodeChecked.subscribe((g: any) => {
            expect(comp.onTreeNodeChecked).toEqual(g);
        });
    });
    it('Tree rightClickDataEmit() on method call', () => {

        let data = comp.data;
        comp.rightClickDataEmit(data);
        comp.rightClick.subscribe((g: any) => {
            expect(comp.rightClick).toEqual(g);
        });
    });

    it('Tree ngOnDestroy() on method call', () => {

        comp.destroyExpandAll = true;
        comp.ngOnDestroy();
        expect(comp.destroyExpandAll).toBe(true);
        clearTimeout(comp.destroyExpandAll)
    });

    it('Tree getContextMenu() on method call', () => {


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

    it('Tree ngOnInit() on method call', () => {
        comp.contextmenu = [{ "text": "Add New", "icon": "fa fa-plus", "disabled": true }, { "text": "Edit", "icon": "", "seperator": true }
            , { "text": "Send data in email", "icon": "" }];

        comp.ngOnInit();
        expect(comp.contextmenu).not.toBe(null);
        expect(comp.contextmenu.length).toBeGreaterThan(0);


    });
    it('Tree resetFlag() on method call', () => {
        comp.flag = true;
        comp.resetFlag();
        comp.flag = false;
        comp.resetFlag();
        expect(comp.flag).toBe(false);
        expect(comp.setSelectedFlag()).toHaveBeenCalled;
    });


    it('Tree expandAll() on method call', () => {
        let node: any;
        comp.parentRef = true;
        comp.expandAll(node);
        comp.destroyExpandAll = setTimeout(() => {
            expect(comp.parentRef).toBe(true);
            comp.expandAllCall(comp.parentRef);
        }, 0);
    });

    it('Tree updateComponent() on method call', () => {
        comp.previousValue = '90';

        comp.updateComponent();
        expect(comp.data).not.toBe(null);
        expect(JSON.stringify(comp.previousValue)).toBe('"90"');
        expect(JSON.stringify(comp.previousValue)).not.toEqual(JSON.stringify(comp.data));
        comp.updateComponent();
    });


    it(' Tree call expandAllCall() on method call', () => {
        let node1 = [{
            "text": "Web App",
            "children": [
                {
                    "text": "app",
                    "children": [
                        {
                            "leaf": true,
                            "text": "Application.js"
                        }
                    ]
                }
            ]
        }
        ];
        comp.childarraykey = 'children';
        let node = [{
            "text": "Web App",
            "expand": true,
            "children": [
                {
                    "text": "app",
                    "expand": true,
                    "children": [
                        {
                            "leaf": true,
                            "text": "Application.js"
                        }
                    ]
                }
            ]
        }
        ];
        comp.expandAllCall(node);
        node.forEach((childCheck: any) => {
            expect(childCheck.hasOwnProperty('expand')).toEqual(true);
            childCheck.expand = false;
            expect(childCheck.expand).not.toEqual(true);
            childCheck.expand = true;
            expect(childCheck.hasOwnProperty(comp.childarraykey)).toEqual(true);
            expect(childCheck[comp.childarraykey]).not.toEqual(null);
            comp.expandAllCall(childCheck[comp.childarraykey]);
        });
        comp.expandAllCall(node1);
        node1.forEach((childCheck: any) => {
            expect(childCheck.hasOwnProperty('expand')).toBeUndefined;
            childCheck['expand'] = true;
            expect(childCheck.hasOwnProperty(comp.childarraykey)).toEqual(true);
            expect(childCheck[comp.childarraykey]).not.toEqual(null);
            comp.expandAllCall(childCheck[comp.childarraykey]);
        });

    });

    it('Tree activateNode() on method call', () => {
        let LocalData = [{
            "checked": true,
            "key": 'kedar',
            "active": true,
            "item": [
                {
                    "leaf": true,
                    "text": "Application.js"
                }
            ]
        }];
        let LocalData2 = [{
            "checked": true,
            "key": 'kedar',
            "active": true,
            "item": [
                {
                    "leaf": true,
                    "text": "Application.js",
                    "expand": true,
                    "children": [
                        {
                            "text": "app",
                            "expand": true
                        }
                    ]
                }
            ]
        }];
        let node = {
            "leaf": true,
            "text": "Application.js"
        }

        comp.childarraykey = 'children'
        comp.activateNode(LocalData, node);
        for (const i of LocalData) {
            i['active'] = true;
            expect(i[comp.childarraykey]).not.toBe(comp.childarraykey);
            expect(i.item[0]).toEqual(node);
            expect(i['active']).toEqual(true);
        }

        comp.activateNode(LocalData2, node);
        for (const i of LocalData2) {
            i['active'] = false;
            expect(i.item[0]).not.toEqual(node);
            expect(i['active']).toEqual(false);
            i.item['children'] = true;
            expect(i.item['children']).toBe(true);
            // comp.activateNode(i[comp.childarraykey], node);

        }


    });






    it('Tree emitCheckedData() on method call', () => {
        checkD = [
            {
              "text": "Web App",
              "expand": true,
              "checked": false,
              "children": [
                {
                  "text": "app",
                  "expand": true,
                  "checked": false,
                  "children": [
                    {
                      "leaf": true,
                      "checked": false,
                      "text": "Application.js"
                    }
                  ]
                }
              ]
            }
          ];
        comp.displaykey = 'text';
        comp.childarraykey = 'children';


        checkD.checked = false;
        comp.emitCheckedData(checkD);
        checkD.checked = true;
        expect(checkD.checked).toEqual(true);

        expect(checkD[0].hasOwnProperty('children')).toEqual(true);
        checkD[0][comp.childarraykey].forEach((option: any) => {
            option.checked = true;
            expect(option.hasOwnProperty(comp.childarraykey)).toEqual(true);
            comp.setCheckedStatusFromParent(option);
        });
        comp.emitData(checkD);

        checkD.checked = false;
        comp.emitCheckedData(checkD);
        expect(checkD.checked).toBe(false);
        expect(checkD[0].hasOwnProperty('children')).toEqual(true);
        checkD[0][comp.childarraykey].forEach((option: any) => {
            option.checked = false;
            expect(option.hasOwnProperty(comp.childarraykey)).toEqual(true);
            comp.searchObject(option);
        });
        comp.emitData(checkD);



    });

    // it('Tree onNodeClick() on method call', () => {
    //     let node = [{
    //         "leaf": true,
    //         "text": "Application.js"
    //     }]

    //     comp.onNodeClick(node);
    //     const cloneNode = JSON.parse(JSON.stringify(node));
    //   //  comp.cloneMethod(cloneNode);
    //     //   expect(comp.cloneMethod).toHaveBeenCalled;
    //     comp.nodeClick.subscribe((g: any) => {
    //         expect(comp.nodeClick).toEqual(g);
    //     });
    //     // comp.activateNode(checkD,node);
    // });
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

    // it(' Tree loadContextMenu() on method call', () => {

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

    //    it('Tree set data method',() => {
    //     (<any>comp)['componentLoaded'] = true;  
    //     (<any>comp).data();

    //       expect((<any>comp)['componentLoaded'] ).toEqual(true);
    //         expect((<any>comp).updateComponent()).toHaveBeenCalled;
    //       });



    // it('Tree removeListner() on method call', () => {

    //     comp.removeListner();
    //     // expect(comp.globalClickListenFunc).toBe(value);
    //     expect(comp.globalClickListenFunc()).toHaveBeenCalled;
    // });



    //   it('Tree onClick() on method call', () => {
    //     let node: any;
    //     node.extend = true;
    //     comp.onClick(node);
    //     expect(node.extend).toEqual(true);
    //     node.extend = false;
    //     comp.onClick(node);
    //     expect(node.extend).toEqual(false);
    //   });


    // it('Tree onArrowDown method', () => {

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




});


