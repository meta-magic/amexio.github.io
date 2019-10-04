import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'amexio-rich-textarea',
  templateUrl: './rich-editable-textarea.component.html',
})
export class AmexioRichEditableTextareaComponent implements OnInit, AfterViewInit {

  headingData: any;
  editableTextArray: any;
  fontFamilyData: any;
  displayDiv = true;

 @Input('enable-source-code') enableSourceCode = false;
  printContents: any;
  @Input('rich-height') richHeight = 400;
  @Input('toolbar-position') toolbarPosition = 'top';
  areaWidth = 100;
  areaHeight = 100;

  @Output() onCodeClick: any = new EventEmitter<any>();

  textAreaHeight: number;
  constructor(private http: HttpClient) {

    this.http.get('https://api.myjson.com/bins/152byf')
      .subscribe((data: any) => {
        this.editableTextArray = data;
      });
    this.headingData =
      [
        {
          headerName: 'H1',
        },
        {
          headerName: 'H2',
        },
        {
          headerName: 'H3',
        },
        {
          headerName: 'H4',
        },
        {
          headerName: 'H5',
        },
        {
          headerName: 'H6',
        },
      ];
    this.fontFamilyData =
      [
        {
          familyType: 'Arial',
        },
        {
          familyType: 'Comic Sans MS',
        },
        {
          familyType: 'Courier New',
        },
        {
          familyType: 'Georgia',
        },
        {
          familyType: 'serif',
        },
        {
          familyType: 'Times Roman',
        },
        {
          familyType: 'Lucida Console',
        },
      ];
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // Toolbar position.
    if (this.toolbarPosition === 'top') {
      this.displayDiv = false;
    } else if (this.toolbarPosition === 'bottom') {
      this.displayDiv = true;
    }
    // Toolbar hight will be calculated.
    setTimeout(() => {
      if (this.areaHeight) {
        this.textAreaHeight = 80;
      }
    }, 500);
  }

  // onButton Icon click the data get selected.
  onIconClick(data: any) {
    document.execCommand(data, false, null);
    if (data === 'CreateLink') {
      const szURL = prompt('Enter a URL:', 'http://');
      document.execCommand('CreateLink', false, szURL);
      document.execCommand('ForeColor', false, 'blue');
      document.designMode = 'off';
    }
    if (data === 'unlink') {
      document.execCommand('unlink', false, '');
      document.execCommand('ForeColor', false, '#000');
      document.designMode = 'off';
    }
  }

  onHtmlCodeClick() {
    this.printContents = document.getElementById('rich-editor').innerHTML;
    this.onCodeClick.emit(this.printContents);
  }

  // On color picker Click.
  onColorBtnClick() {
    document.getElementById('favColor').focus();
    document.getElementById('favColor').click();
  }

  // On BG color picker Click.
  onBgColorClick() {
    document.getElementById('backColor').focus();
    document.getElementById('backColor').click();
  }

  // Operation on the  color picker selection.
  foreColorClick() {
    const foreColor = (document.getElementById('favColor') as HTMLInputElement).value;
    document.execCommand('ForeColor', false, foreColor);
  }

  // Operation on the BG color picker selection.
  backgroundColorClick() {
    const backColor = (document.getElementById('backColor') as HTMLInputElement).value;
    document.execCommand('BackColor', false, backColor);
  }

  // On Text Font Family selection method.
  fontFamilySelectionClick() {
    const selectFontFamily = (document.getElementById('fontFamilyId') as HTMLInputElement).value;
    document.execCommand('fontName', false, selectFontFamily);
  }

  // On Heading (H1-H6) selection method.
  selectHeaderClick() {
    const selectHeader = (document.getElementById('selectId') as HTMLInputElement).value;
    document.execCommand('formatBlock', false, selectHeader);
  }
}
