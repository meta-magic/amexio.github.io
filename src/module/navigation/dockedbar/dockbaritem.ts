/**
 * Created by sagar on 6/9/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-dockbar-item', template: `
    <div *ngIf="active"  [style.width]="width" class="dockbar-active-content dockbar-height" [style.min-height]="height"  [style.max-height]="height">
      <ng-container *ngIf="active && title">
        <div class="dockbar-title">
          {{title}}
          <span class="dockbar-item-close-bar" (click)="onBarIconClick()">
            <amexio-nav-icon key="dockbar_close"></amexio-nav-icon>
            <!--
                        <i class="fa fa-times" aria-hidden="true"></i>
            -->
          </span>
        </div>
      </ng-container>
      <ng-content>
      </ng-content>
    </div>
  `
})

export class DockbarComponent implements OnInit {

  @Input() active: boolean;

  @Input() label: string;

  @Input() icon: string;

  @Input() mda: string;

  @Input() width: string;

  @Input() title: string;

  @Input() path: any;

  @Input() height: string;

  elementId: string;

  //Close the  dockbar item
  onBarIconClick() {
    this.active = false;
  }

  constructor() {
    this.elementId = 'dockbar-item-id' + Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
}
