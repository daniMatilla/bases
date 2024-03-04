import { getAge } from '../../src/plugins/get-age.plugin';

const birthdate = '1980-12-26';

describe('get-age', () => {
    test('getAge should return the age of the user', () => {
        const age = getAge(birthdate);
        expect(typeof age).toBe('number');
    });

    test('getAge should return 0 years', () => {
        const spy = jest
            .spyOn(Date.prototype, 'getFullYear')
            .mockReturnValue(1995);
        const age = getAge(birthdate);

        expect(spy).toHaveBeenCalled()
        expect(age).toBe(0);
    });
});
