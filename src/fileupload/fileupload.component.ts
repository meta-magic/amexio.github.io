/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas,Sagar Jadhav
 *
 */


import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormInputBase} from "../baseclass/form.base.class";
import {CommonHttpService} from "../common.http.service";
export const BASE_IMPL_FILEUPLOAD_INPUT: any = {
  provide: FormInputBase, useExisting: forwardRef(() => FileuploadComponent)
};

@Component({
  selector: 'amexio-file-upload', template: `
    <div class="form-group">
      <ng-container *ngIf="hasLabel">
        <label [attr.for]="elementId"
               [style.font-style]="fontStyle"
               [style.font-family]="fontFamily"
               [style.font-size]="fontSize"
               class="control-label">
          {{fieldLabel}}
        </label>
      </ng-container>
      <br>
      <label class="custom-file">
        <input type="file" class="custom-file-input" [attr.accept]="fileType" (change)="uploadFile($event)"
               [attr.multiple]="multipleFile">
        <span class="custom-file-control"></span>
      </label>
      <ng-container *ngIf="uploadedFileName">
        <label class="amexio-uploaded-file-label">{{uploadedFileName}}</label>
      </ng-container>
    </div>
  `, styles: [`
    .amexio-uploaded-file-label {
     
    }

  `], providers: [BASE_IMPL_FILEUPLOAD_INPUT, CommonHttpService]
})
export class FileuploadComponent extends FormInputBase implements OnInit, AfterViewInit {

  @Input() fieldLabel: string;

  @Input() httpUrl: string;

  @Input() httpMethod: string;

  @Input() fileType: string;

  @Input() multipleFile: string;

  @Input() popoverPlacement: string;

  uploadedFileName: string;

  constructor(private commonHttpService: CommonHttpService) {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  //  For Uploading files
  uploadFile(event: any) {
    let fileList: FileList = event.target.files;
    let formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('file', fileList[i]);
    }
    this.commonHttpService.uploadFile(this, this.httpUrl, this.httpMethod, formData);
    if (fileList.length == 1) {
      this.uploadedFileName = fileList[0].name;
    } else if (fileList.length > 1) {
      this.uploadedFileName = fileList.length + ' files';
    }
  }

}
