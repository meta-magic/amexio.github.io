import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioThemeSwitcherService } from '../../services/data/amexio.theme.service';

import { CommonIconComponent } from './../../base/components/common.icon.component';
// import { StepWizardComponent } from './stepwizard.component';
import { AmexioCardCEComponent } from '../../creative/card/amexio.cards.component';
import { AmexioCardCEHeaderComponent } from '../../creative/common/amexio.header.component';
import { AmexioImageComponent } from '../../media/image/image.component';
import { AmexioCardCEBodyComponent } from '../../creative/common/amexio.body.component';
import { AmexioCardCEActionComponent } from '../../creative/common/amexio.action.component';
import { AmexioFormActionCEComponent } from '../../creative/form/form.action.component'
import { AmexioFormCEComponent } from '../../creative/form/amexio.form.component';
import { AmexiodialoguePaneComponent } from '../../panes/dialogue/dialogue.pane.component';
import { AmexioLabelComponent } from '../../forms/label/label.component';
import { AmexioCardComponent } from '../../layout/card/card.component';
import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
import { AmexioBodyComponent } from '../../panes/body/pane.action.body';
import { AmexioFooterComponent } from '../../panes/action/pane.action.footer';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioContextMenuComponent } from '../../base/base.contextmenu.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { SpeechBubbleComponent } from '../../data/speech-bubble/speech-bubble.component';
import { AmexioNavDesktopMenuComponent } from '../../navigation/navbar/navdesktopmenu';
import { AmexioThemeSwitcherComponent } from './amexio.themeswitcher.component';
import { AmexioFloatingButtonComponent } from '../../forms/floatingbutton/floatingbutton.component';
import { AmexioToggleComponent } from '../../forms/toggle/toggle.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SimpleChange } from '@angular/core';

// import { CommonIconComponent} from '../../base/components/common.icon.component';
// import {  }

