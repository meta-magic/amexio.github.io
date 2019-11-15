import { AmexioButtonComponent } from '../../standard/forms/buttons/button.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIconComponent } from '../../base/components/common.icon.component';
import { CeMinimizeWindowComponent } from './ceMinimize.window.component';

import { MinimizeService } from '../../services/minimize/minimize-service.service';

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
        comp.ceMiniButton = true;
        comp.ceMiniBtnClick(data);
        expect(data.show).toEqual(true);
        expect(comp.ceMiniButton).toEqual(true);
    });

    it('should trigger ngOnInit with detectChanges if condition', () => {
        comp.ngOnInit();
        fixture.detectChanges();
        comp.ceMiniButton = true;
        service.currentMessage.subscribe((element: any) => {
            element = [
                {
                    textName: " KEDAR ",
                    top: "100px",
                    transitionOptions: "400ms cubic-bezier(0.86, 0, 0.07, 1)",
                    verticalposition: "flex-start",
                    width: "400px",
                }
            ]
            fixture.detectChanges();
            expect(element).not.toBeNull();
            expect(element.length).toBeGreaterThan(0);
            comp.arrayData = element;
            expect(comp.ceMiniButton).toEqual(true);
        });
    });

    it('should trigger ngOnInit with detectChanges else condition', () => {

        comp.ngOnInit();
        fixture.detectChanges();
        comp.ceMiniButton = false;
        service.currentMessage.subscribe((element: any) => {
            element = [
            ]
            expect(element).toEqual([]);
            expect(element.length).toBe(0);
            expect(comp.ceMiniButton).toEqual(false);
        });

    });
    it('should trigger ngOnInit with detectChanges else condition undefined check', () => {

        comp.ngOnInit();
        fixture.detectChanges();
        comp.ceMiniButton = false;
        service.currentMessage.subscribe((shareData: any) => {
            expect(shareData).toBe('');
            expect(comp.ceMiniButton).toEqual(false);
        });
    });
});

