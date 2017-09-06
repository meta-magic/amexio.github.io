/**
 * Created by dattaram on 23/8/17.
 */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare var $;
@Component({
  selector: 'amexio-ee-content',
  template: `      
    <div class="maincontent"  [ngStyle]="{'background-image':'url('+bgImgUrl+')'}" >
      <div (window:resize)="onResize($event)">
       <span class="close-button">
        <i class="fa fa-times fa-lg" (click)="closeDetailPage()" aria-hidden="true"></i>
      </span>
        <div class="col-lg-6 col-sm-12 content-area" style="color: white;padding-left: 30px;">
          <span class="title">{{title}}</span><br>
          <span class="subtitle"><span class="match">{{matchPercentage}} Match</span> {{releaseYear}} <span class="age">{{ageLimit}}+</span> {{seasonNo}} Season</span><br>
          {{description}}<br>
          
          <ng-container *ngIf="contents">
              <span>
                <li *ngFor="let data of contents"><strong style="color: #999;">{{data.key}}: </strong> <strong>  {{data.value}}</strong></li><br>
          </span>
          </ng-container>
            
            <ul >
                <li style="display: inline;">  <amexio-ee-btn  [label]="'Play'" [type]="'danger'" [icon]="'fa fa-play'" [tooltipMessage]="'play'" [size]="size" (onClick)="playVideo()"></amexio-ee-btn></li>
                <li style="display: inline;"><amexio-ee-btn [label]="'MY LIST'" [icon]="'fa fa-plus'" [type]="'secondary'" [tooltipMessage]="'My List'" [size]="size" (onClick)="addToList()"></amexio-ee-btn></li>
            </ul>
          <table>
            <tr>
             <!-- <td *ngIf="enableWatch">
              
              </td>
              <td *ngIf="enableMyList" >
                  
              </td>-->
            
                
                    &nbsp;<td *ngIf="smallScreen"> <a  style="padding-top: 20px"><i class="fa fa-thumbs-o-up fa-lg likebutton" aria-hidden="true"></i></a></td>
                    &nbsp;<td *ngIf="smallScreen"><a  style="padding-top: 20px"><i class="fa fa-thumbs-o-down fa-lg likebutton" aria-hidden="true"></i></a></td>
                    &nbsp;<td *ngIf="!smallScreen"> <a class="button1"><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i></a></td>
                    &nbsp;<td *ngIf="!smallScreen"><a class="button1"><i class="fa fa-thumbs-o-down fa-lg " aria-hidden="true"></i></a></td>
            </tr>
              <tr>
              <td *ngIf="rate && max">
                  <amexio-ee-rating-input [(ngModel)]="rate"
                                          [max]="max" name="rate"
                                          [readonly]="isReadonly">
                  </amexio-ee-rating-input>
              </td>
              </tr>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `        
        
      
      .maincontent {
        position: relative;
        width: 100%; /* for IE 6 */
        height: 65vh;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .maincontent div {
        position: absolute;
        top: 10px;
        left: 0;
        width: 100%;
      }
      
      .title{
        width: 100%;
        font-size: 180%;
        font-weight: 700;
        line-height: 130%;
        color: #fff;
        text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
      }

      @media screen and (min-width: 1400px){
        .maincontent div {
          height: 32vw;
          padding-bottom: 20px;
        }
      }

      @media (max-width: 799px)
      {
        .maincontent div {
          font-size: 11px;
        }
         
        .maincontent div {
          top: 10px;
          width: 33vw;
          min-width: 330px;
          color: #999;
          line-height: 1.3;
        }

        .maincontent div table {
         height: 50px;
        }
      }

      @media(max-width: 480px) {
        
        .likebutton{
          display: inline-block;
          margin-top: 5px;
          width: 25px;
          height: 25px;
          padding: 5px 0 0 5px;
          border: solid 2px rgba(255,255,255,.4);
          border-radius: 70px;
          font-size: 13px;
          font-weight: 300;
          text-decoration: none;
          text-transform: uppercase;
          color: #fff;
          transition: transform 0.5s;
        }
        .likebutton:hover{
          border: solid 2px #fff;
          transform: scale(1.1);
        }
        
        img{
          width: 170px;
          height: 35px;
        }
        .title{
          width: 100%;
          font-size: 180%;
          font-weight: 700;
          line-height: 130%;
          color: #fff;
          text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
        }
        h3 {
          font-size: 9pt;
        }
        span{
          font-size: 6pt;
        }
        li b{
          font-size: 6pt;
        }
        li {
          font-size: 6pt;
        }
        .maincontent {
          position: relative;
          width: 100%; /* for IE 6 */
          height: 35vh;
          width: 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }


      header{
        width: 100%;
        padding: 0px 48px;
        background-image: linear-gradient(rgba(0, 0, 0, 0.0), #141414);
        background-size: cover;
        background-position: center;
        height: 100vh;
      }
      header .billboard{
        margin-top: 40px;
        width: 40%;
        padding: 2px;
        font-size: 110%;
        line-height: 160%;
      }
      header .billboard .tab-area a{
        width: 120px;
        float: left;
        font-size: 90%;
        color: #ffffff;
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        padding: 8px;
        margin-right: .75em;
        margin-bottom: 30px;
        transition: border 0.5s;
      }
      header .billboard .tab-area a:hover{
        border-bottom: solid 2px #eeeeee;
      }
      header .billboard .tab-area .active{
        border-bottom: solid 2px #e50914;
      }
      /* Text Related CSS */
      header .billboard .content-area{
        color: #999;
        font-size: 100%;
      }
      header .billboard .content-area .subtitle{
        font-size: 120%;
        line-height: 200%;
      }
      header .billboard .content-area .credits{
        font-size: 80%;
      }
      header .billboard .content-area .credits strong{
        color: #fff;
      }
      /* Button Related CSS */
      header .billboard .button{
        display: inline-block;
        margin-right: .75em;
        margin-top: 20px;
        padding: 5px 20px;
        font-size: 70%;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        color: #fff;
      }

       .button1 i{
        display: inline-block;
        margin-top: 20px;
        width: 40px;
        height: 40px;
        padding: 10px 0 0 11px;
        border: solid 2px rgba(255,255,255,.4);
        border-radius: 100px;
        font-size: 18px;
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        color: #fff;
        transition: transform 0.5s;
      }
       .button1 i:hover{
        border: solid 2px #fff;
        transform: scale(1.1);
      }
      .close-button{
          cursor: pointer;
          padding-left: 98%;color:gray;background: radial-gradient(ellipse at top right,rgba(0,0,0,.4) 0,rgba(0,0,0,0)70%,rgba(0,0,0,0) 100%);
      }
      
    `
  ]
})

export class ContentComponent implements OnInit, OnChanges {

  @Input() bgImgUrl: any;

  @Input() title: string;

  @Input() description: string;

  @Input() contents: any;

  @Input() videoLink: any;

  @Input() rate: any;

  @Input() max: any;

  @Input() isReadonly: boolean;

  @Input() enableWatch: boolean = false;

  @Input() enableMyList: boolean = false;

  @Input() ageLimit: any;

  @Input() releaseYear: any;

  @Input() seasonNo: number;

  @Input() matchPercentage: any;

  @Output() onWatchClick: EventEmitter<any>= new EventEmitter<any>();

  @Output() onAddListClick: EventEmitter<any>= new EventEmitter<any>();

  size : string;

  overviewData: any;

  smallScreen: boolean;

  isMobileView : boolean;

  constructor() {
    this.smallScreen = false;
    console.log($(window).width());
    if($(window).width() < 500)
      this.size = 'small';
    else
      this.size = 'default';
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.smallScreen = true;
    }else {
      this.smallScreen = false;
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.videoLink && !changes.videoLink.isFirstChange()){
      this.videoLink = changes.videoLink.currentValue;
      console.log(this.videoLink);
    }
  }

  playVideo() {
   this.onWatchClick.emit(this.videoLink);
  }
  addToList() {
    this.overviewData = {
      'title': this.title,
      'description': this.description,
      'Video Link': this.videoLink,
      'rate': this.rate
    };
  this.onAddListClick.emit(this.overviewData);
  }
 /* onResize() {
    if (window.innerWidth < 995) {
      this.size = "small";
      this.smallScreen = true;
    } else {
      this.size = "default";
      this.smallScreen = false;
    }
  }*/

  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }
}
