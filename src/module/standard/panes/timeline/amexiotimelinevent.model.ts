import { AmexiotimelineeventComponent } from './amexiotimelineevent.component';

export class AmexioTimeLineModel {
    timelineevents: AmexiotimelineeventComponent[];

    contentalignment: string;

    alignment: string;
    constructor(timelineevents: AmexiotimelineeventComponent[], contentalignment: string, alignment: string) {
        this.timelineevents = timelineevents;
        this.alignment = alignment;
        this.contentalignment = contentalignment;
    }
}
