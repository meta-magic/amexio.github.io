/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by Pratik on 2/01/18.
*/

/*
Component Name : Amexio data grid filter
Component Selector : <data-grid-filter>
Component Description : Data grid component to render large amount of
data-set with various options like sorting in ascending or descending order,
client-side pagination, column hide/unhide, single/multi selection,Filtering
(enable only for string and number type data) user define template for rendering
for column header and column data, displaying summation of numeric column.
*/
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
@Component({
  selector: 'data-grid-filter',
  templateUrl: './datagrid.filter.component.html',
})

export class DataGridFilterComponent implements OnInit {

  /*
For internal use
*/
  @Input() column: any;

  /*
  for internal use
  */
  @Output() filterObject: any = new EventEmitter<any>();

  @Output() onFilterClick: any = new EventEmitter<any>();

  filterValue: any;

  filterOptions: any;

  elementId: any;

  showToolTip = false;

  private checkIcon = 'fa fa-check';

  numberFilterArray: any[] = [];

  stringFilterArray: any[] = [];

  globalClickListenFunc: () => void;

  constructor(private dataTableService: CommonDataService, private renderer: Renderer2) {

    this.filterOptions = [{
      key: 'Is Equal To', value: '==', type: 'string', checkedStatus: '',
    }, {
      key: 'Is Not Equal To', value: '!=', type: 'string', checkedStatus: '',
    }, {
      key: 'Start With', value: '1', type: 'string', checkedStatus: this.checkIcon,
    },
    {
      key: 'Ends With', value: '2', type: 'string', checkedStatus: '',
    }, {
      key: 'Contains', value: '3', type: 'string', checkedStatus: '',
    }, {
      key: 'Is Equal To', value: '==', type: 'number', checkedStatus: '',
    }, {
      key: 'Is Not Equal To', value: '!=', type: 'number', checkedStatus: '',
    }, {
      key: 'Is greater Than', value: '<', type: 'number', checkedStatus: '',
    }, {
      key: 'Is less Than', value: '>', type: 'number', checkedStatus: '',
    }, {
      key: 'Is less Than or equal to', value: '>=', type: 'number', checkedStatus: '',
    }, {
      key: 'Is greater Than or equal to', value: '=<', type: 'number', checkedStatus: this.checkIcon,
    }];
  }

  ngOnInit() {
    this.sortFilterData();
  }

  selectedOption(col: any, opt: any) {
    this.checkStatus();
    const filter: any = {
      key: col.dataindex,
      value: this.filterValue,
      filter: opt.value,
      type: col.datatype,
    };
    opt.checkedStatus = this.checkIcon;
    if (this.filterValue) {
      col.filterIcon = true;
      this.filterDataObject(filter, col);
    }
    this.showToolTip = false;
  }

  keyUpSearch(col: any) {
    this.showToolTip = false;
    if (this.filterValue == null || this.filterValue === '') {
      this.removeFilter(col);
    } else {
      col.filterIcon = true;
      const filter: any = {
        key: col.dataindex,
        value: this.filterValue,
        type: col.datatype,
      };
      this.filterOptions.forEach((opt: any) => {
        if (opt.checkedStatus === this.checkIcon && col.datatype === opt.type) {
          filter['filter'] = opt.value;
        }
      });
      this.filterDataObject(filter, col);
    }
  }

  removeFilter(column: any) {
    this.filterValue = '';
    column.filterIcon = false;
    this.dataTableService.filteredObject.forEach((option: any, index: any) => {
      if (option.key === column.dataindex) {
        this.dataTableService.filteredObject.splice(index, 1);
      }
    });
    this.filterObject.emit(this.dataTableService.filteredObject);
  }

  checkStatus() {
    this.filterOptions.forEach((opt: any) => {
      opt.checkedStatus = '';
    });
  }

  filterDataObject(filter: any, col: any) {
    this.dataTableService.filteredObject.forEach((option: any, index: any) => {
      if (option.key === col.dataindex) {
        this.dataTableService.filteredObject.splice(index, 1);
      }
    });
    this.dataTableService.filteredObject.push(filter);
    this.filterObject.emit(this.dataTableService.filteredObject);
  }

  onDataFilterIconClick(event: any) {
    event.stopImmediatePropagation();
    this.onFilterClick.emit();
    this.addListner();
    this.showToolTip = !this.showToolTip;
  }

  addListner() {
    this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
      this.showToolTip = false;
      if (!this.showToolTip) {
        this.removeListner();
      }
    });
  }

  removeListner() {
    if (this.globalClickListenFunc) {
      this.globalClickListenFunc();
    }
  }

  onArrowUpList(listId: any, datatype: any) {
    const unitId = parseInt(listId, 10);
    const previousId = unitId - 1;
    let nextId: number;
    if (previousId >= 0) {
      document.getElementById(previousId.toString()).focus();
    } else {
      if (datatype === 'string') {
        nextId = this.stringFilterArray.length;
      } else {
        nextId = this.numberFilterArray.length;
      }
      listId = nextId.toString();
      this.onArrowUpList(listId, datatype);
    }
  }

  onArrowdownList(listId: any, datatype: any) {
    const unitId = parseInt(listId, 10);
    const nextId = unitId + 1;
    let datatypeLength: number;
    if (datatype === 'string') {
      datatypeLength = this.stringFilterArray.length;
    } else if (datatype === 'number') {
      datatypeLength = this.numberFilterArray.length;
    }
    if (nextId < datatypeLength) {
      document.getElementById(nextId.toString()).focus();
    } else {
      listId = '-1';
      this.onArrowdownList(listId, datatype);
    }
  }

  sortFilterData() {
    this.stringFilterArray = [];
    this.numberFilterArray = [];
    this.filterOptions.forEach((element: any) => {
      if (element.type === 'string') {
        this.stringFilterArray.push(element);
      } else {
        this.numberFilterArray.push(element);
      }
    });
  }
}
