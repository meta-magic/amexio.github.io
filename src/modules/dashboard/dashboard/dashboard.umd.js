(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.dashboard = {}),global._angular_core,global._angular_common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

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
    { type: _angular_core.Component, args: [{
                selector: 'dashboard-title',
                template: " "
            },] },
];
/**
 * @nocollapse
 */
DashBoardTitle.ctorParameters = function () { return []; };
DashBoardTitle.propDecorators = {
    'title': [{ type: _angular_core.Input },],
    'titlePosition': [{ type: _angular_core.Input },],
    'titleColor': [{ type: _angular_core.Input },],
    'titleFontName': [{ type: _angular_core.Input },],
    'titleFontSize': [{ type: _angular_core.Input },],
    'isTitleBold': [{ type: _angular_core.Input },],
    'isTitleItalic': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-gauge',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\">\n      </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
GaugeChartComponent.ctorParameters = function () { return []; };
GaugeChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'redColorFrom': [{ type: _angular_core.Input },],
    'redColorTo': [{ type: _angular_core.Input },],
    'yellowColorFrom': [{ type: _angular_core.Input },],
    'yellowColorTo': [{ type: _angular_core.Input },],
    'minorTicks': [{ type: _angular_core.Input },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [DashBoardTitle,] },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-center',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointCenterComponent.ctorParameters = function () { return []; };
DataPointCenterComponent.propDecorators = {
    'contentalign': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-datapoints',
                template: "\n    <table width=\"100%\"  [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\">\n      <tr *ngIf=\"north\">\n        <td [attr.colspan]=\"colspan\">\n          <ng-content select=\"amexio-north\"></ng-content>\n        </td>\n      </tr>\n      <tr>\n        <td *ngIf=\"west\">\n          <ng-content select=\"amexio-west\"></ng-content>\n        </td>\n        <td *ngIf=\"center\">\n          <ng-content select=\"amexio-center\"></ng-content>\n        </td>\n        <td *ngIf=\"east\">\n          <ng-content select=\"amexio-east\"></ng-content>\n        </td>\n      </tr>\n      <tr  *ngIf=\"south\">\n        <td [attr.colspan]=\"colspan\">\n          <ng-content select=\"amexio-south\"></ng-content>\n        </td>\n      </tr>\n    </table>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointsComponent.ctorParameters = function () { return []; };
DataPointsComponent.propDecorators = {
    'north': [{ type: _angular_core.Input },],
    'south': [{ type: _angular_core.Input },],
    'west': [{ type: _angular_core.Input },],
    'center': [{ type: _angular_core.Input },],
    'east': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-east',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointEastComponent.ctorParameters = function () { return []; };
DataPointEastComponent.propDecorators = {
    'contentalign': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-north',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n    \n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointNorthComponent.ctorParameters = function () { return []; };
DataPointNorthComponent.propDecorators = {
    'contentalign': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-south',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointSouthComponent.ctorParameters = function () { return []; };
DataPointSouthComponent.propDecorators = {
    'contentalign': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
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
    { type: _angular_core.Component, args: [{
                selector: 'amexio-west',
                template: "\n\n    <div [attr.align]=\"contentalign\" [style.background-color]=\"backgroundColor\" [style.color]=\"fontColor\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
            },] },
];
/**
 * @nocollapse
 */
DataPointWestComponent.ctorParameters = function () { return []; };
DataPointWestComponent.propDecorators = {
    'contentalign': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'fontColor': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
};

var AmexioDashboardModule = (function () {
    function AmexioDashboardModule() {
    }
    return AmexioDashboardModule;
}());
AmexioDashboardModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
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

exports.AmexioDashboardModule = AmexioDashboardModule;
exports.DashBoardTitle = DashBoardTitle;
exports.GaugeChartComponent = GaugeChartComponent;
exports.DataPointCenterComponent = DataPointCenterComponent;
exports.DataPointsComponent = DataPointsComponent;
exports.DataPointEastComponent = DataPointEastComponent;
exports.DataPointNorthComponent = DataPointNorthComponent;
exports.DataPointSouthComponent = DataPointSouthComponent;
exports.DataPointWestComponent = DataPointWestComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
