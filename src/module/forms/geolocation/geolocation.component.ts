import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'amexio-geolocation',
    templateUrl: './geolocation.component.html',
})
export class GeolocComponent implements OnInit {

    @Output('onSuccess') getlocation: EventEmitter<any> = new EventEmitter<any>();
    @Output('onFailure') onfailure: EventEmitter<any> = new EventEmitter<any>();

    public ngOnInit(): void {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.
                geolocation.getCurrentPosition((position: Position) => {
                    if (position) {
                        this.getlocation.emit(position);
                    }
                },
                    (error: PositionError) => console.log(error));
        } else {
            this.onfailure.emit(-1);
        }
    }
}
