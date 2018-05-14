/**
 * Created by pratik on 15/1/18.
 */

 /*
 Component Name : Amexio Fileupload
 Component Selector :  <amexio-fileupload>
 Component Description : This component use for uploading all types of files.
*/
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

import { AmexioBoxComponent} from "./../../layout/box/box.component";

@Component({
  selector: 'amexio-fileupload', template: `
    <div class="input-group" *ngIf="!droppable">
      <ng-container *ngIf="fieldlabel">
       <label>{{fieldlabel}}</label>
      </ng-container>
             <span *ngIf="showBtn">
        <amexio-button [label]="'File Details'" [type]="'yellow'" (click)="onClick()" [size]="'small'">
        </amexio-button>
        </span>
       <div *ngIf="toggleFileDetails">
        <ul class="file-upload-box">
          <li *ngFor="let file of uploadedFiles ; let index = index">
          <amexio-box #boxObj border-color ="theme-color" background-color = "theme-color" border="left" padding="true" border-dotted = "true">
          
              <span [class] = "'file-upload-name'">
                <amexio-label size="medium">{{file.name}}</amexio-label>
              </span>

              <span [class] = "'file-upload-size'">
              <amexio-label size="small">{{file.size}}</amexio-label>
                <span [class] = "'file-close'">
                  <amexio-form-icon key="tab_close" (onClick)="closeFile(boxObj,index)">
                  </amexio-form-icon>
                </span>
              </span>

          </amexio-box> <br />
          </li>
        </ul>
        </div>
        <ng-container *ngIf="!fieldlabel">
       <label >Choose File</label>
      </ng-container>
      <input type="file" class="input-control"
             [attr.accept]="filetype" (change)="uploadFile($event,false)"
             [attr.multiple]="multiplefile" #inp>
    </div>
    <ng-container *ngIf="droppable">
      <ng-container *ngIf="fieldlabel">
      <label>{{fieldlabel}}</label>
     </ng-container>
       <ng-container *ngIf="!fieldlabel">
       <label>Drag and Drop Files below</label>
       </ng-container>
      <div class="upload-drop-zone {{dropClass}}" (drop)="onFileDrop($event)" (dragover)="onDragOver($event)"
           (dragleave)="dropClass = '';" #drpZone>
        Just drag and drop files here
         <span *ngIf="showBtn">
        <amexio-button [label]="'File Details'" [type]="'yellow'" (click)="onClick()" [size]="'small'">
        </amexio-button>
        </span>
      </div>
      <div *ngIf="toggleFileDetails">
        <ul class="file-upload-box">
          <li *ngFor="let file of uploadedFiles ; let index = index">
          <amexio-box #boxObj border-color ="theme-color" background-color = "theme-color" border="left" padding="true" border-dotted = "true">
            
              <span [class] = "'file-upload-name'">
                <amexio-label size="medium">{{file.name}}</amexio-label>
              </span>

              <span [class] = "'file-upload-size'">
              <amexio-label size="small">{{file.size}}</amexio-label>
                <span [class] = "'file-close'">
                  <amexio-form-icon key="tab_close" (onClick)="closeFile(boxObj,index)">
                  </amexio-form-icon>
                </span>
              </span>

          </amexio-box> <br />
          </li>
        </ul>
        </div>
  `
})

export class AmexioFileUploadComponent implements OnInit {
   /*
Properties
name : field-label
datatype : string
version : 4.0 onwards
default : 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
 /*
Properties
name : http-url
datatype : string
version : 4.0 onwards
default : 
description : REST url for fetching datasource.
*/
  @Input('http-url') httpurl: string;
/*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : 
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;
/*
Properties
name : file-type
datatype : string
version : 4.0 onwards
default : 
description : Defines the file type of file to upload. Shows only given file type at the time of file upload.example for 1.image [file-type]=image/* 2.for pdf [file-type]=application/pdf
*/
  @Input('file-type') filetype: string;
/*
Properties
name : multiple-file
datatype : string
version : 4.0 onwards
default : 
description : Defines if there are multiple file to upload
*/
  @Input('multiple-file') multiplefile: string;
/*
Properties
name : popover-position
datatype : string
version : 4.0 onwards
default : 
description : Defines the position of component to be placed
*/
  @Input('popover-position') popoverposition: string;
/*
Propertiee
name : param-name
datatype : string
version : 4.0 onwards
default : 
description : Used to specify URL query parametername. same with backend rest controller paramater objectname Default [file]
*/
  @Input('param-name') paramname: string;
/*
Properties
name : droppable
datatype : string
version : 4.0 onwards
default : 
description : Allow Drop Zone For Files.
*/
  @Input() droppable: boolean;

  @ViewChild('inp') inpHandle: any;

  responseData:any;

  toggleFileDetails : boolean = false;

  showBtn : boolean = false;

/*
Events
name : blur
datatype : any
version : 4.0 onwards
default : 
description : 	On blur event
*/
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
/*
Events
name : change
datatype : any
version : 4.0 onwards
default : 
description : Change event
*/
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
    /*
Events
name : input
datatype : any
version : none
default : 
description : 	On input event field.
*/
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
    /*
Events
name : focus
datatype : any
version : none
default : 
description : On field focus event
*/
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  uploadedFiles : any[] = [];

  dropClass: string;

  constructor(public dataService: CommonDataService,) {

  }

  ngOnInit() {  }

  ngAfterViewInit() {  }

  formatBytes(bytes : any,decimals:any) {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onFileDrop(event: any) {
    event.preventDefault();
    this.dropClass = '';
    let dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          let f = dt.items[i].getAsFile();
          //this.uploadedFileName = f.name;
          this.uploadFile(f,true);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      /*for (let i = 0; i < dt.files.length; i++) {
       console.log("... file[" + i + "].name = " + dt.files[i].name);
       }*/
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.dropClass = 'drop';
  }

  closeFile(box:any,index : any){
    debugger;
    box.close = false;
    this.uploadedFiles.splice(index,1);
  }

  onClick(){
    this.toggleFileDetails = !this.toggleFileDetails;
  }
  //  For Uploading files
  uploadFile(event: any,singleFile:boolean) {
    this.showBtn = true;
    //this.toggleFileDetails = true;
    if(singleFile){
      let formData = new FormData();
      formData.append(this.paramname, event);
      this.dataService.uploadFile(this.httpurl, this.httpmethod, formData).subscribe(
        response=>{
        this.responseData = response;
        },
        error=>{

        },
        ()=>{

        }
        );
          this.uploadedFiles.push({ name: event.name , size: this.formatBytes(event.size,2)});
    } else {
      let fileList: FileList = event.target.files!=null?event.target.files:event;
      let formData = new FormData();
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          if (!this.paramname) {
            this.paramname = "file";
          }
          formData.append(this.paramname, fileList[i]);
        }
        this.dataService.uploadFile(this.httpurl, this.httpmethod, formData).subscribe(
          response=>{
          this.responseData = response;
          },
          error=>{

          },
          ()=>{

          }
          );
          if (fileList.length == 1) {
          let fsize = this.formatBytes(fileList[0].size,2);
          this.uploadedFiles.push({ name: fileList[0].name, size: fsize});
        } else if (fileList.length > 1) {
          for(let i=0 ;i<fileList.length ; i++)
          {
            let fsize = this.formatBytes(fileList[i].size,2);
            this.uploadedFiles.push({ name: fileList[i].name, size: fsize });
          }
        }
      }
    }
  }
}
