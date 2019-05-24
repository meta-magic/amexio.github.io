
/**
 * Created by dattaram on 22/5/19.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'more-content',
  templateUrl: 'morecontent.component.html',
})

export class MoreContentComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() isMobileView = false;
  showMoreContent = false;
  constructor() {
  }

  ngOnInit() {
  }

  moreToggle() {
    this.showMoreContent = !this.showMoreContent;
  }

}
