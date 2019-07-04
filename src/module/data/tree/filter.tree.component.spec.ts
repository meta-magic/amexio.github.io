import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import {AmexioFilterTreeComponent} from './filter.tree.component';
import { AmexioTreeViewComponent } from './tree.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2, Renderer } from '@angular/core';
import { CommonIconComponent } from './../../base/components/common.icon.component';
describe('amexio-tree-filter-view', () => {
    let comp: AmexioFilterTreeComponent;
    let fixture: ComponentFixture<AmexioFilterTreeComponent>;

    let checkD: any;
   let  data:any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CommonIconComponent,AmexioTreeViewComponent,AmexioFilterTreeComponent, AmexioContextMenuComponent],
            providers: [IconLoaderService, CommonDataService, Renderer2, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioFilterTreeComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        let renderer = Renderer2;
         this.data = {
            "text": "Home",
            "icon" : "fa fa-home fa-fw",
            "mdaIcon" : "home",
            "link" : "/home/dashboard",
            "selected":true,
            "badge": "12"
          };
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
   

    it('check variables ', () => {

        comp.isDataFound = true;
        expect(comp.isDataFound).toEqual(true);
        comp.onClickSearch = false;
        expect(comp.onClickSearch).toEqual(false);
        comp.mask = true;
        expect(comp.mask).toEqual(true);
        comp.isexpandAll = false;
        expect(comp.isexpandAll).toEqual(false);
      });

    it('expandAll() on method call', () => {
        let node = {
            "text": "Home",
            "icon" : "fa fa-home fa-fw",
            "mdaIcon" : "home",
            "link" : "/home/dashboard",
            "selected":true,
            "badge": "12"
          };
        comp.isexpandAll = true;
        comp.expandAll(node);
        comp.destroyExpandAll = setTimeout(() => {
            expect(checkD).toBe(true);
            comp.expandAllCall(checkD);
        }, 0);
    });

    it('expandAllCall() on method call', () => {
        let node1 =[ {            
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
        let node =[ {            
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

    // it('generateindex on method call', () => {
    //     let data2 =[ {            
    //         "text": "Web App",
    //         "expand": true,
    //         "children": [
    //             {
    //                 "text": "app",
    //                 "expand": true,
    //                 "children": [
    //                     {
    //                         "leaf": true,
    //                         "text": "Application.js"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];
    //     let parentID = 14;
    //     let rannumber = 3098;
    //     comp.childarraykey = 'children';
    //     comp.generatefilterIndex(data2,parentID,rannumber);
    //     data2.forEach((element: any, index: number) => {
    //         element['id'] = '' + rannumber + '-' + parentID + (index + 1);
    //         expect(element[comp.childarraykey]).toEqual(true);
    //         comp.generatefilterIndex(element[comp.childarraykey], element.id.split('-')[1], rannumber);
    //       });    
    // });
});


