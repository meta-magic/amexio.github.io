import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { MinimizeService } from '../../../services/minimize/minimize-service.service';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { MinimizeWindowComponent } from './minimize.window.component';
describe('amexio-minimize-window', () => {

    let comp: MinimizeWindowComponent;
    let fixture: ComponentFixture<MinimizeWindowComponent>;
    let service: MinimizeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [MinimizeWindowComponent, CommonIconComponent, AmexioButtonComponent],
            providers: [MinimizeService],
        });
        fixture = TestBed.createComponent(MinimizeWindowComponent);
        comp = fixture.componentInstance;
        service = TestBed.get(MinimizeService);
    });

    it('should create', () => {
        const comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });

    it('check variables method ', () => {
        comp.localData = [];
        comp.minimizeButton = false;
        expect(comp.localData).toEqual([]);
        expect(comp.minimizeButton).toEqual(false);
    });

    it('check ceMiniBtnClick method ', () => {
        const data = {
            show: true,
        };
        comp.minimizeButton = true;
        comp.minimizeBtnClick(data);
        expect(data.show).toEqual(true);
        expect(comp.minimizeButton).toEqual(true);
    });

    it('should trigger ngOnInit with detectChanges if condition', () => {
        comp.ngOnInit();
        fixture.detectChanges();
        comp.minimizeButton = true;
        service.currentMessage.subscribe((shareData: any) => {
            shareData = [
                 {
                    textName: ' KEDAR ',
                    top: '100px',
                    transitionOptions: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                    verticalposition: 'flex-start',
                    width: '400px',
                 },
             ];
            fixture.detectChanges();
            expect(shareData).toBeDefined();
            expect(shareData.length).toBeGreaterThan(0);
            comp.localData = shareData;
            expect(comp.minimizeButton).toEqual(true);
        });
    }); it('should trigger ngOnInit with detectChanges else condition undefined check', () => {

        comp.ngOnInit();
        fixture.detectChanges();
        comp.minimizeButton = false;
        service.currentMessage.subscribe((shareData: any) => {
            expect(shareData).toBe('');
            expect(comp.minimizeButton).toEqual(false);
        });

    });
    it('should trigger ngOnInit with detectChanges else condition', () => {

        comp.ngOnInit();
        fixture.detectChanges();
        comp.minimizeButton = false;
        service.currentMessage.subscribe((shareData: any) => {
            shareData = [
            ],
            expect(shareData).toEqual([]);
            expect(shareData.length).toEqual(0);
            expect(comp.minimizeButton).toEqual(false);
        });

    });

});
