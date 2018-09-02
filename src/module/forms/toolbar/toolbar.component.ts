import { AfterContentInit, Component, ContentChildren, ElementRef,
EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { AmexioFormHeaderComponent } from './../../panes/form/form.header.component';
import { AmexioPanelHeaderComponent} from './../../panes/panel/panel.header.component';
import { ToolBarActionComponent } from './toolbaraction.component';
import { ToolbaroneComponent } from './toolbarone.component';

@Component({
  selector: 'amexio-toolbar',
  templateUrl: `./toolbar.component.html`,
})
export class ToolbarComponent implements AfterContentInit, OnInit {

  /*
Properties
name : seperator
datatype :boolean
version : 4.2onwards
default :
description : This will seperate the toolbar.
*/
  @Input('seperator') seperator: boolean;
  /*
  Properties
  name :toolbarposition
  datatype :string
  version : 4.0 onwards
  default :
  description : This will allign the toolbar.
  */
  @Input('toolbar-position') toolbarposition: string;
  /*
  Events
  name : onClick
  datatype : none
  version : none
  default : none
  description : Callback to invoke on activated tab event.
  */
  @Output() onClick: any = new EventEmitter<any>();
  @Input() tabLocalData: any;
  tabPreviewData: any;

  constructor() {
    this.toolbarposition = 'top';
    this.seperator = false;
  }

  @ContentChildren(ToolbaroneComponent) queryTool: QueryList<ToolbaroneComponent>;
  toolCollection: ToolbaroneComponent[];

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.toolCollection = this.queryTool.toArray();
    for (const i of this.toolCollection) {
      [i]['position'] = this.getToolbaritemposition([i]['position']);
    }
  }
  getToolbaritemposition(position: any): any {

    if (position === 'right') {
      return 'main-right';
    }
    if (position === 'left') {
      return 'main-left';
    }
    if (position === 'center') {
      return 'main-center';
    }
    if (position === '') {
      return 'main-center';
    }
  }
  onToolClick(tool: any) {
    if (!tool.disabled) {
      for (const i of this.toolCollection) {
        if ([i] === tool) {
          [i]['active'] = true;
          this.onClick.emit(tool);
        } else {
          [i]['active'] = false;
        }
      }
    }
  }

  // THIS METHOD IS  FOR APPLIED SPERATOR CLASS
  getSeperatotClass(toolnode: any): any {
    let cssName = '';
    if (this.seperator) {
      cssName = 'seperator-line';
    }
    cssName = cssName + toolnode.position;
    return cssName;
  }

  getToolbarPosition() {
    if (this.toolbarposition === 'top') {
      return '';
    }
    if (this.toolbarposition === 'right') {
      return '';
    }
    if (this.toolbarposition === 'bottom') {
      return '';
    }
  }
}
