import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFilterTreeComponent } from './filter.tree.component';
import { AmexioTreeViewComponent } from './tree.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2, Renderer, TemplateRef } from '@angular/core';
import { CommonIconComponent } from './../../base/components/common.icon.component';
describe('amexio-tree-filter-view', () => {
  let comp: AmexioFilterTreeComponent;
  let fixture: ComponentFixture<AmexioFilterTreeComponent>;

  let comp1: AmexioTreeViewComponent;
  let fixture1: ComponentFixture<AmexioTreeViewComponent>;
  let checkD: any;
  let data: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CommonIconComponent, AmexioTreeViewComponent, AmexioFilterTreeComponent, AmexioContextMenuComponent],
      providers: [IconLoaderService, CommonDataService, Renderer2, HttpClient, HttpHandler],
    });
    fixture = TestBed.createComponent(AmexioFilterTreeComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    fixture1 = TestBed.createComponent(AmexioTreeViewComponent);
    comp1 = fixture1.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    let renderer = Renderer2;

    // let fixture1 = TestBed.createComponent(WrapperComponent);
    // let wrapperComponent = fixture.componentInstance;
    // let component = fixture1.componentInstance.myCustomComponent;


    // comp.httpurl = "sample.json";
    // comp.httpmethod = "get";

    checkD = [{
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


  it('ngoninit() first else', () => {  
    comp.ngOnInit();  
    expect(comp.parentTmp).toBeUndefined();
    comp.ngAfterViewInit()
    expect(comp.parentTmp).toBeUndefined();

    comp.parentTmp = null;
    comp.ngOnInit();
    expect(comp.parentTmp).toBeNull();
    comp.ngAfterViewInit()
    expect(comp.parentTmp).toBeNull();

  });

  // it('ngAfterViewInit() first else', () => {

  //   // comp.parentRef = null;
  //   comp.ngAfterViewInit()
  //    expect(comp.parentTmp).toBeNull();
  // });

  it('ngoninit() first if', () => {
    // comp.parentTmp = new insertte
    let fixture1 = TestBed.createComponent(AmexioFilterTreeComponent);
    let wrapperComponent = fixture1.componentInstance;

    // get a reference to the actual component we want
    let component = fixture1.componentInstance.templates;
    comp.parentRef = component;
    comp.ngOnInit();
    expect(comp.parentTmp).not.toBeNull();
    comp.templates = { treeNodeTemplate: comp.parentTmp };
  });


  it('ngoninit() second elseif', () => {
    let fixture1 = TestBed.createComponent(AmexioFilterTreeComponent);
    let wrapperComponent = fixture1.componentInstance;

    // get a reference to the actual component we want
    let component = fixture1.componentInstance.templates;
    comp.templates = component;
    comp.templates = { treeNodeTemplate: comp.parentTmp };
    comp.ngOnInit();
    expect(comp.templates).not.toBeNull();
    comp.parentTmp = comp.templates.treeNodeTemplate;
  });

  it('ngoninit() second elseif else', () => {
    comp.templates = null;
    comp.ngOnInit();
    expect(comp.templates).toBeNull();
  });


  it('ngAfterViewInit() second elseif else', () => {

    comp.templates = null;
    comp.ngAfterViewInit()
    expect(comp.templates).toBeNull();
  });
  it('ngAfterViewInit() first if', () => {
    // comp.parentTmp = new insertte
    let fixture1 = TestBed.createComponent(AmexioFilterTreeComponent);
    let wrapperComponent = fixture1.componentInstance;

    // get a reference to the actual component we want
    let component = fixture1.componentInstance.templates;
    comp.parentRef = component;
    comp.ngAfterViewInit()
    //  if (this.parentTmp != null) {
    expect(comp.parentTmp).not.toBeNull();
    comp.templates = { treeNodeTemplate: comp.parentTmp };

  });

  

  it('ngAfterViewInit() second elseif', () => {
    let fixture1 = TestBed.createComponent(AmexioFilterTreeComponent);
    let wrapperComponent = fixture1.componentInstance;

    // get a reference to the actual component we want
    let component = fixture1.componentInstance.templates;
    comp.templates = component;
    comp.templates = { treeNodeTemplate: comp.parentTmp };

    comp.ngAfterViewInit()
    // } else if (this.templates != null) {
    expect(comp.templates).not.toBeNull();
    comp.parentTmp = comp.templates.treeNodeTemplate;
  });

  it('ngAfterViewInit() third else', () => {
  

    comp.ngAfterViewInit()
    // if (this.httpmethod && this.httpurl) {
    expect(comp.httpmethod).not.toBeDefined();
    expect(comp.httpurl).not.toBeDefined();
  });

  it('ngAfterViewInit() third if', () => {
    comp.httpmethod = 'get';
    comp.httpurl = 'asd.json'

    comp.ngAfterViewInit()
    // if (this.httpmethod && this.httpurl) {
    expect(comp.httpmethod).toBeDefined();
    expect(comp.httpurl).toBeDefined();
    comp.callService();
  });

  it('ngAfterViewInit() forth elseif else', () => {
  
    comp.ngAfterViewInit()
  // } else if (this.data) {
     expect(comp.data).not.toBeDefined();
  });  

//   it('updateComponent()  first else ', () => {
//     // comp.previousValue = 'aaa'
//     comp.data = [{a: 'a'}]
//     comp.previousValue = [{b: 'b'}]
// comp.updateComponent();
// // if (this.data != null && JSON.stringify(this.previousValue) !== JSON.stringify(this.data)) {
// expect(comp.data).not.toBeNull();
// expect(comp.previousValue).not.toEqual(comp.data);
// comp.previousValue = JSON.parse(JSON.stringify(comp.data));
// comp.setData(comp.data);
//   });  

  it('ngAfterViewInit() forth elseif ', () => {
    comp.data = [{a: 'a'}]
    comp.ngAfterViewInit()
  // } else if (this.data) {
     expect(comp.data).toBeDefined();
     comp.previousValue = JSON.parse(JSON.stringify(comp.data));
     comp.setData(comp.data);

  });  




  it('fliter tree expandAll() on method call', () => {
    let node = {
      "text": "Home",
      "icon": "fa fa-home fa-fw",
      "mdaIcon": "home",
      "link": "/home/dashboard",
      "selected": true,
      "badge": "12"
    };

    comp.isexpandAll = true;
    comp.expandAll(node);
    comp.destroyExpandAll = setTimeout(() => {
      comp.expandAllCall(checkD);
    }, 0);
  });

  it('fliter tree expandAllCall() on method call', () => {
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
  it('fliter tree expandAllCall() on method call else block', () => {
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
      // childCheck.expand = false;
      expect(childCheck.expand).toEqual(true);
      childCheck['expand'] = true;
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

  // 
  it('fliter tree getData()if on method call', () => {
    // if (this.datareader != null) {
      let httpResponse;
      let responsedata: any = httpResponse;
    comp.datareader = null;
    expect(comp.datareader).toBeNull();
    responsedata = httpResponse;
    
  });
  // 
  it('fliter tree getData()if on method call', () => {
    let httpResponse = [

      {
        "text": "Home",
        "icon": "fa fa-home fa-fw",
        "mdaIcon": "home",
        "link": "/home/dashboard",
        "selected": true,
        "badge": "12"
      },
      {
        "text": "Email",
        "icon": "fa fa-envelope fa-fw",
        "mdaIcon": "email",
        "link": "/home/email",
        "badge": "21"
      },
      {
        "text": "Profile",
        "icon": "fa fa-user fa-fw",
        "mdaIcon": "account_box",
        "link": "/home/profile",
        "badge": "32"
      }];

    comp.getData(httpResponse);
    let responsedata: any = httpResponse;
    comp.datareader = 'data';
    expect(comp.datareader).not.toEqual(null);
    const dr = comp.datareader.split('.');
    for (const ir of dr) {
      responsedata = responsedata[ir];
    }
    return responsedata;
  });

  it('fliter tree getData() else on method call', () => {
    let httpResponse = [

      {
        "text": "Home",
        "icon": "fa fa-home fa-fw",
        "mdaIcon": "home",
        "link": "/home/dashboard",
        "selected": true,
        "badge": "12"
      },
      {
        "text": "Email",
        "icon": "fa fa-envelope fa-fw",
        "mdaIcon": "email",
        "link": "/home/email",
        "badge": "21"
      },
      {
        "text": "Profile",
        "icon": "fa fa-user fa-fw",
        "mdaIcon": "account_box",
        "link": "/home/profile",
        "badge": "32"
      }];
    comp.getData(httpResponse);
    comp.datareader = null;
    expect(comp.datareader).toEqual(null);
    let responsedata = httpResponse;
    return responsedata;
  });

  it('fliter tree setData() method call', () => {
    let httpResponse = [

      {
        "text": "Home",
        "icon": "fa fa-home fa-fw",
        "mdaIcon": "home",
        "link": "/home/dashboard",
        "selected": true,
        "badge": "12"
      },
      {
        "text": "Email",
        "icon": "fa fa-envelope fa-fw",
        "mdaIcon": "email",
        "link": "/home/email",
        "badge": "21"
      },
      {
        "text": "Profile",
        "icon": "fa fa-user fa-fw",
        "mdaIcon": "account_box",
        "link": "/home/profile",
        "badge": "32"
      }];
    comp.setData(httpResponse);
    const tdata = comp.getData(httpResponse);
    expect(tdata).toBeDefined();
    comp.orgTreeData = JSON.parse(JSON.stringify(tdata));
    comp.treeData = tdata;
    comp.mask = false;
  });


  it('fliter Tree OnRightClickMenu() on method call', () => {
    comp.OnRightClickMenu(checkD);
    comp1.rightClick.subscribe((g: any) => {
      expect(comp1.rightClick).toEqual(g);
    });
  });

  it('fliter Tree onRowSelect() on method call', () => {
    comp.onRowSelect(checkD);
    comp1.nodeClick.subscribe((g: any) => {
      expect(comp1.nodeClick).toEqual(g);
    });
  });

  it('fliter Tree onCheckSelect() on method call', () => {
    comp.onCheckSelect(checkD);
    comp1.onTreeNodeChecked.subscribe((g: any) => {
      expect(comp1.onTreeNodeChecked).toEqual(g);
    });
  });


  it('fliter Tree loadContextMenu() on method call', () => {
    comp.loadContextMenu(checkD);
    comp1.nodeRightClick.subscribe((g: any) => {
      expect(comp1.nodeRightClick).toEqual(g);
    });
  });


  it('callService()', () => {
    comp.httpurl = "sample.json";
    comp.httpmethod = "get";
    comp.callService();
    comp['treeViewFilterService'].fetchData(comp.httpurl, comp.httpmethod).subscribe((response: any) => {
      comp.data = response;
    }, () => {
      comp.renderServiceData();
    });
  });


});


