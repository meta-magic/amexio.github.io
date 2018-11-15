import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterpipe',
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter((singleItem) =>
            singleItem[field].toLowerCase().startsWith(value.toLowerCase()),
        );
    }
}
