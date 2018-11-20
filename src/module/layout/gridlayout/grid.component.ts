import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AmexioGridLayoutService } from './amexiogridlayoutservice.service';
import { AmexioGridItemComponent } from './griditem.component';
import { AmexioGridModel } from './gridmodel.component';

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
  constructor(public _gridlayoutService: AmexioGridLayoutService) {
  }
  ngOnInit() {
    this.containerClass = '';
    this.className = '';
    this.cssGenreration(this._gridlayoutService.getLayoutData(this.layout));
  }

  getCssAttribute(): string {
    return 'display: grid;' + ' grid-gap: 5px;';
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
    this.className = this.className + '' + layoutData.name;
    this.cssGenerationCommonMethod(layoutData, '(max-width: 767px)', 'mobile');
    this.cssGenerationCommonMethod(layoutData, '(min-width: 1025px)', 'desktop');
    this.cssGenerationCommonMethod(layoutData, '(min-width: 768px) and (max-width: 1024px)', 'tab');
  }

  cssGenerationCommonMethod(layoutData: any, screenWidth: string, deviceType: string) {
    this.insertStyleSheetRuleParent('@' + 'media' + screenWidth + '{' + '.' + layoutData.name +
      '{' + this.getCssAttribute() + ' grid-template-areas: ' +
      this.dataCreation(layoutData[deviceType]) + '}' + '}');
  }
}
