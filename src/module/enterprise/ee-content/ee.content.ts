/**
 * Created by dattaram on 23/8/17.
 */
/*
Component Name : Amexio  Media content
Component Selector : <amexio-ee-content>
Component Description : A simple configurable star rating component with visual feedback.

*/
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'amexio-ee-content', template: `
    <div class="main-content" [ngStyle]="{'background-image':'url('+bgImgUrl+')'}" (window:resize)="onResize($event)">
       <span *ngIf="closeEnable" class="close-button">
        <i class="fa fa-times fa-lg" (click)="closeDetailPage()" aria-hidden="true"></i>
      </span>
      <div class="content-area" >
        <span class="content-title">{{title}}</span><br>
        <span><span class="match" *ngIf="matchPercentage">{{matchPercentage}} Match</span> {{releaseYear}} <span
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
            <span class="content-button" (click)="playVideo()">
            <i class="fa fa-play"></i> &nbsp;&nbsp; Play</span>
            <!-- <amexio-ee-btn [cClass]="'buttoncustom'"
            [label]="'Play'" [type]="'danger'" [icon]="'fa fa-play'"
            [tooltipMessage]="'play'" [size]="size" (onClick)="playVideo()">
            </amexio-ee-btn> -->
          </li>
          <li *ngIf="enableMyList">
            <span class="content-button" (click)="addToList()">
            <i class="fa fa-plus"></i>&nbsp;&nbsp; MY LIST</span>
            <!-- <amexio-ee-btn [cClass]="'secondarybutton'" [label]="'MY LIST'"
            [icon]="'fa fa-plus'" [type]="'secondary'" [tooltipMessage]="'My List'"
            [size]="size" (onClick)="addToList()"></amexio-ee-btn> -->
          </li>
          <li>
            <a style="color: white!important;" [ngClass]="getClassName()" (click)="likeClick()"><i class="fa fa-thumbs-o-up fa-lg"
                                                                   aria-hidden="true"></i>
            </a>
          </li>
          <li><a style="color: white!important;" [ngClass]="getClassName()" (click)="unlikeClick()"><i class="fa fa-thumbs-o-down fa-lg "
                                                                       aria-hidden="true"></i></a></li>

        </ul>
        <ng-container *ngIf="rate && max">
          <amexio-rating-input [(ngModel)]="rate"
                               [max]="max" name="rate"
                               [read-only]="isReadonly">
          </amexio-rating-input>
        </ng-container>
      </div>
    </div>`,
})

export class ContentComponent implements OnInit, OnChanges {
/*
Properties
name : bg-image-url
datatype :  any
version : 4.0 onwards
default : none
description : Background image from content.
*/
  @Input('bg-image-url') bgImgUrl: any;

    /*
Properties
name : title
datatype : string
version : 4.0 onwards
default : none
description : 	Set title.
*/
  @Input() title: string;

    /*
Properties
name : description
datatype :  string
version : 4.0 onwards
default : none
description : Set Description.
*/
  @Input() description: string;

    /*
Properties
name : contents
datatype :  any
version : 4.0 onwards
default : none
description :  Array of content must be in key value pair.
*/
  @Input() contents: any;

    /*
Properties
name : link
datatype :  any
version : 4.0 onwards
default : none
description : Set video link.
*/
  @Input('link') videoLink: any;

    /*
Properties
name : rate
datatype :  any
version : 4.0 onwards
default : none
description : Set rating max value(max=5) and current rating(rate=3).

*/
  @Input() rate: any;

    /*
Properties
name : max
datatype :  any
version : 4.0 onwards
default : none
description :
*/
  @Input() max: any;

    /*
Properties
name : isReadonly
datatype :  boolean
version : 4.0 onwards
default : none
description :
*/
  @Input() isReadonly: boolean;

    /*
Properties
name : watch
datatype :  any
version : 4.0 onwards
default : false
description : Enable watch button.*/
  @Input('watch') enableWatch = false;

    /*
Properties
name : my-list
datatype : none
version : 4.0 onwards
default : false
description : Enable MyList button.
*/
  @Input('my-list') enableMyList = false;

    /*
Properties
name :  age-limit
datatype :  any
version : 4.0 onwards
default : none
description : Set age limit.
*/
  @Input('age-limit') ageLimit: any;

    /*
Properties
name : release-year
datatype :  any
version : 4.0 onwards
default : none
description : Set release Year.
*/
  @Input('release-year') releaseYear: any;

    /*
Properties
name : season-no
datatype :  number
version : 4.0 onwards
default : none
description : Season of specific series

*/
  @Input('season-no') seasonNo: number;

    /*
Properties
name : match-percentage
datatype :  any
version : 4.0 onwards
default : none
description : Match Percentage of media

*/
  @Input('match-percentage') matchPercentage: any;

    /*
Properties
name : close
datatype :  boolean
version : 4.0 onwards
default : none
description : Enable close content.
*/
  @Input('close') closeEnable: boolean;

    /*
Events
name :  onWatchClick
datatype :  none
version : none
default : none
description : Get watch button click.
*/
  @Output() onWatchClick: EventEmitter<any> = new EventEmitter<any>();

    /*
Properties
name : onAddListClick
datatype :  none
version : none
default : none
description : Get add list button click.

*/
  @Output() onAddListClick: EventEmitter<any> = new EventEmitter<any>();

    /*
Properties
name : onLikeClick
datatype :  none
version : none
default : none
description : Get like click.

*/
  @Output() onLikeClick: EventEmitter<any> = new EventEmitter<any>();

    /*
Properties
name : onUnlikeLikeClick
datatype :  none
version : none
default : none
description : Get unlike click.

*/
  @Output() onUnlikeLikeClick: EventEmitter<any> = new EventEmitter<any>();

    /*
Properties
name : onCloseClick
datatype :  any
version :none
default : none
description : Get close content click.

*/
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
    }
  }

  playVideo() {
    this.onWatchClick.emit(this.videoLink);
  }

  addToList() {
    this.overviewData = {
      'title': this.title, 'description': this.description, 'Video Link': this.videoLink, 'rate': this.rate,
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
      return 'button-small';
    } else {
      return 'button';
    }
  }

  unlikeClick() {
    this.overviewData = {
      title: this.title, rate: this.rate,
    };
    this.onUnlikeLikeClick.emit(this.overviewData);
  }

  likeClick() {
    this.overviewData = {
      title: this.title, rate: this.rate,
    };
    this.onLikeClick.emit(this.overviewData);
  }

  closeDetailPage() {
    this.onCloseClick.emit(this.title);
  }
}
