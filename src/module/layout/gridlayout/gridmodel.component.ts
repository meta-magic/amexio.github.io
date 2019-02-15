export class AmexioGridModel {
  name: string;
  desktop: any[];
  mobile: any[];
  tab: any[];
  layoutType: string;
  count: number;
  constructor() {
    this.name = '';
    this.desktop = [];
    this.mobile = [];
    this.tab = [];
    this.layoutType = '';
    this.count = 0;
  }
}
