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
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import {Input, Component, ContentChild, TemplateRef} from '@angular/core';

@Component({
  selector: 'amexio-data-table-column', template: ``
})
export class AmexioGridColumnComponent {

  @Input() text: string;

  @Input('data-index') dataindex: string;

  @Input() hidden: boolean = false;

  @Input('data-type') datatype: string;

  @Input('summary-type') summarytype: string;

  @Input('summary-caption') summarycaption: string;

  @Input() width: string;

  isColumnSort: boolean;

  @ContentChild('amexioHeaderTmpl') headerTemplate: TemplateRef<any>;

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;
}
