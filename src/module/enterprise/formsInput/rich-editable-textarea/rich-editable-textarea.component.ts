import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-rich-textarea',
  templateUrl: './rich-editable-textarea.component.html',
})
export class AmexioRichEditableTextareaComponent implements OnInit, AfterViewInit {

  @Input('field-name') fieldName: string;
  @Input('width') areaWidth = 600;
  @Input('height') areaHeight = 200;

  textAreaHeight: number;

  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.areaHeight) {
      this.textAreaHeight = this.areaHeight - 40;

    }
  }

  onLinkClick() {
    const szURL = prompt('Enter a URL:', 'http://');
    if ((szURL != null) && (szURL !== '')) {
      document.execCommand('CreateLink', false, szURL);
      document.execCommand('ForeColor', false, 'blue');
      document.designMode = 'off';
    }
  }
  execCommandWithArg() {

  }
  onResetLinkClick() {
    document.execCommand('unlink', false, '');
    document.execCommand('ForeColor', false, '#000');
    document.designMode = 'off';

  }
}
