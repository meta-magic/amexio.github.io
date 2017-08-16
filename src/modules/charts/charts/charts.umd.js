(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/http'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/http', '@angular/forms'], factory) :
	(factory((global.charts = {}),global._angular_core,global._angular_common,global._angular_http,global._angular_forms));
}(this, (function (exports,_angular_core,_angular_common,_angular_http,_angular_forms) { 'use strict';

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
var ChartLegendComponent = (function () {
    function ChartLegendComponent() {
        this.isLegendBold = false;
    }
    /**
     * @return {?}
     */
    ChartLegendComponent.prototype.ngOnInit = function () {
    };
    return ChartLegendComponent;
}());
ChartLegendComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-legend',
                template: " "
            },] },
];
/**
 * @nocollapse
 */
ChartLegendComponent.ctorParameters = function () { return []; };
ChartLegendComponent.propDecorators = {
    'legendPosition': [{ type: _angular_core.Input },],
    'legendAlignment': [{ type: _angular_core.Input },],
    'legendColor': [{ type: _angular_core.Input },],
    'legendFontName': [{ type: _angular_core.Input },],
    'legendFontSize': [{ type: _angular_core.Input },],
    'isLegendBold': [{ type: _angular_core.Input },],
    'maxLinesOfLegend': [{ type: _angular_core.Input },],
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
var ChartTitleComponent = (function () {
    function ChartTitleComponent() {
    }
    /**
     * @return {?}
     */
    ChartTitleComponent.prototype.ngOnInit = function () {
    };
    return ChartTitleComponent;
}());
ChartTitleComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-title',
                template: " "
            },] },
];
/**
 * @nocollapse
 */
ChartTitleComponent.ctorParameters = function () { return []; };
ChartTitleComponent.propDecorators = {
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
var ChartAreaComponent = (function () {
    function ChartAreaComponent() {
    }
    /**
     * @return {?}
     */
    ChartAreaComponent.prototype.ngOnInit = function () {
    };
    return ChartAreaComponent;
}());
ChartAreaComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-area-properties',
                template: ""
            },] },
];
/**
 * @nocollapse
 */
ChartAreaComponent.ctorParameters = function () { return []; };
ChartAreaComponent.propDecorators = {
    'chartBackgroundColor': [{ type: _angular_core.Input },],
    'leftPosition': [{ type: _angular_core.Input },],
    'topPosition': [{ type: _angular_core.Input },],
    'chartWidthInPer': [{ type: _angular_core.Input },],
    'chartHeightInper': [{ type: _angular_core.Input },],
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
var PieChartComponent = (function () {
    function PieChartComponent() {
        this.is3D = false;
        this.id = 'amexio-chart-pie' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    PieChartComponent.prototype.drawChart = function () {
        this.pieData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            is3D: this.is3D,
            pieHole: this.pieHole,
            pieStartAngle: this.pieStartAngle,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.PieChart(document.getElementById(this.id));
        this.chart.draw(this.pieData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    PieChartComponent.prototype.onClick = function (e) {
        debugger;
    };
    /**
     * @return {?}
     */
    PieChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    PieChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return PieChartComponent;
}());
PieChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-pie', template: "\n        <div [attr.id]=\"id\"\n             [style.width]=\"width\"\n             [style.height]=\"height\"\n        ></div>\n  "
            },] },
];
/**
 * @nocollapse
 */
