import { GridConstants } from './GridConstants';

import { AmexioGridModel } from '../module/layout/gridlayout/gridmodel.component';

export class GridConfig {
     amexiogridmodel: AmexioGridModel;
    devicevar: any;
    count: number;

    constructor(layoutName: string, layoutType: string) {
        this.amexiogridmodel = new AmexioGridModel();
        this.amexiogridmodel.layoutType = layoutType;
        this.amexiogridmodel.name = layoutName;
        return this;
    }

    addlayout(layout: any[]): any {
        this.count = layout.length;
        if (this.amexiogridmodel.layoutType === '') {
            this.amexiogridmodel.layoutType = GridConstants.Desktop ;
        }
        this.amexiogridmodel[this.amexiogridmodel.layoutType].push(layout);
        return this;
    }

    getLayout() {
     return this.amexiogridmodel;
    }
}
