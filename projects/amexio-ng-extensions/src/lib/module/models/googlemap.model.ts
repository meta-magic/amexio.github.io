export class GoogleMapOverlays {

    lat: number;
    lng: number;
    title: string;
    showtitle: boolean;
    data: any;
    icon: string;

    constructor(_lat: number, _lng: number, _title: string, _showtitle: boolean, _icon: string, _data: any) {
        this.lat = _lat;
        this.lng = _lng;
        this.title = _title;
        this.showtitle = _showtitle;
        this.icon = _icon;
        this.data = (_data) ? _data : {};
    }

}