PieChartComponent.ctorParameters = function () { return []; };
PieChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'is3D': [{ type: _angular_core.Input },],
    'pieHole': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'pieStartAngle': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var AreaChartComponent = (function () {
    function AreaChartComponent() {
        this.id = 'amexio-chart-area' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    AreaChartComponent.prototype.drawChart = function () {
        this.areaData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.AreaChart(document.getElementById(this.id));
        this.chart.draw(this.areaData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.click);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    AreaChartComponent.prototype.click = function (e) {
    };
    /**
     * @return {?}
     */
    AreaChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    AreaChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return AreaChartComponent;
}());
AreaChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-area',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\">\n\n      </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
AreaChartComponent.ctorParameters = function () { return []; };
AreaChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var ColumnChartComponent = (function () {
    function ColumnChartComponent() {
        //showing stack chart
        this.isStacked = false;
        this.id = 'amexio-chart-column' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    ColumnChartComponent.prototype.drawChart = function () {
        this.columnData = this.createTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            isStacked: this.isStacked,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.ColumnChart(document.getElementById(this.id));
        this.chart.draw(this.columnData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ColumnChartComponent.prototype.onClick = function (e) {
    };
    /**
     * @return {?}
     */
    ColumnChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * This method create data table structure of array and return in required chart data
     *
     *
     * @param {?} array
     * @return {?}
     */
    ColumnChartComponent.prototype.createTable = function (array) {
        //create Duplicate Array for data arrangement
        var /** @type {?} */ dupArray = array.slice();
        var /** @type {?} */ data = new google.visualization.DataTable();
        var /** @type {?} */ labelObject = dupArray[0];
        //remove first object of array
        dupArray.shift();
        labelObject.forEach(function (dataTypeObject) {
            data.addColumn(dataTypeObject.dataType, dataTypeObject.label);
        });
        var /** @type {?} */ finalArray = [];
        dupArray.forEach(function (rowObject) {
            finalArray.push(rowObject);
        });
        data.addRows(finalArray);
        return data;
    };
    /**
     * @return {?}
     */
    ColumnChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return ColumnChartComponent;
}());
ColumnChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-column',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\"\n      ></div>\n  "
            },] },
];
/**
 * @nocollapse
 */
ColumnChartComponent.ctorParameters = function () { return []; };
ColumnChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'isStacked': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var DonutChartComponent = (function () {
    function DonutChartComponent() {
        this.id = 'amexio-chart-donut' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.drawChart = function () {
        this.donutData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            pieHole: 0.4,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.PieChart(document.getElementById(this.id));
        this.chart.draw(this.donutData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DonutChartComponent.prototype.onClick = function (e) {
    };
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return DonutChartComponent;
}());
DonutChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-donut', template: "\n        <div [attr.id]=\"id\"\n             [style.width]=\"width\"\n             [style.height]=\"height\"\n        ></div>\n  "
            },] },
];
/**
 * @nocollapse
 */
