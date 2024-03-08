import { LogEntity, LogLevel } from '../../entity/log.entity';
import { ILogRepository } from '../../repository/iLog.repository';

interface ICheckServiceUseCase {
    call(url: string): Promise<void>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ICheckServiceUseCase {
    private static readonly TAG: string = this.name;

    constructor(
        private readonly logRepository: ILogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    async call(url: string): Promise<void> {
        try {
            const rep = await fetch(url);
            if (!rep.ok) throw new Error(`Check service ${url}`);

            this.logRepository.saveLog(
                new LogEntity({
                    origin: CheckService.TAG,
                    message: `Service ${url} working`,
                    level: LogLevel.low,
                })
            );
            this.successCallback();
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity({
                    origin: CheckService.TAG,
                    message: `${url} is not ok. ${error}`,
                    level: LogLevel.high,
                })
            );
            this.errorCallback(`${error}`);
        }
    }
}
