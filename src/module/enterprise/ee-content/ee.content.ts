/**
 * Created by dattaram on 23/8/17.
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'amexio-ee-content', template: `
    <div class="maincontent" [ngStyle]="{'background-image':'url('+bgImgUrl+')'}" (window:resize)="onResize($event)">
       <span *ngIf="closeEnable" class="close-button">
        <i class="fa fa-times fa-lg" (click)="closeDetailPage()" aria-hidden="true"></i>
      </span>
      <div class="content-area" >
        <span class="title">{{title}}</span><br>
        <span class="subtitle"><span class="match" *ngIf="matchPercentage">{{matchPercentage}} Match</span> {{releaseYear}} <span
          class="age" *ngIf="ageLimit">{{ageLimit}}</span> {{seasonNo}}</span><br>
        <p style="word-wrap: break-word;">{{description}}<br>

        <ng-container *ngIf="contents">
              <span>
                <li *ngFor="let data of contents"><strong
                  style="color: #999;">{{data.key}}: </strong> <strong>  {{data.value}}</strong></li><br>
          </span>
        </ng-container>
        <ul class="inline-list">
          <li *ngIf="enableWatch">
            <button class="content-button" (click)="playVideo()"><i class="fa fa-play"></i> &nbsp;&nbsp; Play</button>
            <!--<amexio-ee-btn [cClass]="'buttoncustom'" [label]="'Play'" [type]="'danger'" [icon]="'fa fa-play'" [tooltipMessage]="'play'" [size]="size" (onClick)="playVideo()"></amexio-ee-btn>-->
          </li>
          <li *ngIf="enableMyList">
            <button class="content-button" (click)="addToList()"><i class="fa fa-plus"></i>&nbsp;&nbsp; MY LIST</button>
            <!--<amexio-ee-btn [cClass]="'secondarybutton'" [label]="'MY LIST'" [icon]="'fa fa-plus'" [type]="'secondary'" [tooltipMessage]="'My List'" [size]="size" (onClick)="addToList()"></amexio-ee-btn>-->
          </li>
          <li>
            <a [ngClass]="getClassName()" (click)="likeClick()"><i class="fa fa-thumbs-o-up fa-lg"
                                                                   aria-hidden="true"></i>
            </a>
          </li>
          <li><a [ngClass]="getClassName()" (click)="unlikeClick()"><i class="fa fa-thumbs-o-down fa-lg "
                                                                       aria-hidden="true"></i></a></li>

        </ul>
        <ng-container *ngIf="rate && max">
          <amexio-rating-input [(ngModel)]="rate"
                               [max]="max" name="rate"
                               [read-only]="isReadonly">
          </amexio-rating-input>
        </ng-container>
      </div>
    </div>`
})

export class ContentComponent implements OnInit, OnChanges {

  @Input('bg-image-url') bgImgUrl: any;

  @Input() title: string;

  @Input() description: string;

  @Input() contents: any;

  @Input('link') videoLink: any;

  @Input() rate: any;

  @Input() max: any;

  @Input() isReadonly: boolean;

  @Input('watch') enableWatch = false;

  @Input('my-list') enableMyList = false;

  @Input('age-limit') ageLimit: any;

  @Input('release-year') releaseYear: any;

  @Input() seasonNo: number;

  @Input() matchPercentage: any;

  @Input('close') closeEnable: boolean;

  @Output() onWatchClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onAddListClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onLikeClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onUnlikeLikeClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onCloseClick: EventEmitter<any> = new EventEmitter<any>();

  size: string;

  overviewData: any;

  smallScreen: boolean;

  constructor() {
    this.closeEnable = false;
    this.smallScreen = false;
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.smallScreen = true;
      this.size = 'small';
    } else {
      this.smallScreen = false;
      this.size = 'default';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.videoLink && !changes.videoLink.isFirstChange()) {
      this.videoLink = changes.videoLink.currentValue;
      console.log(this.videoLink);
    }
  }

  playVideo() {
    this.onWatchClick.emit(this.videoLink);
  }

  addToList() {
    this.overviewData = {
      'title': this.title, 'description': this.description, 'Video Link': this.videoLink, 'rate': this.rate
    };
    this.onAddListClick.emit(this.overviewData);
  }

  onResize(event: any) {
    if (event.target.innerWidth < 995) {
      this.size = 'small';
      this.smallScreen = true;
    } else {
      this.size = 'default';
      this.smallScreen = false;
    }
  }

  getClassName() {
    if (this.smallScreen) {
      return 'buttonSmall';
    } else {
      return 'button';
    }
  }

  unlikeClick() {
    this.overviewData = {
      'title': this.title, 'rate': this.rate
    };
    this.onUnlikeLikeClick.emit(this.overviewData);
  }

  likeClick() {
    this.overviewData = {
      'title': this.title, 'rate': this.rate
    };
    this.onLikeClick.emit(this.overviewData);
  }

  closeDetailPage() {
    this.onCloseClick.emit(this.title);
  }
}