DonutChartComponent.ctorParameters = function () { return []; };
DonutChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var HistogramChartComponent = (function () {
    function HistogramChartComponent() {
        this.id = 'amexio-chart-line' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    HistogramChartComponent.prototype.drawChart = function () {
        this.histogramData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        this.chart = new google.visualization.Histogram(document.getElementById(this.id));
        this.chart.draw(this.histogramData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    HistogramChartComponent.prototype.onClick = function (e) {
    };
    /**
     * @return {?}
     */
    HistogramChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    HistogramChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return HistogramChartComponent;
}());
HistogramChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-histogram',
                template: "\n      <div [attr.id]=\"id\"\n           [style.width]=\"width\"\n           [style.height]=\"height\"\n      >\n      </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
HistogramChartComponent.ctorParameters = function () { return []; };
HistogramChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var LineChartComponent = (function () {
    function LineChartComponent() {
        this.id = 'amexio-chart-line' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    LineChartComponent.prototype.drawChart = function () {
        this.lineData = this.createTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
        };
        debugger;
        this.chart = new google.visualization.LineChart(document.getElementById(this.id));
        this.chart.draw(this.lineData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    LineChartComponent.prototype.onClick = function (e) {
    };
    /**
     * @return {?}
     */
    LineChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * This method create data table structure of array and return in required chart data
     *
     *
     * @param {?} array
     * @return {?}
     */
    LineChartComponent.prototype.createTable = function (array) {
        //create Duplicate Array for data arrangement
        var /** @type {?} */ dupArray = array.slice();
        var /** @type {?} */ data = new google.visualization.DataTable();
        var /** @type {?} */ labelObject = dupArray[0];
        //remove first object of array
        dupArray.shift();
        labelObject.forEach(function (dataTypeObject) {
            data.addColumn(dataTypeObject.dataType, dataTypeObject.label);
        });
        var /** @type {?} */ finalArray = [];
        dupArray.forEach(function (rowObject) {
            finalArray.push(rowObject);
        });
        data.addRows(finalArray);
        return data;
    };
    /**
     * @return {?}
     */
    LineChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return LineChartComponent;
}());
LineChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-line', template: "\n        <div [attr.id]=\"id\"\n             [style.width]=\"width\"\n             [style.height]=\"height\"\n        >\n        </div>\n\n  "
            },] },
];
/**
 * @nocollapse
 */
LineChartComponent.ctorParameters = function () { return []; };
LineChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var BarChartComponent = (function () {
    function BarChartComponent() {
        //showing stack chart
        this.isStacked = false;
        this.id = 'amexio-chart-bar' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    BarChartComponent.prototype.drawChart = function () {
        //bind the data
        this.barData = google.visualization.arrayToDataTable(this.data);
        this.options = {
            title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
            titleTextStyle: this.chartTitleComponent ? {
                color: this.chartTitleComponent.titleColor ? this.chartTitleComponent.titleColor : null,
                fontName: this.chartTitleComponent.titleFontName ? this.chartTitleComponent.titleFontName : null,
                fontSize: this.chartTitleComponent.titleFontSize ? this.chartTitleComponent.titleFontSize : null,
                bold: this.chartTitleComponent.isTitleBold ? this.chartTitleComponent.isTitleBold : null,
                italic: this.chartTitleComponent.isTitleItalic ? this.chartTitleComponent.isTitleItalic : null
            } : null,
            isStacked: this.isStacked,
            backgroundColor: this.backgroundColor,
            legend: this.chartLengendComponent ? {
                position: this.chartLengendComponent.legendPosition ? this.chartLengendComponent.legendPosition : null,
                maxLines: this.chartLengendComponent.maxLinesOfLegend ? this.chartLengendComponent.maxLinesOfLegend : null,
                textStyle: {
                    color: this.chartLengendComponent.legendColor ? this.chartLengendComponent.legendColor : null,
                    fontSize: this.chartLengendComponent.legendFontSize ? this.chartLengendComponent.legendFontSize : null,
                    fontName: this.chartLengendComponent.legendFontName ? this.chartLengendComponent.legendFontName : null,
                    bold: this.chartLengendComponent.isLegendBold ? this.chartLengendComponent.isLegendBold : null,
                    alignment: this.chartLengendComponent.legendAlignment ? this.chartLengendComponent.legendAlignment : null
                }
            } : 'none',
            chartArea: this.chartAreaComponent ? {
                backgroundColor: this.chartAreaComponent.chartBackgroundColor ? this.chartAreaComponent.chartBackgroundColor : null,
                left: this.chartAreaComponent.leftPosition ? this.chartAreaComponent.leftPosition : null,
                top: this.chartAreaComponent.topPosition ? this.chartAreaComponent.topPosition : null,
                height: this.chartAreaComponent.chartHeightInper ? this.chartAreaComponent.chartHeightInper : null,
                width: this.chartAreaComponent.chartWidthInPer ? this.chartAreaComponent.chartWidthInPer : null
            } : null,
            hAxis: {
                title: this.xAxisTitle, minValue: 0
            },
            vAxis: {
                title: this.yAxisTitle
            }
        };
        this.chart = new google.visualization.BarChart(document.getElementById(this.id));
        this.chart.draw(this.barData, this.options);
    };
    /**
     * @return {?}
     */
    BarChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * @return {?}
     */
    BarChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return BarChartComponent;
}());
BarChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-bar',
                template: "\n        <div [attr.id]=\"id\"\n             [style.width]=\"width\"\n             [style.height]=\"height\">\n        </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
BarChartComponent.ctorParameters = function () { return []; };
BarChartComponent.propDecorators = {
    'data': [{ type: _angular_core.Input },],
    'width': [{ type: _angular_core.Input },],
    'height': [{ type: _angular_core.Input },],
    'isStacked': [{ type: _angular_core.Input },],
    'xAxisTitle': [{ type: _angular_core.Input },],
    'yAxisTitle': [{ type: _angular_core.Input },],
    'backgroundColor': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
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
var TimeLineChartComponent = (function () {
    function TimeLineChartComponent() {
        this.id = 'amexio-chart-timeline' + Math.floor(Math.random() * 90000) + 10000;
        this.width = '100%';
    }
    /**
     * @return {?}
     */
    TimeLineChartComponent.prototype.drawChart = function () {
        this.chart = new google.visualization.Timeline(document.getElementById(this.id));
        this.chart.draw(this.createTable(this.data));
        google.visualization.events.addListener(this.chart, 'click', this.onClick);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TimeLineChartComponent.prototype.onClick = function (e) {
    };
    /**
     * @return {?}
     */
    TimeLineChartComponent.prototype.ngAfterContentInit = function () {
        this.chartLegendArray = this.chartLegendComp.toArray();
        this.chartTitleArray = this.chartTitleComp.toArray();
        this.chartAreaArray = this.chartAreaComp.toArray();
        //take first component
        if (this.chartLegendArray.length == 1) {
            this.chartLengendComponent = this.chartLegendArray.pop();
        }
        if (this.chartTitleArray.length == 1) {
            this.chartTitleComponent = this.chartTitleArray.pop();
        }
        if (this.chartAreaArray.length == 1) {
            this.chartAreaComponent = this.chartAreaArray.pop();
        }
    };
    /**
     * This method create data table structure of array and return in required chart data
     *
     *
     * @param {?} array
     * @return {?}
     */
    TimeLineChartComponent.prototype.createTable = function (array) {
        //create Duplicate Array for data arrangement
        var /** @type {?} */ dupArray = array.slice();
        var /** @type {?} */ data = new google.visualization.DataTable();
        var /** @type {?} */ labelObject = dupArray[0];
        //remove first object of array
        dupArray.shift();
        labelObject.forEach(function (dataTypeObject) {
            data.addColumn(dataTypeObject.dataType, dataTypeObject.label);
        });
        var /** @type {?} */ finalArray = [];
        dupArray.forEach(function (rowObject) {
            finalArray.push(rowObject);
        });
        data.addRows(finalArray);
        return data;
    };
    /**
     * @return {?}
     */
    TimeLineChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        //call draw chart method
        google.charts.load('current', { packages: ['timeline'] });
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    return TimeLineChartComponent;
}());
TimeLineChartComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'amexio-chart-timeline',
                template: "\n    <div [attr.id]=\"id\"\n         [style.width]=\"width\"\n    ></div>\n  "
            },] },
];
/**
 * @nocollapse
 */
