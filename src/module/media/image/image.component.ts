/**
 * Created by pratik on 18/12/17.
 */
/*
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
 */

 /*
 Component Name : Amexio image
 Component Selector : <amexio-image>
 Component Description : Amexio image is an artifact that depicts visual perception.Amexio support icons (material / font-awesome)/image
*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'amexio-image', templateUrl: './image.component.html'
})

export class AmexioImageComponent implements OnInit {

    /*
Properties 
name : tooltip
datatype :  string
version : 4.0 onwards
default : none
description : TooltipMessage on image / icon.
*/ 
  @Input() tooltip: string;

   /*
Properties 
name : title
datatype :  string
version : 4.0 onwards
default : none
description : Title of image.
*/ 
  @Input() title: string;

   /*
Properties 
name : path
datatype : string
version : 4.0 onwards
default : none
description : Specifies the URL of an image.This attribute is useful only for images.
*/ 
  @Input() path: string;

   /*
Properties 
name : icon-class
datatype :  string
version : 4.0 onwards
default : none
description : Material icon class name.Material Example:icon-class='material-icons' mda='cloud' Fontawesome Example:icon-class='fa fa-address-book fa-lg'

*/ 
  @Input('icon-class') iconclass: string;

   /*
Properties 
name : c-class
datatype :  string
version : 4.0 onwards
default : none
description : Used for custom styled classes
*/ 
  @Input('c-class') cclass: string;

   /*
Properties 
name : mda
datatype :  string
version : 4.0 onwards
default : none
description : This attribute is useful for only material icons.Material Example:mda='cloud'

*/ 
  @Input() mda: string;

   /*
Properties 
name : width
datatype :  string
version : 4.0 onwards
default : none
description : Width of image.
*/ 
  @Input() width:string;

   /*
Properties 
name : height
datatype :  string
version : 4.0 onwards
default : none
description : Height of image.
*/ 
  @Input() height:string;

   /*
Events
name : onClick
datatype :  none
version : none
default : none
description : Get image / icon click event.
*/ 
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onImageClick(event: any) {
    this.onClick.emit(event);
  }

  ngOnInit(): void {
    if(!(this.width || this.height)){
      this.cclass=this.cclass+" img-fluid";
    }
  }

}
