
export class PropertyGridModel {
  fieldName: string;
  fieldIcon?: string;
  onlyIcon?: boolean;
  fieldValue: string;
  link: string;
  data: any;

  constructor(_fieldName: string, _fieldValue: string, _fieldIcon: string, _onlyIcon: boolean, _link?: string, _data?: any) {
    this.fieldName = _fieldName;
    this.fieldValue = _fieldValue;
    this.fieldIcon = _fieldIcon;
    this.onlyIcon = _onlyIcon;
    this.link = _link;
    this.data = _data;
  }
}
