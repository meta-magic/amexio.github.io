/**
 * Created by pratik on 15/1/18.
 */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'amexio-fileupload', template: `
    <div class="input-group">
      <label>Choose File</label>
      <input type="file" class="input-control"
             [attr.accept]="filetype" (change)="uploadFile($event)"
             [attr.multiple]="multiplefile" #inp>
    </div>
    <ng-container *ngIf="droppable">
      <h5>Drag and DropFiles below</h5>
      <div class="upload-drop-zone {{dropClass}}" (drop)="onFileDrop($event)" (dragover)="onDragOver($event)"
           (dragleave)="dropClass = '';" #drpZone>
        Just drag and drop files here
      </div>
      <span>File Name : {{uploadedFileName}}</span>
    </ng-container>

  `
})

export class AmexioFileUploadComponent implements OnInit {

  @Input('field-label') fieldlabel: string;

  @Input('http-url') httpurl: string;

  @Input('http-method') httpmethod: string;

  @Input('file-type') filetype: string;

  @Input('multiple-file') multiplefile: string;

  @Input('popover-position') popoverposition: string;

  @Input('param-name') paramname: string;

  @Input() droppable: boolean;

  @ViewChild('inp') inpHandle: any;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  uploadedFileName: string;

  dropClass: string;

  constructor() {

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

  onDragOver(event: any) {
    event.preventDefault();
    this.dropClass = 'drop';
  }

  //  For Uploading files
  uploadFile(event: any) {
    let fileList: FileList = event.target.files;
    let formData = new FormData();
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (!this.paramname) {
          this.paramname = "file";
        }
        formData.append(this.paramname, fileList[i]);
      }
      // this.commonHttpService.uploadFile(this, this.httpurl, this.httpmethod, formData);
      if (fileList.length == 1) {
        this.uploadedFileName = fileList[0].name;
      } else if (fileList.length > 1) {
        this.uploadedFileName = fileList.length + ' files';
        // this.inpHandle.nativeElement.value = this.uploadedFileName;
      }
    }

  }
}
