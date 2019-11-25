export class TimeModel {
    timeId: number;
    time: string;
    available = false;
    selected = false;
    selectedStyleClass = '';
    availableStyleClass = '';
    constructor(_id: number, _time: string) {
        this.timeId = _id;
        this.time = _time;
    }
}
