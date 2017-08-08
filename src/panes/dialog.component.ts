/**
 * Created by ketangote on 7/26/17.
 */

import {
  Component,  EventEmitter, Input, OnInit, Output
} from '@angular/core';


@Component({
  selector: 'amexio-dialog',
  template: `
    <div class="modal fade amexio-dialog-background-color" tabindex="-1" [ngClass]="{'show': visibleAnimate}"
         [ngStyle]="{'display': showWindow ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
      <div class="modal-dialog " role="document">
        <div class="modal-content">
          <div class="modal-header">
            {{title}}
          </div>
          <div class="modal-body" >
            <ng-content select="amexio-pane-body"></ng-content>
          </div>
          <div class="modal-footer">
            <amexio-btn *ngIf="(dialogType==2)" [label]="secondaryActionLabel" [type]="'default'" (onClick)="status('cancel')"></amexio-btn>
            <amexio-btn [label]="primaryActionLabel" [type]="'primary'" (onClick)="status('ok')"></amexio-btn>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['dialog.custom.css']
})


export class DialogComponent implements OnInit{


  _showWindow: boolean;

  visibleAnimate : boolean;

  @Input() title : boolean;

  @Output() showWindowChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() actionStatus : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() dialogType : number; //1- prompt dialog (default), 2 confirm dialog

  @Input() primaryActionLabel : string;

  @Input() secondaryActionLabel : string;

  constructor(){
    this.showWindow = false;
    this.dialogType = 1;
    this.primaryActionLabel = "Ok";
    this.secondaryActionLabel = "Cancel";
  }

  ngOnInit(){

  }

  ngAfterViewInit(){
    setTimeout(() => this.visibleAnimate = true, 100);
  }


  @Input()
  get showWindow(){
    return this._showWindow;
  }


  set showWindow(sw){
    this._showWindow = sw;
  }


  close(){
    this.showWindow=false;
    this.showWindowChange.emit(this.showWindow);
  }

  status(v){
    this.close();
    this.actionStatus.emit(v);
  }
}
