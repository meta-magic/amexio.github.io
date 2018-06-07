import { Component,Input,EventEmitter , OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-searchbox-options',
  template:`
  
  <form class="advancesearchform" *ngIf="advanceSearchFlag"  [style.width]="formwidth+'px'">
    <label class="search-form-label">
        {{title}}
    </label>
    <span class="fa fa-window-close fa-1x close-icon"  (click)="closeSearchForm()"></span>
    <hr class="hrclass">
             <ng-content></ng-content>
            
</form>
  
  ` 
})
export class AmexioSearchAdvanceComponent implements OnInit {
  
  @Input() title: string="Advance Search";
  @Input() formwidth: number;
   advanceSearchFlag:boolean=false;
  constructor() { }

  closeSearchForm() {
    this.advanceSearchFlag = false;
      
  } 
  ngOnInit() {
     
  }
}
