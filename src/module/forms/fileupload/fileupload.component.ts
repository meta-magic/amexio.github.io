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
@Component({
  selector: 'amexio-fileupload', template: `
    <div class="input-group">
      <ng-container *ngIf="fieldlabel">
       <label>{{fieldlabel}}</label>
      </ng-container>
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
      </div>
      <span>File Name : {{uploadedFileName}}</span>


  `
})

export class AmexioFileUploadComponent implements OnInit {
   /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
 /*
Properties 
name : http-url
datatype : string
version : 4.0 onwards
default : none 
description : REST url for fetching datasource.
*/ 
  @Input('http-url') httpurl: string;
/*
Properties 
name : http-method
datatype : string
version : 4.0 onwards
default : none 
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;
/*
Properties 
name : file-type
datatype : string
version : 4.0 onwards
default : none
description : Defines the file type of file to upload. Shows only given file type at the time of file upload.example for 1.image [file-type]=image/* 2.for pdf [file-type]=application/pdf
*/ 
  @Input('file-type') filetype: string;
/*
Properties 
name : multiple-file
datatype : string
version : 4.0 onwards
default : none
description : Defines if there are multiple file to upload
*/ 
  @Input('multiple-file') multiplefile: string;
/*
Properties 
name : popover-position
datatype : string
version : 4.0 onwards
default : none
description : Defines the position of component to be placed
*/ 
  @Input('popover-position') popoverposition: string;
/*
Properties 
name : param-name
datatype : string
version : 4.0 onwards
default : none
description : Used to specify URL query param name. same with backend rest controller paramater object name Default :file
*/ 
  @Input('param-name') paramname: string;
/*
Properties 
name : droppable
datatype : string
version : 4.0 onwards
default : none
description : Allow Drop Zone For Files.
*/ 
  @Input() droppable: boolean;

  @ViewChild('inp') inpHandle: any;

  responseData:any;
/*
Events
name : blur
datatype : any
version : 4.0 onwards
default : none
description : 	On blur event
*/ 
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
/*
Events
name : change
datatype : any
version : 4.0 onwards
default : none
description : Change event
*/ 
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
    /*
Events
name : input
datatype : any
version : none
default : none
description : 	On input event field.
*/ 
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
    /*
Events
name : focus
datatype : any
version : none
default : none
description : On field focus event
*/ 
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  uploadedFileName: string;

  dropClass: string;

  constructor(public dataService: CommonDataService,) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
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
          this.uploadedFileName = f.name;
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

  //  For Uploading files
  uploadFile(event: any,singleFile:boolean) {
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
        this.uploadedFileName = event.name;
    }else{
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
          this.uploadedFileName = fileList[0].name;
        } else if (fileList.length > 1) {
          this.uploadedFileName = fileList.length + ' files';
          // this.inpHandle.nativeElement.value = this.uploadedFileName;
        }
      }

    }

  }
}

