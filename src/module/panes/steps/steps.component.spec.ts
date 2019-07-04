import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioStepsComponent } from './steps.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-steps', () => {
    let comp: AmexioStepsComponent;
    let fixture: ComponentFixture<AmexioStepsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioStepsComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioStepsComponent);
        comp = fixture.componentInstance;
    });


    // it('check onStepClick  method', () => {
    //     let clickData: any;
    //     let ev: any;
    //     comp.onStepClick(clickData,ev);
    //     let ok = {event: ev, data: clickData}
    //     comp.getStepBlockData.subscribe((g: any) => {
    //         expect(ok).toEqual(g);
    //     });
    //     comp.onClick.subscribe((g: any) => {
    //         expect(clickData).toEqual(g);
    //     })
    // });
    // it('ngAfterContentInit method check',() => {
    //     comp.ngAfterContentInit();
    //     expect(comp.data.length).toBeGreaterThan(0);
    // })
});
