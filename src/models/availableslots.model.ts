export class AvailableSlotsModel {
    datetime: Date;
    data: number[];

    constructor(datetime: Date, data: number[]) {
        this.datetime = datetime;
        this.data = data;
    }
}
