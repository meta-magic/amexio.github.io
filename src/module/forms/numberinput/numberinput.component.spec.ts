/**
 * Created by pratik on 1/12/17.
 */
import { AmexioNumberInputComponent } from './numberinput.component';
import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('NUMBER INPUT', () => {

  let comp: AmexioNumberInputComponent;
  let fixture: ComponentFixture<AmexioNumberInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports : [FormsModule],
    declarations: [ AmexioNumberInputComponent,AmexioFormIconComponent],
    providers:[IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioNumberInputComponent);
    comp = fixture.componentInstance;

  it('true is true', () => expect(true).toBe(true));
});

 
it('Get innervalue', () => {
  //comp.value='sagfaf';
  
//this.fixture.detectChanges();
       expect(comp.value).toEqual('');
    });

});