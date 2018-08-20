import { MapLoaderService } from '../map.loader.service';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GeoChartComponent} from './geo.chart.component'
import { MapPropertiesComponent} from '../mapproperties/map.properties';

describe('Geo Chart',()=>{

     beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [GeoChartComponent],
            providers: [MapLoaderService]
        }).compileComponents();
    });
    it('check test case',()=>{
        expect(true).toBe(true);
    })
})