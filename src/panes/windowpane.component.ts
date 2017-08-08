/**
 * Created by ketangote on 7/25/17.
 */


import {
  Component,  EventEmitter, Input, OnInit, Output
} from '@angular/core';


@Component({
  selector: 'amexio-window-pane',
  template: `
  <div class="modal fade amexio-window"   tabindex="-1" [ngClass]="{'show': visibleAnimate}"
       [ngStyle]="{'display': showWindow ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog " role="document" [ngClass]="{'modal-lg':(size==2),'modal-sm':(size==1)}">
      <div class="modal-content">
        <div class="modal-header">
          {{title}}
          <button *ngIf="closable" type="button" class="close" (click)="close()">&times;</button>
        </div>
        <div class="modal-body" >
          <ng-content select="amexio-pane-body"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select="amexio-pane-action"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['windowpane.custom.css']
})

export class WindowPaneComponent implements OnInit{


  _showWindow: boolean;

  visibleAnimate: boolean;

  @Input() title: boolean;

  @Input() closable: boolean;

  @Output() showWindowChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() size : number; // 1 is small modal , 2 is large modal

  constructor(){
    this.showWindow = false;
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

}


