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
import { equal } from 'assert';
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
    // comp.onClickSearch = false;
    // expect(comp.onClickSearch).toEqual(false);
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
  // it('ngoninit()  else', () => {
  //   comp.ngOnInit();
  //   expect(comp.parentTmp).toBeUndefined();
  //   comp.ngAfterViewInit()
  //   expect(comp.parentTmp).toBeUndefined();

  //   comp.parentTmp = null;
  //   comp.ngOnInit();
  //   expect(comp.parentTmp).toBeNull();
  //   comp.ngAfterViewInit()
  //   expect(comp.parentTmp).toBeNull();

  // });
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
    comp.parentTmp = component;
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

  it('ngoninit() inverse if', () => {
    comp.templates = [{
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
    comp.ngOnInit();
    comp.parentTmp = null;
    expect(comp.parentTmp).toBeNull();
    expect(comp.templates).not.toEqual(null);
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
  it('ngAfterViewInit() first if inverse', () => {
    comp.ngAfterViewInit();
    comp.parentTmp = null;
    expect(comp.parentTmp).toBeNull();
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

  it('updateComponent() method if  call ', () => {
    comp.data = [{
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
    comp.updateComponent();
    comp.previousValue = null;
    expect(comp.data).not.toBeNull();
    expect(JSON.stringify(comp.previousValue)).not.toEqual(JSON.stringify(comp.data));
    comp.previousValue = JSON.parse(JSON.stringify(comp.data));
    comp.setData(comp.data);
  });

  it('updateComponent() method  else call ', () => {
    comp.updateComponent();
    comp.previousValue = null;
    comp.data = null
    expect(comp.data).toBeNull();
    expect(JSON.stringify(comp.previousValue)).toEqual(JSON.stringify(comp.data));
  });
  it('ngAfterViewInit() forth elseif ', () => {
    comp.data = [{ a: 'a' }]
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
    let responsedata: any = httpResponse;
    comp.datareader = null;
    expect(comp.datareader).toBeNull();
    responsedata = httpResponse;
    return responsedata;
  });
  // 
  it('fliter tree getData()if on method call', () => {
    let httpResponse = {
      'data': [
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
        }
      ]
    };

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
  it('filterData() second if', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterData();
    //  if (this.treeData.length === 0) {
    comp.treeData = [];
    expect(comp.treeData.length).toEqual(0)
    comp.isDataFound = false;
  });
  it('filterData() first else', () => {
    comp.filterText = "h";
    comp.triggerchar = 4;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterData();
    // if (this.filterText.length >= this.triggerchar) {
    expect(comp.filterText.length).not.toBeGreaterThanOrEqual(comp.triggerchar);
    comp.isDataFound = true;
    comp.treeData = comp.orgTreeData;

  });
  // 
  it('filterData() first if', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterData();
    comp.showToolTip = false;
    // if (this.filterText.length >= this.triggerchar) {
    expect(comp.filterText.length).toBeGreaterThanOrEqual(comp.triggerchar);
    const tData = JSON.parse(JSON.stringify(comp.orgTreeData));
    const treeNodes = comp.searchTree(tData, comp.filterText);
    comp.treeData = treeNodes;
  });
  it('filterData() first if inside if', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [];
    comp.filterData();
    comp.showToolTip = false;
    expect(comp.filterText.length).toBeGreaterThanOrEqual(comp.triggerchar);
    const tData = JSON.parse(JSON.stringify(comp.orgTreeData));
    const treeNodes = comp.searchTree(tData, comp.filterText);
    comp.treeData = treeNodes;
    expect(comp.treeData.length).toEqual(0);
    comp.isDataFound = false;
  });
  it('filterData() second else', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterData();
    //  if (this.treeData.length === 0) {
    expect(comp.treeData.length).not.toEqual(0);
    comp.isDataFound = true;
  });

  it('filterData() third elseif', () => {
    comp.filterText = "h";
    comp.triggerchar = 4;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.onClickSearch = true;
    comp.filterData();
    expect(comp.filterText.length).not.toBeGreaterThanOrEqual(comp.triggerchar);
    comp.onClickSearch = true;
    expect(comp.onClickSearch).toEqual(true);
    const tData = JSON.parse(JSON.stringify(comp.orgTreeData));
    const treeNodes = comp.searchTree(tData, comp.filterText);
    comp.treeData = treeNodes;
    comp.onClickSearch = false;

  });
  it('filterData() third 0 length else ', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [{
      text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
    },
    {
      text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
    }];
    comp.onClickSearch = true;
    comp.filterData();
    expect(comp.onClickSearch).toEqual(true);
    const tData = JSON.parse(JSON.stringify(comp.orgTreeData));
    const treeNodes = comp.searchTree(tData, comp.filterText);
    comp.treeData = treeNodes;
    comp.onClickSearch = false;
    comp.filterData();
    expect(comp.treeData.length).not.toEqual(0);
    comp.isDataFound = true;
  });
  it('filterData() else if inverse ', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [{
      text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
    },
    {
      text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
    }];
    comp.onClickSearch = false;
    comp.filterData();
    expect(comp.onClickSearch).toEqual(false);
    comp.isDataFound = true;
    comp.treeData = comp.orgTreeData;
  });
  it('filterData() third 0 length if this.onClickSearch true condition', () => {
    comp.filterText = "h";
    comp.triggerchar = 4;
    comp.orgTreeData = [];
    comp.onClickSearch = true;
    comp.filterData();
    expect(comp.filterText.length).not.toBeGreaterThanOrEqual(comp.triggerchar);
    comp.onClickSearch = true;
    expect(comp.onClickSearch).toEqual(true);
    const tData = JSON.parse(JSON.stringify(comp.orgTreeData));
    const treeNodes = comp.searchTree(tData, comp.filterText);
    comp.treeData = treeNodes;
    comp.onClickSearch = false;
    comp.filterData();
    expect(comp.treeData.length).toEqual(0);
    comp.isDataFound = false;
  });
  it('filterData() third elseif else', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.onClickSearch = false;
    comp.filterData();
    comp.onClickSearch = false;

    expect(comp.onClickSearch).toEqual(false);
  });

  it('filterData() third last if', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];

    comp.isexpandAll = true;
    comp.filterData();
    // if (this.isexpandAll) {
    expect(comp.isexpandAll).toEqual(true);
    comp.expandAll(comp.treeData);

  });

  it('filterData() third last else', () => {
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.isexpandAll = false;
    comp.filterData();
    // if (this.isexpandAll) {
    expect(comp.isexpandAll).not.toEqual(true);
    comp.generatefilterIndex(comp.treeData, 1, Math.floor(Math.random() * 1000 + 999 + 1));

  });

  // 

  it('filterOption() first for if', () => {
    let data = { key: "Is Not Equal To", value: 2, type: "string", checkedStatus: "" };
    comp.filterOptionData = [
      // {key: "Is Equal To", value: "1", type: "string", checkedStatus: ""},
      { key: "Is Not Equal To", value: 2, type: "string", checkedStatus: "" }
    ];
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterOption(data);
    comp.onClickSearch = true;
    comp.filterIndex = data.value;
    comp.filterOptionData.forEach((opt: any) => {
      // if (opt.value !== data.value) {
      expect(opt.value).toEqual(data.value);
      opt.checkedStatus = '';
    });
    comp.filterData();
    comp.showToolTip = false;
  });
  it('filterOption() first for else', () => {
    let data = { key: "Is Not Equal To", value: 2, type: "string", checkedStatus: "" };
    comp.filterOptionData = [
      { key: "Is Equal To", value: "1", type: "string", checkedStatus: "" }
      // {key: "Is Not Equal To", value: 2, type: "string", checkedStatus: ""}
    ];
    comp.filterText = "h";
    comp.triggerchar = 1;
    comp.orgTreeData = [
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      },
      {
        text: "Home", icon: "fa fa-home fa-fw", mdaIcon: "home", link: "/home/dashboard", selected: true, badge: "21"
      }
    ];
    comp.filterOption(data);
    comp.onClickSearch = true;
    comp.filterIndex = data.value;
    comp.filterOptionData.forEach((opt: any) => {
      // if (opt.value !== data.value) {
      expect(opt.value).not.toEqual(data.value);
      opt.checkedStatus = 'fa fa-check';
    });
    comp.filterData();
    comp.showToolTip = false;
  });
  it('generatefilterIndex method call', () => {

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
            ]
          }]
      }]
    let index = 0;
    comp.childarraykey = 'children';
    let parentId = 1;
    let rannumber = Math.floor(Math.random() * 1000 + 999 + 1);
    comp.generatefilterIndex(data, parentId, rannumber);
    data.forEach((element: any, index: any) => {
      element['elementId'] = '' + rannumber + '-' + parentId + (index + 1);
      expect(element[comp.childarraykey]).toBeDefined();
      comp.generatefilterIndex(element[comp.childarraykey], element.elementId.split('-')[1], rannumber);
    });
  });



  it('fliter tree filterActualData() method  node[tempchildarrayKey] call', () => {
    // if (this.datareader != null) {
    let filterData = [
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
            ]
          }]
      }]

    let fi = 1;
    let matchingTitle = 'H';
    comp.displaykey = 'text';
    comp.childarraykey = 'children';
    comp.filterActualData(filterData, fi, matchingTitle);
    let tempdisplay: string;
    let tempchildarrayKey: string;
    tempdisplay = comp.displaykey;
    tempchildarrayKey = comp.childarraykey;
    return filterData.filter(function f(node) {
      expect(node[tempchildarrayKey]).toBeDefined();
      return (node[tempchildarrayKey] = node[tempchildarrayKey].filter(f)).length;
    });

  });


  it('fliter tree expandAllCall() on expand false method call', () => {
    let node1 = [{
      "text": "Web App",
      "expand": false,
      "children": [
        {
          "text": "app",
          "expand": false,
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
    comp.expandAllCall(node1);
    node1.forEach((childCheck: any) => {
      expect(childCheck.hasOwnProperty('expand')).toEqual(true);
      childCheck.expand = false;
      expect(childCheck.expand).not.toEqual(true);
      childCheck.expand = true;
    });
  });

});


