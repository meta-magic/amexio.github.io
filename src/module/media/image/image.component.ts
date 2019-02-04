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
* Created by pratik on 18/12/17.
*/

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-image', templateUrl: './image.component.html',
})

export class AmexioImageComponent implements OnInit {

    /*
Properties
name : tooltip
datatype :  string
version : 4.0 onwards
default :
description : TooltipMessage on image /icon.
*/
  @Input() tooltip: string;

   /*
Properties
name : title
datatype :  string
version : 4.0 onwards
default :
description : Title of image
*/
  @Input() title: string;

   /*
Properties
name : path
datatype : string
version : 4.0 onwards
default :
description : Specifies the URL of an image, This attribute is useful only
for images
*/
  @Input() path: string;

   /*
Properties
name : icon-class
datatype :  string
version : 4.0 onwards
default :
description : Material icon class name Material i.e icon-class=material-icons
/ font-awesome i.e icon-class= fa fa-address-book fa-lg
*/
  @Input('icon-class') iconclass: string;

   /*
Properties
name : c-class
datatype :  string
version : 4.0 onwards
default :
description : Used for custom style classes
*/
  @Input('c-class') cclass = '';

   /*
Properties
name : mda
datatype :  string
version : 4.0 onwards
default :
description : This attribute is useful for only material icons . Material Example mda='cloud'

*/
  @Input() mda: string;

   /*
Properties
name : width
datatype :  string
version : 4.0 onwards
default :
description : Width of image.
*/
  @Input() width: string;

   /*
Properties
name : height
datatype :  string
version : 4.0 onwards
default :
description : Height of image.
*/
  @Input() height: string;

   /*
Events
name : onClick
datatype :  none
version : none
default : none
description : Get image / icon click event.
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

   /*
Properties
name : filter
datatype :  string
version : 4.1.9 onwards
default :
description : Filter type can be saturate / hue / invert / grayscale / brightness / blur / sepia / shadow / opacity

*/
  @Input('filter') filter: string;

   /*
Properties
name : overlay-effect
datatype :  string
version : 4.1.9 onwards
default :
description : Overlay-effect can be set fade / box / left / top / bottom /
right / title

*/
  @Input('overlay-effect') overlayEffect: string;

   /*
Properties
name : overlay-text
datatype :  string
version : 4.1.9 onwards
default :
description : Overlay-text can be set
*/
  @Input('overlay-text') overlayText: string;

   /*
Properties
name : image-title
datatype :  string
version : 4.1.9 onwards
default :
description : Image-title can be set
*/
  @Input('image-title') imgTitle: string;

   /*
Properties
name : title-position
datatype :  string
version : 4.1.9 onwards
default : right
description : Overlay-text can be set top-right / bottom-right / bottom-left / top-left / centered
*/
  @Input('title-position') position: string;

   /*
Properties
name : para
datatype :  string
version : 4.1.9 onwards
default :
description : Description to display on hover
*/
  @Input('para') titlePara: string;

   /*
Properties
name : position-top
datatype :  string
version : 4.1.9 onwards
default :
description :sets top attribute  to image
*/
  @Input('position-top') top: string;

     /*
Properties
name : position-bottom
datatype :  string
version : 4.1.9 onwards
default :
description :sets bottom attribute  to image
*/
  @Input('position-bottom') bottom: string;

       /*
Properties
name : position-left
datatype :  string
version : 4.1.9 onwards
default :
description :sets left attribute  to image
*/
  @Input('position-left') left: string;

         /*
Properties
name : position-right
datatype :  string
version : 4.1.9 onwards
default :
description :sets right attribute  to image
*/
  @Input('position-right') right: string;

           /*
Properties
name :absolute
datatype :  string
version : 4.1.9 onwards
default :
description :sets absolute attribute  to image
*/
  @Input('absolute') absolute = false;

           /*
Properties
name :relative
datatype :  string
version : 4.1.9 onwards
default :
description :sets relative attribute  to image
*/

@Input('relative') relative = false;

  overlay = false;
  absoluteposition = false;
  overlayTextClass: string;
  imagepositionclass: string;

  private imageCss = ' image-';

  private overlayTextCss = 'overlay-text overlay-';

  private textCss = '-text';

  private imgFluidCss = ' img-fluid';

  private overlayOverlayCss = 'overlay overlay-';

  private imageTitleCss   = 'image-title image-';

  private imageTitleBottomCss    = 'image-title image-bottom-right';

  constructor() {
  }

  onImageClick(event: any) {
    this.onClick.emit(event);
  }

  ngOnInit(): void {
    if (!(this.width || this.height)) {
      this.cclass = this.cclass + this.imgFluidCss;
    }
    if (this.filter) {
      this.cclass = this.cclass + this.imageCss + this.filter;
    }
    if (this.overlayEffect) {
      this.overlay = true;
      if (!this.overlayText) {
        this.overlayText = '';
      }
      if (this.overlayText) {
        this.overlayTextClass = this.overlayTextCss + this.overlayEffect + this.textCss;
      }
      this.overlayEffect = this.overlayOverlayCss + this.overlayEffect;
    }
    if (this.position && !this.imgTitle) {
      this.imgTitle = '';
      }
    if (this.imgTitle) {
      if (this.position) {
        this.position = this.imageTitleCss + this.position;
      } else {
        this.position = this.imageTitleBottomCss;
      }
    }
  }
  addimageCSSClass(): any {
    if (this.top || this.bottom || this.right || this.left) {
      this.absoluteposition = true;
    }
    this.imagepositionclass = '';
    if (this.relative && !this.absolute) {
      this.imagepositionclass = ' img-relative ';
      this.top = '';
      this.left = '';
      this.right = '';
      this.bottom = '';
    } else if (this.absolute) {
      this.imagepositionclass = 'img-absolute ';
    }

    return this.imagepositionclass;
  }
}
