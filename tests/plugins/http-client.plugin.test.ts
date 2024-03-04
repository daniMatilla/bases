import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('http-client', () => {
    test('httpClientPluging.get should return a string', async () => {
        const data = await httpClientPlugin.get(
            'https://jsonplaceholder.typicode.com/todos/1'
        );

        expect(data).toEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: expect.any(Boolean),
        });
    });

    test('httpClientPuging should have Post, put and delete methods', async () => {
        expect(typeof httpClientPlugin.post).toBe('function')
        expect(typeof httpClientPlugin.put).toBe('function')
        expect(typeof httpClientPlugin.delete).toBe('function')
    });
});
