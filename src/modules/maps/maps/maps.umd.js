(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.maps = {}),global._angular_core,global._angular_common));
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
var MapProperties = (function () {
    function MapProperties() {
    }
    /**
     * @return {?}
     */
    MapProperties.prototype.ngOnInit = function () {
    };
    return MapProperties;
}());
MapProperties.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'map-properties',
                template: ""
            },] },
];
/**
 * @nocollapse
 */
MapProperties.ctorParameters = function () { return []; };
MapProperties.propDecorators = {
    'chartBackgroundColor': [{ type: _angular_core.Input },],
    'leftPosition': [{ type: _angular_core.Input },],
    'topPosition': [{ type: _angular_core.Input },],
    'chartWidthInPer': [{ type: _angular_core.Input },],
    'chartHeightInper': [{ type: _angular_core.Input },],
};

/**
 * Created by sagar on 10/8/17.
 */
var GeoChartComponent = (function () {
    function GeoChartComponent() {
        this.displayCountryName = false;
        this.id = 'amexio-map-geomap' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    GeoChartComponent.prototype.drawChart = function () {
        this.geomapData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            displayMode: this.displayCountryName ? 'text' : null,
            region: this.regionCode ? this.regionCode : null,
            backgroundColor: this.backgroundColor ? this.backgroundColor : null,
            datalessRegionColor: this.datalessRegionColor ? this.datalessRegionColor : null,
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.GeoChart(document.getElementById(this.id));
        this.chart.draw(this.geomapData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.click);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GeoChartComponent.prototype.click = function (e) {
    };
    /**
     * @return {?}
     */
    GeoChartComponent.prototype.ngAfterContentInit = function () {
        this.chartAreaArray = this.chartAreaComp.toArray();
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    GeoChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return GeoChartComponent;
}());
GeoChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-geo',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\"\n      >\n      </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
GeoChartComponent.ctorParameters = function () { return []; };
GeoChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'displayCountryName': [{ type: _angular_core.Input },],
    'regionCode': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'datalessRegionColor': [{ type: _angular_core.Input },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [MapProperties,] },],
};

var AmexioMapsModule = (function () {
    function AmexioMapsModule() {
    }
    return AmexioMapsModule;
}());
AmexioMapsModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
                ],
                declarations: [
                    MapProperties,
                    GeoChartComponent
                ],
                exports: [
                    MapProperties,
                    GeoChartComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
AmexioMapsModule.ctorParameters = function () { return []; };

exports.AmexioMapsModule = AmexioMapsModule;
exports.MapProperties = MapProperties;
exports.GeoChartComponent = GeoChartComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
