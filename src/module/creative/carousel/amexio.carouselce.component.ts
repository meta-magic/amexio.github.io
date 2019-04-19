/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by kedar on 18/4/2019.
*/
import { HttpClient } from '@angular/common/http';

import {
  Component, ContentChildren, Input, OnDestroy, OnInit, QueryList,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-carousel-ce',
  templateUrl: './amexio.carouselce.component.html',
})
export class AmexioCarouselCEComponent implements OnInit {
  /*
Properties
name : data
datatype : any
version : 5.10 onwards
default : none
description : Local Data binding.
*/
  @Input() data: any[];
  /*
  Properties
  name : http-url
  datatype : string
  version : 5.10 onwards
  default : none
  description : REST url for fetching data.
  */
  @Input('http-url') httpurl: string;

  /*
  Properties
  name : data-reader
  datatype : string
  version : 5.10 onwards
  default : none
  description : Key in JSON Datasource for records.
  */
  @Input('data-reader') datareader: string;

  /*
  Properties
  name : http-method
  datatype : string
  version : 5.10 onwards
  default : none
  description : Type of HTTP call, POST,GET etc.
  */
  @Input('http-method') httpmethod: string;

  imageData: any;
  currentImageIndex = 0;
  centerImagePath: string;
  nextImagePath: string;
  preImagePath: string;
  responseData: any;

  previousTitle: any;
  centerTitle: any;
  nextTitle: any;

  constructor(public http: HttpClient, private dataService: CommonDataService) {
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.imageData = responsedata;
    this.centerImagePath = this.imageData[0].imagepath;
    this.centerTitle = this.imageData[0].title;
    this.previousTitle = this.imageData[this.imageData.length - 1].title;
    this.nextTitle = this.imageData[1].title;
  }

  onClickLeft() {
    if (this.currentImageIndex === 0) {
      this.centerImagePath = this.imageData[this.imageData.length - 1].imagepath;
      this.centerTitle = this.imageData[this.imageData.length - 1].title;
      this.currentImageIndex = this.imageData.length - 1;
      this.previousTitle = this.imageData[this.currentImageIndex - 1].title;
      this.nextTitle = this.imageData[0].title;
    } else if (this.imageData && (this.imageData.length !== this.currentImageIndex) && this.currentImageIndex !== 0) {
      this.centerImagePath = this.imageData[this.currentImageIndex - 1].imagepath;
      this.centerTitle = this.imageData[this.currentImageIndex - 1].title;
      this.currentImageIndex--;
      if (this.currentImageIndex === 0) {
        this.previousTitle = this.imageData[this.imageData.length - 1].title;
        this.nextTitle = this.imageData[1].title;

      } else {
        this.previousTitle = this.imageData[this.currentImageIndex - 1].title;
        this.nextTitle = this.imageData[this.currentImageIndex + 1].title;
      }
    }
    this.onPreBtnHover();
  }
  onPreBtnHover() {
    if (this.currentImageIndex === 0) {
      this.preImagePath = this.imageData[this.imageData.length - 1].imagepath;
    }
    if (this.imageData && this.imageData.length !== this.currentImageIndex && this.currentImageIndex !== 0) {
      this.preImagePath = this.imageData[this.currentImageIndex - 1].imagepath;
    }
  }

  onNextBtnHover() {
    if (this.imageData && this.imageData.length - 1 !== this.currentImageIndex) {
      this.nextImagePath = this.imageData[this.currentImageIndex + 1].imagepath;
    }
  }
  onClickRight() {
    if ((this.currentImageIndex < this.imageData.length) && (this.imageData.length - 1 !== this.currentImageIndex)) {
      this.centerImagePath = this.imageData[this.currentImageIndex + 1].imagepath;
      this.centerTitle = this.imageData[this.currentImageIndex + 1].title;
      this.currentImageIndex++;
      if (this.currentImageIndex < this.imageData.length - 1) {
        this.nextTitle = this.imageData[this.currentImageIndex + 1].title;
        this.previousTitle = this.imageData[this.currentImageIndex - 1].title;
      } else if (this.currentImageIndex === this.imageData.length - 1) {
        this.nextTitle = this.imageData[0].title;
        this.previousTitle = this.imageData[this.currentImageIndex - 1].title;
      }
    } else if (this.currentImageIndex === this.imageData.length - 1) {
      this.currentImageIndex = 0;
      this.nextTitle = this.imageData[this.currentImageIndex + 1].title;
      this.centerImagePath = this.imageData[this.currentImageIndex].imagepath;
      this.centerTitle = this.imageData[this.currentImageIndex].title;
      this.previousTitle = this.imageData[this.imageData.length - 1].title;
    }
    this.onNextBtnHover();
  }
}
