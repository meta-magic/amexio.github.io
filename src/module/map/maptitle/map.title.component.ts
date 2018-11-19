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
 Component Name : Amexio Map
 Component Selector : <amexio-map-title>
 Component Description :  Map title
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-map-title', template: ` `,
})
export class MapTitleComponent implements OnInit {
/*
Properties
name : title
datatype : string
version : 4.0 onwards
default : none
description : sets title of Map
*/
  @Input() title: string;
/*
Properties
name : position
datatype : string
version : 4.0 onwards
default : none
description : sets position of Map
*/
  @Input() position: string;
/*
Properties
name : color
datatype : string
version : 4.0 onwards
default : none
description : sets color of Map
*/
  @Input() color: string;
/*
Properties
name : font-name
datatype : string
version : 4.0 onwards
default : none
description : sets Font family name
*/
  @Input('font-name') fontname: string;
/*
Properties
name : bold
datatype : boolean
version : 4.0 onwards
default : none
description : sets bold style
*/
  @Input() bold: boolean;
/*
Properties
name : italic
datatype : boolean
version : 4.0 onwards
default : none
description : sets italic style
*/
  @Input() italic: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
