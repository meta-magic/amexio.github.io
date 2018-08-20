import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { DataPointsComponent} from './datapoints.component';
import { toUnicode } from 'punycode';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

describe('amexio-dataPoint', () => {
    let comp: DataPointsComponent;
    let fixture: ComponentFixture<DataPointsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DataPointsComponent ],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(DataPointsComponent);
        comp = fixture.componentInstance;

    });

    it('ngOnInit method check', () => {

        comp.colspan = 1;
        expect(comp.colspan).toEqual(1);

        comp.amexiocolor = '';
        comp.ngOnInit();
        expect(comp.amexiocolor).toEqual('');

        comp.west = true;
        expect(comp.west).toEqual(true);
        comp.colspan = 1;
        expect(comp.colspan).toEqual(comp.colspan++);

        comp.east = true;
        expect(comp.east).toEqual(true);
        comp.colspan = 1;
        expect(comp.colspan).toEqual(comp.colspan++);

        // expect((<any>comp).faFaIconDownCss).toEqual('fa fa-caret-down');
    });
});
    