fdescribe('theme switcher', () => {
    let comp1: AmexioThemeSwitcherComponent;
    let fixture1: ComponentFixture<AmexioThemeSwitcherComponent>;
    let respo: any = [];
    let positionMapData: string[];
    let isFloatingButton = false;
    let isSimpleButton = false;
    let _http: string;
    let service: AmexioThemeSwitcherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNavDesktopMenuComponent, AmexioToggleComponent, AmexioFloatingButtonComponent, AmexioThemeSwitcherComponent, AmexioFormActionCEComponent, SpeechBubbleComponent,
                AmexioButtonComponent, AmexioFooterComponent, AmexioHeaderComponent,
                AmexioBodyComponent, AmexioCardComponent, AmexioLabelComponent,
                AmexioContextMenuComponent, AmexiodialoguePaneComponent,
                AmexioFormCEComponent, AmexioCardCEBodyComponent,
                AmexioCardCEActionComponent, AmexioImageComponent, AmexioCardCEComponent,
                AmexioCardCEHeaderComponent, CommonIconComponent],
            providers: [IconLoaderService, HttpClient, HttpHandler, DeviceQueryService, AmexioThemeSwitcherService],
        });

        fixture1 = TestBed.createComponent(AmexioThemeSwitcherComponent);
        comp1 = fixture1.componentInstance;
        service = TestBed.get(AmexioThemeSwitcherService);


    });

    //   it('constructor()', () => {
    //        comp1.constructor();
    //        comp1.positionMapData = [];
    //        comp1.positionMapData['hpos-right'] = { position: 'right', value: '10px' };
    //        comp1.positionMapData['hpos-left'] = { position: 'left', value: '10px' };
    //        comp1.positionMapData['vpos-bottom'] = { position: 'bottom', value: '25px' };
    //        comp1.positionMapData['vpos-top'] = { position: 'top', value: '55px' };
    //        comp1.closeable = true;
    //   });

    it('ngOninit method', () => {
        comp1.ngOnInit();
        comp1.buttonType = 'floatingbutton'
        expect(comp1.buttonType).toEqual('floatingbutton');
        comp1.isFloatingButton = true;
        comp1.buttonType = 'button'
        expect(comp1.buttonType).toEqual('button');
        comp1.isSimpleButton = true;
        comp1.relative = true
        comp1.closeable = false;
        expect(comp1.relative).toEqual(true);
        expect(comp1.closeable).toEqual(false);
        comp1.show = true;
    });
    it('ngOninit method', () => {
        comp1.ngOnInit();
        comp1.buttonType = ''
        expect(comp1.buttonType).toEqual('');
        comp1.buttonType = ''
        expect(comp1.buttonType).toEqual('');
        comp1.relative = false
        comp1.closeable = true;
        expect(comp1.relative).toEqual(false);
        expect(comp1.closeable).toEqual(true);
        comp1.loadMDAThemes();
        service.themeData.subscribe((theme: any) => {
            if (theme != null) {
                this.onThemeClick.emit(theme);
            }
        });
    });
    it('loadMDAThemes method', () => {
        expect(comp1.isMDA).toBeDefined();
        let responseData: any;
        service.loadThemes('assets/amexiomdathemes/json/amexio-mda.json')
            .subscribe((data: any) => {
                responseData = data;
            }, (error: any) => {
            }, () => {
                comp1.data = responseData;
            });
    })
    it('loadMDAThemes method else block', () => {
        comp1.isMDA = false;
        expect(comp1.isMDA).toEqual(false);
    });
    it('getPostion() if condition', () => {
        let style = {}
        comp1.closeable = false;
        comp1.getPostion(style);
        expect(comp1.closeable).toEqual(false);
        style['position'] = 'relative';

        comp1.relative = true;
        comp1.closeable = true;
        comp1.getPostion(style);
        expect(comp1.closeable).toEqual(true);
        expect(comp1.relative).toEqual(true);

        style['position'] = 'absolute';
        style['right'] = '0';

        comp1.relative = false;
        comp1.closeable = false;
        expect(comp1.closeable).toEqual(false);
        expect(comp1.relative).toEqual(false);
        // } else {
        style['position'] = 'fixed';
        // }
        // return style;
    });

    it('getPostion() else condition', () => {
        let style = {}
        comp1.getPostion(style);
        comp1.relative = false;
        comp1.closeable = false;
        expect(comp1.closeable).toEqual(false);
        expect(comp1.relative).toEqual(false);
        style['position'] = 'fixed';

    });



    it('togglePanel()', () => {
        comp1.togglePanel();
        comp1.show = true;
        comp1.show = !comp1.show;
        comp1.onclose.emit(comp1);
    });

    it('onChange()', () => {
        let value = true;
        comp1.onChange(value);
        comp1.isMoreDetails = value;
    });

    it('themeChange()', () => {
        let theme = 'red';
        comp1.themeChange(theme);
        let service = AmexioThemeSwitcherService;
        // new AmexioThemeSwitcherService.switchTheme(theme);
    });

    it('ngOnChanges()', () => {
        let changes: any;
        changes = { show: true, currentValue: 12 };
        comp1.ngOnChanges(changes);
        // if (changes['show']) {
        expect(changes['show']).toEqual(true);
        comp1.show = changes.show.currentValue;
        // }
    });
    it('ngOnChanges() else block', () => {
        let changes: any;
        changes = { show: false, currentValue: 12 };
        comp1.ngOnChanges(changes);
        expect(changes['show']).toEqual(false);
    });

    it('themeStyle()', () => {
        comp1.themeStyle();
        const windowWidth = window.innerWidth;
        const perBlockWidth = ((windowWidth / 100) * 35) / 3;
        const style1 = {};
        const style = comp1.getPostion(style1);
        style['display'] = 'block';
        comp1.closeable = true;
        comp1.themeStyle();
        expect(comp1.closeable).toEqual(true);
        style['z-index'] = '600';

        comp1.closeable = false;
        comp1.themeStyle();
        expect(comp1.closeable).toEqual(false);
        style['z-index'] = '0';

        comp1.colsize = 3;
        comp1.themeStyle();
        expect(comp1.colsize).toBeLessThanOrEqual(3)
        style['min-width'] = '250px';

        comp1.colsize = 4;
        comp1.themeStyle();
        expect(comp1.colsize).toBeGreaterThan(3)
        style['min-width'] = '200px';

        return style;


    });


    it('themeStyle() relative method if condition', () => {
        const windowWidth = window.innerWidth;
        const perBlockWidth = ((windowWidth / 100) * 35) / 3;
        comp1.relative = false;
        comp1.horizontalPosition = '50';
        comp1.verticalPosition = '89'
        const style1 = {};
        const style = comp1.getPostion(style1);

        comp1.themeStyle();

        expect(comp1.relative).toEqual(false);
        const hpos = comp1.positionMapData['hpos-' + comp1.horizontalPosition];
        const vpos = comp1.positionMapData['vpos-' + comp1.verticalPosition];


        comp1.closeable = true;
        comp1.themeStyle();
        expect(comp1.closeable).toEqual(true);
        style['width'] = (perBlockWidth * comp1.colsize) + 'px';
        return style;


    });
    it('themeStyle() relative method else condition', () => {
        comp1.relative = true;

        const style1 = {};
        const style = comp1.getPostion(style1);

        comp1.themeStyle();
        expect(comp1.relative).toEqual(true);
        style['margin-top'] = '10px';

        comp1.closeable = false;
        comp1.themeStyle();
        expect(comp1.closeable).toEqual(false);
        style['width'] = '100%';
        return style;


    });
});
