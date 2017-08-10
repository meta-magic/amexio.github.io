/**
 * Created by ketangote on 7/25/17.
 */


import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {TabComponent} from './tabpill.component';
declare var $: any;

@Component({
  selector: 'amexio-vertical-right-tab-pane',
  template : `
    <table>
      <tr>
        <td valign="top">
          <div class="amexio-verticalrighttab-td-padding">
            <ng-content ></ng-content>
          </div>
        </td>
        <td [attr.width]="tabwidth">
          <ul [ngClass]="tapPosition">
            <li *ngFor="let tab of tabs" class="nav-item">
              <a (click)="activateTab(tab.elementId)" [ngClass]="{'amexio-verticalrighttab-active':(tab.active && !verticalText), 'amexio-verticalrighttab-inactive':(!tab.active && !verticalText),'amexio-verticalrighttab-activevertical':(tab.active && verticalText), 'amexio-verticalrighttab-inactivevertical':(!tab.active && verticalText)}" class="nav-link " [attr.id]="tab.elementId" style="cursor: pointer;"> <i *ngIf="tab.icon" [ngClass]="tab.icon"></i>&nbsp;{{tab.title}}</a>
            </li>
          </ul>
        </td>
      </tr>
    </table>


  `,
  styleUrls: [
      'verticalrighttab.custom.css'
  ]
})
export class VerticalRightTabPaneComponent implements OnInit, AfterViewInit, AfterContentInit {


  @Input() tabs: TabComponent[];

  @Input() tapPosition: string;

  @Input() verticalText: boolean;

  @Input() tabwidth: string;

  @ContentChildren(TabComponent)  queryTabs: QueryList<TabComponent>;

  elementId: string;


  constructor() {
    this.elementId = 'vertical-right-tabpane-' + Math.floor(Math.random()*90000) + 10000;
    this.verticalText = false;
    this.tabwidth = "15%";
  }

  ngOnInit() {
    if (this.verticalText) {
      this.tapPosition = 'nav flex-column amexio-verticalrighttab-vertical-text';
    }else {
      this.tapPosition = 'nav flex-column';
    }
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    this.tabs = this.queryTabs.toArray();
  }

  activateTab(tabId: string) {
    const tabs = this.tabs;
    tabs.forEach(tab => {
      tab.active = false;
      if (tab.elementId == tabId) {
        tab.active = true;
      }
    });
  }
}
