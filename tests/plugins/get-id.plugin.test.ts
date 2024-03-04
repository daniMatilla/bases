import { getUUID } from '../../src/plugins/get-id.plugin';

describe('get-id', () => {
    test('getUUID should return an UUID', () => {
        const uuid = getUUID();

        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    });
});
