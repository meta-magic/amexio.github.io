import {Component,  HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-grid-item',
  template: `
          <ng-content></ng-content>
  `,
})
export class AmexioGridItemComponent implements OnInit {
  /*
Properties
name : name
datatype :
version : 5.3.1onwards
default : Type of name header/leftside/main/rightside/footer.
description : The name is for determining the name of item.
*/
  @HostBinding('class') hostname: any;
  private _name: string;

  get name(): string{
    return this._name;
  }

  @Input('name')
  set name(value: string) {
    this._name = value;
    this.hostname = this._name;
  }

  constructor() {
  }

  ngOnInit() {
   this.insertStyleSheetRule ('.' + this.name + '{ grid-area: ' + this.name + ' } ' );
   }

   insertStyleSheetRule(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    const sheet: any = sheets[sheets.length - 1];
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
  }
}
