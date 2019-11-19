/**
 * Created by kedar on 26/7/2019.
 */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexioGridItemComponent } from './griditem.component';

import { AmexioGridLayoutService } from '../../../services/grid/gridlayout.service';
import { AmexioGridComponent } from './grid.component';

describe('amexio-layout-grid', () => {
    let comp: AmexioGridComponent;
    let fixture: ComponentFixture<AmexioGridComponent>;
    let layoutData: any
    let deviceName: any;

    let desktopWidth: any;
    let mobileWidth: any;
    let tabletWidth: any;

    let gridConstants: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioGridComponent, AmexioGridItemComponent],
            providers: [IconLoaderService, AmexioGridLayoutService],
        });
        fixture = TestBed.createComponent(AmexioGridComponent);
        comp = fixture.componentInstance;

        comp.isInit = false;
        desktopWidth = '(min-width: 1025px)';
        mobileWidth = '(max-width: 767px)';
        tabletWidth = '(min-width: 768px) and (max-width: 1024px)';
        layoutData =
            {
                "name": "collapsiblegridlayoutdemo3",
                "layoutType": "desktop",
                "count": 6,
                'mobile': [],
                'tab': [],
                "desktop": [
                    ["west", "north", "north", "north", "north", "east"],
                    ["west", "center", "center", "center", "center", "east"],
                    ["west", "south", "south", "south", "south", "east"]
                ]
            };
        deviceName = [
            ["west", "north", "north", "north", "north", "east"],
            ["west", "center", "center", "center", "center", "east"],
            ["west", "south", "south", "south", "south", "east"]
        ];
        gridConstants = {
            Tablet: 'tab',
            Desktop: 'desktop',
            Mobile: 'mobile',
        };
    });


    it('check variable check', () => {
        comp.gridItemCollapsible = false;
        comp.gridtemplatecolumnconfig = '';
        expect(comp.gridItemCollapsible).toEqual(false);
        expect(comp.gridtemplatecolumnconfig).toBe('');
    });


    // it('layout input should set layout() if condition', () => {
    //     let value = 'amexio';
    //     comp.isInit = true;
    //     expect(value).not.toBeNull();
    //     comp._layout = value;
    //     expect(comp.isInit).toEqual(true);
    //     // comp.gridInit();
    // });
    //   it('layout input should set layout() if true & else condition', () => {
    //     let value = 'amexio';
    //     comp.isInit = false;
    //     expect(value).not.toBeNull();
    //     comp._layout = value;
    //     expect(comp.isInit).toEqual(false);
    //   });

    // it('gridInit() method check', () => {
    //     comp.containerClass = '';
    //     comp.className = '';
    //     comp.cssGenreration(comp._gridlayoutService.getLayoutData(comp.layout));
    //     comp.gridInit();
    // })

    it('cssGenerationNoDesktop() method check dekstop if and if tab ', () => {
        comp.colCount = layoutData.count;
        comp.className = comp.className + '' + layoutData.name;
        comp.cssGenerationNoDesktop(layoutData);
        expect(layoutData.desktop.length).toBeGreaterThan(0);
        comp.cssGenerationCommonMethod(layoutData, desktopWidth, gridConstants.Desktop);
        expect(layoutData.tab.length).toEqual(0);
        comp.cssGenerationCommonMethod(layoutData, comp.tabletWidth, gridConstants.Desktop);

    });


    it('cssGenerationNoDesktop() method check dekstop if and else tab  ', () => {
        let layoutData =
        {
            "name": "collapsiblegridlayoutdemo3",
            "layoutType": "desktop",
            "count": 6,
            'mobile': [["west", "north", "north", "north", "north", "east"]],
            'tab': [["west", "north", "north", "north", "north", "east"]],
            "desktop": [
                ["west", "north", "north", "north", "north", "east"],
                ["west", "center", "center", "center", "center", "east"],
                ["west", "south", "south", "south", "south", "east"]
            ]
        };
        comp.colCount = layoutData.count;
        comp.className = comp.className + '' + layoutData.name;
        comp.cssGenerationNoDesktop(layoutData);
        expect(layoutData.desktop.length).toBeGreaterThan(0);
        comp.cssGenerationCommonMethod(layoutData, desktopWidth, gridConstants.Desktop);
        expect(layoutData.tab.length).not.toEqual(0);
        comp.cssGenerationCommonMethod(layoutData, tabletWidth, gridConstants.Tablet);
    })

    it('cssGenerationNoDesktop() method check dekstop if and tab if and mobile if ', () => {
        comp.colCount = layoutData.count;
        comp.className = comp.className + '' + layoutData.name;
        comp.cssGenerationNoDesktop(layoutData);
        expect(layoutData.desktop.length).toBeGreaterThan(0);
        comp.cssGenerationCommonMethod(layoutData, desktopWidth, gridConstants.Desktop);
        expect(layoutData.tab.length).toEqual(0);
        expect(layoutData.mobile.length).toEqual(0);
        comp.cssGenerationCommonMethod(layoutData, mobileWidth, gridConstants.Desktop);
    });

    it('cssGenerationNoDesktop() method check dekstop if and tab greater than 0 and mobile if ', () => {
        let layoutData =
        {
            "name": "collapsiblegridlayoutdemo3",
            "layoutType": "desktop",
            "count": 6,
            "mobile": "",
            'tab': [["west", "north", "north", "north", "north", "east"]],
            "desktop": [
                ["west", "north", "north", "north", "north", "east"],
                ["west", "center", "center", "center", "center", "east"],
                ["west", "south", "south", "south", "south", "east"]
            ]
        };
        comp.colCount = layoutData.count;
        comp.className = comp.className + '' + layoutData.name;
        comp.cssGenerationNoDesktop(layoutData);
        expect(layoutData.desktop.length).toBeGreaterThan(0);
        comp.cssGenerationCommonMethod(layoutData, desktopWidth, gridConstants.Desktop);
        expect(layoutData.tab.length).toBeGreaterThan(0);
        expect(layoutData.mobile.length).toEqual(0);
        comp.cssGenerationCommonMethod(layoutData, mobileWidth, gridConstants.Tablet);
    });

    // it('cssGenerationNoDesktop() method check dekstop if and tab else and mobile if ', () => {
    //     let layoutData =
    //     {
    //         "name": "collapsiblegridlayoutdemo3",
    //         "layoutType": "desktop",
    //         "count": 6,
    //         "mobile": ["west", "north", "north", "north", "north", "east"],
    //         'tab': ["west", "north", "north", "north", "north", "east"],
    //         "desktop": [
    //             ["west", "north", "north", "north", "north", "east"],
    //             ["west", "center", "center", "center", "center", "east"],
    //             ["west", "south", "south", "south", "south", "east"]
    //         ]
    //     };
    //     comp.colCount = layoutData.count;
    //     comp.className = comp.className + '' + layoutData.name;
    //     comp.cssGenerationNoDesktop(layoutData);
    //     expect(layoutData.desktop.length).toBeGreaterThan(0);
    //     comp.cssGenerationCommonMethod(layoutData, desktopWidth, gridConstants.Desktop);
    //     expect(layoutData.tab.length).toBeGreaterThan(0);
    //     expect(layoutData.mobile.length).toBeGreaterThan(0);
    //     comp.cssGenerationCommonMethod(layoutData, mobileWidth, gridConstants.mobile);
    // });



    it('cssGenerationNoDesktop() method check dekstop else ', () => {
        let layoutData =
        {
            "name": "collapsiblegridlayoutdemo3",
            "layoutType": "desktop",
            "count": 6,
            "mobile": [["west", "north", "north", "north", "north", "east"]],
            'tab': [["west", "north", "north", "north", "north", "east"]],
            "desktop": ""
        };
        //console.log(layoutData.desktop.length);
        
        comp.colCount = layoutData.count;
        comp.className = comp.className + '' + layoutData.name;
        comp.cssGenerationNoDesktop(layoutData);
        expect(layoutData.desktop.length).toBe(0);
        comp.cssGenerationNoDesktop(layoutData);
    });


    it('getCssAttribute() if method  ', () => {
        comp.gridItemCollapsible = true;
        comp.getCssAttribute();
        expect(comp.gridItemCollapsible).toEqual(true);
        return 'display: grid; border:1px solid lightgray;' + ' grid-gap: 0px;'
            + 'grid-template-columns: repeat(' + comp.colCount + ', 1fr);';
    });
    it('getCssAttribute() else method  ', () => {
        comp.gridItemCollapsible = false;
        comp.getCssAttribute();
        expect(comp.gridItemCollapsible).toEqual(false);
        return 'display: grid;' + ' grid-gap: 5px;'
            + 'grid-template-columns: repeat(' + comp.colCount + ', 1fr);';
    })

    it('dataCreation() method ', () => {
        comp.containerClass = '';
        comp.dataCreation(deviceName);
        deviceName.forEach((ele: any) => {
            comp.containerClass = comp.containerClass + '"' + ele.join(' ') + '"';
        });
        return comp.containerClass;
    })

    it('cssGenerationCommonMethod() method ', () => {
        comp.screenWidth = '(min-width: 1025px)';
        let deviceType = 'desktop';
        comp.cssGenerationCommonMethod(layoutData, comp.screenWidth, deviceType);
        comp.insertStyleSheetRuleParent('@' + 'media' + comp.screenWidth + '{' + '.' + layoutData.name +
            '{' + comp.getCssAttribute() + ' grid-template-areas: ' +
            comp.dataCreation(layoutData[deviceType]) + '}' + '}');
    });

    // it('insertStyleSheetRuleParent() method ', () => {
        
    //     comp.insertStyleSheetRuleParent(ruleText);
    // });



});
