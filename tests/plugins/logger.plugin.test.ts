import {
    buildLogger,
    logger as winstonLogger,
} from '../../src/plugins/logger.plugin';

describe('logger', () => {
    const logger = buildLogger('test service');

    test('buildLogger should return a function logger ', () => {
        expect(typeof logger.error).toBe('function');
        expect(typeof logger.log).toBe('function');
    });

    test('logger.log should log a message', () => {
        const spy = jest.spyOn(winstonLogger, 'log');
        const message = 'test message';

        logger.log(message);

        expect(spy).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message: 'test message',
                service: 'test service',
            })
        );
    });

    test('logger.error should log a message', () => {
        const spy = jest.spyOn(winstonLogger, 'error');
        const message = 'test message';

        logger.error(message);

        expect(spy).toHaveBeenCalledWith(
            'error',
            expect.objectContaining({
                message: 'test message',
                service: 'test service',
            })
        );
    });
});
