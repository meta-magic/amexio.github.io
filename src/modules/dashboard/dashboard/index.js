import { Component, ContentChildren, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */
var DashBoardTitle = (function () {
    function DashBoardTitle() {
    }
    /**
     * @return {?}
     */
    DashBoardTitle.prototype.ngOnInit = function () {
    };
    return DashBoardTitle;
}());
DashBoardTitle.decorators = [
    { type: Component, args: [{
                selector: 'dashboard-title',
                template: " "
            },] },
];
/**
 * @nocollapse
 */
DashBoardTitle.ctorParameters = function () { return []; };
DashBoardTitle.propDecorators = {
    'title': [{ type: Input },],
    'titlePosition': [{ type: Input },],
    'titleColor': [{ type: Input },],
    'titleFontName': [{ type: Input },],
    'titleFontSize': [{ type: Input },],
    'isTitleBold': [{ type: Input },],
    'isTitleItalic': [{ type: Input },],
};

/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Sagar Jadhav
 *
 */
var GaugeChartComponent = (function () {
    function GaugeChartComponent() {
        this.id = 'amexio-chart-gauge' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    GaugeChartComponent.prototype.drawChart = function () {
        this.gaugeData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            width: this.width,
            height: this.height,
            redFrom: this.redColorFrom,
            redTo: this.redColorTo,
            yellowFrom: this.yellowColorFrom,
            yellowTo: this.yellowColorTo,
            minorTicks: this.minorTicks
        };
        this.chart = new google.visualization.Gauge(document.getElementById(this.id));
        this.chart.draw(this.gaugeData, this.options);
    };
    /**
     * @return {?}
     */
    GaugeChartComponent.prototype.ngAfterContentInit = function () {
        this.chartTitleArray = this.chartTitleComp.toArray();
        //take first component
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
    };
    /**
     * @return {?}
     */
    GaugeChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['gauge'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return GaugeChartComponent;
}());
GaugeChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-chart-gauge',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\">\n      </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
GaugeChartComponent.ctorParameters = function () { return []; };
GaugeChartComponent.propDecorators = {
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'data': [{ type: Input },],
    'redColorFrom': [{ type: Input },],
    'redColorTo': [{ type: Input },],
    'yellowColorFrom': [{ type: Input },],
    'yellowColorTo': [{ type: Input },],
    'minorTicks': [{ type: Input },],
    'chartTitleComp': [{ type: ContentChildren, args: [DashBoardTitle,] },],
};

/**
 * Created by ketangote on 7/25/17.
 */
var DataPointCenterComponent = (function () {
    function DataPointCenterComponent() {
    }
    /**
     * @return {?}
     */
    DataPointCenterComponent.prototype.ngOnInit = function () {
    };
    return DataPointCenterComponent;
}());
DataPointCenterComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-center',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointCenterComponent.ctorParameters = function () { return []; };
DataPointCenterComponent.propDecorators = {
    'contentalign': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
};

/**
 * Created by ketangote on 8/16/17.
 */
var DataPointsComponent = (function () {
    function DataPointsComponent() {
        this.colspan = 1;
    }
    /**
     * @return {?}
     */
    DataPointsComponent.prototype.ngOnInit = function () {
        if (this.west)
            this.colspan++;
        if (this.east)
            this.colspan++;
    };
    return DataPointsComponent;
}());
DataPointsComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-datapoints',
                template: "\n    <table width=\"100%\"  [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\">\n      <tr *ngIf=\"north\">\n        <td [attr.colspan]=\"colspan\">\n          <ng-content select=\"amexio-north\"></ng-content>\n        </td>\n      </tr>\n      <tr>\n        <td *ngIf=\"west\">\n          <ng-content select=\"amexio-west\"></ng-content>\n        </td>\n        <td *ngIf=\"center\">\n          <ng-content select=\"amexio-center\"></ng-content>\n        </td>\n        <td *ngIf=\"east\">\n          <ng-content select=\"amexio-east\"></ng-content>\n        </td>\n      </tr>\n      <tr  *ngIf=\"south\">\n        <td [attr.colspan]=\"colspan\">\n          <ng-content select=\"amexio-south\"></ng-content>\n        </td>\n      </tr>\n    </table>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointsComponent.ctorParameters = function () { return []; };
DataPointsComponent.propDecorators = {
    'north': [{ type: Input },],
    'south': [{ type: Input },],
    'west': [{ type: Input },],
    'center': [{ type: Input },],
    'east': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
};

/**
 * Created by ketangote on 7/25/17.
 */
var DataPointEastComponent = (function () {
    function DataPointEastComponent() {
    }
    /**
     * @return {?}
     */
    DataPointEastComponent.prototype.ngOnInit = function () {
    };
    return DataPointEastComponent;
}());
DataPointEastComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-east',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointEastComponent.ctorParameters = function () { return []; };
DataPointEastComponent.propDecorators = {
    'contentalign': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
};

/**
 * Created by ketangote on 7/25/17.
 */
var DataPointNorthComponent = (function () {
    function DataPointNorthComponent() {
    }
    /**
     * @return {?}
     */
    DataPointNorthComponent.prototype.ngOnInit = function () {
    };
    return DataPointNorthComponent;
}());
DataPointNorthComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-north',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n    \n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointNorthComponent.ctorParameters = function () { return []; };
DataPointNorthComponent.propDecorators = {
    'contentalign': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
};

/**
 * Created by ketangote on 7/25/17.
 */
var DataPointSouthComponent = (function () {
    function DataPointSouthComponent() {
    }
    /**
     * @return {?}
     */
    DataPointSouthComponent.prototype.ngOnInit = function () {
    };
    return DataPointSouthComponent;
}());
DataPointSouthComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-south',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointSouthComponent.ctorParameters = function () { return []; };
DataPointSouthComponent.propDecorators = {
    'contentalign': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
};

/**
 * Created by ketangote on 7/25/17.
 */
var DataPointWestComponent = (function () {
    function DataPointWestComponent() {
    }
    /**
     * @return {?}
     */
    DataPointWestComponent.prototype.ngOnInit = function () {
    };
    return DataPointWestComponent;
}());
DataPointWestComponent.decorators = [
    { type: Component, args: [{
                selector: 'amexio-west',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointWestComponent.ctorParameters = function () { return []; };
DataPointWestComponent.propDecorators = {
    'contentalign': [{ type: Input },],
    'backgroundColor': [{ type: Input },],
    'fontColor': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
};

var AmexioDashboardModule = (function () {
    function AmexioDashboardModule() {
    }
    return AmexioDashboardModule;
}());
AmexioDashboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    DashBoardTitle,
                    GaugeChartComponent,
                    DataPointCenterComponent,
                    DataPointsComponent,
                    DataPointEastComponent,
                    DataPointNorthComponent,
                    DataPointSouthComponent,
                    DataPointWestComponent
                ],
                exports: [
                    DashBoardTitle,
                    GaugeChartComponent,
                    DataPointCenterComponent,
                    DataPointsComponent,
                    DataPointEastComponent,
                    DataPointNorthComponent,
                    DataPointSouthComponent,
                    DataPointWestComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
AmexioDashboardModule.ctorParameters = function () { return []; };

export { AmexioDashboardModule, DashBoardTitle, GaugeChartComponent, DataPointCenterComponent, DataPointsComponent, DataPointEastComponent, DataPointNorthComponent, DataPointSouthComponent, DataPointWestComponent };
