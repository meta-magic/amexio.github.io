import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-task-bar',
  templateUrl: './taskbar.component.html',
})
export class AmexioTaskbarComponent implements OnInit {

  @Input('align') align = 'left';

  constructor() { }

  ngOnInit() {
  }

}
