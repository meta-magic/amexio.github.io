import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-rich-textarea',
  templateUrl: './rich-editable-textarea.component.html',
})
export class AmexioRichEditableTextareaComponent implements OnInit, AfterViewInit {

  headingData: any;
  editableTextArray: any;
  fontFamilyData: any;

  printContents: any;
  @Input('field-name') fieldName: string;
  @Input('display-text-edit') displayDiv = true;
  @Input('width') areaWidth = 100;
  @Input('height') areaHeight = 100;

  @Output() onCodeClick: any = new EventEmitter<any>();

  textAreaHeight: number;
  constructor() {
    this.editableTextArray = [
      {
        title: 'bold',
        icon: 'fa fa-bold',
        event: 'bold',
      },
      {
        title: 'italic',
        icon: 'fa fa-italic',
        event: 'italic',
      },
      {
        title: 'strikethrough',
        icon: 'fa fa-strikethrough',
        event: 'strikethrough',
      },
      {
        title: 'underline',
        icon: 'fa fa-underline',
        event: 'underline',
      },
      {
        title: 'insert Unordered List',
        icon: 'fa fa-list-ul',
        event: 'insertUnorderedList',
      },
      {
        title: 'insert Ordered List',
        icon: 'fa fa-list-ol',
        event: 'insertOrderedList',
      },
      {
        title: 'Create Link',
        icon: 'fa fa-link',
        event: 'CreateLink',
      },
      {
        title: 'unlink',
        icon: 'fa fa-unlink',
        event: 'unlink',
      },
      {
        title: 'justify Left',
        icon: 'fa fa-align-left',
        event: 'justifyLeft',
      },
      {
        title: 'justify Center',
        icon: 'fa fa-align-center',
        event: 'justifyCenter',
      },
      {
        title: 'justify Right',
        icon: 'fa fa-align-right',
        event: 'justifyRight',
      },
      {
        title: 'justify Full',
        icon: 'fa fa-align-justify',
        event: 'justifyFull',
      },
      {
        title: 'cut',
        icon: 'fa fa-cut',
        event: 'cut',
      },
      {
        title: 'copy',
        icon: 'fa fa-copy',
        event: 'copy',
      },
      {
        title: 'indent',
        icon: 'fa fa-indent',
        event: 'indent',
      },
      {
        title: 'outdent',
        icon: 'fa fa-dedent',
        event: 'outdent',
      },
      {
        title: 'subscript',
        icon: 'fa fa-subscript',
        event: 'subscript',
      },
      {
        title: 'super script ',
        icon: 'fa fa-superscript',
        event: 'superscript',
      },
      {
        title: 'undo',
        icon: 'fa fa-undo',
        event: 'undo',
      },
      {
        title: 'redo',
        icon: 'fa fa-repeat',
        event: 'redo',
      },
      {
        title: 'delete',
        icon: 'fa fa-trash',
        event: 'delete',
      },
      {
        title: 'remove Format',
        icon: 'fa fa-remove',
        event: 'removeFormat',
      },
    ];
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
