
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DockbarComponent } from './dockbaritem.component';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
describe('DockbarComponent', () => {
    let comp1: DockbarComponent;
    let fixture1: ComponentFixture<DockbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            declarations: [DockbarComponent, CommonIconComponent],
            providers: [HttpClient, CommonDataService],

        });
        fixture1 = TestBed.createComponent(DockbarComponent);
        comp1 = fixture1.componentInstance;
    });

    it('ngOninit  super call ()', () => {
        comp1.ngOnInit();
        comp1.elementId = 'dockbar-item-id' + Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);
    });
});