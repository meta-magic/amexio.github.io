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
 Component Name : Amexio dashboard
 Component Selector : <amexio-dashboard-title>
 Component Description : create dasshboard component
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-dashboard-title', template: ` `,
})

export class DashBoardTitleComponent implements OnInit {

/*
Properties
name : title
datatype :  string
version : 4.0 onwards
default : none
description : set title
*/
@Input() title: string;

/*
Properties
name : position
datatype :  string
version : 4.0 onwards
default : none
description : sets the position
*/
@Input() position: string;

/*
Properties
name : color
datatype :  string
version : 4.0 onwards
default : none
description : sets the color
*/
@Input() color: string;

/*
Properties
name : font-name
datatype :  string
version : 4.0 onwards
default : none
description : sets the font family name
*/
@Input('font-name') fontname: string;

/*
Properties
name : font-size
datatype :  string
version : 4.0 onwards
default : none
description : sets the font size
*/
@Input('font-size') fontsize: number;

/*
Properties
name : bold
datatype :  string
version : 4.0 onwards
default : none
description : sets the font style to bold
*/
@Input() bold: boolean;

/*
Properties
name : italic
datatype :  string
version : 4.0 onwards
default : none
description : sets the font style to italic
*/
@Input() italic: boolean;

constructor() {}

ngOnInit() {}
}
