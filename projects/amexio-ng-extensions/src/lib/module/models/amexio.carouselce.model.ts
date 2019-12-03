
export class TitleModel {
    previousTitle: string;
    centerTitle: string;
    nextTitle: string;
    constructor() {
        this.centerTitle = '';
        this.previousTitle = '';
        this.nextTitle = '';
    }
    setTitle(prev: string, center: string, next: string) {
        this.previousTitle = prev;
        this.centerTitle = center;
        this.nextTitle = next;
    }
}
