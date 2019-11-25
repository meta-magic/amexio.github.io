import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { GoogleMapOverlays } from '../../../models/googlemap.model';
import { GoogleMapScriptService } from '../../../services/script/script.data.service';
import { AmexioGoogleMapComponent } from './googlemap.component';
import { GOOGLEMAP_CONSTANT } from './googlemap.constant';

describe('AmexioGoogleMapComponent', () => {
  let comp1: AmexioGoogleMapComponent;
  let fixture1: ComponentFixture<AmexioGoogleMapComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioGoogleMapComponent],
      providers: [ GoogleMapScriptService],

    });
    fixture1 = TestBed.createComponent(AmexioGoogleMapComponent);
    comp1 = fixture1.componentInstance;
  });

  it('ngOnInit()', () => {
   comp1.ngOnInit();
   comp1.componentId = +window.crypto.getRandomValues(new Uint32Array(1))[0] + 'google';
   expect(comp1.componentId).toBeDefined();
  });

});
