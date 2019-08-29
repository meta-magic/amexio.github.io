import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-task-bar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css'],
})
export class AmexioTaskbarComponent implements OnInit {

  @Input('align') align = 'left';

  constructor() { }

  ngOnInit() {
  }

}
