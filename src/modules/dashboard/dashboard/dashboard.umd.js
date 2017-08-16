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
                    GaugeChartComponent
                ],
                exports: [
                    DashBoardTitle,
                    GaugeChartComponent
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

Object.defineProperty(exports, '__esModule', { value: true });

})));
