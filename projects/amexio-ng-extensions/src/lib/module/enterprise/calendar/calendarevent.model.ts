export class CalendarEventModel {
    isEvent: boolean;
    details: any;
    title: string;
    hasTimeSlot: boolean;
    eventDateTime: any;
    events: any[];

    constructor(isEvent: boolean, details: any, title: string, hasTimeSlot: boolean, eventDateTime: any, events?: any[]) {
        this.isEvent = isEvent;
        this.details = details;
        this.title = title;
        this.hasTimeSlot = hasTimeSlot;
        this.eventDateTime = eventDateTime;
        this.events = events;
    }
}
