import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, IterableDiffers, OnInit, Output,
} from '@angular/core';
import { GoogleMapOverlays } from '../../../models/googlemap.model';
import { GoogleMapScriptService } from '../../services/script/script.data.service';
import { GOOGLEMAP_CONSTANT } from './googlemap.constant';
declare var google: any;

@Component({
  selector: 'amexio-google-map',
  templateUrl: './googlemap.component.html',
})
export class AmexioGoogleMapComponent implements OnInit {
  @Input('google-map-key') googlemapkey: string;

  @Input() style: any;

  @Input() height = '250px';

  @Input('min-height') minheight = '250px';

  @Input() width = '100%';

  @Input('initial-lat') initiallat = 51.507351;

  @Input('initial-lng') initiallng = -0.127758;

  @Input('initial-zoom-level') initialzoomlevel = 2;

  @Input('stroke-color') stockColor = '#FF0000';

  @Input('fill-color') fillColor = '#f5f5f5';

  @Input('fill-opacity') fillOpacity = 0.45;

  @Input('stroke-opacity') strokeOpacity = 0.6;

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

  @Input('co-ordinates')
  set coordinates(v: any[]) {
    if (v) {
      this._coordinates = v;
    }
  }

  get coordinates() {
    return this._coordinates;
  }

  localoverlays: any[];

  differ: any;

  _data: GoogleMapOverlays[];

  _coordinates: any[];

  map: any;

  infoWindow: any;

  componentId: any;

  responseStructure: any;
  constructor(
    public el: ElementRef,
    differs: IterableDiffers,
    public _loadGoogleMapService: GoogleMapScriptService,
  ) {
    this.differ = differs.find([]).create(null);
  }
  ngOnInit() {
    this.componentId = +Math.floor(Math.random() * 90000) + 10000 + 'google';
    if (this.googlemapkey) {
      const fullScriptTag =
        GOOGLEMAP_CONSTANT.GOOGLE_MAP_URL + this.googlemapkey;
      const isScriptPresent = this._loadGoogleMapService.isScriptAlreadyPresent(
        fullScriptTag,
      );
      const options = {
        center: { lat: this.initiallat, lng: this.initiallng },
        zoom: this.initialzoomlevel,
      };
      if (!isScriptPresent) {
        const script = this._loadGoogleMapService.loadScript(this.googlemapkey);
        this.loadScriptWithMap(script, options);
      } else {
        this.loadMap(options);
      }
    }
  }

  // HERE LOAD SCRIPT + MAP
  private loadScriptWithMap(script: any, options: any) {
    if (script != null) {
      const body = document.body as HTMLDivElement;
      script.onload = () => {
        this.loadMap(options);
      };
      body.appendChild(script);
    } else {
      this.loadMap(options);
    }
  }

  // THIS FUNCTION IS LOADING MAP
  private loadMap(options: any) {
    this.map = new google.maps.Map(this.el.nativeElement.children[0], options);
    this.onReady.emit({
      map: this.map,
    });
    if (!this.map && this.el.nativeElement.offsetParent) {
      this.infoWindow = new google.maps.InfoWindow();
    }
    this.initalize();
  }
  // INITALIZATION OF DATA AND SEND DATA TO MAP
  initalize() {
    const flightPlanCoordinates = this.getCoordinates();
    if (flightPlanCoordinates && flightPlanCoordinates.length > 0) {
      const flightPath = new google.maps.Polygon({
        paths: flightPlanCoordinates,
        strokeColor: this.stockColor,
        strokeOpacity: this.strokeOpacity,
        strokeWeight: 2,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
      });
      flightPath.setMap(this.map);
    }
    if (this.data && this.map) {
      this.localoverlays = [];
      for (const overlay of this.data) {
        this.localoverlays.push(
          new google.maps.Marker({
            position: { lat: overlay.lat, lng: overlay.lng },
            icon: overlay.icon,
            title: overlay.title,
            data: overlay.data,
          }),
        );
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
      if (overlay && overlay.title && this.infoWindow) {
        this.infoWindow.setContent('<div>' + overlay.title + '</div>');
        this.infoWindow.open(this.map, overlay);
      }
    });
  }

  getMap() {
    return this.map;
  }

  // TO GET COORDINATES
  getCoordinates(): any[] {
    const flightPlanCoordinates = [];
    if (this._coordinates && this._coordinates.length > 0) {
      for (const co of this._coordinates) {
        const str = co.split(' ', 2);
        if (str && str.length === 2) {
          flightPlanCoordinates.push({
            lat: parseFloat(str[0]),
            lng: parseFloat(str[1]),
          });
        } else {
          console.log('Wrong Lat-Long format ' + co);
        }
      }
    }
    return flightPlanCoordinates;
  }
}
