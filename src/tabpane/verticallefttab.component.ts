/**
 * Created by ketangote on 7/17/17.
 */


import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {TabComponent} from './tabpill.component';
declare var $: any;

@Component({
  selector: 'amexio-vertical-left-tab-pane',
  template : `
    <table [ngClass]="cClass" >
      <tr>
        <td [attr.width]="tabwidth" valign="top">
          <ul [ngClass]="tapPosition">
            <li *ngFor="let tab of tabs" class="nav-item">
              <a (click)="activateTab(tab.elementId)" [ngClass]="{'amexio-verticallefttab-active':(tab.active && !verticalText), 'amexio-verticallefttab-inactive':(!tab.active && !verticalText),'amexio-verticallefttab-activevertical':(tab.active && verticalText), 'amexio-verticallefttab-inactivevertical':(!tab.active && verticalText)}" class="nav-link " [attr.id]="tab.elementId" style="cursor: pointer;"> <i *ngIf="tab.icon" [ngClass]="tab.icon"></i>&nbsp;{{tab.title}}</a>
            </li>
          </ul>
        </td>
        <td valign="top">
          <div class="amexio-verticallefttab-td-padding">
            <ng-content ></ng-content>
          </div>
        </td>
      </tr>
    </table>

    
  `,
  styles : [`
      .amexio-verticallefttab-active{
          border-bottom: 1px solid #ddd;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: none;
          border-right-color: transparent;
          display: block;
      }

      .amexio-verticallefttab-inactive{
          border-right: 1px solid #ddd;;
      }

      .amexio-verticallefttab-activevertical{
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          border-top: 1px solid #ddd;
      }

      .amexio-verticallefttab-inactivevertical{
          border-bottom: 1px solid #ddd;
      }

      .amexio-verticallefttab-vertical-text {
          margin-top:50px;
          border: none;
          position: relative;
      }
      .amexio-verticallefttab-vertical-text>li {
          height: 20px;
          width: 120px;
          margin-bottom: 100px;
      }
      .amexio-verticallefttab-vertical-text>li>a {
          text-align: center;

          -webkit-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -ms-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
          transform: rotate(-90deg);
      }
      .amexio-verticallefttab-td-padding{
          padding: 5px;
      }
  `]
})
export class VerticalLeftTabPaneComponent implements OnInit, AfterViewInit, AfterContentInit {


  @Input() tabs: TabComponent[];

  @Input() tapPosition: string;

  @Input() verticalText: boolean;

  @Input() tabwidth : string;

  @Input() cClass:string;

  @ContentChildren(TabComponent)  queryTabs: QueryList<TabComponent>;

  elementId: string;


  constructor() {
    this.elementId = 'vertical-left-tabpane-' + Math.floor(Math.random()*90000) + 10000;
    this.verticalText = false;
    this.tabwidth = "15%";

  }

  ngOnInit() {
    if (this.verticalText) {
      this.tapPosition = 'nav flex-column amexio-verticallefttab-vertical-text';
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
      if (tab.elementId == tabId)
        tab.active = true;
    });
  }
}
