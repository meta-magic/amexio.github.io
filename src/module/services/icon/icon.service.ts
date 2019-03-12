import { Component } from '@angular/core';
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
* Created by pratik on 21/12/17
*/

import { Injectable } from '@angular/core';

const faFaCaretIcon  = 'fa fa-caret-down';

const faFaTimesIcon    = 'fa fa-times';

const ICON_MAPPING =
[
  {
    component: 'datepicker_previous',
    fa: 'fa fa-chevron-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'datepicker_calendar',
    fa: 'fa fa-calendar',
    mat: 'date_range',
  },
  {
    component: 'datepicker_next',
    fa: 'fa fa-chevron-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'datepicker_previous_fast',
    fa: 'fa fa-step-backward',
    mat: 'fast_rewind',
  },
  {
    component: 'datepicker_next_fast',
    fa: 'fa fa-step-forward',
    mat: 'fast_forward',
  },
  {
    component: 'accordion_expand',
    fa: 'fa fa-plus',
    mat: 'add',
  },
  {
    component: 'accordion_collapse',
    fa: 'fa fa-minus',
    mat: 'remove',
  },
  {
    component: 'tree_expand',
    fa: 'fa fa-chevron-down',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'tree_collapse',
    fa: 'fa fa-chevron-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'dropdown_caret',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'tab_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'window_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'window_maximize',
    fa: 'fa fa-window-maximize',
    mat: 'open_with',
  },
  {
    component: 'window_restore',
    fa: 'fa fa-window-restore',
    mat: 'indeterminate_check_box',
  },
  {
    component: 'paginator_previous',
    fa: 'fa fa-angle-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'paginator_next',
    fa: 'fa fa-angle-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'paginator_first',
    fa: 'fa fa-angle-double-left',
    mat: 'first_page',
  },
  {
    component: 'paginator_last',
    fa: 'fa fa-angle-double-right',
    mat: 'last_page',
  },
  {
    component: 'itemselector_caretup',
    fa: 'fa fa-caret-up',
    mat: 'arrow_drop_up',
  },
  {
    component: 'itemselector_caretdown',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'itemselector_arrowup',
    fa: 'fa fa-arrow-up',
    mat: 'arrow_upward',
  },
  {
    component: 'itemselector_arrowdown',
    fa: 'fa fa-arrow-down',
    mat: 'arrow_downward',
  },
  {
    component: 'itemselector_arrowleft',
    fa: 'fa fa-arrow-left',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'itemselector_arrowright',
    fa: 'fa fa-arrow-right',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'tab_previous',
    fa: 'fa fa-angle-left fa-2x',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'tab_next',
    fa: 'fa fa-angle-right  fa-2x',
  },
  {
    component: 'tab_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'fieldset_expand',
    fa: 'fa fa-plus',
    mat: 'add',
  },
  {
    component: 'fieldset_collpase',
    fa: 'fa fa-minus',
    mat: 'remove',
  },
  {
    component: 'carousel_previous',
    fa: 'fa fa-angle-left fa-2x',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'carousel_next',
    fa: 'fa fa-angle-right  fa-2x',
  },
  {
    component: 'dockbar_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'notify_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'sidenav_bar',
    fa: 'fa fa-bars fa-2x',
    mat: 'menu',
  },
  {
    component: 'sidenav_close',
    fa: faFaTimesIcon,
    mat: 'close',
  },
  {
    component: 'datagrid_arrowdown',
    fa: 'fa fa-arrow-down',
    mat: 'arrow_downward',
  },
  {
    component: 'datagrid_arrowup',
    fa: 'fa fa-arrow-up',
    mat: 'arrow_upward',
  },
  {
    component: 'datagrid_list',
    fa: 'fa fa-th-list',
    mat: 'view_list',
  },
  {
    component: 'datagrid_expand',
    fa: 'fa fa-caret-right',
    mat: '',
  },
  {
    component: 'datagrid_collapse',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'datagrid_collapse',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'datagrid_filter',
    fa: 'fa fa-filter',
    mat: 'filter_list',
  },
  {
    component: 'tree_filter',
    fa: 'fa fa-filter',
    mat: 'filter_list',
  },
  {
    component: 'data_check',
    fa: 'fa fa-check',
    mat: 'check',
  },
  {
    component: 'button_caret-down',
    fa: faFaCaretIcon,
    mat: 'arrow_drop_down',
  },
  {
    component: 'button_angle-right',
    fa: 'fa fa-angle-right',
    mat: 'arrow_drop_right',
  },
  {
    component: 'button_angle-down',
    fa: 'fa fa-angle-down',
    mat: 'arrow_drop_down',
  },
  {
    component: 'menubar_ravelry',
    fa: 'fa fa-ravelry',
    mat: 'done',
  },
  {
    component: 'sidenav-angle-up',
    fa: 'fa fa-angle-up',
    mat: 'keyboard_arrow_up',
  },
  {
    component: 'sidenav-angle-down',
    fa: 'fa fa-angle-down',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-error',
    fa: 'fa fa-exclamation-triangle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-warning',
    fa: 'fa fa-exclamation-triangle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-help',
    fa: 'fa fa-question-circle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'window-msgtype-confirm',
    fa: 'fa fa-check-circle fa-2x fa-fw',
    mat: 'keyboard_arrow_down',
  },
  {
    component: 'horizontal-tree-expanded',
    fa: 'fa fa-caret-right fa-fw',
    mat: 'keyboard_arrow_right',
  },
  {
    component: 'horizontal-tree-collapse',
    fa: 'fa fa-caret-left fa-fw',
    mat: 'keyboard_arrow_left',
  },
  {
    component: 'button-loading-icon',
    fa: 'fa fa-refresh fa-spin',
    mat: 'cached',
  },
  {
    component: 'datepicker-clock-icon',
    fa: 'fa fa-clock-o',
    mat: 'access_time',
  },
  {
    component: 'sidenavnode-icon',
    fa: 'fa fa-user-circle',
    mat: 'person_pin',
  },
];

@Injectable()
export class IconLoaderService {
  public get iconToUse(): string {
    if (this._iconToUse == null) {
      return 'fa';
    } else {
      return this._iconToUse;
    }
  }

  public set iconToUse(value: string) {
    this._iconToUse = value;
  }

  /*  get iconToUse(): any {
    let iconToUse;
    if(this._iconToUse == null){
      iconToUse = 'fa';
    }
    else{
      if(this._iconToUse!=null && this._iconToUse.toString() == null)
        iconToUse =  this._iconToUse
    }
      return iconToUse;
  }

  set iconToUse(value: any) {
    this._iconToUse = value;
    if(this._iconToUse != null){
      this.iconMappings = ICON_MAPS;
    }
  }*/
  public _iconToUse: string;
  iconMappings: any[];
  constructor() {
    this.iconMappings = ICON_MAPPING;
  }

  modifyIconClass(componentKey: string, newValue: string) {
    if (this.iconMappings != null) {
      this.iconMappings.forEach((icon: any) => {
        if (icon.component === componentKey) {
          icon[this._iconToUse.toString()] = newValue;
        }
      });
    }
  }
  // TO GET ICON OBJECT
  getIconObject(componentName: string): any {
     let obj = null;
     if (this.iconMappings !== null) {
      this.iconMappings.forEach((object: any) => {
        if (object.component === componentName) {
          obj = object;
        }
      });
    }
     return obj;
  }
}
