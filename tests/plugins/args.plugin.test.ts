describe('args.plugin', () => {
    const initial_argv = process.argv;

    const runCommand = async (args: string[]) => {
        process.argv = [...process.argv, ...args];
        const { args: yargs } = await import('../../src/plugins/args.plugin');
        return yargs;
    };

    afterEach(() => {
        process.argv = initial_argv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'multiplication-table',
                d: 'outputs',
            })
        );
    });

    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '3', '-s', '-n', 'test-table']);

        expect(argv).toEqual(
            expect.objectContaining({
                b: 3,
                l: 10,
                s: true,
                n: 'test-table',
                d: 'outputs',
            })
        );
    });
});
