import { FilterPipe } from './filter.pipe';


describe('Pipe: Filter', () => {
    let pipe: FilterPipe;

    beforeEach(() => {
        pipe = new FilterPipe();

        const items= ['AAA','BAB','BBA','ACS'];
    });

    it('items [] empty', () => {
        expect(pipe.transform([], 'A', 'B')).toEqual([]);
    });

    it('field or value is undefined', () => {
        expect(pipe.transform(['AAA', 'BAB', 'BBA', 'ACS'], null, null)).toEqual(['AAA', 'BAB', 'BBA', 'ACS']);
    });

    // it('value is defined', () => {
    //     expect(pipe.transform(['AAA', 'BAB', 'BBA', 'ACS'], '4', 'A')).toBe(['AAA', 'ACS']);
    // });
});