import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioTabComponent } from './tab.component';
import {AmexioTabPillComponent} from './tab.pill.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-tab', () => {
    let comp: AmexioTabComponent;
    let fixture: ComponentFixture<AmexioTabComponent>;
    let comData: AmexioTabPillComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [AmexioTabComponent,CommonIconComponent],
                providers: [IconLoaderService],
            });
            fixture = TestBed.createComponent(AmexioTabComponent);
            comp = fixture.componentInstance;
        });


});
