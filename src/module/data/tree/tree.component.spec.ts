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
    let DataJson: any;
    let node: any;
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
        jasmine.clock().uninstall();
        jasmine.clock().install();
        DataJson = [{
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

        node = [{
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
        comp.displaykey = 'text';
        comp.childarraykey = 'children';
    });
    it('  Tree true is true', () => expect(true).toBe(true));
    it('Tree get data', () => {
        expect(comp.data).toEqual(comp._data);
    });


    it('Tree onTreeNodeCheck() on method call', () => {
        comp.onTreeNodeCheck(DataJson);
        comp.onTreeNodeChecked.subscribe((g: any) => {
            expect(comp.onTreeNodeChecked).toEqual(g);
        });
    });
    it('Tree rightClickDataEmit() on method call', () => {

        let data = DataJson;
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

    // it('Tree ngOnInit() on method call', () => {
    //  let responseData = {
    //         "data": [{
    //           "text": "Web App",
    //           "expand": true,
    //           "children": [
    //             {
    //               "text": "app",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Application.js"
    //                 }
    //               ]
    //             },
    //             {
    //               "text": "button",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Button.js"
    //                 }
    //               ]
    //             }
    //           ]
    //         }]
    //       }
    //    comp.ngOnInit();
    //    comp.setData(responseData);

    // });


    it('Tree AfterViewInit on method call if', () => {
        setTimeout(() => {
            let fixture1 = TestBed.createComponent(AmexioTreeViewComponent);
            let wrapperComponent = fixture1.componentInstance; 
            let component = fixture1.componentInstance.templates;
            comp.ngAfterViewInit();
            expect(comp.parentTmp).not.toBeNull();
            comp.templates = { treeNodeTemplate: comp.parentTmp };
            fixture.detectChanges();
            comp['componentLoaded'] = true;
          });
    });
    it('ngAfterViewInit() second else if', () => {
        let fixture1 = TestBed.createComponent(AmexioTreeViewComponent);
        let wrapperComponent = fixture1.componentInstance;
    
        // get a reference to the actual component we want
        let component = fixture1.componentInstance.templates;
        comp.templates = component;
        comp.templates = { treeNodeTemplate: comp.parentTmp };
    
        comp.ngAfterViewInit()
        // } else if (this.templates != null) {
        expect(comp.templates).not.toBeNull();
        comp.parentTmp = comp.templates.treeNodeTemplate;
        fixture.detectChanges();
        comp['componentLoaded'] = true;
      });
    
    it('Tree resetFlag() on method call', () => {
        comp.flag = true;
        comp.resetFlag();
        comp.flag = false;
        comp.resetFlag();
        expect(comp.flag).toBe(false);
        expect(comp.setSelectedFlag()).toHaveBeenCalled;
    });


    it('Tree expandAll() on if method call', () => {
        let node = {
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
        comp.parentRef = {
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
        };
        comp.expandAll(node);
        spyOn(comp, 'expandAllCall');
        expect(comp.expandAllCall).not.toHaveBeenCalled();
        jasmine.clock().tick(101);
        expect(comp.parentRef).toBeDefined();
        expect( comp.expandAllCall).toHaveBeenCalled();
        // expect(comp.parentRef).toBeDefined();
        // comp.expandAllCall(comp.parentRef);
        // comp.destroyExpandAll = setTimeout(() => {
        //     expect(comp.parentRef).toBeDefined();
        //     comp.expandAllCall(comp.parentRef);
        // }, 0);
    });
    it('Tree expandAll() on else  method call', () => {
        let node = {
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
        comp.parentRef = null ;
        comp.expandAll(node);
        jasmine.clock().tick(101);
        expect(comp.parentRef).toBe(null);
        // comp.destroyExpandAll = setTimeout(() => {
        //     expect(comp.parentRef).toBe(null);
        // }, 0);
    });
    it('Tree updateComponent() on method call', () => {
        comp.previousValue = '90';

        comp.updateComponent();
        expect(DataJson).not.toBe(null);
        expect(JSON.stringify(comp.previousValue)).toBe('"90"');
        expect(JSON.stringify(comp.previousValue)).not.toEqual(JSON.stringify(DataJson));
        comp.updateComponent();
    });

    // it('Tree collapseAll() on method call', () => {

    //     comp.collapseAll(comp.parentRef);
    //       comp.collapseAll(node);
    // });
    it('Tree onNodeClick on method call', () => {
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
        comp.data = [{
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
        comp.onNodeClick(node1);
        const cloneNode = JSON.parse(JSON.stringify(node1));
        comp.cloneMethod(cloneNode);
        comp.nodeClick.emit(cloneNode);
        comp.activateNode(comp.data, node1);
    });
    it('Tree clonemethod on method call', () => {
        let cloneNode = {
            "text": "Web App",
            "elementId" : '14521',
            "children": [
                {
                    "text": "app",
                    "elementId" : '141521',
                    "children": [
                        {
                            "elementId" : '142521',
                            "leaf": true,
                            "text": "Application.js"
                        }
                    ]
                }
            ]
        };
        comp.data = [{
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
   comp.cloneMethod(cloneNode);
  delete cloneNode['elementId'];
  expect(cloneNode.children).toBeDefined();
  cloneNode.children.forEach((element: any) => {
    comp.cloneMethod(element);
});
    });
    it('Tree onClick() on method call', () => {
        node.expand = true;
        comp.onClick(node);
        node.expand = false;
        expect(node.expand).toBe(false);
    });

    it('Tree collapseAllCall() on method call', () => {
        comp.collapseAllCall(node);
        node = [{
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
        comp.collapseAllCall(node);
        node.forEach((childCheck: any) => {
            expect(childCheck.hasOwnProperty('expand')).toEqual(true);
            childCheck.expand = false;
            expect(childCheck.hasOwnProperty(comp.childarraykey)).toEqual(true);
            comp.collapseAllCall(childCheck[comp.childarraykey]);
        });
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
        checkD.checked = false;
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

    // it('Tree set data method', () => {
    //     (<any>comp)._data = checkD;
    //     (<any>comp)['componentLoaded'] = true;
      
    //     (<any>comp).data((<any>comp)._data);
    //     expect((<any>comp)).toBeDefined;
    //     expect((<any>comp)['componentLoaded']).toEqual(true);
    //     expect((<any>comp).updateComponent()).toHaveBeenCalled;
    // });



    // it('Tree removeListner() on method call', () => {

    //     comp.removeListner();
    //     // expect(comp.globalClickListenFunc).toBe(value);
    //     expect(comp.globalClickListenFunc()).toHaveBeenCalled;
    // });



  


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
    //                 },
    //                 {
    //                     "text": "button",
    //                     "expand": true,
    //                     "children": [
    //                       {
    //                         "leaf": true,
    //                         "text": "Button.js"
    //                       }
    //                     ]
    //                   }
    //             ]
    //         }]
    //     };
    //     let node =  {
    //         "text": "app",
    //         "expand": true,
    //         "children": [
    //             {
    //                 "leaf": true,
    //                 "text": "Application.js"
    //             }
    //         ]
    //     };
    //     let index = 0;
    //     comp.childarraykey = 'children';
    //     comp.onArrowDown(event, data, node, index);
    //     const incrementindex = index + 1;
    //     const itemid = data[incrementindex]
    //     expect(node.expand).toEqual(true);
    //     expect(node[comp.childarraykey]).toEqual(true);
    //     const data1 = node[this.childarraykey][0];
    //      comp.setFocus(data1);

    // });


    it('Generate Index Method', () => {

       let data = [
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
                      "text": "Application.js",
                    }
                  ]
                },
                {
                  "text": "button",
                  "expand": true,
                  "children": [
                    {
                      "leaf": true,
                      "text": "Button.js",
                    }
                  ] }] }]
        let index = 0;
        comp.childarraykey = 'children';
        let parentId = 1;
        let rannumber = Math.floor(Math.random() * 1000 + 999 + 1);
        comp.generateIndex(data, parentId, rannumber);
        data.forEach((element: any,index:any) => {
            element['elementId'] = '' + rannumber + '-' + parentId + (index + 1);
            expect(element[comp.childarraykey]);
            comp.generateIndex(element[comp.childarraykey], element.elementId.split('-')[1], rannumber);
        });
    });

    //   it(' tree setData() method call if condition', () => {
    //     let httpResponse = {
    //         "data": [{
    //           "text": "Web App",
    //           "expand": true,
    //           "children": [
    //             {
    //               "text": "app",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Application.js"
    //                 }
    //               ]
    //             },
    //             {
    //               "text": "button",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Button.js"
    //                 }
    //               ]
    //             }
    //           ]
    //         }]
    //       }
    //       let data1 = [
    //         {
    //           "text": "Web App",
    //           "expand": true,
    //           "children": [
    //             {
    //               "text": "app",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Application.js",
    //                 }
    //               ]
    //             },
    //             {
    //               "text": "button",
    //               "expand": true,
    //               "children": [
    //                 {
    //                   "leaf": true,
    //                   "text": "Button.js",
    //                 }
    //               ] }] }]  
    //  comp.filtertreeflag = false;   
    //  comp.datareader = 'data';    
    //  comp.setData(httpResponse);
    // let responsedata: any = httpResponse;
    // expect(comp.datareader).not.toEqual(null);
    // const dr = comp.datareader.split('.');
    // for (const ir of dr) {
    //   responsedata = responsedata[ir];
    // }
    // comp.data = responsedata;
    // comp.parentRef = comp.data;
    // comp.globalTreeData = [];
    // expect(comp.globalTreeData.length).toEqual(0);
    // expect(comp.filtertreeflag).toEqual(false);
    // comp.globalTreeData = comp.data;
    // comp.generateIndex(httpResponse.data,1,Math.floor(Math.random() * 1000 + 999 + 1));
    // comp.setSelectedFlag();
    // comp.activateNode(comp.data,null);
    //   });


      it(' tree setData() method call else condition', () => {
        let httpResponse = 
         [
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
                          "text": "Application.js",
                        }
                      ]
                    },
                    {
                      "text": "button",
                      "expand": true,
                      "children": [
                        {
                          "leaf": true,
                          "text": "Button.js",
                        }
                      ] }] }]
            
     comp.filtertreeflag = false;       
    comp.setData(httpResponse);
    let responsedata: any = httpResponse;
    comp.datareader = null;
    expect(comp.datareader).toEqual(null);
    responsedata = httpResponse;
    comp.data = responsedata;
    comp.parentRef = comp.data;
    comp.globalTreeData = [];
    expect(comp.globalTreeData.length).toEqual(0);
    expect(comp.filtertreeflag).toEqual(false);
    comp.globalTreeData = comp.data;
    comp.generateIndex(comp.globalTreeData,1,Math.floor(Math.random() * 1000 + 999 + 1));
    comp.setSelectedFlag();
    comp.activateNode(comp.data,null);
      });

      it(' tree setSelectedFlag() method call', () => {
       comp.setSelectedFlag();
      });    
});


