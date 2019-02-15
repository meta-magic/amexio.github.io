/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AmexioGridLayoutService } from './amexiogridlayoutservice.service';
import { AmexioGridItemComponent } from './griditem.component';
import { AmexioGridModel } from './gridmodel.component';

import { GridConstants } from '../../../models/GridConstants';

@Component({
  selector: 'amexio-layout-grid',
  templateUrl: './grid.component.html',
})
export class AmexioGridComponent implements AfterContentInit, OnInit {
  @ContentChildren(AmexioGridItemComponent) queryItem: QueryList<AmexioGridItemComponent>;
  itemCollection: AmexioGridItemComponent[];

  /*
 Properties
 name : data
 datatype : array
 version : 5.3.1onwards
 default : Data is the a 2D array which user can pass.
 description : The data is for defining the input to be passed.
 */
  @Input('layout') layout: string;
  screenWidth: any;
  containerClass: any;
  className: string;
  colCount: number;
  desktopWidth = '(min-width: 1025px)';
  mobileWidth = '(max-width: 767px)';
  tabletWidth = '(min-width: 768px) and (max-width: 1024px)';
  constructor(public _gridlayoutService: AmexioGridLayoutService) {
  }
  ngOnInit() {
    this.containerClass = '';
    this.className = '';
    this.cssGenreration(this._gridlayoutService.getLayoutData(this.layout));
  }

  getCssAttribute(): string {
    return 'display: grid;' + ' grid-gap: 5px;' + 'grid-template-columns: repeat(' + this.colCount + ', 1fr);';
  }
  insertStyleSheetRuleParent(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    const sheet: any = sheets[sheets.length - 1];
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
  }

  ngAfterContentInit() {
    this.itemCollection = this.queryItem.toArray();
  }

  dataCreation(deviceName: any[]): string {
    this.containerClass = '';
    deviceName.forEach((ele: any) => {
      this.containerClass = this.containerClass + '"' + ele.join(' ') + '"';
    });
    return this.containerClass;
  }

  cssGenreration(layoutData: any) {
    this.colCount = layoutData.count;
    this.className = this.className + '' + layoutData.name;
    if (layoutData.desktop.length > 0) {
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Desktop);
      if (layoutData.tab.length === 0) {
        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Desktop);
      } else {
        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Desktop);

        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Tablet);
      }
      if (layoutData.mobile.length === 0 && layoutData.tab.length === 0) {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Desktop);
      } else if (layoutData.mobile.length === 0 && layoutData.tab.length > 0) {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Tablet);
      } else {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Mobile);
      }
    } else {
      this.cssGenerationNoDesktop(layoutData);
    }
  }
  // Refactored above method
  cssGenerationNoDesktop(layoutData: any) {
    if (layoutData.tab.length > 0 && layoutData.mobile.length === 0) {
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Tablet);
      this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Tablet);
      this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Tablet);

    } else if (layoutData.tab.length === 0 && layoutData.mobile.length > 0) {
      this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Mobile);
      this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Mobile);
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Mobile);
    }
  }

  cssGenerationCommonMethod(layoutData: any, screenWidth: string, deviceType: string) {
    this.insertStyleSheetRuleParent('@' + 'media' + screenWidth + '{' + '.' + layoutData.name +
      '{' + this.getCssAttribute() + ' grid-template-areas: ' +
      this.dataCreation(layoutData[deviceType]) + '}' + '}');
  }
}
