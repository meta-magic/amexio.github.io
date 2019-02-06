import { Component, Input, OnInit } from '@angular/core';
import { DisplayFieldService } from '../../services/data/display.field.service';

@Component({
  selector: 'amexio-display-field',
  templateUrl: './display-field.component.html',
})
export class DisplayFieldComponent implements OnInit {

  @Input() data: any;

  @Input('data-index') dataIndex: any;

  rowData: string;

  constructor(private displayFieldService: DisplayFieldService) { }

  ngOnInit() {
    this.findDisplayValues();
  }

  findDisplayValues() {
    this.rowData = this.displayFieldService.findValue(this.dataIndex, this.data);
  }

}
