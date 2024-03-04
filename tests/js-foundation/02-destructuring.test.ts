import { characters } from '../../src/js-foundation/02-destructuring';

describe('02-destructuring', () => {
    test('characters should contain Flash and Superman', () => {
        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');
    });

    test('characters should has Superman in second place and Green Lantern in third', () => {
        const [,second, third] = characters;

        expect(second).toBe('Superman');
        expect(third).toBe('Green Lantern');
    });
});
