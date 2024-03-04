import { getUserById } from '../src/js-foundation/03-callbacks';

describe('03-callbacks', () => {
    test('getUserById should return an error if user does not exists', (done) => {
        const id = 10;

        getUserById(id, (error, user) => {
            expect(error).toBeDefined();
            expect(user).toBeUndefined();
            done();
        });
    });

    test('getUserById should return an John Doe', (done) => {
        const id = 1;

        getUserById(id, (error, user) => {
            expect(error).toBeUndefined();
            expect(user).toStrictEqual({
                id: 1,
                name: 'John Doe',
            });
            done();
        });
    });
});
