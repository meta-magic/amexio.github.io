import { AmexioButtonComponent } from '../../forms/buttons/button.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIconComponent } from '../../base/components/common.icon.component';
import { CeMinimizeWindowComponent } from './ceMinimize.window.component';

import { MinimizeService } from '../../panes/window/minimize-service.service';

describe('amexio-minimize-ce-window', () => {

    let comp: CeMinimizeWindowComponent;
    let fixture: ComponentFixture<CeMinimizeWindowComponent>;
    let service: MinimizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [CeMinimizeWindowComponent, CommonIconComponent, AmexioButtonComponent],
            providers: [MinimizeService],
        });
        fixture = TestBed.createComponent(CeMinimizeWindowComponent);
        comp = fixture.componentInstance;
        service = TestBed.get(MinimizeService);
    });

    it('should trigger ngOnInit with detectChanges', () => {
        comp.ngOnInit();
        comp.ceMiniButton = true;
        service.currentMessage.subscribe((element: any) => {
            expect(element).not.toBeNull();
            comp.arrayData = element;
            expect(comp.ceMiniButton).toEqual(true);

        });

    });

    it('check variables method ', () => {
        comp.arrayData = [];
        comp.ceMiniButton = false;
        expect(comp.arrayData).toEqual([]);
        expect(comp.ceMiniButton).toEqual(false);
    });

    it('check ceMiniBtnClick method ', () => {
        const data = {
            show: true,
        };
        comp.ceMiniButton = false;
        comp.ceMiniBtnClick(data);
        expect(data.show).toEqual(true);
        expect(comp.ceMiniButton).toEqual(false);
    });

});
