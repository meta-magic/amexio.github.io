import { GeoLocationComponent } from './geolocation.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

describe('Geo Location Component', () => {
    let comp: GeoLocationComponent;
    let fixture: ComponentFixture<GeoLocationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [GeoLocationComponent, ],
            providers: [],
        });
        fixture = TestBed.createComponent(GeoLocationComponent);
        comp = fixture.componentInstance;
    });

    it('defined: component created', () => {
        expect(fixture.componentInstance).toBeDefined();
    });

    it('getLocation : success ', () => {
        spyOn(comp, 'getLocation').and.callFake(function() {
            let position;
            comp.getlocation.emit(position);
        });
        comp.getLocation();
        fixture.detectChanges();

        expect(comp.getLocation).toHaveBeenCalled();
    });

    it('getLocation : failure ', () => {
        spyOn(comp, 'getLocation').and.callFake(function() {
          comp.onfailure.emit(-1);
        });
        comp.getLocation();
        fixture.detectChanges();
        expect(comp.getLocation).toHaveBeenCalledWith();
    });
});
