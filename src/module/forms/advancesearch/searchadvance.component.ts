import { Component,Input,EventEmitter , OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-amexio-search-advance',
  template:`
  
  <form class="advancesearchform" *ngIf="advanceSearchFlag">
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
  
  /*
     Properties
     name : title
     datatype : string
     version : 4.2 onwards
     default : none
     description : sets advance search button label and search form title.
  */
  @Input() title: string="Advance Search";
 // @Output() closeEvent = new EventEmitter<boolean>();
  advanceSearchFlag:boolean=false;
  constructor() { }

  closeSearchForm() {
    this.advanceSearchFlag = false;
      
  }

  // sendFlag(){
  //   this.closeEvent.emit(this.advanceSearchFlag);
  // }
  ngOnInit() {
     
  }

}
