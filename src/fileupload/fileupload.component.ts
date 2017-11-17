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


import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
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
                       [attr.multiple]="multipleFile" #inp>
                <span class="custom-file-control"></span>
            </label>
            <ng-container *ngIf="uploadedFileName">
                <label class="amexio-uploaded-file-label">{{uploadedFileName}}</label>
            </ng-container>
            <br>
        </div>
        <ng-container *ngIf="droppable">
            <h6 class="text-primary">Or drag and drop files below</h6>
            <div class="amexio-upload-drop-zone {{dropClass}}" (drop)="onFileDrop($event)" (dragover)="onDragOver($event)" (dragleave)="dropClass = '';" #drpZone>
                Just drag and drop files here
            </div>
        </ng-container>

  `, styles: [`
        .amexio-uploaded-file-label {

        }
        .amexio-upload-drop-zone {
            height: 200px;
            border-width: 2px;
            margin-bottom: 20px;
            width: 30%;
        }

        .amexio-upload-drop-zone {
            color: #ccc;
            border-style: dashed;
            border-color: #ccc;
            line-height: 200px;
            text-align: center
        }
        .amexio-upload-drop-zone.drop {
            color: #222;
            border-color: #222;
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

  @Input() requestParamName :string;

  @Input() droppable : boolean;

  @ViewChild('inp')   inpHandle : any;

    @Output() blur : EventEmitter<any> = new EventEmitter<any>();
    @Output() change : EventEmitter<any> = new EventEmitter<any>();
    @Output() input : EventEmitter<any> = new EventEmitter<any>();
    @Output() focus : EventEmitter<any> = new EventEmitter<any>();

  uploadedFileName: string;

  dropClass : string;

  constructor(private commonHttpService: CommonHttpService) {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  onFileDrop(event : any){
    event.preventDefault();
    this.dropClass = '';
    let dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          let f = dt.items[i].getAsFile();
          this.uploadedFileName =f.name;
          this.uploadFile(event);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      /*for (let i = 0; i < dt.files.length; i++) {
       console.log("... file[" + i + "].name = " + dt.files[i].name);
       }*/
    }
  }

  onDragOver(event : any){
    event.preventDefault();
    this.dropClass = 'drop';
  }

  //  For Uploading files
  uploadFile(event: any) {
    let fileList: FileList = event.target.files;
    let formData = new FormData();
    if(fileList){
      for (let i = 0; i < fileList.length; i++) {
        if(!this.requestParamName){
          this.requestParamName="file";
        }
        formData.append(this.requestParamName, fileList[i]);
      }
      this.commonHttpService.uploadFile(this, this.httpUrl, this.httpMethod, formData);
      if (fileList.length == 1) {
        this.uploadedFileName = fileList[0].name;
      } else if (fileList.length > 1) {
        this.uploadedFileName = fileList.length + ' files';
        // this.inpHandle.nativeElement.value = this.uploadedFileName;
      }
    }

  }

}
