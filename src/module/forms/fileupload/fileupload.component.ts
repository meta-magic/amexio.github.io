

/*
 Component Name : Amexio Fileupload
 Component Selector :  <amexio-fileupload>
 Component Description : This component use for uploading all types of files.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";


@Component({
  selector: 'amexio-fileupload', template: `
    <div class="input-group" *ngIf="!droppable">
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
    </ng-container>

    <div class="file-upload-box" style="width: 100%" >
      <li *ngFor="let file of uploadedFiles ; let index = index" class="file-upload-info">
        <span class="uploaded-file-name">({{file.name}} &nbsp;  &nbsp; ({{file.size}}) )</span>
        <amexio-form-icon key="tab_close" class="close-icon" (onClick)="closeFile(file,index)">
        </amexio-form-icon>
      </li>
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


  responseData:any;

  /*
   Events
   name : onRemove
   datatype : any
   version : none
   default :
   description : On remove click event
   */
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  /*
   Events
   name : onFileUpload
   datatype : any
   version : none
   default :
   description : On remove click event
   */
  @Output() onFileUpload: EventEmitter<any> = new EventEmitter<any>();
  uploadedFiles : any[] = [];

  dropClass: string;

  constructor(public dataService: CommonDataService) {

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

  closeFile(filedata:any,index : any){
    this.onRemove.emit({fileData: filedata});
    this.uploadedFiles.splice(index, 1);
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
    this.onFileUpload.emit(this.responseData);
  }
}
