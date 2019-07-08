import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioNotificationComponent } from './notification.component';
import { ChangeDetectorRef } from '@angular/core';

describe('amexio-notification', () => {
    let comp: AmexioNotificationComponent;
    let fixture: ComponentFixture<AmexioNotificationComponent>;
    let ref: ChangeDetectorRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNotificationComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioNotificationComponent);
        comp = fixture.componentInstance;
    });

    // check private variables
    it('check private variables notification', () => {
        comp['notificationVertialCss'] = 'notification-vertical-';
        expect(comp['notificationVertialCss']).toBe('notification-vertical-');
        comp['notificationHorizontalCss'] = ' notification-horizontal-';
        expect(comp['notificationHorizontalCss']).toBe(' notification-horizontal-');
    });

    // check ngOnInit method
    it('check ngOnInit method notification', () => {
        comp.componentID = Math.floor(Math.random() * 1000 + 999);
        comp.autodismissmsg = true;
        comp.autodismissmsginterval = 100;
        comp.messageData.push('There are unsaved changes');
        comp.ngOnInit();
        expect(comp.autodismissmsg).toEqual(true);
        expect(comp.autodismissmsginterval).toEqual(100);
        comp.autodismissmsginterval = 1500;
        expect(comp.messageData).not.toBe(null);
        setInterval(() => {
            comp.messageData.push('There are unsaved changes');
            expect(comp.messageData.length).toBeGreaterThan(0);
            comp.messageData.shift();
            ref.markForCheck();

        }, comp.autodismissmsginterval);

        
        comp.ngOnInit();
        comp.verticalposition = null;
        comp.horizontalposition = null;
        expect(comp.verticalposition).toBe(null);
        comp.verticalposition = 'top';
        expect(comp.horizontalposition).toBe(null);
        comp.horizontalposition = 'right';
        comp.positionclass = comp['notificationVertialCss'] + comp.verticalposition + comp['notificationHorizontalCss'] + comp.horizontalposition;


    });

});
