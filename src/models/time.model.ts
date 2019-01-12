export class TimeModel {
    timeId: number;
    time: string;
    available = false;

    constructor(_id: number, _time: string) {
        this.timeId = _id;
        this.time = _time;
    }
}
