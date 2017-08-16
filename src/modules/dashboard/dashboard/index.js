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

export { AmexioDashboardModule, DashBoardTitle, GaugeChartComponent };
