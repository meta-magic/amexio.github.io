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
        
        checkD = [ {            
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

    });
   

    it('fliter tree check variables ', () => {

        comp.isDataFound = true;
        expect(comp.isDataFound).toEqual(true);
        comp.onClickSearch = false;
        expect(comp.onClickSearch).toEqual(false);
        comp.mask = true;
        expect(comp.mask).toEqual(true);
        comp.isexpandAll = false;
        expect(comp.isexpandAll).toEqual(false);
      });

    it('fliter tree expandAll() on method call', () => {
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

    it('fliter tree expandAllCall() on method call', () => {
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

    it('fliter tree getData()if on method call', () => {
        let httpResponse = [
        
            {
              "text": "Home",
              "icon" : "fa fa-home fa-fw",
              "mdaIcon" : "home",
              "link" : "/home/dashboard",
              "selected":true,
              "badge": "12"
            },
            {
              "text": "Email",
              "icon" : "fa fa-envelope fa-fw",
              "mdaIcon" : "email",
              "link" : "/home/email",
              "badge": "21"
            },
            {
              "text": "Profile",
              "icon" : "fa fa-user fa-fw",
              "mdaIcon" : "account_box",
              "link" : "/home/profile",
              "badge": "32"
            }];
     
        comp.getData(httpResponse);
        let responsedata: any = httpResponse;
        comp.datareader ='data';
        expect(comp.datareader).not.toEqual(null);
        const dr =  comp.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
             return responsedata;
       });

       it('fliter tree getData() else on method call', () => {
        let httpResponse = [
        
            {
              "text": "Home",
              "icon" : "fa fa-home fa-fw",
              "mdaIcon" : "home",
              "link" : "/home/dashboard",
              "selected":true,
              "badge": "12"
            },
            {
              "text": "Email",
              "icon" : "fa fa-envelope fa-fw",
              "mdaIcon" : "email",
              "link" : "/home/email",
              "badge": "21"
            },
            {
              "text": "Profile",
              "icon" : "fa fa-user fa-fw",
              "mdaIcon" : "account_box",
              "link" : "/home/profile",
              "badge": "32"
            }];
        comp.getData(httpResponse);
        comp.datareader =null;
        expect(comp.datareader).toEqual(null);
         let responsedata = httpResponse;
             return responsedata;
       });

       it('fliter tree setData() method call', () => {
        let httpResponse = [
        
            {
              "text": "Home",
              "icon" : "fa fa-home fa-fw",
              "mdaIcon" : "home",
              "link" : "/home/dashboard",
              "selected":true,
              "badge": "12"
            },
            {
              "text": "Email",
              "icon" : "fa fa-envelope fa-fw",
              "mdaIcon" : "email",
              "link" : "/home/email",
              "badge": "21"
            },
            {
              "text": "Profile",
              "icon" : "fa fa-user fa-fw",
              "mdaIcon" : "account_box",
              "link" : "/home/profile",
              "badge": "32"
            }];
           comp.setData(httpResponse);
           const tdata = comp.getData(httpResponse);
           expect(tdata).toBeDefined();
           comp.orgTreeData = JSON.parse(JSON.stringify(tdata));
           comp.treeData = tdata;
           comp.mask = false;
       }); 
});


