/**
 * Created by pratik on 27/12/17.
 */

/*
Component Name : Amexio progress bar
Component Selector : <amexio-progress-bar>
Component Description : Progress Bar Component Provides up-to-date feedback
on the progress of a workflow or action with simple yet flexible progress bars
and easy to configure.
*/
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'amexio-progress-bar',
  templateUrl: './progress.component.html',
})
export class AmexioProgressBarComponent implements OnInit {
  /*
  Properties
  name : show
  datatype : boolean
  version : 4.0 onwards
  default : true
  description :  Shows / Hides the progress bar.
  */
  @Input('show') showProgress = true;
  /*
  Properties
  name : infinite
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Enable/Disable Infinite Mode.
  */
  @Input() infinite: boolean;
  /*
  Properties
  name : type
  datatype : string
  version : 4.0 onwards
  default :
  description : Type of progress bar can be default,
  theme-color,theme-backgroundcolor, green, red, yellow( primary, secondary,
    success , danger & warning
  */
  @Input() type: string;
  /*
  Properties
  name : amexio-color
  datatype : string
  version : 4.1 onwards
  default :
  description : Use different inbuilt amexio colors available
  (e.g amexio-black, amexio-red etc)
  */
  @Input('amexio-color') amexiocolor: string;
  /*
  Properties
  name : current-value
  datatype : string
  version : 4.0 onwards
  default :
  description : Current Position of progress.
  */
  @Input('current-value') currentvalue: string;
  /*
  Properties
  name : label
  datatype : any
  version : 4.0 onwards
  default :
  description : Custom labels on bar.
  */
  @Input() label: any;
  /*
  Properties
  name : height
  datatype : any
  version : 4.0 onwards
  default :
  description : Height of bar.
  */
  @Input() height: any;
  /*
  Properties
  name : stripped
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Bar styled stripped.
  */
  @Input() stripped: boolean;
  /*
  not in use
   */
  @Input() multi: boolean;

  @Input('tooltip') tooltip: string;

  progressclass = '';

  private strippedCss = 'stripped ';

  constructor() {
  }
  ngOnInit() {
    if (this.height) {
      this.height = this.height + 'px';
    } else {
      this.height = '20px';
    }
    if (this.stripped) {
      this.progressclass = this.progressclass + this.strippedCss;
    }
    if (this.type && !this.amexiocolor) {
      this.progressclass = this.progressclass + this.type.toLocaleLowerCase();
    } else if (this.amexiocolor && !this.type) {
      this.progressclass = this.progressclass + this.amexiocolor.toLocaleLowerCase();
    }
  }
}
