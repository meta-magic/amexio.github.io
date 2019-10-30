
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'editable-text',
  templateUrl: './editable-text.component.html',
})
export class EditableTextComponent implements AfterViewInit {

  headingData: any;
  editableTextArray: any;
  fontFamilyData: any;
  displayDiv = true;
  printContents: any;
  areaWidth = 100;
  areaHeight = 100;
  selectHeader: any;
  @Input('ediatable-height') richHeight = 400;
  @Input('ediatable-enable-source-code') enableSourceCode = false;
  @Input('ediatable-toolbar-position') toolbarPosition = 'top';

  @Output() onSourceCodeClick: any = new EventEmitter<any>();

  @ViewChild('richDiv') richDiv: any;
  @ViewChild('headerId') headerId: any;
  @ViewChild('fontFamily') fontFamily: any;
  @ViewChild('richEditableId') richEditableId: any;
  @ViewChild('favColorId') favColorId: any;
  @ViewChild('backColorId') backColorId: any;

  textAreaHeight: number;
  constructor() {
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
          familyType: 'Times New Roman',
        },
        {
          familyType: 'Lucida Console',
        },
      ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.toolbarPosition === 'top') {
        this.displayDiv = false;
      } else if (this.toolbarPosition === 'bottom') {
        this.displayDiv = true;
      }
      if (this.areaHeight) {
        this.textAreaHeight = 80;
      }
    }, 200);
  }

  // onButton Icon click the data get selected.
  onIconClick(data: any) {
    if (data === 'InsertImage') {
      const image = prompt('Enter path of image:', 'http://');
      document.execCommand('InsertImage', false, image);
      document.designMode = 'off';
    } else if (data === 'CreateLink') {
      const szURL = prompt('Enter a URL:', 'http://');
      document.execCommand('CreateLink', false, szURL);
      document.execCommand('ForeColor', false, 'blue');
      document.designMode = 'off';
    } else if (data === 'unlink') {
      document.execCommand('unlink', false, '');
      document.execCommand('ForeColor', false, '#000');
      document.designMode = 'off';
    } else if (data === 'removeFormat') {
      document.execCommand('formatBlock', false, 'div');
      document.execCommand('removeformat', false, '');
      document.designMode = 'off';
    } else {
      document.execCommand(data, false, null);
    }
  }

  onHtmlCodeClick() {
    this.printContents = this.richEditableId.nativeElement.innerHTML;
    this.onSourceCodeClick.emit(this.printContents);
    document.designMode = 'off';
  }

  // On color picker Click.
  onColorBtnClick() {
    this.favColorId.nativeElement.focus();
    this.favColorId.nativeElement.click();
  }

  // On BG color picker Click.
  onBgColorClick() {
    this.backColorId.nativeElement.focus();
    this.backColorId.nativeElement.click();
  }

  // Operation on the  color picker selection.
  foreColorClick() {
    const foreColor = this.favColorId.nativeElement.value;
    document.execCommand('ForeColor', false, foreColor);
    document.designMode = 'off';
  }

  // Operation on the BG color picker selection.
  backgroundColorClick() {
    const backColor = this.backColorId.nativeElement.value;
    document.execCommand('BackColor', false, backColor);
    document.designMode = 'off';

  }

  // On Text Font Family selection method.
  fontFamilySelectionClick() {
    const selectFontFamily = this.fontFamily.nativeElement.value;
    document.execCommand('fontName', false, selectFontFamily);
    document.designMode = 'off';

  }

  // On Heading (H1-H6) selection method.
  selectHeaderClick() {
    this.selectHeader = this.headerId.nativeElement.value;
    document.execCommand('formatBlock', false, this.selectHeader);
    document.designMode = 'off';
  }
}
