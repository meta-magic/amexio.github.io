/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */


import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FileUploadService} from "./fileupload.service";
import {FormInputBase} from "../baseclass/form.base.class";

export const BASE_IMPL_FILEUPLOAD_INPUT : any = {
  provide : FormInputBase,
  useExisting: forwardRef(() => FileuploadComponent)
};

@Component({
  selector: 'amexio-file-upload',
  template: `
      <div class="col-lg-9">
          <input type="text" readonly
                 autocomplete="off"
                 class="form-control"
                 data-placement="bottom"  data-trigger="focus" data-html="true" [attr.value]="fileName+'  '+fileSize">
      </div>
      <div class="col-lg-3">
          <label class="btn btn-primary btn-file">
              {{fieldLabel}} <input type="file" [attr.accept]="fileType"  (change)="uploadFile($event)" [attr.multiple]="multipleFile" style="display: none;" #fileupload>
          </label>
      </div>
  `,
  providers : [BASE_IMPL_FILEUPLOAD_INPUT]
})
export class FileuploadComponent extends FormInputBase implements OnInit {

  @Input()    fieldLabel : string;

  @Input()    url : string;

  @Input()   httpMethod : string;

  @Input()   fileType : string;

  @Input()   multipleFile : string;

  fileSize    : string = '';

  fileName : string = '';

  constructor(private fileUploadService : FileUploadService) {
    super();
  }

  ngOnInit() {
  }

  uploadFile(event : any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileName = fileList[0].name;
      this.fileSize = (fileList[0].size/1024).toFixed(1);
      this.fileSize = this.fileSize+' Kb';
     // this.fileUploadService.uploadFile(this,this.url,this.httpMethod,fileList);
    }
  }
  setData(requestData : any){

  }
}
