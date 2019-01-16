import {
    AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter,
    Input, IterableDiffers, OnInit, Output,
} from '@angular/core';
import { GoogleMapOverlays } from '../../../models/googlemap.model';
import { GoogleMapScriptService } from '../../services/script/script.data.service';

declare var google: any;

@Component({
    selector: 'amexio-google-map',
    templateUrl: './googlemap.component.html',
})

export class AmexioGoogleMapComponent implements OnInit {
    @Input('google-map-key') googlemapkey: string;

    @Input() style: any;

    @Input() height = '250px';

    @Input() width = '100%';

    @Input('initial-lat') initiallat = 51.507351;

    @Input('initial-lng') initiallng = -0.127758;

    @Input('initial-zoom-level') initialzoomlevel = 2;

    @Output() onMarkerClick: EventEmitter<any> = new EventEmitter();

    @Output() onReady: EventEmitter<any> = new EventEmitter();
    @Input('data')
    set data(v: GoogleMapOverlays[]) {
        if (v) {
            this._data = v;
            this.initalize();
        }
    }

    get data() {
        return this._data;
    }

    localoverlays: any[];

    differ: any;

    _data: GoogleMapOverlays[];

    map: any;

    infoWindow: any;

    componentId: any;

    responseStructure: any;
    constructor(public el: ElementRef, differs: IterableDiffers, public _loadGoogleMapService: GoogleMapScriptService) {
        this.differ = differs.find([]).create(null);
    }
    ngOnInit() {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + 'google';
        if (this.googlemapkey) {
            const script = this._loadGoogleMapService.loadScript(this.googlemapkey);
            const body = document.body as HTMLDivElement;
            const options = { center: { lat: this.initiallat, lng: this.initiallng }, zoom: this.initialzoomlevel };
            script.onload = () => {
                this.map = new google.maps.Map(this.el.nativeElement.children[0], options);
                this.onReady.emit({
                    map: this.map,
                });
                if (!this.map && this.el.nativeElement.offsetParent) {
                    this.infoWindow = new google.maps.InfoWindow();
                }
                this.initalize();
            };
            body.appendChild(script);
        }
    }

    initalize() {
        if (this.data && this.map) {
            this.localoverlays = [];
            for (const overlay of this.data) {
                this.localoverlays.push(new google.maps.Marker({
                    position: { lat: overlay.lat, lng: overlay.lng },
                    icon: overlay.icon, title: overlay.title, data: overlay.data,
                }));
            }

            for (const overlay of this.localoverlays) {
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        const changes = this.differ.diff(this.localoverlays);
        if (changes && this.map) {
            changes.forEachRemovedItem((record: any) => {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });

        }
    }

    bindOverlayEvents(overlay: any) {
        overlay.addListener('click', (event: any) => {
            this.onMarkerClick.emit(overlay.data);
            if (overlay && overlay.title) {
                this.infoWindow.setContent('<div>' + overlay.title + '</div>');
                this.infoWindow.open(this.map, overlay);
            }

        });
    }

    getMap() {
        return this.map;
    }
}
