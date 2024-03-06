import { ServerApp } from '../src/presentation/server.app';

describe('app', () => {
    test('should call ServerApp.run with values', async () => {
        const serverAppMock = jest.fn();
        ServerApp.run = serverAppMock;
        process.argv = [...process.argv, '-b', '4', '-s'];

        await import('../src/app');

        expect(serverAppMock).toHaveBeenCalledWith(
            expect.objectContaining({
                base: 4,
                limit: 10,
                printTable: true,
                fileDestination: 'outputs',
                fileName: 'multiplication-table',
            })
        );
    });
});
