/*****
 * Created by pratik on 18/12/17.

 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 ****/

 /*
 Component Name : Amexio image
 Component Selector : <amexio-image>
 Component Description : Amexio image is an artifact that depicts visual perception.
                        It supports icons (font-awesome) / image
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
description : Specifies the URL of an image, This attribute is useful only for images
*/
  @Input() path: string;

/*
Properties
name : icon-class
datatype :  string
version : 4.0 onwards
default :
description : Material icon class name Material i.e icon-class=material-icons / font-awesome i.e icon-class= fa fa-address-book fa-lg
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
  @Input('c-class') cclass: string = '';

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
description : Overlay-effect can be set fade / box / left / top / bottom / right / title
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
overlay: boolean = false;
overlayTextClass: string;
constructor() {
  }

  onImageClick(event: any) {
    this.onClick.emit(event);
  }

  ngOnInit(): void {
    if (!(this.width || this.height)) {
      this.cclass = this.cclass + 'img-fluid';
    }
    if (this.filter) {
      this.cclass = this.cclass + 'image-' + this.filter;
    }
    if (this.overlayEffect) {
      this.overlay = true;
      if (!this.overlayText) {
        this.overlayText = '';
      }
      if (this.overlayText) {
        this.overlayTextClass = 'overlay-text overlay-' + this.overlayEffect + '-text';
      }
      this.overlayEffect = 'overlay overlay-' + this.overlayEffect;
    }
    if (this.position && !this.imgTitle) {
      this.imgTitle = '';
      }
    if (this.imgTitle) {
      if (this.position) {
        this.position = 'image-title image-' + this.position;
      } else {
        this.position = 'image-title image-bottom-right';
      }
    }
  }

}
