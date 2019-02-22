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
*/

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
@Component({
  selector: 'amexio-fileupload',
  templateUrl: 'fileupload.component.html',
})
export class AmexioFileUploadComponent implements OnInit, AfterViewInit {
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
   description : Defines the file type of file to upload. Shows only given file type at the time of
   file upload.example for 1.image [file-type]=image/* 2.for pdf [file-type]=application/pdf
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

  responseData: any;

  /*
   Events
   name : onRemove
   datatype : any
   version : none
   default :
   description : On remove click event
   */
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

  @Output() onFileUpload: EventEmitter<any> = new EventEmitter<any>();

  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  @Output() error: EventEmitter<any> = new EventEmitter<any>();

  uploadedFiles: any[] = [];

  dropClass: string;

  constructor(public dataService: CommonDataService) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  formatBytes(bytes: number, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals || 2;
    // tslint:disable-next-line:one-variable-per-declaration
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onFileDrop(event: any) {
    event.preventDefault();
    this.dropClass = '';
    const dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind === 'file') {
          const f = dt.items[i].getAsFile();
          this.uploadFile(f, true);
        }
      }
    } else {
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.dropClass = 'drop';
  }

  closeFile(filedata: any, index: any) {
    this.onRemove.emit({ fileData: filedata });
    this.uploadedFiles.splice(index, 1);
  }

  //  For Uploading files
  uploadFile(event: any, singleFile: boolean) {
    if (singleFile) {
      const formData = new FormData();

      formData.append(this.paramname, event);
      if (this.httpmethod && this.httpurl) {
        this.dataService
          .uploadFile(this.httpurl, this.httpmethod, formData)
          .subscribe(
          (response: any) => {
            this.responseData = response;
          },
          (error: any) => {
            this.error.emit(error);
          },
          () => {
            this.success.emit(this.responseData);
          },
        );
      }
      this.uploadedFiles.push({
        name: event.name,
        size: this.formatBytes(event.size, 2),
      });

    } else {
      this.serviceCall(event);
    }
    this.onFileUpload.emit(this.uploadedFiles);
  }

  serviceCall(event: any) {
    const fileList: FileList = event.target.files != null ? event.target.files : event;
    const formData = new FormData();
    if (fileList) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < fileList.length; i++) {
        if (!this.paramname) {
          this.paramname = 'file';
        }
        formData.append(this.paramname, fileList[i]);
      }
      this.uploadService(formData);
      if (fileList.length === 1) {
        const fsize = this.formatBytes(fileList[0].size, 2);
        this.uploadedFiles.push({ name: fileList[0].name, size: fsize });
      } else if (fileList.length > 1) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < fileList.length; i++) {
          const fsize = this.formatBytes(fileList[i].size, 2);
          this.uploadedFiles.push({ name: fileList[i].name, size: fsize });
        }
      }
    }
  }

  uploadService(formData: FormData) {
    this.dataService.uploadFile(this.httpurl, this.httpmethod, formData)
      .subscribe(
      (response: any) => {
        this.responseData = response;
      },
      (error: any) => { },
      () => {

      },
    );
  }
}
