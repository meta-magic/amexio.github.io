import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CommonDataService } from '../../../services/data/common.data.service';

@Component({
    selector: 'amexio-horizontal-treeview',
    templateUrl: './horizontal-tree.component.html',
    styleUrls: ['horizontal-tree.component.css'],
})
export class AmexioHorizontalTreeComponent implements AfterViewInit, OnInit {

    /*
  Properties
  name : label
  datatype : string
  version : 4.0 onwards
  default : none
  description : label for tree
  */
    @Input() label: string;

    /*
    Properties
    name : data
    datatype : any
    version : 4.0 onwards
    default : none
    description : Local Data binding.
    */
    @Input() data: any[];

    /*
    Properties
    name : http-url
    datatype : string
    version : 4.0 onwards
    default : none
    description : REST url for fetching data.
    */
    @Input('http-url') httpurl: string;

    /*
    Properties
    name : http-method
    datatype : string
    version : 4.0 onwards
    default : none
    description : Type of HTTP call, POST,GET etc.
    */
    @Input('http-method') httpmethod: string;

    /*
    Properties
    name : data-reader
    datatype : string
    version : 4.0 onwards
    default : none
    description : Key in JSON Datasource for records.
    */
    @Input('data-reader') datareader: string;
    @Input('child-array-key') childarraykey: string;
    @Input('display-key') displaykey: string;
    @Input('height') height: string;
    @Input('width') width: string;

    /*
    Events
    name : nodeClick
    datatype : none
    version : none
    default : none
    description : It will gives you clicked node data.
    */
    @Output() nodeClick: any = new EventEmitter<any>();

    responseData: any;

    mask = true;

    treetemplates: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

    constructor(public dataService: CommonDataService) {

    }

    ngOnInit() {
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
        this.mask = false;
        this.generateIndex(this.data, 1, Math.floor(Math.random() * 1000 + 999 + 1));
    }

    nodeclick(node: any) {
        this.nodeClick.emit(node);
    }

    generateIndex(data: any, parentId: number, rannumber: any) {
        if (data.hasOwnProperty(this.childarraykey)) {
            data[this.childarraykey].forEach((element: any, index: any) => {
                element['id'] = '' + rannumber + '-' + parentId + (index + 1);
                if (element.hasOwnProperty(this.childarraykey)) {
                    this.generateIndex(element[this.childarraykey], element.id.split('-')[1], rannumber);
                }
            });
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.parentTmp != null) {
                this.treetemplates = { treeNodeTemplate: this.parentTmp };
            } else if (this.treetemplates != null) {
                this.parentTmp = this.treetemplates.treeNodeTemplate;
            }
        });
    }
}
