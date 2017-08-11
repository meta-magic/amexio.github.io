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
import {ChartLoaderService} from "../chart.loader.service";
declare var google;
export class ChartBaseClass {
    constructor(private chartLoaderService: ChartLoaderService) {
        this.chartLoaderService.loadChartScript();
        let instanceRef = this;
        if (instanceRef.constructor.name == 'LineChartComponent') {
            google.charts.load('current', {packages: ['corechart', 'line']});
        } else if (instanceRef.constructor.name == 'GaugeChartComponent') {
            google.charts.load('current', {packages: ['corechart', 'gauge']});
        } else if (instanceRef.constructor.name == 'BarChartComponent') {
            google.charts.load('current', {packages: ['corechart', 'bar']});
        } else if (instanceRef.constructor.name == 'GeoChartComponent') {
            //  google.charts.load('current', {packages: ['corechart'], 'mapsApiKey':'AIzaSyCCwc5UUCPpRRXOcuDn8bbaRwp3vbLH-BU'});
        } else {
            google.charts.load('current', {packages: ['corechart']});
        }
    }

    //draw charts
    drawChart() {
    }

    createBarChart(element: any): any {
        return new google.visualization.BarChart(element);
    }

    createPieChart(element: any): any {
        return new google.visualization.PieChart(element);
    }

    createAreaChart(element: any): any {
        return new google.visualization.AreaChart(element);
    }

    createLineChart(element: any): any {
        return new google.charts.Line(element);
    }

    createColumnChart(element: any): any {
        return new google.visualization.ColumnChart(element);
    }

    createHistogramChart(element: any): any {
        return new google.visualization.Histogram(element);
    }

    createGaugeChart(element: any): any {
        return new google.visualization.Gauge(element);
    }

    createGeoMap(element: any): any {
        return new google.visualization.GeoChart(element);
    }

    createDataTable(array: any[]): any {
        return google.visualization.arrayToDataTable(array);
    }

    /**
     * This method create data table structure of array and return in required chart data
     *
     * */
    createTable(array: any[]): any {
        let data = new google.visualization.DataTable();
        let lebelObejct = array[0];
        //remove first object of array
        array.shift();

        lebelObejct.forEach((dataTypeObject) => {
            data.addColumn(dataTypeObject.dataType, dataTypeObject.label);
        });
        let finalArray: any[] = [];
        array.forEach((rowObject) => {
            finalArray.push(rowObject);
        });
        data.addRows(finalArray);
        return data;
    }
}
