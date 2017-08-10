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
import {EventEmitter, Inject} from "@angular/core";
import { DOCUMENT } from '@angular/common';
declare var google;
 export class ChartBaseClass{
     //check for google object loaded or not
     private static googleLoaded: any;
     private googleScriptLoadingNotifier: EventEmitter<boolean>;
     private googleScriptIsLoading: boolean;
     private chartPackage: { [id: string]: string; } = {
         AnnotationChart: 'annotationchart',
         AreaChart: 'corechart',
         Bar: 'bar',
         BarChart: 'corechart',
         BubbleChart: 'corechart',
         Calendar: 'calendar',
         CandlestickChart: 'corechart',
         ColumnChart: 'corechart',
         ComboChart: 'corechart',
         PieChart: 'corechart',
         Gantt: 'gantt',
         Gauge: 'gauge',
         GeoChart: 'geochart',
         Histogram: 'corechart',
         Line: 'line',
         LineChart: 'corechart',
         Map: 'map',
         OrgChart: 'orgchart',
         Sankey: 'sankey',
         Scatter: 'scatter',
         ScatterChart: 'corechart',
         SteppedAreaChart: 'corechart',
         Table: 'table',
         Timeline: 'timeline',
         TreeMap: 'treemap',
         WordTree: 'wordtree'
     };


     constructor(@Inject(DOCUMENT) document) {

         this.googleScriptLoadingNotifier = new EventEmitter();
         this.googleScriptIsLoading = false;
/*
         if (!ChartBaseClass.googleLoaded) {
             ChartBaseClass.googleLoaded = true;
             //here added core chart ang bar chart
             google.charts.load('current', {packages: ['corechart', 'bar', 'line','gauge'],
                 'mapsApiKey':'AIzaSyCCwc5UUCPpRRXOcuDn8bbaRwp3vbLH-BU'
             });
         }
         //call draw chart method
         google.charts.setOnLoadCallback(() => this.drawChart());*/
     }

     public load(chartType: string):Promise<any> {
         return new Promise((resolve: any = Function.prototype, reject: any = Function.prototype) => {

             this.loadGoogleChartsScript().then(() => {
                 google.charts.load('current', {
                     packages: [this.chartPackage[chartType]],
                     callback: resolve
                 });
                 google.charts.setOnLoadCallback(() => this.drawChart());
             }).catch(() => {
                 console.error('Google charts script could not be loaded');
             });

         });
     }

     private loadGoogleChartsScript(): Promise<any> {
         return new Promise((resolve: any = Function.prototype, reject: any = Function.prototype) => {

             if (typeof google !== 'undefined' && google.charts) {
                 resolve();
             } else if ( ! this.googleScriptIsLoading) {

                 this.googleScriptIsLoading = true;

                 let script = document.createElement('script');
                 script.type = 'text/javascript';
                 script.src = 'https://www.gstatic.com/charts/loader.js';
                 script.async = true;
                 script.defer = true;
                 script.onload = () => {
                     this.googleScriptIsLoading = false;
                     this.googleScriptLoadingNotifier.emit(true);
                     resolve();
                 };
                 script.onerror = () => {
                     this.googleScriptIsLoading = false;
                     this.googleScriptLoadingNotifier.emit(false);
                     reject();
                 };

                 document.getElementsByTagName('head')[0].appendChild(script);

             } else {
                 this.googleScriptLoadingNotifier.subscribe((loaded: boolean) => {
                     if (loaded) {
                         resolve();
                     } else {
                         reject();
                     }
                 });
             }

         });
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
     createColumnChart(element:any):any{
         return new google.visualization.ColumnChart(element);
     }
     createHistogramChart(element:any):any{
         return new google.visualization.Histogram(element);
     }
     createGaugeChart(element:any):any{
         return new google.visualization.Gauge(element);
     }
     createGeoMap(element:any):any{
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