TimeLineChartComponent.ctorParameters = function () { return []; };
TimeLineChartComponent.propDecorators = {
    'width': [{ type: _angular_core.Input },],
    'data': [{ type: _angular_core.Input },],
    'chartLegendComp': [{ type: _angular_core.ContentChildren, args: [ChartLegendComponent,] },],
    'chartTitleComp': [{ type: _angular_core.ContentChildren, args: [ChartTitleComponent,] },],
    'chartAreaComp': [{ type: _angular_core.ContentChildren, args: [ChartAreaComponent,] },],
};

var AmexioChartModule = (function () {
    function AmexioChartModule() {
    }
    return AmexioChartModule;
}());
AmexioChartModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_http.HttpModule,
                    _angular_forms.FormsModule
                ],
                declarations: [
                    AreaChartComponent, BarChartComponent, ChartAreaComponent,
                    ChartLegendComponent, ChartTitleComponent, ColumnChartComponent,
                    DonutChartComponent, HistogramChartComponent, LineChartComponent,
                    PieChartComponent, TimeLineChartComponent
                ],
                exports: [
                    AreaChartComponent, BarChartComponent, ChartAreaComponent,
                    ChartLegendComponent, ChartTitleComponent, ColumnChartComponent,
                    DonutChartComponent, HistogramChartComponent, LineChartComponent, PieChartComponent,
                    TimeLineChartComponent
                ],
            },] },
];
/**
 * @nocollapse
 */
AmexioChartModule.ctorParameters = function () { return []; };

exports.AmexioChartModule = AmexioChartModule;
exports.ChartLegendComponent = ChartLegendComponent;
exports.ChartTitleComponent = ChartTitleComponent;
exports.PieChartComponent = PieChartComponent;
exports.AreaChartComponent = AreaChartComponent;
exports.ChartAreaComponent = ChartAreaComponent;
exports.ColumnChartComponent = ColumnChartComponent;
exports.DonutChartComponent = DonutChartComponent;
exports.HistogramChartComponent = HistogramChartComponent;
exports.LineChartComponent = LineChartComponent;
exports.BarChartComponent = BarChartComponent;
exports.TimeLineChartComponent = TimeLineChartComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
