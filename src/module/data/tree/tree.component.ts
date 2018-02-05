/**
 * Created by ketangote on 11/23/17.
 */

import {ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-treeview', templateUrl: './tree.component.html', styleUrls: ['./tree.component.scss']
})
export class AmexioTreeViewComponent {

  @Input() data: any[] = [];

  @Input('http-url') httpurl: string;

  @Input('http-method') httpmethod: string;

  @Input('data-reader') datareader: string;

  @Output() nodeClick: any = new EventEmitter<any>();

  @Input('enable-checkbox') enablecheckbox = false;

  @Input() templates: any;


  @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

  @Output() onTreeNodeChecked: any = new EventEmitter<any>();

  previousValue: any;

  responseData: any;

  mask : boolean = true;

  constructor(public dataService: CommonDataService, private cdf: ChangeDetectorRef) {

  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response.json();
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.datareader && this.data) {
      this.setData(this.data);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.parentTmp != null) {
        this.templates = {treeNodeTemplate: this.parentTmp};
      } else if (this.templates != null) {
        this.parentTmp = this.templates.treeNodeTemplate;
      }
    });
    this.cdf.detectChanges();
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousValue) != JSON.stringify(this.data) && this.previousValue != null && this.data != null) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onClick(node: any) {
    node.expand = !node.expand;
  }

  onNodeClick(node: any) {
    this.nodeClick.emit(node);
    this.activateNode(this.data, node);
  }

  activateNode(data: any[], node: any) {
    for (let i = 0; i < data.length; i++) {
      if (node === data[i] && !data[i]['children']) {
        data[i]['active'] = true;
      } else {
        data[i]['active'] = false;
      }

      if (data[i]['children']) {
        this.activateNode(data[i]['children'], node);
      }
    }
  }

  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.activateNode(this.data, null);
    this.mask = false;
  }

  emitCheckedData(checkedData: any) {
    checkedData.checked = !checkedData.checked;

    if (checkedData.checked) {
      if (checkedData.hasOwnProperty('children')) {
        checkedData.children.forEach((option: any) => {
          option.checked = true;
          if (option.hasOwnProperty('children')) {
            this.setCheckedStatusFromParent(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    } else {
      if (checkedData.hasOwnProperty('children')) {
        checkedData.children.forEach((option: any) => {
          option.checked = false;
          if (option.hasOwnProperty('children')) {
            this.searchObject(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    }

  }

  searchObject(object: any) {
    object.children.forEach((childOption: any) => {
      childOption.checked = false;
      if (childOption.hasOwnProperty('children')) {
        this.searchObject(childOption);
      }
    });
  }


  setCheckedStatusFromParent(object: any) {
    object.children.forEach((childOption: any) => {
      childOption.checked = true;
      if (childOption.hasOwnProperty('children')) {
        this.setCheckedStatusFromParent(childOption);
      }
    });
  }

  onTreeNodeCheck(data: any) {
    this.onTreeNodeChecked.emit(this.data);
  }
}
