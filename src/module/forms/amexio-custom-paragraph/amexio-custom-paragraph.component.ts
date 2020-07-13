import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioParagraphComponent } from './amexio-paragraph/amexio-paragraph.component';

@Component({
  selector: 'amexio-custom-paragraph',
  templateUrl: './amexio-custom-paragraph.component.html',
  styleUrls: ['./amexio-custom-paragraph.component.scss'],
})
export class AmexioCustomParagraphComponent implements OnInit {

  /*
 Properties
 name : data
 datatype : string
 version : 5.21 onwards
 default : none
 description : local JSON data variable
 */
  _data: any;
  responseData: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
  }
  get data(): any[] {
    return this._data;
  }

  /*
  Properties
  name : data-reader
  datatype : string
  version : 5.21 onwards
  default : none
  description : Key in JSON Datasource for records.
  */
  @Input('data-reader') datareader: string;

  /*
   Properties
   name : http-url
   datatype : string
   version : 5.21 onwards
   default : none
   description : REST url for fetching data.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : http-method
   datatype : string
   version : 5.21 onwards
   default : none
   description : Type of HTTP call, POST,GET etc.
   */
  @Input('http-method') httpmethod: string;

  viewData: any[];
  componentRef: any;
  /*
  Events
  name : dataChange
  datatype : none
  version : 5.21 onwards
  default : none
  description : returns the updated json value
  */
  @Output() dataChange = new EventEmitter();

  @ViewChild('customtext', { read: ViewContainerRef }) customText: ViewContainerRef;

  constructor(public dataService: CommonDataService, private resolver: ComponentFactoryResolver) {
  }

  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.viewData = this.data;

    this.viewData.forEach((ele, index) => {
      ele['index'] = index;
    });
  }

  addComponent(attr: { content: any; color: any; type: any; newline: any; fontsize: any; }) {
    const factory = this.resolver.resolveComponentFactory(AmexioParagraphComponent);
    this.componentRef = this.customText.createComponent(factory);
    this.componentRef.instance.pdata = this.data;
    this.componentRef.instance.content = attr.content;
    this.componentRef.instance.color = attr.color;
    if (attr.type) {
      this.componentRef.instance.type = attr.type;
    } else {
      this.componentRef.instance.type = 'label';
    }
    if (attr.newline) {
      this.componentRef.instance.newline = attr.newline;
    } else {
      this.componentRef.instance.newline = false;
    }
    if (attr.fontsize) {
      this.componentRef.instance.fontsize = attr.fontsize;
    } else {
      this.componentRef.instance.fontsize = 'medium';
    }
    (this.componentRef.instance).pdataChange.subscribe(() => {
      this.dataChanged();
    });
  }

  dataChanged() {
    this.dataChange.emit(this.data);
  }

  loadData() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response: any) => {
        this.responseData = response;
      }, (error: any) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.setData(this.data);
    }
  }

  ngOnInit() {
    this.loadData();
  }

  destroyComponent() {
    this.componentRef.destroy();
  }
}
