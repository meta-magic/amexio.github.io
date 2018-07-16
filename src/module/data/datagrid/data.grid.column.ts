/**
 * Created by pratik on 10/1/18.
 */
/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas, Rashmi Thakkar
 *
 */

/*
Component Name : Amexio data grid
Component Selector : <amexio-data-table-column>
Component Description : Data grid component to render large
amount of data-set with various options like sorting in ascending or descending order,
client-side pagination, column hide/unhide, single/multi selection, user define template
for rendering for column header and column data, displaying summation of numeric column.
*/

import {Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'amexio-data-table-column', template: ``,
})
export class AmexioGridColumnComponent {

  /*
Properties
name : text
datatype : string
version : 4.0 onwards
default : none
description : Set column label.
*/
  @Input() text: string;

  /*
   Properties
   name : sort
   datatype : boolean
   version : 4.2.6 onwards
   default : true
   description : Set column Sortable.
   */
  @Input() sort = true;

  /*
Properties
name : data-index
datatype : string
version : 4.0 onwards
default : none
description : JSON key from datasource.
*/
  @Input('data-index') dataindex: string;

  /*
Properties
name : hidden
datatype : boolean
version : 4.0 onwards
default : none
description : Hide column
*/
  @Input() hidden = false;

  /*
Properties
name : data-type
datatype : string
version : 4.0 onwards
default : none
description : Data type of column (string/number).
*/
  @Input('data-type') datatype: string;

  /*
Properties
name : context-menu
datatype : any[]
version : 5.0.1 onwards
default :
description : Context Menu provides the list of menus on right click of column.
*/
  @Input('context-menu') contextmenu: any[];

  /*
Properties
name : summary-type
datatype : string
version : 4.0 onwards
default : none
description : Type of math opertaion to be applied on the column
*/
  @Input('summary-type') summarytype: string;

  /*
Properties
name : summary-caption
datatype : string
version : 4.0 onwards
default : none
description : it is the title placed next to the summarized value
*/
  @Input('summary-caption') summarycaption: string;

  /*
Properties
name : width
datatype : string
version : 4.0 onwards
default : none
description : Custom width for each column.Width must be in % but no need to mention %.
*/
  @Input() width: string;
  isColumnSort: boolean;

  @ContentChild('amexioHeaderTmpl') headerTemplate: TemplateRef<any>;

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;
}
