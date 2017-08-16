import { OnInit } from '@angular/core';
export declare class ChartLegendComponent implements OnInit {
    legendPosition: string;
    legendAlignment: string;
    legendColor: string;
    legendFontName: string;
    legendFontSize: string;
    isLegendBold: boolean;
    maxLinesOfLegend: number;
    constructor();
    ngOnInit(): void;
}
